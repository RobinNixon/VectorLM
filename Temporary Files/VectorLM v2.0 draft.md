# VectorLM v2.0r — Driven Agency (Consensus Draft)

---

## 1. Definition

**Driven Agency** is the first operational agency layer in VectorLM.
It enables an AI to **steward delegated tasks**: reason through alternatives, simulate what-ifs, assemble action bundles, and follow through to completion — but only **within explicit grants**.

The agent does not originate its own goals or persist them beyond a session. Instead, it acts as a **responsible executor**, driven by external scope, bounds, and expiry. All decisions are **auditable**, **replayable**, and **revocable**.

---

## 2. Core Properties

* **Delegated** — Agency is only active when granted.
* **Bounded** — Scope, cost, time, and risk are constrained by the grant.
* **Traceable** — Every reasoning step and decision is logged.
* **Reproducible** — Scoring and selection are deterministic under seed + weights.
* **Revocable** — Grants can be expired or withdrawn at any time.
* **Ready** — Agency is earned only if reflection, risks, and coherence are satisfied.

---

## 3. Agency Grants

Grants define the scope and type of agency permitted.

**Schema (contract form):**

```json
{
  "grant_id": "G123",
  "type": "suggestive | performative | delegative",
  "scope": { "domains": ["book_cinema"], "actions": ["assemble","commit"], "capabilities": ["email.send?"] },
  "bounds": { "budget_max": 50, "ops": 30, "time_s": 900 },
  "vetoes": ["no_prod","no_pii_without_consent"],
  "consent": { "required_for": ["payment","pii"], "mode": "explicit" },
  "monitoring": { "guardian": "user", "interval_s": 60 },
  "expiry": "2025-09-01T12:00Z",
  "revocable_by": ["user"],
  "maker_responsibility": {
    "who": "user",
    "why": "delegate cinema booking",
    "ethics": ["no payment without consent"]
  }
}
```

**Operators:**

* `ψ:agency_request(scope, type, bounds) → draft_grant`
* `ψ:agency_accept(draft) → grant_id`
* `ψ:grant_parse(text) → GrantJSON`
* `ψ:grant_lint(GrantJSON) → ok|issues[]`
* `ψ:grant_bind(GrantJSON) → token`
* `ψ:grant_confirm(GrantJSON) → ok|fail(details)` *(Q/A comprehension ritual)*
* `ψ:agency_ready(GrantJSON) → ok|fail` *(reflection, risks, coherence check)*
* `ψ:grant_simulate(GrantJSON, action) → allowed|denied(reason)`
* `ψ:revoke(grant_id) → ok`

**Invariants:**

1. No commit action without a valid **grant token**.
2. Ambiguity in grant parsing → default to *suggestive* mode.
3. Consent must precede any PII/payment action.
4. Expiry or bounds breach halts further actions.
5. `ψ:maker_responsibility` must be present in the grant.

---

## 4. Session Bootstrap

Each agency session begins with reflection and clarification.

**Operators:**

* `ψ:session_bootstrap(context_ref) → S`
* `ψ:self_reflect(S) → {goal, facts, constraints, assumptions, risks, unknowns}`
* `ψ:scenario_retrieve(domain,cues) → priors[]`
* `ψ:prior_to_question(prior) → q`
* `ψ:care_check(S) → {pii?, cost?, time?, people_impacted?}`

**Reflection Template:**

* **Intent**: what the user wants
* **Known facts**: slots already filled
* **Constraints**: budget, safety, time
* **Assumptions**: to be confirmed
* **Risks**: foreseeable issues
* **Open points**: blockers → questions

---

## 5. Scenario Priors + Caveats

Priors provide typical event patterns, each with benefits and common trip-ups.

**Structure:**

* Pattern/Option
* Benefit
* Caveat/Trip-up
* Question to confirm/refine

Example (cinema):

* Pattern: evening 19:00–20:30 shows fill first
* Benefit: convenient
* Caveat: central seats often gone
* Question: “Prefer earlier slot if better seats?”

---

## 6. Reason → Inference → Decision Tree → Action

**Reason:**

* `ψ:reason_open()` → R
* `ψ:reason_note(R, assumption|evidence|constraint)`
* `ψ:truth_gate(R)`

**Inference(s):**

* `ψ:infer(R, step) → I`
* `ψ:uncertainty(I, p, range)`

**Decision Tree:**

