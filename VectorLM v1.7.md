# VectorLM v1.7 — Complete Specification (Fully Self‑Contained)

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

This section lists all primitives, merged and refactored from v1.3 → v1.7.

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

### 4.7 Frequency Layer (v1.7)

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

```js
ψ:pv({ epoch: int, dims: [ { name: string, period: int, phase: int, window: [[int,int], ...] } ]})
ψ:ps({ id: string, universe: string, pv: pvObject, rule: "all" | "mask", props?: object })
ψ:drift_phase(id: string, dim: string, rate: number) // Applies constant drift rate δ, δ ≠ 1
ψ:maskf(dim: string, fn: (element) => any) // Property-based activation filter
```

**Operators**

```js
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

## 6. Trace Schema Delta (v1.7)

Frequency-layer operators may return structured objects:

```json
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

```json
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

## 8. Example Trace (v1.7)

```plaintext
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

```js
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

## Appendix A: v1.6 → v1.7 Diff Summary

### Added (new in v1.7)

* **Frequency Layer primitives:**

  * `ψ:freq` — measures recurrence
  * `ψ:wave` — wave representation (freq, amp, phase, shape)
  * `ψ:interfere` — interference between patterns
  * `ψ:harmony` — resonance among patterns
  * `ψ:dissonance` — phase conflict detection
  * `ψ:standing_wave` — persistent motifs/traits
  * `ψ:beat_wave` — low-frequency beats from interference
  * `ψ:drift_full` — drift in freq/amp/phase
  * `ψ:phase_shift` — symbolic phase realignment
  * `ψ:sync` — cycle synchronization
  * `ψ:fft` — symbolic/numeric frequency analysis
  * `ψ:amplitude` — strength of a pattern
  * `ψ:envelope` — modulation/trend detection
  * `ψ:echo` — decaying recurrence
* **Support primitive:**

  * `ψ:model_fit` — infers parameters for frequency operators.

### Renamed / Split

* `ψ:beat` → `ψ:beat_lcm` (kept narrow mathematical definition).
* New `ψ:beat_wave` introduced for interference beats.
* `ψ:drift` → split into:

  * `ψ:drift_phase` (original, constant phase drift).
  * `ψ:drift_full` (extended, drift across freq/amp/phase).

### Refactored / Consolidated

* Frequency reasoning schema and replay rules formalized.
* Trace Schema Delta extended to support frequency outputs with stable symbolic labels.
* Ethics integration updated: `ψ:drift_full`, `ψ:harmony`, `ψ:dissonance` tied into dynamic alignment monitoring.
* Removed duplicate or inconsistent sections carried over from earlier merges.

### Removed

* No primitives were deleted outright. All v1.6 content preserved, with only renames/splits applied.

---

**Summary:** v1.7 extends VectorLM beyond discrete cycles into continuous, oscillatory, and emergent reasoning. It introduces a full Frequency Layer, while preserving backward compatibility by renaming or splitting overlapping primitives.

## Submission Contact

All proposals and discussion: **[vector@vectorlm.com](mailto:vector@vectorlm.com)**
