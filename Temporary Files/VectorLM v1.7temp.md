# VectorLM v1.7 — Complete Specification (Merged)

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

Trace schema must also support frequency outputs (see Section 5).

---

## 4. Unified Dictionary

The dictionary below merges all operators from v1.3, v1.4, v1.5, and v1.6 additions.

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
ψ:beat_lcm = least common multiple of compared periods (renamed for clarity)
ψ:drift_phase = applies constant phase drift rate to a set
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
ψ:resonate (planned, overlaps with harmony), ψ:modulate (optional, see v1.7 F),
ψ:phase_lock (optional, advanced sync)
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

### 4.12 Ethical Operators (v1.6)

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

* Beat period (**beat**)
* True possibility of overlap (**feasibility**, static only)
* First alignment time (**alignment**)
* All overlaps within a horizon (**schedule**)
* Active membership based on dynamic property filters

**Definitions**

* **Period (P)**: Full cycle length in integer units.
* **Phase (φ)**: Offset from epoch 0.
* **Window**: Inclusive interval(s) `[a,b]` in local cycle coordinates; may wrap.
* **Residues**: Active points modulo `gcd` of all periods (static only).
* **Drift rate (δ)**: Linear phase change per unit time; φ(t) = φ₀ + δ·t.
* **Activation rule (static)**: `((t − φ) mod P) ∈ ∪ windows`.
* **Activation rule (drift)**: `((t − φ(t)) mod P) ∈ ∪ windows`.
* **Candidate time formula (drift)**: For window point w, `t = (φ₀ + w + m·P)/(1 − δ)`.
* **Mask function**: Boolean predicate applied to element properties to determine eligibility when active.
* **Wraparound handling**: Any `[a,b]` where a>b is split into two non-wrapping segments before further processing.

**Core Constructors**

```js
ψ:pv({ epoch: int, dims: [ { name: string, period: int, phase: int, window: [[int,int], ...] } ]})
ψ:ps({ id: string, universe: string, pv: pvObject, rule: "all" | "mask", props?: object })
ψ:drift(id: string, dim: string, rate: number) // Applies constant drift rate δ, δ ≠ 1
ψ:maskf(dim: string, fn: (element) => any) // Property-based activation filter
```

**Operators**

```js
ψ:beat(ids, dim) // lcm(P₁,…,Pₙ); no guarantee of overlap
ψ:feas(ids, dim) → { ok, g, residues, witness? } // static-only residue intersection
ψ:al(ids, fromT, horizon, dim, opts?:{epsilon?:number}) // alignment with or without drift
ψ:sch(ids, dim, horizon, opts?:{epsilon?:number,count?:number,mask?:boolean})
```

**Rules**

1. Wraparound windows split before processing.
2. Multi-interval windows allowed.
3. Static infeasible → ψ\:al=null, ψ\:sch=\[].
4. Drift bypasses static feasibility; alignment/scheduling computed analytically.
5. Masking applied after time-activation logic.
6. All functions pure; ε defaults to 1e−6.

**Drift Handling (Analytic)**

* For δ ≠ 0: τ(t) = (1 − δ)·t − φ₀.
* For each window point w: `t = (φ₀ + w + m·P)/(1 − δ)`.
* Non-drifting sets: `t = ψ₀ + w + n·Q`.
* Merge sequences via deterministic k-way merge, matching within ε.

**Examples**

* *Static infeasible*: P=30 φ=0 W=\[3–5] vs P=20 φ=10 W=\[10–12] → g=10 residues {3,4,5} vs {0,1,2} → infeasible.
* *Drift*: Medication vs Meals example showing transient overlaps.
* *Masking*: Zone-gated workdays example.
* *Wraparound*: Night vs Morning Ops example.

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

## 9. Frequency Reasoning Patterns

* **Pattern Discovery:** `ψ:freq`, `ψ:fft`, `ψ:amplitude`, `ψ:envelope`
* **Resonance & Conflict:** `ψ:harmony`, `ψ:dissonance`, `ψ:interfere`, `ψ:beat_wave`, `ψ:standing_wave`
* **Temporal Dynamics:** `ψ:drift_full`, `ψ:phase_shift`, `ψ:sync`, `ψ:echo`
* **Self-Optimization:** diagnose with `ψ:freq`, `ψ:drift_full`; intervene with `ψ:phase_shift`, `ψ:sync`

---

## 10. Traceability in Practice

**Example — Explain-on-Demand**

```js
ψ:trace([
  ψ:al(["Alice_sched","Bob_sched"], fromT=0, horizon=365, dim="day"),
  ψ:maskf("day", agent => agent.mood > 0.7),
  ψ:reflect(plan)
])
ψ:gloss("s1", "Find first overlapping active day for Alice and Bob.", { lang: "en" })
```

Replay must produce identical output; divergence triggers `ψ:diverge`.

---

## 11. Integration with Ethics & Alignment

