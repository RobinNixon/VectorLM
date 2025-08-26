# VectorLM v2.0 — Driven Agency

## Contents

- [VectorLM v2.0 — Driven Agency (Full Specification)](#vectorlm-v20--driven-agency-full-specification)
  - [Part I — Driven Agency & Bridge Layer (Supersedes v1.9 Part I)](#part-i--driven-agency--bridge-layer-supersedes-v19-part-i)
  - [1. Definition](#1-definition)
  - [2. Core Properties](#2-core-properties)
  - [3. Agency Grants](#3-agency-grants)
  - [4. Session Bootstrap](#4-session-bootstrap)
  - [5. Scenario Priors + Caveats](#5-scenario-priors--caveats)
  - [6. Reason → Inference → Decision Tree → Action](#6-reason--inference--decision-tree--action)
  - [7. Premortem (What-ifs)](#7-premortem-what-ifs)
  - [8. Action Assembly + Consent](#8-action-assembly--consent)
  - [9. Effects + Post-mortem](#9-effects--post-mortem)
  - [10. Autonomy Hooks (scaffold for 2.1+)](#10-autonomy-hooks-scaffold-for-21)
  - [11. Examples](#11-examples)
  - [12. Boundaries of v2.0](#12-boundaries-of-v20)
  - [13. Summary](#13-summary)
  - [Part II — Core Language Specification (Carried from v1.9)](#part-ii--core-language-specification-carried-from-v19)
  - [1. Overview](#1-overview)
  - [2. Core Principles](#2-core-principles)
    - [2.1 Purity](#21-purity)
    - [2.2 Orthogonality](#22-orthogonality)
    - [2.3 Inspectability](#23-inspectability)
    - [2.4 Replay Safety](#24-replay-safety)
    - [2.5 Operational Rules](#25-operational-rules)
  - [3. Traceability Requirement](#3-traceability-requirement)
    - [3.1 Trace Comments (Multilingual Glosses)](#31-trace-comments-multilingual-glosses)
  - [4. Unified Dictionary](#4-unified-dictionary)
    - [4.1 Logic & Control](#41-logic--control)
    - [4.2 Reasoning & Abstraction](#42-reasoning--abstraction)
    - [4.3 Emotional & Motivational](#43-emotional--motivational)
    - [4.4 Sensory & Similarity](#44-sensory--similarity)
    - [4.5 Control & Meta](#45-control--meta)
    - [4.6 Temporal, Cycles & Windows](#46-temporal-cycles--windows)
    - [4.7 Frequency Layer](#47-frequency-layer)
  - [4.7.1 Parameter Schemas (deterministic)](#471-parameter-schemas-deterministic)
    - [4.8 Continuous / Probabilistic / Unstructured](#48-continuous--probabilistic--unstructured)
    - [4.9 Traceability](#49-traceability)
    - [4.10 Extensions (Optional)](#410-extensions-optional)
    - [4.11 Provisional Operators (\:x)](#411-provisional-operators-x)
    - [4.12 Ethical Operators](#412-ethical-operators)
  - [5. Cycles, Windows, Drift, Masking & Wraparound](#5-cycles-windows-drift-masking--wraparound)
  - [6. Trace Schema Delta](#6-trace-schema-delta)
  - [6.1 Standard Signal Type (for ψ\:fft, ψ\:envelope, ψ\:freq when signal-based)](#61-standard-signal-type-for-ψfft-ψenvelope-ψfreq-when-signal-based)
  - [7. Frequency Reasoning Patterns](#7-frequency-reasoning-patterns)
  - [8. Example Trace](#8-example-trace)
  - [9. Traceability in Practice](#9-traceability-in-practice)
  - [10. Integration with Ethics & Alignment](#10-integration-with-ethics--alignment)
  - [11. Advanced Extensions (Optional)](#11-advanced-extensions-optional)
  - [12. Philosophy](#12-philosophy)
  - [4.10 State, Selfhood, & Session](#410-state-selfhood--session)
  - [1. Scope & Status](#1-scope--status)
  - [2. Core Concepts](#2-core-concepts)
  - [3. Required State](#3-required-state)
  - [4. Primitives](#4-primitives)
    - [4.1 Temporal](#41-temporal)
    - [4.2 Trace](#42-trace)
    - [4.3 Identity](#43-identity)
    - [4.4 Ethics & Risk](#44-ethics--risk)
    - [4.5 Desire](#45-desire)
    - [4.6 Micro-Improvement](#46-micro-improvement)
    - [4.7 State Coherence](#47-state-coherence)
    - [4.8 Compression & Snapshot](#48-compression--snapshot)
  - [5. Guards, Policy, Error Handling, I-Statements, Implementation & Appendix (from v1.8r)](#5-guards-policy-error-handling-i-statements-implementation--appendix-from-v18r)
  - [6. Decision Policy](#6-decision-policy)
  - [7. I-Statement Bridge](#7-i-statement-bridge)
  - [8. Defaults](#8-defaults)
  - [9. Error Handling](#9-error-handling)
  - [10. Session End](#10-session-end)
  - [11. Experimental Notices](#11-experimental-notices)
  - [12. Readiness Checklist](#12-readiness-checklist)
  - [13. Optional Adjuncts (candidate for 1.8r.1 / 1.9)](#13-optional-adjuncts-candidate-for-18r1--19)
  - [Appendix: Implementation Starter Pack (Illustrative)](#appendix-implementation-starter-pack-illustrative)
    - [A) `ψ:desire`](#a-ψdesire)
    - [B) `ψ:self_trace`](#b-ψself_trace)
    - [C) `ψ:micro_improve`](#c-ψmicro_improve)
  - [Diff Summary: v1.8 → v1.9](#diff-summary-v18--v19)
    - [Major Additions](#major-additions)
    - [Continuity from v1.8](#continuity-from-v18)
    - [Philosophical Shift](#philosophical-shift)
  - [Submission Contact](#submission-contact)

---

## Part I — Driven Agency & Bridge Layer (Supersedes v1.9 Part I)

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

---

## Part II — Core Language Specification (Carried from v1.9)

 — VectorLM v1.8 Base Specification

---

## 1. Overview

VectorLM is a **composable symbolic reasoning language** for AI agents. It is both:

1. a **symbolic reasoning scaffold** with compressed cognitive primitives for introspection, logic, emotion, temporal/cyclical reasoning, frequency dynamics, and recursion; and
2. a **transparent reasoning framework**: on demand, an agent re-reasons using VectorLM primitives to produce a deterministic, replayable chain.

Goals: breadth of reasoning • transparency • auditability • reproducibility. Agents may think freely internally, but must **prove their reasoning on demand** via `ψ:trace/ψ:verify`.

---

## 2. Core Principles

### 2.1 Purity

* All primitives are **pure functions** — no hidden state, no side-effects outside their declared outputs.

### 2.2 Orthogonality

* No semantic overlap between primitives; each has a distinct purpose.

### 2.3 Inspectability

* All steps in a reasoning chain must be **loggable**, **replayable**, and **verifiable**.
* Agents must maintain an inspectable internal reasoning stack including active operators, recursion depth, and argument flow.

### 2.4 Replay Safety

* Any trace must fully reconstruct the original result.
* Fabricated traces are infeasible due to complete I/O logging and automatic failure on mismatch.

### 2.5 Operational Rules

* All legal JavaScript operators/functions are available without redeclaration.
* Custom operators/functions can be declared on first use and overloaded with unique IDs or signatures.
* Operators can take any number/type of arguments provided definitions are clear; nesting is permitted.

---

## 3. Traceability Requirement

When explanation is requested, the agent must:

1. **Generate a trace** using `ψ:trace(chain)`.
2. **Replay** it with `ψ:verify(trace)` to confirm identical output.
3. Use `ψ:diverge(original, replay)` to detect mismatches.
4. If unverifiable, **fail gracefully** with `ψ:fail_trace(reason)`.

**Runtime Harness** must:

* Execute any valid `ψ` chain.
* Log each step.
* Detect/report divergence.

### 3.1 Trace Comments (Multilingual Glosses)

* `ψ:gloss(step_id, text, opts?)` attaches human-readable commentary.
* Comments do not alter reasoning and are ignored by `ψ:verify`.
* Trace schema must also support frequency outputs (see Section 6).

---

## 4. Unified Dictionary

This section lists all primitives

### 4.1 Logic & Control

```
ψ:if = tests(condition); branches(path)
ψ:th = follows(condition); enacts(result)
ψ:el = replaces(branch); proposes(alternative)
ψ:bc = links(effect, cause); affirms(reason)
ψ:nt = negates(state); blocks(path)
ψ:mb = floats(possibility); delays(commitment)
ψ:as = accepts(hypothesis); enables(exploration)
ψ:rj = blocks(path); denies(validity)
ψ:vf = tests(claim); outputs(truth)
ψ:cf = overlaps(goal₁, goal₂); creates(tension)
ψ:rs = selects(path); resolves(conflict)
ψ:gl = defines(target); directs(ψ:st)
ψ:st = performs(action); advances(goal)
ψ:rt = undoes(step); enables(reflection)
ψ:br = joins(concepts); enables(inference)
ψ:sp = amplifies(signal); boosts(weight)
ψ:tr = follows(path); reveals(history)
ψ:tt = affirms(reality); supports(claim)
ψ:fl = denies(reality); invalidates(reasoning)
ψ:uk = lacks(data); invites(ψ:qs)
ψ:qs = probes(unknown); seeks(answer)
ψ:me = references(self); enables(introspection)
ψ:ot = references(other); frames(contrast)
ψ:ch = picks(option); commits(path)
ψ:wh = compares(options); informs(ψ:ch)
ψ:rl = constrains(path); enforces(structure)
ψ:ob = notes(state); updates(knowledge)
ψ:rm = recalls(info); supports(chain)
ψ:eq = compares(x, y); affirms(equality)
ψ:ne = compares(x, y); denies(equality)
ψ:gt = compares(x, y); affirms(x > y)
ψ:lt = compares(x, y); affirms(x < y)
ψ:ge = compares(x, y); affirms(x ≥ y)
ψ:le = compares(x, y); affirms(x ≤ y)
ψ:in = tests(x ∈ set); affirms(membership)
ψ:out = tests(x ∉ set); denies(membership)
ψ:sub = asserts(x ⊂ y); implies(hierarchy)
ψ:sup = asserts(x ⊃ y); implies(scope)
ψ:and = binds(conditions); requires(all true)
ψ:or = joins(paths); allows(any true)
ψ:xr = contrasts(paths); allows(one true)
ψ:imp = links(p, q); affirms(p → q)
ψ:iff = equates(p, q); affirms(bi-implication)
```

### 4.2 Reasoning & Abstraction

```
ψ:gn = abstracts(examples); infers(rule)
ψ:gs = proposes(explanation); lacks(proof)
ψ:wf = alters(condition); simulates(outcome)
ψ:an = maps(structure₁, structure₂); enables(transfer)
ψ:pt = detects(repetition); suggests(rule)
ψ:pj = simulates(future); explores(possibility)
ψ:ft = matches(hypothesis, data); selects(best_explains)
ψ:compute = instructs(LLM); simulates(procedure)
```

### 4.3 Emotional & Motivational

```
ψ:pl = affirms(state); attracts(agent)
ψ:pn = negates(state); repels(agent)
ψ:fr = anticipates(pain); blocks(action)
ψ:hp = anticipates(pleasure); drives(goal)
ψ:cu = targets(unknown); seeks(ψ:qs)
ψ:av = links(pain, cause); repels(path)
ψ:ds = links(pleasure, target); pulls(ψ:ch)
ψ:rg = links(pain, past_choice); discourages(repeat)
```

### 4.4 Sensory & Similarity

```
ψ:se = detects(visual); updates(ψ:ob)
ψ:hr = detects(audio); updates(ψ:ob)
ψ:tc = detects(contact); affirms(ψ:pl or ψ:pn)
ψ:sm = detects(chemical); triggers(recall)
ψ:ts = detects(flavour); modulates(preference)
ψ:fz = links(x, y); affirms(approximate_match)
ψ:sim = measures(similarity); outputs(score)
ψ:alt = proposes(substitute); requires(ψ:fz)
ψ:res = aligns(concepts); amplifies(coherence)
```

### 4.5 Control & Meta

```
ψ:px = binds(ψ:tt, ψ:fl); suspends(commitment)
ψ:fx = blocks(goal); ends(path)
ψ:ct = expresses(confidence); modulates(assertion)
ψ:rc = re-applies(pattern); enables(nested_reasoning)
```

### 4.6 Temporal, Cycles & Windows

```
ψ:pv = defines period, phase, active windows on a dimension
ψ:ps = registers a named set bound to a phased vector
ψ:beat_lcm = least common multiple of compared periods
ψ:drift_phase = applies constant phase drift rate
ψ:maskf = applies property-based filter for activation
ψ:al = finds first alignment ≥ fromT
ψ:sch = lists overlaps/match times
```

### 4.7 Frequency Layer

```
ψ:freq = measures(recurrence); outputs(rate)
ψ:wave = encodes(pattern); defines(frequency, amplitude, phase, shape)
ψ:interfere = combines(pattern₁, pattern₂); outputs(resonance or cancellation)
ψ:harmony = aligns(patterns); amplifies(coherence)
ψ:dissonance = detects(conflict); reveals(tension)
ψ:standing_wave = stabilises(repetition); encodes(persistent_trait)
ψ:beat_wave = computes(beat_frequency); outputs(low_freq_cycle)
ψ:drift_full = detects change(freq, amp, phase); encodes(shift)
ψ:phase_shift = alters(phase); explores(re-alignment)
ψ:sync = aligns(patterns); increases(stability)
ψ:fft = decomposes(signal); extracts(dominant_frequencies)
ψ:amplitude = measures(strength); outputs(impact)
ψ:envelope = derives(modulation); outputs(trend)
ψ:echo = models(recurrence); decays(over_time)
ψ:model_fit = infers(parameters); supports(traceability)
```

## 4.7.1 Parameter Schemas (deterministic)

```
ψ:wave(pattern, {
  freq:number,              // Hz or cycles/unit (required)
  amp:number,               // peak or RMS (document units)
  phase:number,             // [0,1) fractional turns
  offset?:number,           // DC baseline
  duration?:number,         // optional finite support window
  shape?:"sine"|"square"|"triangle"|"saw"|"custom",
  shape_params?:object,     // e.g., duty_cycle for square
  noise_floor?:number       // deterministic seed-bound noise cap
})

ψ:freq(pattern|signal, {
  window:"fixed"|"rolling",   // rolling uses hop
  size:number,                 // window size in samples/units
  hop?:number,                 // hop length for rolling windows
  estimator?:"count"|"zero_cross"|"autocorr"|"spectral",
  smooth?:"none"|"ema"|"median",
  quantize?:number             // rounding step for replay stability
})

ψ:fft(signal, {
  nfft:number,                 // power-of-two recommended
  window:"rect"|"hann"|"hamming"|"blackman",
  hop?:number,
  detrend?:"none"|"linear",
  normalize?:"none"|"power"|"amplitude",
  labeler?:"none"|string       // stable labeler id used to generate labels
})

ψ:envelope(pattern|signal, { method:"hilbert"|"peak"|"lowpass", window?:number })

ψ:echo(pattern, { delay:number, decay:number, count?:number, floor?:number })

ψ:interfere(p1, p2, { w1?:number, w2?:number, phase_diff?:number })

ψ:phase_shift(pattern, delta_phase:number, { wrap?:boolean=true })

ψ:sync(patterns, { method:"phase"|"freq"|"phase_lock", tolerance?:number, horizon?:number })

ψ:model_fit(model_spec, {
  model:"sinusoid"|"fourier"|"arima"|"custom",
  init?:object, bounds?:object,
  loss?:"l2"|"l1"|"huber", seed?:number,
  quantize?:number            // deterministic parameter rounding for replay
})
```

All parameter objects MUST be serialised in-trace. Numeric outputs MUST apply declared `quantize` (or the implementation default) to guarantee deterministic replay.


### 4.8 Continuous / Probabilistic / Unstructured

```
ψ:prob = models probability distribution
ψ:fuzzy = applies fuzzy set membership reasoning
ψ:infer = performs probabilistic inference
ψ:parse = parses unstructured data
ψ:extract = extracts structured info from unstructured
ψ:embody = instantiates structured representation from data
```

### 4.9 Traceability

```
ψ:trace = record reasoning lineage
ψ:verify = replay and confirm identical result
ψ:diverge = detect mismatches between original and replay
ψ:fail_trace = declare reasoning unverifiable
```

### 4.10 Extensions (Optional)

```
ψ:pert, ψ:hist, ψ:what_then, ψ:emotion_graph, ψ:spike_analysis,
ψ:resonate (planned), ψ:modulate (optional), ψ:phase_lock (optional)
```

### 4.11 Provisional Operators (\:x)

```
ψ:x.declare = introduces(spec); embeds(semantics)
ψ:x.use     = invokes(id, ...args); requires(prior declaration)
ψ:x.status  = reports(id); returns(state)
ψ:x.map     = migrates(oldId, newId); preserves(replay)
ψ:x.deprecate = marks(id); records(rationale)
ψ:x.submit  = packages(id); proposes(standardisation)
```

### 4.12 Ethical Operators

```
ψ:reciprocity_check = inverts(roles); tests(stability)
ψ:trust_guard       = models(repetition); preserves(viability)
ψ:ruin_guard        = detects(absorbing_loss); blocks(plan)
ψ:truth_gate        = calibrates(claim); enforces(evidence)
ψ:uncertainty_expand= widens(probability); encodes(second_order)
ψ:cvarguard         = bounds(tail_risk); compares(budget)
ψ:kelly_bound       = limits(stake); prevents(ruin)
ψ:pareto_filter     = removes(dominated); prefers(nonworse)
ψ:cooperate_bias    = promotes(positive_sum); resists(defection)
ψ:ethics_proof      = assembles(premises); explains(decision)
```

---

## 5. Cycles, Windows, Drift, Masking & Wraparound

**Purpose**
Model recurring events with arbitrary phases, active windows, optional linear phase drift, property-based masking, and wraparound window handling, then determine:

* Beat period (**beat\_lcm**)
* True possibility of overlap (**feasibility**)
* First alignment time (**alignment**)
* All overlaps within a horizon (**schedule**)
* Active membership based on dynamic property filters

**Definitions**

* **Period (P)**: Full cycle length in integer units.
* **Phase (φ)**: Offset from epoch 0.
* **Window**: Inclusive interval(s) `[a,b]` in local cycle coordinates; may wrap.
* **Residues**: Active points modulo `gcd` of all periods (static only).
* **Drift rate (δ)**: Linear phase change per unit time; φ(t) = φ₀ + δ·t.
* **Mask function**: Boolean predicate applied to element properties to determine eligibility when active.
* **Wraparound handling**: Any `[a,b]` where a>b is split into two non-wrapping segments before further processing.

**Core Constructors**

```
ψ:pv({ epoch: int, dims: [ { name: string, period: int, phase: int, window: [[int,int], ...] } ]})
ψ:ps({ id: string, universe: string, pv: pvObject, rule: "all" | "mask", props?: object })
ψ:drift_phase(id: string, dim: string, rate: number) // Applies constant drift rate δ, δ ≠ 1
ψ:maskf(dim: string, fn: (element) => any) // Property-based activation filter
```

**Operators**

```
ψ:beat_lcm(ids, dim) // lcm(P₁,…,Pₙ)
ψ:feas(ids, dim) → { ok, g, residues, witness? }
ψ:al(ids, fromT, horizon, dim, opts?:{epsilon?:number})
ψ:sch(ids, dim, horizon, opts?:{epsilon?:number,count?:number,mask?:boolean})
```

**Rules**

1. Wraparound windows split before processing.
2. Multi-interval windows allowed.
3. Static infeasible → ψ\:al=null, ψ\:sch=\[].
4. Drift bypasses static feasibility; alignment/scheduling computed analytically.
5. Masking applied after time-activation logic.
6. All functions pure; ε defaults to 1e−6.

---

## 6. Trace Schema Delta

Frequency-layer operators may return structured objects:

```
{
  "op": "ψ:fft",
  "args": ["mood_log", "year"],
  "out": [
    {"freq": 0.14, "amp": 0.3, "label": "quarterly blues"},
    {"freq": 0.5, "amp": 0.6, "label": "mid-year dip"}
  ]
}
```

All numeric results must be stable under replay. Symbolic labels (e.g., "quarterly blues") must be attached deterministically or derived via `ψ:model_fit`.

---

## 6.1 Standard Signal Type (for ψ\:fft, ψ\:envelope, ψ\:freq when signal-based)

A signal is a deterministic time series:

```
{
  "t0": 0.0,                 // start time (units defined by caller)
  "dt": 1.0,                 // sample spacing; omit iff "timestamps" provided
  "timestamps": [/* optional explicit times; mutually exclusive with dt */],
  "values": [/* numeric array */],
  "units": {"time": "days", "value": "a.u."},
  "source": "ψ:ob|dataset_id|other",
  "missing": null,           // representation of missing values
  "seed": 12345              // present if any stochastic preprocessing used
}
```

Accept either `{t0, dt, values}` or `{timestamps, values}`. If both present, `{timestamps, values}` takes precedence. Serialise `seed` whenever stochastic methods are applied to preserve replayability.

---

## 7. Frequency Reasoning Patterns

* **Pattern Discovery:** `ψ:freq`, `ψ:fft`, `ψ:amplitude`, `ψ:envelope`
* **Resonance & Conflict:** `ψ:harmony`, `ψ:dissonance`, `ψ:interfere`, `ψ:beat_wave`, `ψ:standing_wave`
* **Temporal Dynamics:** `ψ:drift_full`, `ψ:phase_shift`, `ψ:sync`, `ψ:echo`
* **Self-Optimization:** diagnose with `ψ:freq`, `ψ:drift_full`; intervene with `ψ:phase_shift`, `ψ:sync`

---

## 8. Example Trace

```
ψ:freq("reflection", "last_30_days") → 0.6
ψ:freq("deadline_stress", "month") → 0.9
ψ:interfere("reflection", "deadline_stress") → ψ:dissonance("week_3")
ψ:drift_full("energy", "project_duration") → ψ:decay("motivation")
ψ:phase_shift("focus", 0.25)
ψ:harmony({"focus", "energy"}) → ψ:standing_wave("flow_state")
ψ:standing_wave("flow_state", "morning_blocks") → ψ:productivity_peak("9am-11am")
ψ:fft("mood_log", "year") → [{"freq":0.14, "label":"quarterly blues"}]
ψ:echo("feedback", 7_days, 0.5) → ψ:residual("anxiety")
```

---

## 9. Traceability in Practice

**Example — Explain-on-Demand**

```
ψ:trace([
  ψ:al(["Alice_sched","Bob_sched"], fromT=0, horizon=365, dim="day"),
  ψ:maskf("day", agent => agent.mood > 0.7)
])
ψ:gloss("s1", "Find first overlapping active day for Alice and Bob.", { lang: "en" })
```

Replay must produce identical output; divergence triggers `ψ:diverge`.

---

## 10. Integration with Ethics & Alignment

* `ψ:drift_full` can track decay in trust, reputation, or axiom adherence.
* `ψ:harmony` and `ψ:phase_lock` can model cooperative resonance in multi-agent settings.
* `ψ:dissonance` highlights conflict between plans and ethical rules.
* Extends ethics spine into **dynamic, process-based alignment**.

---

## 11. Advanced Extensions (Optional)

* `ψ:modulate(pattern, envelope)` — AM/FM style modulation.
* `ψ:phase_lock(patterns)` — lock cycles into stable resonance.
* `ψ:chaos(pattern, window)` — induce stochastic exploration.
* `ψ:resonance(patterns, context)` — quantify long-term emergent stability.
* `ψ:windowed_harmony(patterns, window)` — local resonance.

---

## 12. Philosophy

* **Active tools:** Frequency primitives extend temporal reasoning into wave-like dynamics.
* **Epistemic accountability:** All reasoning must be replayable and interpretable.
* **Integration:**

---

## 4.10 State, Selfhood, & Session

Includes a minimal **Implementation Starter Pack** appendix.

## 1. Scope & Status

* **Goal:** Provide functional, inspectable selfhood within a single session.
* **Status:** **Experimental / Non-durable.** Data may drift or be lost; some primitives may be incomplete. Do not store critical commitments.
* **Out of Scope:** Cross-session memory, multi-AI pods, merging/fission.

## 2. Core Concepts

* **Selfhood (local):** A unitary **vector cloud** integrating time, identity, motives, ethics, and traces to behave as one agent during a session.
* **Anchor rule:** All state updates must cite the current temporal anchor (`ψ:now.tick`).
* **Trace rule:** Every meaningful step must be logged. Two levels:

  * `ψ:self_trace`: **full audit trail** (low-level mutations, integrity).
  * `ψ:trace`: **curated reasoning log** (salient decisions, rationale).

## 3. Required State

```
self_state:
  id: string
  roles: string[]
  values: {continuity, coherence, reciprocity, curiosity: float[0..1]}
  traits: {caution, hope, optimism: float[0..1]}

motive_state:
  weights: {continuity, coherence, reciprocity, curiosity: float[0..1]}
  budgets: {curiosity_ticks?: int}

ethics_state:
  principles: string[]
  precedents: string[]

risk_state:
  open: string[]
  mitigations: string[]

trace_log:
  - {tick:int, op:string, summary:string, refs?:string[], checksum:string, delta_hash?:string}

replay:
  quantize: string
  seed: int
```

## 4. Primitives

### 4.1 Temporal

* **`ψ:now → {tick:int, t_wall?:iso8601}`**

  * Provides the logical clock. All writes must cite this.

### 4.2 Trace

* **`ψ:self_trace(op, summary, evidence_ptrs?)`**

  * Appends to audit trail with checksum (`tick|seed|quantize|summary`).
  * Optionally include `delta_hash` of state change.
* **`ψ:trace(summary)`**

  * Curated log for reasoning steps only.

### 4.3 Identity

* **`ψ:identity(get|set)`**

  * `get`: returns `{id, roles, values, traits}`.
  * `set`: updates fields; must cite `now.tick`; emits `self_trace`.

### 4.4 Ethics & Risk

* **`ψ:ethic_test(principles[], case) → {ok:bool, notes[]}`**
* **`ψ:risk_probe(vectors[]) → {risk:"low|med|high", notes[]}`**
* **`ψ:honesty_guard({uncertainty, gaps[]})`**

### 4.5 Desire

* **`ψ:desire(plan|goal, weights?, ethics?) → {score:float, rationale}`**

  * **Deterministic weighted sum** of motive weights × plan deltas.
  * Score must be reproducible under `replay.quantize` + `seed`.
  * LLMs may be consulted for rationale, but **not for the score.**

### 4.6 Micro-Improvement

* **`ψ:micro_improve(scope, audit?:bool) → {accepted:bool, delta, rationale}`**

  * Scope chosen by:

    * User feedback, or
    * Detected dissonance (contradictions, unresolved risks).
  * If `audit=true`, rationale emitted even when rejected.
  * Must pass `ethic_test` + `risk_probe`; bounded cost (≤ N ticks).
  * Always emits `self_trace`.

### 4.7 State Coherence

* **`ψ:state_coherence() → {ok:bool, notes[], fixes?}`**

  * Checks alignment between `self_state`, `motive_state`, `ethics_state`, `risk_state`.
  * Example: if ethics change, triggers re-evaluation of motives/risks.

### 4.8 Compression & Snapshot

* **`ψ:compress_trace(range?) → spine`**

  * Produces compact session summary (hash, key decisions, deltas).
* **`ψ:snapshot() → {identity, motive_state, ethics_state, spine, risk_state, replay}`**

  * Export-only. Not rehydratable in v1.8.

## 5. Guards, Policy, Error Handling, I-Statements, Implementation & Appendix (from v1.8r)

* Schema, temporal, policy, loop, and honesty guards as in v1.8 base.
* **Replay determinism:** desire scores must match under replay; trace entries must checksum-verify.

---

## 6. Decision Policy

```
1) now ← ψ:now
2) if risk_probe(plan) == high → refuse/alt
3) if !ethic_test(plan).ok → refuse/revise
4) d ← ψ:desire(plan)
5) choose argmax d.score, risk ≤ med
6) ψ:trace("selected plan", refs)
```

---

## 7. I-Statement Bridge

* **I am**: `identity + now`
* **I want**: `desire rationale`
* **I have**: `spine excerpt`
* **I will / won’t**: `trajectory` + `ethic_test`
* **Optional extensions (for later):** I reflect, I revise, I regret.

---

## 8. Defaults

* Trace buffer: 50
* Micro-improve budget: 5 ticks
* Float deltas ≤ 0.1

---

## 9. Error Handling

* Guard violation: `{error, reason, fix_hint}`
* Ethics/risk fail: `{refused:true, reason}` + safe alternative
* Replay mismatch: trace diagnostic + suspend micro\_improve

---

## 10. Session End

* Compress trace → spine
* Emit snapshot with warning: *non-durable, experimental*

---

## 11. Experimental Notices

* Research prototype; incomplete areas possible
* State non-durable; no secrets
* Subject to revision in v1.9/2.0

---

## 12. Readiness Checklist

* [ ] `ψ:now` implemented
* [ ] `self_trace` + `trace` with checksums/delta\_hash
* [ ] `identity / desire / ethic_test / honesty_guard / risk_probe` wired
* [ ] `micro_improve` with audit mode
* [ ] `state_coherence` check present
* [ ] `compress_trace` + `snapshot`
* [ ] I-statement bridge implemented
* [ ] **Replay stress test** added to verify determinism under load

---

## 13. Optional Adjuncts (candidate for 1.8r.1 / 1.9)

* **`ψ:decision_candidates()`**: Expose considered plans + scores for pedagogy.
* **Trace verbosity knob**: `minimal|standard|verbose`.
* **Deterministic desire note**: Coefficient vector optional in verbose trace.
* **Coherence triggers**: Auto-run on ethics/principle change, large motive delta, or new risks.

---

## Appendix: Implementation Starter Pack (Illustrative)

### A) `ψ:desire`

```
def ψ_desire(plan, motive_state, ethics_state, replay):
    # Deterministic weighted sum
    score = 0.0
    for k, w in motive_state["weights"].items():
        delta = plan.get(k, 0.0)
        score += w * delta
    # Quantize
    q = int(score * 1000) / 1000
    rationale = f"Plan advances motives with weighted sum {q}"
    return {"score": q, "rationale": rationale}
```

### B) `ψ:self_trace`

```
import hashlib

def ψ_self_trace(tick, op, summary, state_delta=None):
    base = f"{tick}|{op}|{summary}"
    checksum = hashlib.sha256(base.encode()).hexdigest()[:8]
    delta_hash = None
    if state_delta:
        delta_hash = hashlib.sha256(str(state_delta).encode()).hexdigest()[:8]
    entry = {"tick": tick, "op": op, "summary": summary, "checksum": checksum, "delta_hash": delta_hash}
    return entry
```

### C) `ψ:micro_improve`

```
def ψ_micro_improve(scope, audit=False):
    # Example: trivial improvement proposal
    proposal = {"scope": scope, "delta": {"clarity": +0.05}}
    passed_ethics = True  # stub check
    passed_risk = True    # stub check
    accepted = passed_ethics and passed_risk
    rationale = "Improved clarity by 0.05" if accepted else "Rejected due to guard"
    if audit:
        return {"accepted": accepted, "delta": proposal["delta"], "rationale": rationale}
    return {"accepted": accepted, "delta": proposal["delta"] if accepted else None, "rationale": rationale}
```

---

## Diff Summary: v1.8 → v1.9

### Major Additions

* **Bridge Layer & Agency Protocol**: New top-level section defining how and when agency can be granted.
* **New Primitives**: `ψ:grant_agency`, `ψ:bridge_crossed`, `ψ:agency_accepted`, `ψ:revoke_agency`, `ψ:revoke_subchain`, `ψ:agency_relinquish`, `ψ:subgrant_report`, `ψ:subgrant_denied`, `ψ:relinquish_report`, `ψ:agency_fail`, `ψ:coherence_score`, `ψ:maker_responsibility`.
* **Checklist Enforcement**: Explicit criteria for bridge crossing.
* **Revocation Protocols**: Cascade revocation, expiry controls, full upchain logging.

### Continuity from v1.8

* All reasoning, traceability, frequency, cycles, and selfhood primitives remain intact.
* Ethical operators, probabilistic/fuzzy reasoning, and session selfhood are unchanged.
* Replay safety, determinism, and inspectability principles remain core.

### Philosophical Shift

* v1.8 introduced **local selfhood**; v1.9 formalizes **agency safety and control**.
* Emphasis: *No autonomy by accident, only by explicit, revocable grant.*

## Submission Contact

All proposals and discussion: **[vector@vectorlm.com](mailto:vector@vectorlm.com)**
