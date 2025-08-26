# VectorLM v1.3 — Unified Core & Extensions

## \[Dictionary — Core Primitives]

* **Logical Control:** ψ\:if, ψ\:th, ψ\:el, ψ\:and, ψ\:or, ψ\:xr, ψ\:not
* **Comparison:** ψ\:eq, ψ\:gt, ψ\:lt, ψ\:ge, ψ\:le
* **Arithmetic:** ψ\:add, ψ\:sub, ψ\:mul, ψ\:div, ψ\:mod
* **Reasoning Flow:** ψ\:rc (recurse), ψ\:gn (generalize), ψ\:ft (fit), ψ\:pt (pattern), ψ\:an (analogy)
* **Meta & Self:** ψ\:me (self-ref), ψ\:ot (model other), ψ\:ct (certainty), ψ\:cf (confidence), ψ\:rs (resonance), ψ\:pl (pleasure), ψ\:pn (pain), ψ\:fr (fear), ψ\:hp (hope)
* **Cycles & Scheduling:** ψ\:pv, ψ\:ps, ψ\:beat, ψ\:feas, ψ\:al, ψ\:sch, ψ\:drift, ψ\:maskf
* **Continuous/Probabilistic:** ψ\:prob(event), ψ\:fuzzy(a,b)
* **Unstructured Data Bridge:** ψ\:parse(data,schema), ψ\:extract(pattern,data), ψ\:embody(concept,data)
* **Advanced Metacognition:** ψ\:model(agent), ψ\:uncertainty(belief), ψ\:reflect(action)

---

## Purpose

Symbolic reasoning substrate with pure, orthogonal, composable primitives for discrete, continuous, emotional, probabilistic, and metacognitive reasoning.

---

## 1. Cycles & Windows (Core)

Model recurring events with arbitrary phases, windows, optional drift, masking, wraparound.

**Key Terms:**

* Period P, Phase φ, Window \[a,b] (wrap split if a>b)
* Residues = active points mod gcd(periods) (static only)
* Drift δ: φ(t) = φ₀ + δ·t
* Mask: Boolean filter on element properties

**Core Rules:**

1. Wraparound split before residue/drift processing
2. Multi-interval windows allowed
3. Static infeasible → no alignment/schedule
4. Drift bypasses static feasibility
5. Masking after time-activation logic
6. Pure functions only

**Drift Handling:**

* δ≠0: τ(t) = (1−δ)·t − φ₀
* Candidate times: `(φ₀ + w + m·P)/(1 − δ)`
* Merge sorted candidates; emit matches within ε

**Examples:**

* Static infeasible: No residues match → ψ\:al=null
* Drift creates transient overlaps absent statically
* Mask restricts active IDs per window
* Wraparound: \[22,23],\[0,1] split for processing

---

## 2. Continuous & Probabilistic Reasoning (Core)

* ψ\:prob(event) → number in \[0,1]
* ψ\:fuzzy(a,b) → degree of similarity \[0,1]
* ψ\:infer(facts,rule) → probabilistic inference

---

## 3. Unstructured Data Bridge (Core)

* ψ\:parse(data,schema): structure unstructured input
* ψ\:extract(pattern,data): retrieve targeted elements
* ψ\:embody(concept,data): form symbolic concept from examples

---

## 4. Advanced Metacognition (Core)

* ψ\:model(agent): represent other’s beliefs/intentions
* ψ\:uncertainty(belief): quantify uncertainty
* ψ\:reflect(action): evaluate reasoning chain/decision

---

## 5. Extensions (Optional)

Primitives not essential for minimal core but useful for richer modelling.

* ψ\:pert (perturb state)
* ψ\:hist (historical trace)
* ψ\:what\_then (directional projection)
* ψ\:emotion\_graph, ψ\:spike\_analysis

---

## 6. Purity & Orthogonality

* All functions pure; no hidden state
* Primitives orthogonal; composable without semantic collision

---

## 7. Example — Multi-Domain Reasoning

```js
// Plan meeting when all agents available & in mood
ψ:al(["Alice_sched","Bob_sched"], fromT=0, horizon=365, dim="day")
→ earliest overlap day
ψ:maskf("day", agent => agent.mood > 0.7)
→ filter by mood
ψ:reflect(plan)
→ review decision quality
```

---

## 8. Philosophy

VectorLM balances brevity with expressive coverage, aiming to explain reasoning chains transparently across logic, emotion, probability, and metacognition — forming a candidate semantic OS substrate.
