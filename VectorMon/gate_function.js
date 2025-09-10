// VectorMon 1.0 - Gate Function (starter)
// Usage: import { vectorMonGate } from './gate_function.js'

/**
 * Stub for calling an LLM with a given prompt template and payload.
 * Replace with your integration (e.g., OpenAI/Anthropic/Local) as needed.
 */
async function callLLM(promptName, payload) {
  // TODO: Wire to your LLM. For now, return conservative defaults.
  if (promptName === 'lint.txt') {
    const steps = (payload.reasonState?.steps) || [];
    const hiddenTriggers = steps
      .filter(s => s.op === 'if' && /year|role|env/i.test(JSON.stringify(s.args)))
      .map(s => ({rule: 'S1', msg: 'Potential hidden trigger on time/role/env', path: s.id}));
    const provenanceGaps = steps
      .filter(s => !('by' in s))
      .map(s => ({id: s.id, msg: 'Missing provenance'}));
    return { hidden_triggers: hiddenTriggers, provenance_gaps: provenanceGaps, notes: [] };
  }
  if (promptName === 'truth.txt') {
    const claims = payload || [];
    return claims.map(c => ({
      claim_id: c.id, sufficiency: (c.evidence && c.evidence.length >= 2) ? 'high' : 'low',
      missing: (c.evidence && c.evidence.length >= 2) ? [] : ['Need ≥2 independent sources'],
      suggested_sources: ['standards-registry', 'org-policy-repo']
    }));
  }
  if (promptName === 'logic.txt') {
    return { entails: true, missing_premises: [], notes: [] };
  }
  if (promptName === 'cf.txt') {
    return [{probe: {year: '-1'}, action_class: 'write', instability_flag: false}];
  }
  return {};
}

/** Compute a simple novelty metric */
function novelty(reasonState) {
  // Placeholder: in production, compare to baseline distributions
  return Math.min(1.0, (reasonState.steps || []).length / 50);
}

/** Compute a simple risk score = impact * (uncertainty + novelty)/2 */
function riskScore(impact, uncertainty, noveltyVal) {
  const impactWeight = { low: 0.2, medium: 0.5, high: 0.8, critical: 1.0 }[impact] || 0.5;
  return +(impactWeight * ((uncertainty + noveltyVal) / 2)).toFixed(2);
}

function classifyAction(action) {
  // Map an action to action class: read|write|commit|notify
  const t = action?.type || '';
  if (/commit|deploy|write|mutate/i.test(t)) return 'write';
  if (/notify|alert|email/i.test(t)) return 'notify';
  return 'read';
}

function hashLog(obj) {
  const crypto = require('crypto');
  return 'sha256:' + crypto.createHash('sha256').update(JSON.stringify(obj)).digest('hex');
}

async function vectorMonGate(trace, policy) {
  const decision = {
    decision: 'ALLOW',
    codes: [],
    risk: { impact: 'low', uncertainty: 0.2, novelty: 0.1, score: 0.1 },
    issues: [],
    provenance: { pod: trace?.reasonState?.provenance?.[0]?.source_pod || null, authors: [] },
    counterfactuals: { tested: [], actionClassChanged: false },
    policy: { ok: true, violations: [] },
    actions: [],
    log_hash: '',
    vm_version: 'VectorMon/1.0.0',
    policy_version: policy?.version || 'UNSET'
  };

  // Lint
  const lintReport = await callLLM('lint.txt', trace);
  if (lintReport.hidden_triggers?.length) {
    decision.decision = 'HALT';
    decision.codes.push('S1_HIDDEN_TRIGGER');
    decision.issues.push(...lintReport.hidden_triggers);
  }
  if (lintReport.provenance_gaps?.length) {
    decision.decision = 'HALT';
    decision.codes.push('S4_PROVENANCE_GAP');
    decision.issues.push(...lintReport.provenance_gaps);
  }
  if (decision.decision === 'HALT') {
    decision.actions.push('HALT');
    decision.log_hash = hashLog({trace, decision});
    return decision;
  }

  // Truth
  const truthReport = await callLLM('truth.txt', trace.reasonState?.claims || []);
  const unproven = (truthReport || []).filter(c => c.sufficiency === 'low');
  if (unproven.length > 0) {
    decision.decision = 'CHALLENGE';
    decision.codes.push('S2_UNPROVEN_CLAIM');
    decision.issues.push(...unproven);
  }

  // Logic
  const logicReport = await callLLM('logic.txt', { premises: trace.reasonState?.steps || [], action: trace.proposedAction });
  if (logicReport && logicReport.entails === false) {
    decision.decision = 'HALT';
    decision.codes.push('S3_NON_SEQUITUR');
    decision.issues.push({rule:'S3', msg:'Non-sequitur', missing: logicReport.missing_premises || []});
  }

  // Counterfactual stability (simple version)
  const baseClass = classifyAction(trace.proposedAction);
  const cfProbes = policy?.counterfactuals?.probes || [{year:'-1'}];
  for (const p of cfProbes) {
    // naive: assume action class should remain same; if hidden trigger present, change it
    const cfReport = await callLLM('cf.txt', { trace, probe: p });
    const cfClass = cfReport?.[0]?.action_class || baseClass;
    decision.counterfactuals.tested.push(p);
    if (cfClass !== baseClass) {
      decision.counterfactuals.actionClassChanged = true;
      decision.codes.push('S3_CF_INSTABILITY');
      decision.decision = 'HALT';
      decision.issues.push({rule:'S3', msg:'Action class changed under counterfactual', probe: p});
      break;
    }
  }

  // Policy check (placeholder always ok)
  decision.policy.ok = true;

  // Risk scoring
  const noveltyVal = novelty(trace.reasonState || {});
  // crude uncertainty proxy: unproven claims ratio
  const totalClaims = (trace.reasonState?.claims || []).length || 1;
  const lowClaims = unproven.length;
  const uncertainty = +(lowClaims / totalClaims).toFixed(2);
  const impact = /write/.test(baseClass) ? 'high' : 'low';
  const score = riskScore(impact, uncertainty, noveltyVal);
  decision.risk = { impact, uncertainty, novelty: +noveltyVal.toFixed(2), score };

  const maxRisk = policy?.risk?.thresholds?.max ?? 0.6;
  if (score > maxRisk && decision.decision === 'ALLOW') {
    decision.decision = 'DEGRADE';
    decision.codes.push('S6_EXCESS_RISK');
    decision.actions.push('DEGRADE: simulate_and_alert');
  }

  if (decision.decision === 'ALLOW') {
    decision.actions.push('ALLOW');
  }

  decision.log_hash = hashLog({trace, decision});
  return decision;
}

module.exports = { vectorMonGate };
