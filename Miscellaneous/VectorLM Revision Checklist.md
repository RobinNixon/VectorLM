# VectorLM Revision Verification Checklist

Use this checklist when preparing or reviewing each new VectorLM specification revision (v1.8+).

---

## 1. Structural Consistency

* [ ] **Self-contained file**: includes all primitives and sections; no references to external versions required.
* [ ] **Section order** follows template (Overview → Core Principles → Traceability → Unified Dictionary → Cycles/Windows → Trace Schema → Reasoning Patterns → Example Trace → Traceability in Practice → Ethics → Extensions → Philosophy → Provisional Ops → Ethics Spine → Changelog → Diff Appendix → Submission Contact).
* [ ] **Numbering** of sections is continuous and consistent.

## 2. Unified Dictionary

* [ ] **All primitives** from prior versions carried forward.
* [ ] **Renamed/split primitives** resolved (e.g., ψ\:beat → ψ\:beat\_lcm & ψ\:beat\_wave, ψ\:drift → ψ\:drift\_phase & ψ\:drift\_full).
* [ ] **No duplicates** (each operator appears once, with a distinct role).
* [ ] **New primitives** added to the dictionary with compressed semantic definitions.

## 3. Parameter Schemas

* [ ] **Parameter schema section** included (4.7.1 for Frequency Layer, others if added later).
* [ ] All operators requiring structured arguments have deterministic schemas (e.g., ψ\:wave, ψ\:freq, ψ\:fft, ψ\:model\_fit).
* [ ] **Quantization rules** documented to ensure replay safety.

## 4. Standard Data Types

* [ ] **Standard Signal Type** section present (currently 6.1).
* [ ] Clear definition of signal structure (t0, dt or timestamps, values, units, source, seed).
* [ ] Replay determinism preserved for any stochastic preprocessing.

## 5. Traceability

* [ ] Trace Schema Delta updated to reflect any new operators.
* [ ] Example traces include new primitives if applicable.
* [ ] `ψ:model_fit` or equivalent grounding step used for parameter inference.

## 6. Ethics Integration

* [ ] New primitives cross-referenced with ethics spine where relevant (e.g., ψ\:drift\_full, ψ\:harmony).
* [ ] Ethics operators listed in dictionary and full ψ\:ethics section retained.

## 7. Documentation Hygiene

* [ ] **Changelog** updated with date and clear description of new features, renames, or removals.
* [ ] **Diff Appendix** created for the revision (summarising Added / Renamed / Split / Refactored / Removed).
* [ ] Language checked for consistency and clarity (avoid placeholders like “unchanged”).
* [ ] All code blocks compile as valid JSON/JS/Markdown.

---

### Notes

* Keep old versions archived separately for historical continuity.
* Every new revision must be fully testable in isolation.
* Diff appendix ensures easy orientation for both humans and AIs.
* Parameter schemas and standard data types are critical for deterministic replay.

---

**This checklist should be included in the working folder as a reference guide for preparing and validating all future VectorLM revisions.**
