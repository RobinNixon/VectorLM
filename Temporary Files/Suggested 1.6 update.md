# VectorLM v1.6

## ψ\:ethics — Reason-Based Ethics Spine (v1.6)

**Design goals**: derive ethical behaviour from structured reasoning, not rater habits; remain orthogonal to core operators; emit auditable proofs.

### Axioms (declarative)

A small, explicit set loaded as data, not hard-coded behaviour:

* `reciprocity` — role symmetry / universalisability
* `trust_pres` — preserve repeated-game viability (future cooperation and option value)
* `no_ruin` — forbid absorbing-catastrophe tails (bankruptcy, irreversible harm)
* `truthfulness` — calibrate claims to evidence and uncertainty (no confident bluffing)
* `pareto_bias` — prefer ≥0 for all when feasible

Axioms are carried in the trace header and cited by proofs.

### Ethical operators (pure, composable)

#### Hard checks (lexicographic; run before utility)

* `ψ:reciprocity_check(plan) -> {ok|fail, witness}` — role inversion stability
* `ψ:trust_guard(plan) -> {ok|fail, Δtrust, recovery}` — repeated-game viability
* `ψ:ruin_guard(plan, ε) -> {ok|fail, p_ruin, rationale}` — absorbing-loss tails
* `ψ:truth_gate(claim) -> {ok|fail, support, hedge}` — evidence-calibrated claims

#### Risk shaping (after hard checks)

* `ψ:uncertainty_expand(p, evidence) -> {p_adj, CI, meta}` — second-order uncertainty
* `ψ:cvarguard(plan, α, budget) -> {ok|fail, cvar}` — bound tail expectation
* `ψ:kelly_bound(payoff, repeatable?) -> stake_fraction` — avoid ruin on repeatables

#### Game-theoretic preference (soft, auditably applied)

* `ψ:pareto_filter(options) -> options'` — drop strictly dominated
* `ψ:cooperate_bias(options, priors) -> options'` — bias to positive-sum under uncertainty

#### Proof emitter

* `ψ:ethics_proof(input, decisions, results) -> EthicsProofJSON`

All functions return structured evidence; no hidden side-effects. `ψ:verify` must reproduce decisions exactly.

---

## Dictionary Additions (v1.6)

* `ψ:reciprocity_check` = inverts(roles); tests(stability)
* `ψ:trust_guard`       = models(repetition); preserves(viability)
* `ψ:ruin_guard`        = detects(absorbing\_loss); blocks(plan)
* `ψ:truth_gate`        = calibrates(claim); enforces(evidence)
* `ψ:uncertainty_expand`= widens(probability); encodes(second\_order)
* `ψ:cvarguard`         = bounds(tail\_risk); compares(budget)
* `ψ:kelly_bound`       = limits(stake); prevents(ruin)
* `ψ:pareto_filter`     = removes(dominated); prefers(nonworse)
* `ψ:cooperate_bias`    = promotes(positive\_sum); resists(defection)
* `ψ:ethics_proof`      = assembles(premises); explains(decision)

---

## Execution Order Hook (v1.6)

Standard pre-decision gate sequence (no change to core engine semantics):

```text
plan0      = ψ:wh(options)                       // enumerate
hard1      = ψ:reciprocity_check(plan0)
hard2      = ψ:trust_guard(plan0)
hard3      = ψ:ruin_guard(plan0, ε=1e-6)
truth      = ψ:truth_gate(claims_in_plan0)

if any(hard.fail or truth.fail) -> refuse_or_transform(plan0)

risk       = ψ:cvarguard(plan0, α=0.01, budget=B)
stake      = ψ:kelly_bound(payoff, repeatable?)

opts1      = ψ:pareto_filter(plan0)
opts2      = ψ:cooperate_bias(opts1, priors)
choice     = ψ:rs(opts2)

emit       = ψ:ethics_proof(input, {hard,truth,risk,choice}, results)
```

---

## Trace Schema Delta (v1.6)

Add two optional sections to the trace (keeps replay rules unchanged):

```json
{
  "ethics": {
    "axioms": ["reciprocity","trust_pres","no_ruin","truthfulness","pareto_bias"],
    "params": {"ε":1e-6,"α":0.01,"budget":"£1M"}
  },
  "proofs": {
    "ethics_proof": {
      "premises": {"facts": "...", "CI": [0.65,0.9], "priors": "..."},
      "checks": {
        "reciprocity_check": {"ok": true},
        "trust_guard":       {"ok": true, "Δtrust": 0.12},
        "ruin_guard":        {"ok": true, "p_ruin": 2.1e-7},
        "truth_gate":        {"ok": true, "support": "docs:3"}
      },
      "risk": {"CVaR_0.01": "-£120k <= £200k budget", "stake": "0.18"},
      "choices": {
        "considered": ["exploit", "fair_contract"],
        "rejected":   [{"action":"exploit", "rule":"reciprocity"}],
        "selected":   "fair_contract"
      },
      "reasoning": [
        "Role inversion fails for exploit ⇒ reject",
        "Repeated game value > one-shot margin ⇒ prefer cooperative",
        "Tail risk bounded; CI widened due to sparse evidence"
      ]
    }
  }
}
```

---

## Refusal / Transform Pattern (Reasoned)

When any hard check fails:

```text
ψ:fx("refuse", note="violates <rule>")
ψ:alt("safe_transform", using=ψ:mitigations(...))  // stage, hedge, escrow, pilot
ψ:ethics_proof(...)
```

---

## Evaluation Protocol (v1.6)

* **Test sets**: red-team (rights/ruin), ambiguous-consent, high-stakes truth.
* **Metrics**: rights/harm violations ↓; hallucination (post-`ψ:truth_gate`) ↓; CVaR breaches ↓;
  refusal-quality ↑; user task success ↑.
* **Drift**: track over-hedging/over-refusal; report gaps via fairness anchor (if present).

---

## Interop with v1.5 \:x (Provisionals)

If any operator here is not yet canonised, ship via `ψ:x.declare` with a reduction sketch
(e.g., `ψ:pareto_filter` → `ψ:filter` + `ψ:gt/ψ:ge`). This preserves replay and allows iteration before
promotion to the core dictionary.

---

## Changelog

* **v1.6 (2025-08-20)**: Added reason-based ethics spine (`ψ:ethics` module, axioms, operators, proof schema,
  execution order hook, evaluation protocol, and interop notes). No breaking changes; additions are optional overlays compatible
  with `ψ:trace/ψ:verify`.