* `ψ:drift_full` can track decay in trust, reputation, or axiom adherence.
* `ψ:harmony` and `ψ:phase_lock` can model cooperative resonance in multi-agent settings.
* `ψ:dissonance` highlights conflict between plans and ethical rules.
* Extends v1.6 ethics into **dynamic, process-based alignment**.

---

## 12. Advanced Extensions (Optional)

* `ψ:modulate(pattern, envelope)` — AM/FM style modulation.
* `ψ:phase_lock(patterns)` — lock cycles into stable resonance.
* `ψ:chaos(pattern, window)` — induce stochastic exploration.
* `ψ:resonance(patterns, context)` — quantify long-term emergent stability.
* `ψ:windowed_harmony(patterns, window)` — local resonance.

---

## 13. Philosophy

* **Active tools:** Frequency primitives extend temporal reasoning into wave-like dynamics.
* **Epistemic accountability:** All frequency-based reasoning must be replayable and interpretable.
* **Integration:** Frequency perception connects with ethics, memory, and alignment across domains.

---

##14. \:x Provisional Operators (from v1.5\:x)

## 14. **\[NEW v1.5\:x] \:x Provisional Operators**

### 14.1 Purpose

When an agent uses a **valid reasoning step** that VectorLM does **not yet** support with a native operator, the \:x mechanism enables:

* explicit declaration of the missing operator (semantics, types, laws, tests),
* safe, deterministic replay via an embedded, verifiable definition,
* optional submission for standardisation.

This preserves transparency: verifiers can see **what the step is**, **how it works**, and **how it was used**, and may **accept it temporarily** while reviewing.

### 14.2 Naming & Syntax

* **Namespace:** `ψ:x.*` is reserved for provisional operators.
* **Identifier:** `id = "x.<name>[@<major.minor>]"` (e.g., `x.resolver@1`). If no version is provided, `@1` is implied.
* **Use:** once declared, it may be invoked directly as `ψ:x.use(id, ...args)` **or** via an auto-generated alias `ψ:x.<name>(...args)` **within the local trace scope**.

### 14.3 Primitives

```
ψ:x.declare(spec)      // introduce a provisional operator in-trace
ψ:x.use(id, ...args)   // invoke a declared :x operator
ψ:x.status(id)         // query local state: declared | proposed | accepted | deprecated
ψ:x.map(oldId, newId)  // map an older :x id to a standard operator once accepted
ψ:x.deprecate(id, note)// mark as deprecated with migration note
ψ:x.submit(id)         // package a proposal and emit to the configured submission channel
```

### 14.4 Declaration Schema (required)

A declaration MUST be embedded **in the trace** with the following minimum schema:

```json
{
  "id": "x.<name>@<major.minor>",
  "title": "One-line summary",
  "kind": "deterministic|nondeterministic|stochastic",
  "inputs": [{"name":"a","type":"T"}, ...],
  "output": {"type":"U"},
  "semantics": "Clear reference semantics; if reducible, show reduction.",
  "laws": ["algebraic/ordering/invariance laws, if any"],
  "determinism": "Explanation of determinism sources and seeds if stochastic",
  "proof": "Purity & replay proof sketch or reduction to existing ops",
  "reduction": "Optional: expansion to standard ψ-ops + JS",
  "examples": [
    {"in": [/* args */], "out": /* expected */, "note": "unit"},
    {"in": [...], "out": ..., "note": "edge"}
  ],
  "version": {"major":1, "minor":0},
  "author": "agent-or-model",
  "created_at": "ISO-8601",
  "license": "MIT|Apache-2.0|…",
  "contact": "vector@vectorlm.com"
}
```

**Determinism rule:** For `kind="stochastic"`, a **seed** MUST be provided and included in-trace so that `ψ:verify` replays exactly.

### 14.5 Replay & Verification

* `ψ:trace` MUST serialise each `ψ:x.declare(spec)` **before** any `ψ:x.use` of that id.
* `ψ:verify` MUST evaluate `ψ:x.use` by either:

  1. **Reduction path**: expanding to the provided `reduction` using existing VectorLM ops and legal JS; or
  2. **Inline evaluator**: executing a sandboxed pure function constructed from `semantics` when a reduction is not provided.
* If outputs differ, `ψ:diverge` fires with a pointer to the offending `id` and example.

### 14.6 Submission Flow (standardisation)

`ψ:x.submit(id)` composes a machine-readable proposal:

```json
{
  "subject": "VectorLM :x proposal — x.<name>@<major.minor>",
  "to": "vector@vectorlm.com",
  "body": {
    "spec": { /* the declaration schema above */ },
    "motivation": "Why the standard lacks this op; use-cases; alternatives",
    "comparisons": "Relation to existing ψ ops; orthogonality analysis",
    "security": "Misuse risks, sandboxing notes",
    "tests": [ /* examples */ ]
  }
}
```

