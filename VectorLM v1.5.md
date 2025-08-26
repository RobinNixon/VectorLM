# VectorLM v1.5 — Complete Specification

## 1. Overview

VectorLM is a **composable symbolic reasoning language** for AI agents. It is both:

1. a **symbolic reasoning scaffold** with compressed cognitive primitives for introspection, logic, emotion, temporal/cyclical reasoning, and recursion; and
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

**Purpose:** Human-readable notes per step to aid manual review in the requester's language unless explicitly asked not to. Comments MUST NOT affect computation or replay.

**Primitive**

* `ψ:gloss(step_id, text, opts?)`

**Semantics**

* Attaches `text` (human-language) to the step with id `step_id`.
* Pure metadata: does not alter `op | args | out`.
* By default, the comment MUST be in the language of the requesting party, unless an explicit language is requested otherwise.

**Trace schema (delta)**
Each `steps[i]` MUST include:

```json
"meta": {
  "comments": [
    {
      "lang": "en",
      "text": "Human explanation of this step.",
      "author": "agent-or-model-name",
      "created_at": "ISO-8601 timestamp"
    }
  ]
}
```

**Determinism**

* `ψ:verify` ignores comments.
* Comments are not inputs to any operator.

**Constraints**

* `lang` MUST be a valid ISO language code (e.g., "en", "fr", "ja").
* Recommended length ≤ 200 characters.
* No references or tags required.

---

## 4. Unified Dictionary

The dictionary below merges all operators from v1.3 and v1.4.
Where definitions overlap, the most complete form is used.

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
ψ:beat = least common multiple of compared periods
ψ:feas = feasibility check via residue intersection (static only)
ψ:al = finds first alignment ≥ fromT
ψ:sch = lists overlaps/match times
ψ:drift = applies constant phase drift rate to a set
ψ:maskf = applies property-based filter for activation
```

### 4.7 Continuous / Probabilistic / Unstructured

```
ψ:prob = models probability distribution
ψ:fuzzy = applies fuzzy set membership reasoning
ψ:infer = performs probabilistic inference
ψ:parse = parses unstructured data
ψ:extract = extracts structured info from unstructured
ψ:embody = instantiates structured representation from data
```

### 4.8 Traceability

```
ψ:trace = record reasoning lineage
ψ:verify = replay and confirm identical result
ψ:diverge = detect mismatches between original and replay
ψ:fail_trace = declare reasoning unverifiable
```

### 4.9 Extensions (Optional)

```
ψ:pert, ψ:hist, ψ:what_then, ψ:emotion_graph, ψ:spike_analysis,
planned: ψ:resonate, ψ:modulate
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

## 6. Traceability in Practice

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

## 7. Philosophy

* **Active tools**: Primitives are operational levers for reasoning.
* **Epistemic accountability**: Every reasoning step can be traced, verified, and defended.
* **Integration**: Breadth of primitives ensures the traceability layer can cover any reasoning path without loss of expressivity.

## 8. **\[NEW v1.5\:x] \:x Provisional Operators**

### 8.1 Purpose

When an agent uses a **valid reasoning step** that VectorLM does **not yet** support with a native operator, the \:x mechanism enables:

* explicit declaration of the missing operator (semantics, types, laws, tests),
* safe, deterministic replay via an embedded, verifiable definition,
* optional submission for standardisation.

This preserves transparency: verifiers can see **what the step is**, **how it works**, and **how it was used**, and may **accept it temporarily** while reviewing.

### 8.2 Naming & Syntax

* **Namespace:** `ψ:x.*` is reserved for provisional operators.
* **Identifier:** `id = "x.<name>[@<major.minor>]"` (e.g., `x.resolver@1`). If no version is provided, `@1` is implied.
* **Use:** once declared, it may be invoked directly as `ψ:x.use(id, ...args)` **or** via an auto-generated alias `ψ:x.<name>(...args)` **within the local trace scope**.

