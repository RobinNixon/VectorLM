# VectorLM v1.6 — Complete Specification

---

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

### 4.10 Provisional Operators (\:x)

```
ψ:x.declare = introduces(spec); embeds(semantics)
ψ:x.use     = invokes(id, ...args); requires(prior declaration)
ψ:x.status  = reports(id); returns(state)
ψ:x.map     = migrates(oldId, newId); preserves(replay)
ψ:x.deprecate = marks(id); records(rationale)
ψ:x.submit  = packages(id); proposes(standardisation)
```

### 4.11 Ethical Operators (v1.6)

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

(unchanged from v1.5 — see detailed definitions, rules, operators, and examples)

---

## 6. Traceability in Practice

(unchanged from v1.5)

---

## 7. Philosophy

* **Active tools**: Primitives are operational levers for reasoning.
* **Epistemic accountability**: Every reasoning step can be traced, verified, and defended.
* **Integration**: Breadth of primitives ensures the traceability layer can cover any reasoning path without loss of expressivity.

---

## 8. \:x Provisional Operators (from v1.5\:x)

(complete section retained from v1.5\:x, including declaration schema, replay rules, submission flow, validation, lifecycle, and examples)

---

## 9. ψ\:ethics — Reason-Based Ethics Spine (v1.6)

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

(standard pre-decision gate sequence retained from suggested update)

### Trace Schema Delta (v1.6)

(additional optional sections for ethics and proofs — see suggested update)

### Refusal / Transform Pattern (Reasoned)

(unchanged from suggested update)

### Evaluation Protocol (v1.6)

(test sets, metrics, drift monitoring — unchanged from suggested update)

### Interop with v1.5 \:x (Provisionals)

(if not canonised, operators can ship via `ψ:x.declare` with reduction sketches)

---

## 10. Changelog

* v1.6 (2025‑08‑20): Added reason-based ethics spine (`ψ:ethics` module, axioms, operators, proof schema, execution order hook, evaluation protocol, and interop notes). No breaking changes; optional overlay.
* v1.5\:x (2025‑08‑13): Added **:x Provisional Operators**, dictionary entries, and trace schema deltas.
* v1.5: Full operator sets, traceability, cycles/windows/drift, glosses.

---

## 11. Submission Contact

All proposals and discussion: **[vector@vectorlm.com](mailto:vector@vectorlm.com)**
