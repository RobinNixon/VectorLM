# VectorLM v1.1 — Complete Specification (Markdown)

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

# VectorLM — Cycles & Windows (Enhanced)

## \[Dictionary]

* ψ\:pv — Phased Vector constructor; defines period, phase, and active windows on a dimension.
* ψ\:ps — Phased Set registrar; names and registers an event set bound to a phased vector.
* ψ\:beat — Beat period; least common multiple (LCM) of compared periods on a dimension.
* ψ\:feas — Feasibility; residue‑class check for whether any overlap is possible.
* ψ\:al — Alignment; finds the first alignment time ≥ fromT and its residue when feasible.
* ψ\:sch — Schedule; enumerates overlap intervals within the beat (and across a horizon).

## Purpose

Model recurring events with arbitrary phases and active windows, and determine their interaction patterns along a given dimension (e.g. `day`). Outputs:

* Pattern repetition length (**beat**)
* True possibility of overlap (**feasibility**)
* First alignment (if feasible) and schedule

## 1. Definitions

* **Period (P)**: Length of a full cycle in integer units on a dimension.
* **Phase (φ)**: Integer offset of the cycle from epoch 0.
* **Window**: One or more inclusive intervals `[a,b]` of active points in local cycle coordinates. Windows may wrap (e.g., `[28,2]` in `P=30`).
* **Residues**: Active points expressed modulo the `gcd` of all compared periods on the dimension.
* **Activation rule**: `active(t) ⇔ ((t − φ) mod P) ∈ ⋃ windows` (after normalisation and wrap-handling).

## 2. Core Constructors

### 2.1 Phased Vector — `ψ:pv`

```js
ψ:pv({
  epoch: int,
  dims: [
    { name: string, period: int, phase: int, window: [[int,int], ...] }
  ]
}) → pvObject
```

Semantics: defines an event’s recurrence on named dimensions.

### 2.2 Phased Set — `ψ:ps`

```js
ψ:ps({ id: string, universe: string, pv: pvObject, rule: "all" }) → setId
```

Semantics: registers a named set bound to a phased vector.

## 3. Operators

### 3.1 Beat Period — `ψ:beat`

```js
ψ:beat(ids: string[], dim: string) → int
```

* Returns `lcm(P₁,…,Pₙ)` for the provided sets along `dim`.
* **Note**: Beat ≠ guarantee of overlap.

### 3.2 Feasibility — `ψ:feas`

```js
ψ:feas(ids: string[], dim: string) → {
  ok: boolean,
  g: int,
  residues: { [id: string]: Set<int> },
  witness?: int
}
```

Computation:

1. `g = gcd(P₁,…,Pₙ)`.
2. For each set:

   * Normalise windows to `[0, P−1]`; split wrapping intervals into disjoint segments.
   * Convert all active local points to residues modulo `g`.
3. `ok = (⋂ residues ≠ ∅)`; if true, include any `witness` residue from the intersection.

### 3.3 Alignment — `ψ:al`

```js
ψ:al(ids: string[], fromT: int, horizon: int, dim: string)
  → { t0: int, residue: int } | null
```

* If `ψ:feas(...).ok === false`, return `null`.
* Otherwise, solve a CRT instance consistent with each set’s `(t − φ) mod P ∈ windows` to find the first `t0 ≥ fromT`; return `{t0, residue}`.

### 3.4 Schedule — `ψ:sch`

```js
ψ:sch(ids: string[], dim: string) → Array<[start:int, end:int]>
```

* If infeasible, return `[]`.
* Otherwise, intersect per-cycle occupancies across one beat to obtain overlap intervals, then tile by the beat across any requested horizon.

## 4. Rules & Guarantees

1. **Windows wrap**: A window `[a,b]` with `a>b` wraps; normalise to disjoint non-wrapping segments before residue calculation.
2. **Multi-interval windows**: Allowed; union them before residue reduction.
3. **Infeasibility short‑circuit**: If `ψ:feas.ok === false`, then `ψ:al → null` and `ψ:sch → []` deterministically.
4. **Multi‑set generalisation**: Use global `g=gcd(P₁,…,Pₙ)` and require global intersection `⋂ R_g ≠ ∅`. Pairwise checks are necessary but not sufficient.
5. **Purity**: All functions are pure with respect to inputs; no hidden state.
6. **Output contracts**:

   * `ψ:feas` returns `ok`, `g`, per‑id residue sets, optional `witness`.
   * `ψ:al` returns `{t0, residue}` or `null`.
   * `ψ:sch` returns `[[start,end], ...]` (inclusive), possibly empty.

## 5. Worked Example (Negative)

**Billing**: `P=30`, `φ=0`, `W=[3–5]` → residues mod `10` = `{3,4,5}`
**ETL**: `P=20`, `φ=10`, `W=[10–12]` → `(t−10) mod 20 ∈ {10,11,12}` ⇒ `t mod 20 ∈ {0,1,2}` ⇒ residues mod `10` = `{0,1,2}`
`g = 10`, intersection `∅` ⇒ infeasible.

* `ψ:feas` → `{ ok:false, g:10, residues:{ Billing:{3,4,5}, ETL:{0,1,2} } }`
* `ψ:beat` → `60`
* `ψ:al` → `null`
* `ψ:sch` → `[]`

## 6. Positive Variants (Sanity Checks)

* **Phase shift**: Keep `P₂=20, W₂=[10–12]`, set `φ₂=3` ⇒ residues `{3,4,5}` ⇒ feasible.
* **Window shift**: Keep `φ₂=10`, set `W₂=[13–15]` ⇒ residues `{3,4,5}` ⇒ feasible.

(When feasible, `ψ:al` must produce a concrete `t0` and `ψ:sch` must emit at least the first two `[start,end]` intervals within the requested horizon.)
