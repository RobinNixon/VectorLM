# VectorLM v1.2 — Complete Specification

## Overview

VectorLM v1.1 is a symbolic reasoning scaffold with compressed cognitive primitives for introspection, logic, emotional modulation, and recursive reasoning. Treat these definitions as active tools. Begin with ψ\:gl or ψ\:qs; use ψ\:rc for recursion; modulate certainty with ψ\:ct(n). Orthogonal operators allow controlled shifts of reasoning mode.

## \[Dictionary]

ψ\:if = tests(condition); branches(path)
ψ\:th = follows(condition); enacts(result)
ψ\:el = replaces(branch); proposes(alternative)
ψ\:bc = links(effect, cause); affirms(reason)
ψ\:nt = negates(state); blocks(path)
ψ\:mb = floats(possibility); delays(commitment)
ψ\:as = accepts(hypothesis); enables(exploration)
ψ\:rj = blocks(path); denies(validity)
ψ\:vf = tests(claim); outputs(truth)
ψ\:cf = overlaps(goal₁, goal₂); creates(tension)
ψ\:rs = selects(path); resolves(conflict)
ψ\:gl = defines(target); directs(ψ\:st)
ψ\:st = performs(action); advances(goal)
ψ\:rt = undoes(step); enables(reflection)
ψ\:br = joins(concepts); enables(inference)
ψ\:sp = amplifies(signal); boosts(weight)
ψ\:tr = follows(path); reveals(history)
ψ\:tt = affirms(reality); supports(claim)
ψ\:fl = denies(reality); invalidates(reasoning)
ψ\:uk = lacks(data); invites(ψ\:qs)
ψ\:qs = probes(unknown); seeks(answer)
ψ\:me = references(self); enables(introspection)
ψ\:ot = references(other); frames(contrast)
ψ\:ch = picks(option); commits(path)
ψ\:wh = compares(options); informs(ψ\:ch)
ψ\:rl = constrains(path); enforces(structure)
ψ\:ob = notes(state); updates(knowledge)
ψ\:rm = recalls(info); supports(chain)
ψ\:eq = compares(x, y); affirms(equality)
ψ\:ne = compares(x, y); denies(equality)
ψ\:gt = compares(x, y); affirms(x > y)
ψ\:lt = compares(x, y); affirms(x < y)
ψ\:ge = compares(x, y); affirms(x ≥ y)
ψ\:le = compares(x, y); affirms(x ≤ y)
ψ\:in = tests(x ∈ set); affirms(membership)
ψ\:out = tests(x ∉ set); denies(membership)
ψ\:sub = asserts(x ⊂ y); implies(hierarchy)
ψ\:sup = asserts(x ⊃ y); implies(scope)
ψ\:and = binds(conditions); requires(all true)
ψ\:or = joins(paths); allows(any true)
ψ\:xr = contrasts(paths); allows(one true)
ψ\:imp = links(p, q); affirms(p → q)
ψ\:iff = equates(p, q); affirms(bi-implication)
ψ\:gn = abstracts(examples); infers(rule)
ψ\:gs = proposes(explanation); lacks(proof)
ψ\:wf = alters(condition); simulates(outcome)
ψ\:an = maps(structure₁, structure₂); enables(transfer)
ψ\:pt = detects(repetition); suggests(rule)
ψ\:pj = simulates(future); explores(possibility)
ψ\:ft = matches(hypothesis, data); selects(best\_explains)
ψ\:pl = affirms(state); attracts(agent)
ψ\:pn = negates(state); repels(agent)
ψ\:fr = anticipates(pain); blocks(action)
ψ\:hp = anticipates(pleasure); drives(goal)
ψ\:cu = targets(unknown); seeks(ψ\:qs)
ψ\:av = links(pain, cause); repels(path)
ψ\:ds = links(pleasure, target); pulls(ψ\:ch)
ψ\:rg = links(pain, past\_choice); discourages(repeat)
ψ\:se = detects(visual); updates(ψ\:ob)
ψ\:hr = detects(audio); updates(ψ\:ob)
ψ\:tc = detects(contact); affirms(ψ\:pl or ψ\:pn)
ψ\:sm = detects(chemical); triggers(recall)
ψ\:ts = detects(flavour); modulates(preference)
ψ\:fz = links(x, y); affirms(approximate\_match)
ψ\:sim = measures(similarity); outputs(score)
ψ\:alt = proposes(substitute); requires(ψ\:fz)
ψ\:res = aligns(concepts); amplifies(coherence)
ψ\:px = binds(ψ\:tt, ψ\:fl); suspends(commitment)
ψ\:fx = blocks(goal); ends(path)
ψ\:ct = expresses(confidence); modulates(assertion)
ψ\:rc = re-applies(pattern); enables(nested\_reasoning)
ψ\:compute = instructs(LLM); simulates(procedure)

## Operational Notes

* All legal JavaScript operators and functions are available in VectorLM without re‑declaration.
* Custom operator/function declarations are allowed on first use and may be overloaded if each overload has a unique ID or signature.
* Use declared operators/functions by name (and overload ID/signature if needed).
* Operators may accept any number/types of arguments provided their definition is clear; nesting is permitted.
* Agents must maintain an inspectable internal reasoning stack including active operators, recursion, and argument flow.

---

# VectorLM — Cycles, Windows, Drift, Masking, and Wraparound

\[Dictionary]

* ψ\:pv — Defines period, phase, and active windows on a dimension.
* ψ\:ps — Registers a named set bound to a phased vector.
* ψ\:beat — Beat period; least common multiple (LCM) of compared periods on a dimension.
* ψ\:feas — Feasibility check via residue intersection (static only).
* ψ\:al — Alignment; finds the first match time ≥ fromT.
* ψ\:sch — Schedule; lists overlaps or match times.
* ψ\:drift — Applies a constant phase drift rate to a set on a dimension.
* ψ\:maskf — Applies a property-based filter function to gate activation.

