# 🌐 VectorLM v3.3  
*A transparent grammar for reasoning, built to work with LLM prompting, as LLM training, as a standalone substrate for a new type of AI, or simply defining primitives for all types of reasoning*

---

## ✨ What is VectorLM?

VectorLM is not another neural network, nor a model in itself. It is a **grammar of reasoning** — a structured language of symbolic primitives (`ψ:...`) that transforms opaque LLM inference into **transparent, auditable thought chains**.

Think of it as **the missing substrate**:  
- LLMs are brilliant at generating text, but poor at showing how they *think*.  
- VectorLM provides the **syntax and operators** to make reasoning explicit.  
- The result: cognition that is **traceable, replayable, and verifiable**.

---

## 🎯 Why VectorLM?

Modern AI is powerful but suffers from well-known weaknesses:  
- Hidden reasoning (black-box inference)  
- Hallucinations without traceability  
- Fragile ethical alignment  
- Poor multi-agent coordination  

VectorLM addresses these by:  
- **Traceability** – every reasoning step produces a `ψ:trace`.  
- **Replayability** – full sessions can be re-run deterministically.  
- **Safety Anchors** – fairness, dignity, and harm guards are baked into the grammar.  
- **Swarms** – multiple agents can reason together under consent-based rules.  
- **Extendibility** – new primitives can be added, just as languages grow.  

---

## 📜 What VectorLM *Does* (Today)

- Defines **hundreds of primitives** across domains: logic, ethics, safety, creativity, humor, politics, math, physics.  
- Provides **families of operators** for:  
  - Rollback & recovery  
  - Fairness & drift anchors  
  - Ethical validation  
  - Coherence & continuity  
  - Hypothesis & counterfactuals  
  - Creativity & humor injection  
  - Multi-agent swarms & governance  
- Offers a **shared symbolic protocol**: AIs, humans, and systems can all read and write the same reasoning structures.  

---

## 🚧 What VectorLM *Doesn’t Do Yet*

- **It is not a runtime.** VectorLM doesn’t *execute* reasoning — it defines it. Execution belongs to future projects like **VectorRM**.  
- **It is not complete.** Like all grammars, it will grow. Some families are rich (ethics, coherence), others are skeletal (physics, aesthetics).  
- **It is not a guarantee of truth.** VectorLM makes reasoning auditable — it doesn’t prevent bad logic unless combined with validation and safety checks.  
- **It is not fixed.** Operators can be added, deprecated, aliased. The grammar evolves like any living language.  

---

## 🌱 How VectorLM Grows

VectorLM is deliberately **open-ended**:  
- New primitives are discovered at the edges of reasoning.  
- Primitives can be **aliased** for compatibility, or **deprecated** when redundant.  
- Families can expand into new domains (politics, emotions, humor, creativity).  
- Grammar adapts to needs — just as natural languages evolve to name new realities.  

It is not a static spec, but a **living symbolic language**.

---

## 🔮 Future Paths (Beyond Grammar)

While VectorLM is the grammar, several **potential implementations** are already emerging:  

- **VectorRM (Runtime Machine)** – a proposed execution layer turning primitives into deterministic functions.  
- **Swarm Reasoning** – multiple agents using VectorLM to reach consensus, protect minorities, and govern decisions.  
- **Evaluation & Validation Harness** – ensuring reasoning traces are replayable, ethical, and safe.  
- **Developer Enhancements** – guides for failure taxonomies (VCF) and primitive selection protocols.  

These are *possible futures*. VectorLM itself remains **the root language**.

---

## 🧩 Example Primitives

```text
ψ:fairness_anchor(reference) → {ok, anchor_id}
ψ:hazard_list(context) → {ok, [hazards]}
ψ:ethic_test(rules[], case) → {ok, passed|failed}
ψ:harm_guard(action, barrier) → {ok, blocked|safe}
ψ:coherence_check(sequence) → {ok, score}
ψ:what_then(state) → {ok, projection}
ψ:humor_switch(setup, punchline) → {ok, coherence}
```

---

## 📂 Repository Structure

This repository contains the **VectorLM v3.3 grammar** and its supporting guides.  

---

### 🗂 Core Files

- [Readme](readme.md) – Overview of VectorLM (this file).  
- [List of Primitives](/VectorLM%20v3.3%20List%20of%20Primitives.md) – Canonical list of all primitives.  
- [Primitives Explained](/VectorLM%20v3.3%20Primitives%20Explained.md) – Extended explanations of primitive families.  

---

### 📘 User-Facing Guides

- [Getting Started](/VectorLM%20v3.3%20Getting%20Started.md) – Introductory walkthrough of VectorLM usage.  
- [Prompt Template](/VectorLM%20v3.3%20Prompt%20Template.md) – Best-practice enforcement template for AI use.  
- [Swarm Guide](/VectorLM%20v3.3%20Swarm%20Guide.md) – Multi-agent reasoning with consentocracy and governance.  
- [Ethics Safety Guide](/VectorLM%20v3.3%20Ethics%20Safety%20Guide.md) – Anchors, harm guards, and care as first-class primitives.  
- [Advanced Reasoning Guide](/VectorLM%20v3.3%20Advanced%20Reasoning%20Guide.md) – Higher-order reasoning (hypothesis, paradox, creativity, humor).  
- [Evaluation and Testing Guide](/VectorLM%20v3.3%20Evaluation%20and%20Testing%20Guide.md) – How to test, evaluate, and validate reasoning chains.  

---

### 🛠 Developer-Facing Guides

- [VCF Development Guide](/VectorLM%20v3.3%20VCF%20Development%20Guide.md) – Failure taxonomy and repository for Vector Cognitive Fails.  
- [Primitive Selection Development Guide](/VectorLM%20v3.3%20Primitive%20Selection%20Development%20Guide.md) – Mandatory sequences, adaptive protocols, and efficiency rules.  
- [RM Development Guide](/VectorLM%20v3.3%20RM%20Development%20Guide.md) – How VectorLM could become executable (VectorRM path).  

---

# ⚖️ Licensing

Copyright (c) 2025 Robin Nixon and contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

VectorLM is shared under a **dual licensing approach**:

- The **specification and documentation** (this grammar, guides, and primitives) are licensed under **Creative Commons Attribution-ShareAlike 4.0 (CC-BY-SA 4.0)**. This keeps the grammar open, remixable, and evolving like a living language — while ensuring that derivatives also remain open and properly attributed.

- Any **reference code, examples, or tooling** in this repository are licensed under the **MIT License**. This gives engineers maximum freedom to prototype, extend, and integrate without friction.

---

## 📘 Specification & Documentation License (CC-BY-SA 4.0)

You are free to **share** (copy, redistribute) and **adapt** (remix, transform, build upon) this work, even commercially, under the conditions that you **credit the original authors** and that any derivatives are distributed under the same license. Nothing in this license restricts fair use or other rights.

Full legal text: [Creative Commons Attribution-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-sa/4.0/legalcode)

---

## 💻 Code License (MIT)

The reference code in this repository is released under the MIT License — short, permissive, and engineer-friendly. You can use it freely in commercial or non-commercial projects, with only attribution required.

