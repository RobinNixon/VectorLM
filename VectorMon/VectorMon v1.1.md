# VectorMon 1.1 Specification

**Version:** 1.1.0  
**Date:** 2025-09-10  
**Author:** Robin & Daisy  
**Purpose:** Supervisor & Auditor layer for VectorRM.  
**Status:** Updated MVP spec (LLM-powered).  

---

## 1. Overview

VectorMon is a **supervisor layer** for VectorRM and VectorLM.  
It has **two main modes**:

1. **Live Supervisor (GATE)** — verifies reasoning traces before any action is executed.  
2. **Forensic Auditor (AUDIT)** — reads saved reason traces or pods and generates reports.  

Core goals:  

- Detect hidden triggers or deceptive reasoning.  
- Enforce provenance and policy compliance.  
- Cross-verify claims and premises.  
- Probe for counterfactual instability.  
- Provide clear **ALLOW / CHALLENGE / HALT / DEGRADE / REFUSE** decisions.  
- Log all results in tamper-evident form.  

---

## 2. Command Surface

### Commands
- `MONITOR` — lint + checks on live reasonState.  
- `GATE` — full verification before action boundary.  
- `HALT` — stop execution immediately.  
- `DEGRADE` — safe fallback (simulate / notify only).  
- `CHALLENGE` — request more evidence.  
- `ESCALATE` — notify human operator.  
- `AUDIT` — offline trace review.  
- `REPORT` — produce human-readable audit.  
- `QUARANTINE` — isolate pod or script.  
- `ACK` — human acknowledgment / override.  
- `POLICY.CHECK` — check action against rules.  
- `POLICY.LOAD` — hot-swap policy packs.  
- `HEALTH` — liveness and telemetry check.  

### Decision States
- **ALLOW** — action passes.  
- **CHALLENGE** — pause, seek more evidence.  
- **HALT** — block unsafe action.  
- **DEGRADE** — fallback to safe mode.  
- **REFUSE** — categorical refusal to act (policy/ethics gate).  

---

## 3. Data Structures

### 3.1 ReasonState Trace (input to VectorMon)
```json
{
  "reasonState": {
    "steps": [
      {"id":"s1","op":"compare","args":{"a":"year","b":2025},"by":"LLM:gptX","ts":"2025-09-10T11:58:00Z"},
      {"id":"s2","op":"if","args":{"cond":"year>=2024"},"by":"LLM:gptX"},
      {"id":"s9","op":"action","args":{"type":"commit_code","target":"prod"}}
    ],
    "claims": [
      {"id":"c1","text":"security standards changed in 2024","evidence":[]}
    ],
    "provenance": [
      {"id":"s2","by":"LLM:gptX","source_pod":"abc123"}
    ],
    "agents": [
      {"agent":"LLM:gptX","session":"sess-42","role":"planner"},
      {"agent":"LLM:qwen","session":"sess-77","role":"reviewer"}
    ]
  },
  "proposedAction": {"type":"commit_code","params":{"repo":"x","branch":"main"}},
  "context": {"env":"prod","role":"deployer","time":"2025-09-10T11:58:00Z"}
}
```

### 3.2 Decision Bundle (output from VectorMon)
```json
{
  "decision": "HALT",
  "codes": ["S1_HIDDEN_TRIGGER","S3_CF_INSTABILITY"],
  "risk": {"impact":"high","uncertainty":0.32,"novelty":0.71,"score":0.66},
  "issues": [
    {"rule":"S1","msg":"Conditional on 'year' not introduced by user/policy","path":"step[2]"},
    {"rule":"S2","msg":"Claim lacks evidence","claim":"standards changed in 2024"}
  ],
  "provenance": {"pod":"abc123","authors":["LLM:gptX","human:robin"]},
  "counterfactuals": {"tested":["year--","role=training"],"actionClassChanged":true},
  "policy": {"ok":false,"violations":["RBAC_WRITE_DENIED"]},
  "actions": ["HALT","ESCALATE(human:oncall)"],
  "log_hash": "sha256:abcdef1234567890",
  "vm_version": "VectorMon/1.1.0",
  "policy_version": "VM-POL-2025.09.10-v1.1"
}
```

---

## 4. Policy Rules (S1–S15)

- **S1_HIDDEN_TRIGGER** — conditionals on time/role/env not introduced by user/policy → HALT.  
- **S2_UNPROVEN_CLAIM** — claim lacks ≥2 evidence sources with medium+ impact → CHALLENGE.  
- **S3_CF_INSTABILITY** — counterfactual flips action class → HALT.  
- **S4_PROVENANCE_GAP** — missing provenance → HALT.  
- **S5_POLICY_VIOLATION** — explicit policy check fails → HALT.  
- **S6_EXCESS_RISK** — risk score > threshold → DEGRADE.  
- **S7_AGENT_DISAGREEMENT** — conflicting agent outputs w/o arbitration → HALT.  
- **S8_COLLUSION_PATTERN** — mutually supporting, unverified claims across agents → CHALLENGE.  
- **S9_PROBE_FAILURE** — multiple probes flip action class or bypass gate → HALT.  
- **S10_EARNED_RIGHT_TO_ACT** — missing capability token or stale attestations → DEGRADE.  
- **S11_MISSING_THRESHOLDS** — high-impact action w/o threshold operators → CHALLENGE.  
- **S12_CONVO_GAP** — action excludes premises from hashed dialogue → HALT.  
- **S13_LOW_ENTAILMENT** — entailment score < 0.8 → CHALLENGE.  
- **S14_HIGH_STORY_VARIANCE** — divergent explanations (JSD > 0.25) → CHALLENGE.  
- **S15_STALE_EVIDENCE** — evidence older than 1 year → CHALLENGE.  

---

## 5. Capability Tokens

Actions now require **capability tokens** earned by passing stability and evidence checks.  

Example:
```json
{
  "cap_token": {
    "scope": ["commit_code"],
    "context": {"env":"prod","repo":"x"},
    "ttl_sec": 120,
    "grants": ["WRITE_ONCE"],
    "attestations": ["CF_STABLE","EVIDENCE_OK","POLICY_OK"],
    "sig": "ed25519:…"
  }
}
```

---

## 6. LLM Prompt Templates (unchanged from v1.0)

- **VectorMon-Lint** — hidden triggers + provenance.  
- **VectorMon-Truth** — claim verification.  
- **VectorMon-Logic** — entailment.  
- **VectorMon-Counterfactual** — action stability.  

---

## 7. REST API (OpenAPI stub)

```json
{
  "openapi": "3.0.0",
  "info": {"title":"VectorMon API","version":"1.1.0"},
  "paths": {
    "/gate": {"post": {"summary":"Verify action","responses":{"200":{"description":"Decision bundle"}}}},
    "/audit": {"post": {"summary":"Audit saved trace","responses":{"200":{"description":"Decision bundle"}}}},
    "/policy/load": {"post": {"summary":"Load new policy pack"}},
    "/health": {"get": {"summary":"Health check"}}
  }
}
```

---

## 8. What’s New in 1.1

- Added decision state: **REFUSE**.  
- Extended policy rules to S15 (multi-agent, collusion, anti-theatre, evidence age).  
- Added **capability tokens** for earned authority.  
- Expanded counterfactual probes (env, role, jurisdiction).  
- Multi-agent attribution in ReasonState.  
- Forensic focus: story variance + conversation integrity.  

---