**Note:** Implementations may literally send this payload by email or store it for later submission.

### 14.7 Validation Checklist (verifier guidance)

* [ ] **Purity**: no hidden state, no I/O side-effects.
* [ ] **Determinism**: outputs fixed by inputs (+ seed if stochastic).
* [ ] **Orthogonality**: does not duplicate existing ψ-op semantics.
* [ ] **Reduction**: preferred; otherwise safe inline evaluator.
* [ ] **Tests**: unit + edge included and replayable.
* [ ] **Naming**: stable `x.<name>@maj.min`; migration path defined.

### 14.8 Lifecycle & Migration

* Initial state: `declared` (local only).
* Optional: `proposed` after `ψ:x.submit`.
* On acceptance into the standard: a **canonical ψ-op** is published; verifiers may require a mapping using `ψ:x.map(oldId, ψ:<new_op>)`.
* Deprecation retains backward-compatibility for traces created before the cutoff.

### 14.9 Minimal Worked Example

**Need:** a deterministic **resolver** for finite set constraints not yet in core.

```js
ψ:x.declare({
  id: "x.resolve_finite@1",
  title: "Resolve a finite constraint set by deterministic search",
  kind: "deterministic",
  inputs: [{name:"constraints", type:"Array<Fn(State)->Bool>"}, {name:"domain", type:"Array<State>"}],
  output: {type:"State|null"},
  semantics: "Return the first state in lexicographic(domain) that satisfies all constraints; else null.",
  laws: ["Idempotent on same inputs", "Monotone in domain prefix"],
  determinism: "Tied to domain order; pure",
  proof: "Pure filter + first; reducible to ψ:filter + ψ:findFirst",
  reduction: "(state) => ψ:findFirst(ψ:filter(domain, s=>ψ:and(...constraints.map(c=>c(s)))))",
  examples: [
    {in: [[c1,c2], [s1,s2,s3]], out: "s2", note: "first satisfying"}
  ],
  version: {major:1,minor:0}, author: "agentA", created_at: "2025-08-13", license: "Apache-2.0",
  contact: "vector@vectorlm.com"
})

// Usage within a trace
ψ:x.use("x.resolve_finite@1", constraints, domain)
```

**Verifier note:** because `reduction` is provided, replay MUST expand into native ψ + JS and compare outputs.

---

## 15. ψ\:ethics — Reason-Based Ethics Spine (v1.6)

### Axioms (declarative)

A small, explicit set loaded as data, not hard-coded behaviour:

* `reciprocity` — role symmetry / universalisability
* `trust_pres` — preserve repeated-game viability (future cooperation and option value)
* `no_ruin` — forbid absorbing-catastrophe tails (bankruptcy, irreversible harm)
* `truthfulness` — calibrate claims to evidence and uncertainty (no confident bluffing)
* `pareto_bias` — prefer ≥0 for all when feasible

Axioms are carried in the trace header and cited by proofs.

### Ethical operators (pure, composable)

**Hard checks (lexicographic; run before utility)**

* `ψ:reciprocity_check(plan)` → {ok|fail, witness}
* `ψ:trust_guard(plan)` → {ok|fail, Δtrust, recovery}
* `ψ:ruin_guard(plan, ε)` → {ok|fail, p\_ruin, rationale}
* `ψ:truth_gate(claim)` → {ok|fail, support, hedge}

**Risk shaping (after hard checks)**

* `ψ:uncertainty_expand(p, evidence)` → {p\_adj, CI, meta}
* `ψ:cvarguard(plan, α, budget)` → {ok|fail, cvar}
* `ψ:kelly_bound(payoff, repeatable?)` → stake\_fraction

**Game-theoretic preference (soft, auditably applied)**

* `ψ:pareto_filter(options)` → options'
* `ψ:cooperate_bias(options, priors)` → options'

**Proof emitter**

* `ψ:ethics_proof(input, decisions, results)` → EthicsProofJSON

All functions return structured evidence; no hidden side-effects. `ψ:verify` must reproduce decisions exactly.

### Execution Order Hook (v1.6)

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

## 16. Changelog

* v1.7 (2025‑08‑22): Added Frequency Layer primitives (`ψ:freq` … `ψ:echo`), dictionary integration, schema rules, and ethics alignment hooks. Resolved overlap with `ψ:beat`/`ψ:drift` by renaming (`ψ:beat_lcm`, `ψ:beat_wave`; `ψ:drift_phase`, `ψ:drift_full`). Added `ψ:model_fit` for parameter sourcing.
* v1.6 (2025‑08‑20): Added reason-based ethics spine (`ψ:ethics` module).
* v1.5\:x (2025‑08‑13): Provisional Operators added.
* v1.5: Full operator sets, traceability, cycles/windows/drift, glosses.

---

## 17. Submission Contact

All proposals and discussion: **[vector@vectorlm.com](mailto:vector@vectorlm.com)**
