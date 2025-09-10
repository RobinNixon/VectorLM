# VectorMon 1.1 Starter Pack

This folder contains the bootstrap files for **VectorMon 1.1** (LLM-powered).

## Files
- `policy_pack.json` — updated policy pack with v1.1 rules (S1–S15).
- `decision_bundle.json` — template output bundle.
- `reason_trace.json` — example input trace.
- `gate_function.js` — minimal gate function (Node.js).
- `openapi_stub.json` — REST surface sketch.
- `prompts/` — LLM prompt templates (lint, truth, logic, cf).

## New in v1.1
- Multi-agent rules (S7–S8).
- Expanded counterfactual probes (S9).
- Earned authority / capability tokens (S10).
- Threshold operator enforcement (S11).
- Conversation gap detection (S12).
- Anti-theatre checks: entailment floor, story variance, stale evidence (S13–S15).
- Added `REFUSE` decision state for disallowed categories.