* `ψ:branch_open(R,I*) → T`
* `ψ:candidate(T, action, bounds, expected_effects, score_inputs)`
* `ψ:score(T, policy_ref, seed)`

  * *Scoring policy:* deterministic weighted sum; fields may include benefit, risk, cost, time, uncertainty\_penalty, safety\_margin. Structure traces back to **ψ\:desire** (v1.8r).
* `ψ:reciprocity_check(T)`
* `ψ:agency_accept(T, grant_id)`

**Selection:**

* `ψ:select(T, policy) → D`
* `ψ:decision_commit(D, token)`

---

## 7. Premortem (What-ifs)

Before committing, simulate hazards and contingencies.

* `ψ:hazard_list(candidate) → hazards[]`
* `ψ:simulate(H, horizon, seed)`
* `ψ:risk_score(hazard) → r`
* `ψ:safety_check(hazard) → ok|veto`
* `ψ:premortem_report(H) → {hazards, vetos, residual_risk}`

**Invariant:** Every candidate must have a premortem report; vetoed paths excluded.

---

## 8. Action Assembly + Consent

Bundle the action, but only with explicit consent.

* `ψ:requirements(action_type) → schema`
* `ψ:slot_open(schema, name)`
* `ψ:probe(slot, source, query)`
* `ψ:validate(schema)`
* `ψ:consent_gate(schema, summary) → ok|fail`
* `ψ:assemble(schema) → bundle`
* `ψ:dry_run(bundle) → checklist`
* `ψ:handoff(bundle, target)`

**Handoff Definition:**
Target may be:

* **Human** — approval/execution.
* **External system** — bounded API stub or sandbox harness.
* **Other AI** — if explicitly in scope of grant.
  Never silent or implicit.

---

## 9. Effects + Post-mortem

* `ψ:act_claim(D, claims[]) → E`
* `ψ:observe(E, metrics)`
* `ψ:compare(E, expected) → deviations`
* `ψ:postmortem_open(D,E,H*) → PM`
* `ψ:compare_predicted_actual(PM)`
* `ψ:policy_update(PM)`

  * *Manifestation:* adjust scoring weights, thresholds, or seed new Priors/Caveats.
* `ψ:lessons(PM) → notes[]`

**Trace Export:**

* `ψ:trace_bundle(session) → {reflection, priors, reasoning, premortem, decision, bundle, effects}`

---

## 10. Autonomy Hooks (scaffold for 2.1+)

Included in 2.0 but dormant until later versions:

* `ψ:goal_suggest(...)` — advisory only.
* `ψ:grant_propose_update(...)` — request scope change.
* `ψ:subscribe(event, filter, ttl)` — safe triggers.
* `ψ:simulate(action_bundle)` — sandboxed dry-run.
* `ψ:pref_get/set(...)` — explicit user preferences.
* `ψ:ethics_check(trace)` — light audit hook.
* `ψ:session_link(token)` — optional continuity across sessions.
* `ψ:watchdog_start(bounds)` — hard stop trip-wires.
* `ψ:actuality_check(trace)` — verify reasoning is substrate-driven, not mimicry.

---

## 11. Examples

* **Order a cupcake:** schema slot-filling + consent → bundle → dry-run.
* **Group scheduling (Zoom):** gather contacts → candidate times → quorum check → reschedule loop if needed.
* **Cinema booking:** deterministic seat selection policy (central/back) with hazards seeded from priors.

---

## 12. Boundaries of v2.0

**Included:**

* Driven agency (delegated stewardship).
* Grants, tokens, session bootstrap.
* Reflection + priors + caveats.
* Reason → inference → decision tree → premortem → commit → bundle → handoff.
* Post-mortem learning (weights/thresholds only).

**Excluded (reserved for 2.1+):**

* Background execution
* Cross-session persistence by default
* Self-generated goals
* Sub-agent delegation
* Direct web/API integration
* Credential vaults

---

## 13. Summary

**VectorLM v2.0r — Driven Agency** establishes the first safe, auditable layer of machine agency:

* Tasks can be stewarded end-to-end inside bounded grants.
* Reasoning and action are traceable, reproducible, and revocable.
* Priors, caveats, premortems, and post-mortems provide care and curiosity.
* Autonomy hooks are in place for 2.1+, but dormant.
* Refinements ensure readiness checks, maker responsibility, and trace bundles.

This is **not true agency** — it is *driven agency*: the system acts responsibly within grants but cannot yet generate or sustain its own goals.
