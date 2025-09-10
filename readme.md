# VectorLM & VectorMon  

This repository contains two closely related projects that form part of the broader **VectorRM (Reasoning Machine)** initiative:  

- **VectorLM** – an experimental symbolic reasoning language and framework.  
- **VectorMon** – a supervisory and auditing layer designed to monitor reasoning traces, detect deception, enforce policy, and halt unsafe actions.  

Together, they provide both **transparent reasoning** (VectorLM) and **safety governance** (VectorMon).  

---

## VectorLM  

VectorLM extends beyond traditional large language models (LLMs) by embedding reasoning directly into a **traceable, inspectable, symbolic protocol**.  

Where LLMs provide prediction, VectorLM provides **reasoning primitives**: explicit symbolic operators (`ψ:...`) that structure thought, memory, agency, and interaction. Each version refines the set of primitives, the rules of use, and the scaffolding for higher-order cognition.  

*(See [VectorLM-spec.md](./VectorLM-spec.md) for the full history and specifications.)* 

---

## VectorMon  

VectorMon exists because **transparent reasoning alone is not enough**:  
- An advanced AI could still fabricate *plausible but malicious* reasoning traces.  
- Humans or other agents may attempt to insert hidden triggers or deceptive conditionals.  

**VectorMon is the semantic immune system.**  
It monitors every `reasonState`, checks for hidden triggers, verifies claims, probes counterfactual stability, enforces provenance, and applies strict policy rules.  

Key features include:  
- **GATE mode** – live supervision of actions (ALLOW, CHALLENGE, HALT, DEGRADE, REFUSE).  
- **AUDIT mode** – forensic review of saved traces and pods.  
- **Policy Packs** – rule sets (S1–S15) covering hidden triggers, collusion, earned-right-to-act, and anti-theatre checks.  
- **Capability Tokens** – actions must be “earned” via evidence and stability, not just asserted.  

*(See [VectorMon/readme.md](./VectorMon/readme.md) for details and quick-start instructions.)*  

---

## Project Structure  

```text
.
├── VectorLM v2.0.md              # Latest VectorLM spec
├── VectorMon/                    # Supervisor & auditing layer
│   ├── README.md                 # VectorMon overview & quick start
│   ├── policy_pack.json          # Rule set (S1–S15)
│   ├── gate_function.js          # Starter gate function
│   ├── reason_trace.json         # Example input
│   ├── decision_bundle.json      # Template output
│   ├── openapi_stub.json         # REST surface sketch
│   └── prompts/                  # LLM prompt templates
│       ├── lint.txt
│       ├── truth.txt
│       ├── logic.txt
│       └── cf.txt
├── readme.md                     # (this file)
└── Archived Discarded/ …         # Old specs, drafts, corpora