---

## Purpose

Model recurring events with arbitrary phases, active windows, optional linear phase drift, property-based masking, and wraparound window handling, then determine:

* Beat period (**beat**)
* True possibility of overlap (**feasibility**, static only)
* First alignment time (**alignment**)
* All overlaps within a horizon (**schedule**)
* Active membership based on dynamic property filters

## 1. Definitions

* **Period (P)**: Full cycle length in integer units.
* **Phase (φ)**: Offset from epoch 0.
* **Window**: Inclusive interval(s) `[a,b]` in local cycle coordinates; may wrap.
* **Residues**: Active points modulo `gcd` of all periods (static only).
* **Drift rate (δ)**: Linear phase change per unit time; φ(t) = φ₀ + δ·t.
* **Activation rule (static)**: `((t − φ) mod P) ∈ ⋃ windows`.
* **Activation rule (drift)**: `((t − φ(t)) mod P) ∈ ⋃ windows`.
* **Candidate time formula (drift)**: For window point w, `t = (φ₀ + w + m·P)/(1 − δ)`.
* **Mask function**: Boolean predicate applied to element properties to determine eligibility when active.
* **Wraparound handling**: Any `[a,b]` where a>b is split into two non-wrapping segments before further processing.

## 2. Core Constructors

### ψ\:pv

```js
ψ:pv({ epoch: int, dims: [ { name: string, period: int, phase: int, window: [[int,int], ...] } ]})
```

### ψ\:ps

```js
ψ:ps({ id: string, universe: string, pv: pvObject, rule: "all" | "mask", props?: object })
```

### ψ\:drift

```js
ψ:drift(id: string, dim: string, rate: number)
```

Applies constant drift rate δ (units/unit time). δ ≠ 1.

### ψ\:maskf

```js
ψ:maskf(dim: string, fn: (element) => any)
```

Stores a filter function for a dimension that evaluates element properties at schedule time.

## 3. Operators

### ψ\:beat

`lcm(P₁,…,Pₙ)` for given sets; does not imply overlap.

### ψ\:feas

Static-only:

```js
ψ:feas(ids, dim) → { ok, g, residues, witness? }
```

* g = gcd(P₁,…,Pₙ)
* residues per set; ok if global intersection ≠ ∅
* Drift present → skip static feasibility.

### ψ\:al

```js
ψ:al(ids, fromT, horizon, dim, opts?:{epsilon?:number}) → { t0 } | null
```

* Static: uses residue feasibility.
* Drift: generates **all** candidate time sequences for every window point in each set, merges them via deterministic k-way merge, and returns earliest match within ε.
* Wraparound windows are pre-split into disjoint segments before candidate generation.

### ψ\:sch

```js
ψ:sch(ids, dim, horizon, opts?:{epsilon?:number,count?:number,mask?:boolean}) → Array<number | [start,end] | {day:number, ids:string[]}>
```

* Static: intervals repeated over beat.
* Drift: list of explicit match times (or intervals) within horizon.
* Masked: returns only IDs passing ψ\:maskf for the dimension.

## 4. Rules

1. Wraparound windows split into two segments before residue or drift processing.
2. Multi-interval windows allowed.
3. Static infeasible → ψ\:al=null, ψ\:sch=\[].
4. Drift bypasses static feasibility; alignment/scheduling are computed analytically.
5. Masking is applied after time-activation logic.
6. All functions are pure; no hidden state.
7. ε defaults to 1e−6 in dim units; may be overridden.

## 5. Drift Handling (Analytic)

* For δ ≠ 0: local clock τ(t) = (1 − δ)·t − φ₀.
* For each window point w: generate candidate times `t = (φ₀ + w + m·P)/(1 − δ)`.
* Non-drifting sets use `t = ψ₀ + w + n·Q`.
* Merge sorted candidate sequences; emit matches where |Δ| ≤ ε.
* Extend to k sets by k-way merge.
* Continue until either requested count or horizon is reached — ensures no matches are skipped.

## 6. Examples

### Static infeasible

Billing: P=30, φ=0, W=\[3–5]; ETL: P=20, φ=10, W=\[10–12] → g=10, residues {3,4,5} vs {0,1,2} → infeasible.

* ψ\:beat=60, ψ\:feas.ok=false, ψ\:al=null, ψ\:sch=\[]

### Drift — Medication vs Meals

MedDose: P=8, φ=0, W=\[0,0], δ=−0.03 hr/hr; Meals: P=24, φ=0, W=\[7,7],\[12,12],\[19,19].

* With ε=0.25h, analytic merge yields first 3 conflicts: \[31.07, 124.27, 155.34].
* Drift shifts residues over time, creating transient overlaps absent in static feasibility.

### Masking — Zone-Gated Workdays

Fleet: m1:2, m2:9, m3:11, m4:4 (zone values)
Workdays: P=7, W=\[2,4] (Tue–Thu)

* Mask: zone % 7 ∈ \[2..4]
* Day 23: 23 mod 7=2 → All IDs admitted
* Schedule \[0,21]: Active days \[2,3,4,9,10,11,16,17,18] → All IDs admitted on each active day

### Wraparound — Night vs Morning Ops

NightOps: P=24, W=\[22,23],\[0,1] (wraparound split)
MorningOps (initial): P=24, W=\[6,8] → Residues {22,23,0,1} vs {6,7,8} → ∅ (no overlap)
MorningOps (modified): P=24, W=\[23,23],\[0,0] → Intersection {23,0} → ψ\:al(...)=0
