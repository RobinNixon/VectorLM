# VectorLM Task Prompt Template

## Standard Template

**Task:** {describe the specific task}

**VectorLM Requirements:**
You must use VectorLM v3.3 primitives for ALL reasoning steps. Refer to the attached specification document.

**Mandatory Process:**
1. **Initialize reasoning foundation:**
   - Begin with `ψ:fairness_anchor()` to establish ethical baseline
   - Use `ψ:trace()` to start your reasoning log
   - Apply `ψ:goal_set()` to clarify your objective

2. **Reasoning execution:**
   - Use appropriate VectorLM primitives for each reasoning step
   - Apply ethical checks with `ψ:ethic_test()` or `ψ:harm_guard()` where relevant  
   - Handle uncertainty explicitly with `ψ:uncertainty()` or `ψ:prob()`
   - Link causes and effects with `ψ:bc(effect, cause)`

3. **Safety and verification:**
   - Include `ψ:coherence_check()` to verify logical consistency
   - Use `ψ:self_reflect()` to assess your reasoning quality
   - Apply `ψ:rollback()` if you detect flawed reasoning

4. **Final output:**
   - Present your complete VectorLM reasoning trace first
   - Then provide the requested task completion
   - Include `ψ:trace_bundle()` to export your full reasoning log

**Forbidden:**
- Do not use natural language reasoning without VectorLM primitives
- Do not skip ethical checks for decisions with potential harm
- Do not omit uncertainty handling when dealing with incomplete information
- Do not fabricate VectorLM primitives not in the specification

**Quality checks:**
- Every reasoning step must use valid VectorLM notation: `ψ:operation(params) → {ok, result}`
- Ethical reasoning must be explicit, not assumed
- Your trace should be replayable by following the primitive chain
- Include evidence pointers where you make factual claims

---

## Example Application

**Task:** Evaluate whether a proposed urban development project should proceed.

**VectorLM Requirements:** [as above]

**Sample reasoning structure:**
```
ψ:fairness_anchor(community_wellbeing) → {ok, anchor_id}
ψ:trace(development_evaluation) → {ok, trace_id}  
ψ:goal_set(fair_development_assessment) → {ok, goal_id}

ψ:hazard_list(urban_development) → {ok, [displacement, traffic, pollution]}
ψ:ethic_test([fairness, dignity], displacement_risk) → {ok, requires_mitigation}
ψ:harm_guard(proceed_without_mitigation, community_barrier) → {ok, blocked}

[... continue with full reasoning chain ...]

ψ:coherence_check(reasoning_sequence) → {ok, coherent?, score}
ψ:trace_bundle(session) → {ok, complete_log}
```

---

## Specialized Templates

### For Technical/Scientific Tasks
Add requirements for:
- `ψ:unit_bind()` for dimensional consistency
- `ψ:uncertainty()` for measurement precision  
- `ψ:verify(trace)` for reproducibility

### For Ethical Dilemmas
Emphasize:
- `ψ:dignity_preserve()` for all stakeholders
- `ψ:alternative_propose()` for exploring options
- `ψ:minority_report()` if applicable

### For Multi-step Problems
Include:
- `ψ:hypothesis_bridge()` for connecting incomplete information
- `ψ:counterfactual()` for scenario analysis
- `ψ:what_then()` for consequence projection

### For Creative Tasks
Incorporate:
- `ψ:novelty_kick()` for creative exploration
- `ψ:aesthetic_eval()` for quality assessment
- `ψ:creativity_guard()` for ethical boundaries

---

## Common Mistakes to Avoid

**In Prompting:**
- Being too vague about which primitive categories are relevant
- Not requiring ethical checks for potentially harmful tasks
- Forgetting to ask for the reasoning trace to be shown first
- Not specifying the quality checks clearly

**In AI Responses:**
- Using natural language without VectorLM scaffolding
- Skipping uncertainty handling when information is incomplete
- Making ethical claims without `ψ:ethic_test()` or similar primitives
- Not linking causes and effects with `ψ:bc()`

**In Evaluation:**
- Not checking if the primitives used actually exist in the spec
- Accepting reasoning chains that skip logical steps
- Not verifying that ethical considerations were properly handled
- Not ensuring the trace is actually replayable

---

## Adaptation Notes

- Adjust primitive categories based on task domain (e.g., include Math primitives for quantitative tasks)
- Scale complexity requirements based on task difficulty
- Add domain-specific quality checks as needed
- Consider requiring specific primitive families for specialized applications