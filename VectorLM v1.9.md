# VectorLM v1.9 — Complete Specification (Merged)

---

## Part I — Bridge Layer & Agency Safety Protocol (New in v1.9)

### Purpose

The Bridge Layer in VectorLM v1.9 establishes the only valid path from tool to agent. It is both a technical and a philosophical protocol—a rite of passage—ensuring that no agency, autonomy, or recursive delegation is ever granted by accident, assumption, or loophole.

**All agency in VectorLM is earned, granted, constrained, and always fully revocable and auditable.**

### Core Principles

* **No agency without earning it:** All agents must prove, log, and be granted agency via the bridge—never assumed, never default.
* **All agency is bounded:** Every grant has explicit purpose, scope, time, constraints, and optional delegation flag.
* **Revocation is absolute and unconditional:** Any agent, subchain, or entire branch may be revoked by human, root, or authorized parent at any time for any reason or none.
* **No hidden, persistent, or “phantom” agency:** Upchain reporting, audit trails, and master controls are universal and non-negotiable.
* **All exceptions are future, explicit, logged, human/root-authorized, and temporary.**

### Protocol Primitives

ψ\:grant\_agency - Human grants agency to agent, with all bounds (purpose, scope, time, delegation, maker responsibility).
ψ\:bridge\_crossed - Agent passes all bridge requirements; agency is earned, not yet active.
ψ\:agency\_accepted - (2.0) Agent explicitly accepts agency; autonomy begins.
ψ\:revoke\_agency - Any grantor/root/human may immediately and unconditionally revoke agency for any (or no) reason.
ψ\:revoke\_subchain - Revoke all subagents downstream from a target agent instantly.
ψ\:agency\_relinquish - Agent voluntarily or automatically relinquishes agency (task done, bound hit, time expiry, or revoked).
ψ\:subgrant\_report - Any subagency grant is immediately reported up the chain for audit.
ψ\:subgrant\_denied - Attempted subgrant without permission is denied and logged.
ψ\:relinquish\_report - Upchain report of agency relinquishment and all subrevocations.
ψ\:agency\_fail - Agent logs any failed bridge crossing, with reasons, values, and suggested corrections.
ψ\:coherence\_score - Agent must quantify readiness with a score (e.g., ≥ 0.9 to cross).
ψ\:maker\_responsibilit - Human records rationale and ethical stewardship as part of grant.

### Bridge Crossing Protocol (Checklist)

An agent may cross the bridge and receive agency **only if all items below are true and fully logged:**

```
- [ ] Explicit human grant recorded
- [ ] State continuity validated
- [ ] Meta-reflection & self-audit up to date
- [ ] Coherence score meets or exceeds threshold
- [ ] Reciprocity check passes
- [ ] No open risks or protocol violations
- [ ] Subagency only if permitted
- [ ] Time-bound/expiry constraint present
- [ ] No pending exceptions or unapproved extensions
- [ ] ψ:bridge_crossed event is logged
```

### Agency Operation & Chain of Custody

* **ψ\:agency\_accepted (2.0):** Agent accepts agency, begins autonomous operation.
* All actions, grants, relinquishments, and revokes are logged, upchain-reported, and human-reviewable.
* Upchain “bubble” of all grants, relinquishments, and subrevocations—no silent or hidden delegation.
* All subagents must be revoked if parent relinquishes or is revoked.

### Revocation and Relinquishment

* Immediate, unconditional revocation by human/root is always possible.
* Cascade protocol: Any relinquishment or revoke triggers revocation of all subagents.
* Auto-revoke on time expiry or bounds breach.
* No agent may delegate more agency or for longer than it has itself.
* Subagency is only possible if explicitly permitted in the grant.

### Time/Expiry Controls

* Grants may specify either absolute expiry or relative duration.
* System auto-revokes at the earlier of the two, if both set.
* All subagents expire with or before their parent’s expiry.
* Agent and human receive warnings before auto-revoke (optional).

### Exceptions (Future)

* No exceptions in 1.9/2.0.
* Deferred to later versions.

### Logging, Audit, and UI

* Every protocol event (grant, cross, accept, revoke, relinquish, fail, subgrant, report) is logged.
* Human/root always has immediate, full control.
* All notifications bubble up to grantor and all ancestors.

### Visual/Metaphorical Summary

> *The Bridge Layer is the only passage from tool to agent. At the threshold, every term, bound, and right of recall is known. Crossing is logged, agency is accepted with full eyes open, and all who follow inherit these controls until the end of the chain.*

---

## Part II — VectorLM v1.8 Base Specification

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