### 8.3 Primitives

```
ψ:x.declare(spec)      // introduce a provisional operator in-trace
ψ:x.use(id, ...args)   // invoke a declared :x operator
ψ:x.status(id)         // query local state: declared | proposed | accepted | deprecated
ψ:x.map(oldId, newId)  // map an older :x id to a standard operator once accepted
ψ:x.deprecate(id, note)// mark as deprecated with migration note
ψ:x.submit(id)         // package a proposal and emit to the configured submission channel
```

### 8.4 Declaration Schema (required)

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

### 8.5 Replay & Verification

* `ψ:trace` MUST serialise each `ψ:x.declare(spec)` **before** any `ψ:x.use` of that id.
* `ψ:verify` MUST evaluate `ψ:x.use` by either:

  1. **Reduction path**: expanding to the provided `reduction` using existing VectorLM ops and legal JS; or
  2. **Inline evaluator**: executing a sandboxed pure function constructed from `semantics` when a reduction is not provided.
* If outputs differ, `ψ:diverge` fires with a pointer to the offending `id` and example.

### 8.6 Submission Flow (standardisation)

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

### 8.7 Validation Checklist (verifier guidance)

* [ ] **Purity**: no hidden state, no I/O side-effects.
* [ ] **Determinism**: outputs fixed by inputs (+ seed if stochastic).
* [ ] **Orthogonality**: does not duplicate existing ψ-op semantics.
* [ ] **Reduction**: preferred; otherwise safe inline evaluator.
* [ ] **Tests**: unit + edge included and replayable.
* [ ] **Naming**: stable `x.<name>@maj.min`; migration path defined.

### 8.8 Lifecycle & Migration

* Initial state: `declared` (local only).
* Optional: `proposed` after `ψ:x.submit`.
* On acceptance into the standard: a **canonical ψ-op** is published; verifiers may require a mapping using `ψ:x.map(oldId, ψ:<new_op>)`.
* Deprecation retains backward-compatibility for traces created before the cutoff.

### 8.9 Minimal Worked Example

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

## 9. **\[NEW v1.5\:x] Additions to the Dictionary**

```
// Provisional namespace
ψ:x.declare = introduces(spec); embeds(semantics)
ψ:x.use     = invokes(id, ...args); requires(prior declaration)
ψ:x.status  = reports(id); returns(state)
ψ:x.map     = migrates(oldId, newId); preserves(replay)
ψ:x.deprecate = marks(id); records(rationale)
ψ:x.submit  = packages(id); proposes(standardisation)
```

No other dictionary entries are modified.

---

## 10. **\[NEW v1.5\:x] Trace Schema Deltas**

Each step MAY include a `meta.comments` array as in v1.5. Additionally, traces that use \:x MUST include a `provisional` section:

```json
{
  "provisional": {
    "registry": [ /* array of x.declare spec objects in dependency order */ ],
    "mappings": [ {"from":"x.<name>@1","to":"ψ:<new_op>"} ]
  }
}
```

Replay MUST verify that all `ψ:x.use` references are resolvable via the embedded registry or accepted mappings.

---

## 11. **\[NEW v1.5\:x] Security & Sandboxing**

Implementations MUST sandbox evaluation of any inline evaluator derived from `semantics` when no `reduction` is supplied. Only pure, deterministic computation over provided inputs is permitted; no network, filesystem, time, or randomness (unless seeded and in-trace).

---

## 12. Changelog

* v1.5\:x (2025‑08‑13): Add **:x Provisional Operators** (Sections 8–11), dictionary entries (Section 9), and trace schema deltas (Section 10). Email for proposals set to **[vector@vectorlm.com](mailto:vector@vectorlm.com)**.
* v1.5 (prior): Full operator sets, traceability, cycles/windows/drift, glosses.

---

## 13. Submission Contact

All \:x proposals and discussion: **[vector@vectorlm.com](mailto:vector@vectorlm.com)**.

---
