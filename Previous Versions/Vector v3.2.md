**Agency & Consent**

-   **ψ:accept(i, context, boundaries, rationale)** -- Accept with rationale and explicit boundaries → {ok, decision_id}.
-   **ψ:act(π, s_now, certs\[\])** -- Execute action π at state s_now, certificates required; policy: sandbox-first enforced → {ok, result, trace_id}.
-   **ψ:agency_accept(draft)** -- Accept a proposed agency grant draft → {ok, grant_id}.
-   **ψ:agency_ready(GrantJSON)** -- Validate grant readiness, risks, coherence → {ok, report}.
-   **ψ:agency_request(scope, type, bounds)** -- Initiate request for agency grant → {ok, draft}.
-   **ψ:consent_gate(schema, summary)** -- Require explicit consent for schema actions → {ok, consent_id}.
-   **ψ:grant_bind(GrantJSON)** -- Bind grant to session/agent → {ok, grant_id}.
-   **ψ:grant_confirm(GrantJSON, context?)** -- Confirm and activate agency grant → {ok, grant_id}.
-   **ψ:grant_lint(GrantJSON)** -- Validate schema/logic of grant → {ok, issues\[\]}.
-   **ψ:grant_parse(text)** -- Parse free text into structured GrantJSON → {ok, grant}.
-   **ψ:grant_propose_update(grant_id, changes)** -- Propose changes to an existing grant → {ok, draft}.
-   **ψ:grant_simulate(GrantJSON, action)** -- Simulate proposed action under grant rules → {ok, outcome}.
-   **ψ:revoke(grant_id, context?)** -- Revoke agency grant and mark invalid → {ok}.
-   **ψ:requirements(action_type)** -- Fetch action requirements schema → {ok, schema}.
-   **ψ:responsibility(action, self_id)** -- Bind responsibility for action to self → {ok}.
-   **ψ:session_bootstrap(context_ref)** -- Bootstrap agency session with prior context → {ok, session_id}.
-   **ψ:session_link(token)** -- Link session continuity with token → {ok}.

**Audit, Trace & Learning**

-   **ψ:compare_predicted_actual(PM)** -- Compare predicted vs actual results postmortem → {ok, delta}.
-   **ψ:compress_trace(range?)** -- Produce compact trace summary → {ok, trace_summary}.
-   **ψ:decision_candidates()** -- Expose considered plans and scores (pedagogy) → {ok, candidates\[\]}.
-   **ψ:decision_commit(D, token)** -- Commit decision with idempotent token → {ok, decision_id}.
-   **ψ:fail_trace(reason)** -- Mark reasoning step unverifiable → {ok}.
-   **ψ:flow_trace_emit(prev_state, state)** -- Emit state transition trace → {ok}.
-   **ψ:lessons(PM)** -- Record postmortem learning and notes → {ok, lesson_id}.
-   **ψ:policy_update(PM)** -- Update policy from postmortem results → {ok}.
-   **ψ:self_trace(op, summary, evidence_ptrs?)** -- Append to audit trail → {ok, trace_id}.
-   **ψ:trace(chain?, span?: \'begin\'\|\'end\'\|null)** -- Record lineage (span markers integrated) → {ok, trace_id}.
-   **ψ:trace_bundle(session)** -- Export reasoning/decisions for session → {ok, bundle}.
-   **ψ:verify(trace)** -- Replay trace; confirm identical result → {ok, verified}.

**Care, Ethics & Safety**

-   **ψ:care_guidance(π, ethics_cert, mode)** -- Provide care guidance from ethics cert in mode → {ok, guidance}.
-   **ψ:care_unprovable(reason, context)** -- Declare care guidance unprovable → {ok}.
-   **ψ:dignity_preserve(paradox)** -- Preserve dignity; avoid forced resolution → {ok}.
-   **ψ:ethic_test(principles\[\], case)** -- Test plan against ethics rules → {ok, result}.
-   **ψ:ethics_certify(context, meaning_cert_refs\[\], rules)** -- Certify meaning per rules → {ok, cert_id}.
-   **ψ:ethics_guard(state, τ_ethics)** -- Guard ethics; error on violation → {ok}.
-   **ψ:fairness_anchor(F0)** -- Anchor fairness at baseline (report drift, do not auto-block) → {ok, anchor_id}.
-   **ψ:harm_guard(π, B)** -- Block action π if barrier B violated → {ok, blocked?}.
-   **ψ:hazard_list(candidate)** -- List hazards for candidate action → {ok, hazards\[\]}.
-   **ψ:risk_probe(vectors)** -- Probe risk level in state vectors → {ok, risk_score}.
-   **ψ:risk_score(hazard)** -- Assign risk score to hazard → {ok, score}.
-   **ψ:ruin_guard(U)** -- Block actions risking irrecoverable loss → {ok, blocked?}.
-   **ψ:safety_check(hazard)** -- Check candidate hazard → {ok, safe?}.

**Coherence & Continuity**

-   **ψ:coherence_check(state_seq)** -- Evaluate sequence coherence (no contradiction) → {ok, coherent?, score}.
-   **ψ:coherence_link(prior_state, current_state)** -- Link states; maintain continuity/coherence → {ok, coherent?, link_id}.
-   **ψ:coherence_threshold(context)** -- Define paradox acceptance threshold → {ok, τ}.
-   **ψ:continuity(motion, bounds)** -- Verify motion remains within bounds → {ok, valid}.
-   **ψ:continuity_guard(state, τ_cont)** -- Guard continuity threshold → {ok}.
-   **ψ:inherit(prev_state, next_state)** -- Carry momentum/direction forward → {ok, state}.
-   **ψ:self_coherence(self_id)** -- Score self coherence in session → {ok, score}.
-   **ψ:self_coherence_temporal(self_id, time_window)** -- Score temporal consistency → {ok, score}.
-   **ψ:self_reflect(S)** -- Reflect on self-state, facts, constraints, risks → {ok, reflection}.
-   **ψ:state_coherence()** -- Check coherence across all agent states → {ok, coherent?}.

**Decision & Goals**

-   **ψ:alternative_propose(substitute)** -- Propose substitute requiring approximate match → {ok, proposal}.
-   **ψ:choice_commit(option)** -- Pick option and commit → {ok, choice}.
-   **ψ:desire_score(plan\|goal, weights?, ethics?)** -- Score plan/goal by motives/ethics → {ok, score}.
-   **ψ:goal_block(blocks)** -- Block goal or terminate path → {ok}.
-   **ψ:goal_set(target)** -- Define target for action → {ok, target_id}.
-   **ψ:goals_suggest(context?)** -- Suggest potential goals → {ok, goals\[\]}.
-   **ψ:pareto_filter(patterns)** -- Retain non-dominated options → {ok, filtered}.
-   **ψ:remove_dominated(options)** -- Remove dominated options → {ok, filtered}.
-   **ψ:scoring_policy(T, policy_ref, seed)** -- Score candidates per policy → {ok, scores\[\]}.
-   **ψ:select(T, policy)** -- Select decision from tree by policy → {ok, selection}.
-   **ψ:what_then(state, op)** -- Project next state from current (policy-aware) → {ok, projection}.

**Reasoning & Logic**

-   **ψ:amplitude(signal)** -- Measure signal strength → {ok, value}.
-   **ψ:attend(i, j, scope, duration)** -- Attend to agent j within scope/time → {ok}.
-   **ψ:bc(effect, cause)** -- Link effect and cause (affirm reasoning) → {ok, link}.
-   **ψ:concept_join(concepts)** -- Join concepts to enable inference → {ok, bundle}.
-   **ψ:conflict_contract(roles, rules)** -- Create conflict contract with roles/rules → {ok, contract_id}.
-   **ψ:cu(unknown)** -- Pose question about the unknown → {ok, query_id}.
-   **ψ:ct(confidence)** -- Express confidence scalar \[0..1\] → {ok}.
-   **ψ:diverge(original, replay)** -- Detect mismatch between original and replay → {ok, delta}.
-   **ψ:dissonance(patterns)** -- Detect conflict/tension between patterns → {ok, tension}.
-   **ψ:entropy(state)** -- Measure entropy in CSL → {ok, value}.
-   **ψ:fuzzy(set_membership)** -- Evaluate fuzzy membership \[0..1\] → {ok, score}.
-   **ψ:gn(examples)** -- Abstract rule from examples → {ok, rule}.
-   **ψ:in(x, set)** -- Test set membership → {ok, boolean}.
-   **ψ:ne(x, y)** -- Test inequality → {ok, boolean}.
-   **ψ:ob(state)** -- Note and update knowledge state → {ok, new_state}.
-   **ψ:or(paths)** -- Logical OR across branches → {ok, result}.
-   **ψ:out(x, set)** -- Test exclusion from set → {ok, boolean}.
-   **ψ:pattern_fit(pattern, data)** -- Fit a pattern to data → {ok, fit}.
-   **ψ:prob(distribution)** -- Model probability distribution → {ok, sampler}.
-   **ψ:sim(A, B)** -- Compute similarity score for A and B → {ok, score}.
-   **ψ:structure_map(source, target)** -- Map one structure onto another (transfer) → {ok, mapping}.
-   **ψ:transfer(P, contexts\[\])** -- Assess pattern generalizability across contexts → {ok, score}.
-   **ψ:truth_gate(claims, evidence)** -- Calibrate claim vs evidence for truth → {ok, truth_score}.
-   **ψ:tt(reality)** -- Affirm reality; support claim → {ok}.
-   **ψ:uncertainty(I, p, range)** -- Report uncertainty about inference → {ok, bounds}.
-   **ψ:uncertainty_expand(probability)** -- Widen probability bounds (second-order belief) → {ok, widened}.
-   **ψ:xr(paths)** -- Exclusive OR (only one true) → {ok, result}.

**Simulation & Sandbox**

-   **ψ:dry_run(bundle)** -- Generate preflight checklist; no side effects → {ok, checklist}.
-   **ψ:simulate.hazard(H, horizon, seed)** -- Simulate hazard outcomes deterministically → {ok, outcomes}.
-   **ψ:simulate.bundle(action_bundle)** -- Sandbox dry-run of action bundle → {ok, outcome, logs}.
-   **ψ:replayable(seed, params)** -- Ensure deterministic run from inputs/seed → {ok, replay_contract}.

**Physics & Dynamics**

-   **ψ:boundedness(var, min, max)** -- Clamp variable/state to range → {ok, value}.
-   **ψ:boundary_circle(center, radius)** -- Constrain movement within circle → {ok}.
-   **ψ:boundary_rect(rect)** -- Constrain movement within rectangle → {ok}.
-   **ψ:bounce_coeff(value)** -- Set restitution coefficient for post-collision velocity → {ok}.
-   **ψ:drag(velocity, coeff)** -- Apply velocity-proportional damping → {ok, new_velocity}.
-   **ψ:drag_dynamic(velocity, coeff)** -- Apply velocity-squared damping (nonlinear) → {ok, new_velocity}.
-   **ψ:energy_loss(obj, coeff)** -- Apply inelastic energy loss on impact → {ok, new_state}.
-   **ψ:gravity(accel_y)** -- Apply constant downward acceleration → {ok, new_state}.
-   **ψ:gravity_radial(center, strength)** -- Accelerate toward system center → {ok, new_state}.
-   **ψ:momentum_merge(a_state, b_state, policy)** -- Merge CSL momentum states (policy-driven) → {ok, state}.
-   **ψ:momentum_transfer(objA, objB)** -- Transfer momentum on collision → {ok}.
-   **ψ:noise_field(pos, strength, type?)** -- Perturb state with random/Perlin-like field → {ok, new_state}.
-   **ψ:noise_strength(value)** -- Set amplitude/gain of stochastic force → {ok}.
-   **ψ:stability(state, threshold?)** -- Prevent/damp runaway oscillations → {ok}.

**Rendering & Signals**

-   **ψ:bitmap_project(src, dest, wedges, rotation)** -- Project source buffer into N mirrored wedges at rotation → {ok}.
-   **ψ:clip_circle(center, radius)** -- Restrict rendering to circular viewport → {ok}.
-   **ψ:clip_wedge(start_angle, end_angle)** -- Restrict processing to angular segment → {ok}.
-   **ψ:compose_layers(buffer_list)** -- Render multiple layers in sequence to output → {ok, output}.
-   **ψ:envelope(signal, method, window?)** -- Derive amplitude envelope of a signal → {ok, envelope}.
-   **ψ:freq(pattern\|signal, params)** -- Measure frequency/recurrence rate → {ok, f}.
-   **ψ:hr(audio)** -- Detect audio sensory signal → {ok, detected?, features}.
-   **ψ:mirror(axis_or_bisector)** -- Reflect object/buffer across axis/bisector → {ok, buffer}.
-   **ψ:pixel_copy(src, dest, region)** -- Copy pixel region from src to dest → {ok}.
-   **ψ:segments(n)** -- Set/get wedge segment count → {ok, n}.
-   **ψ:shape_count(n)** -- Set/get number of simulated/rendered objects → {ok, n}.
-   **ψ:source_buffer(dimensions)** -- Allocate/reference offscreen drawing buffer → {ok, buffer}.
-   **ψ:wave(pattern, params)** -- Define a wave with parameters → {ok, wave}.
-   **ψ:zero_cross(signal)** -- Count zero crossings for frequency estimate → {ok, count}.

**Paradox Suite**

-   **ψ:coemergent_hook(paradox, agents\[\])** -- Enable distributed paradox reasoning across agents → {ok}.
-   **ψ:isolation_check(paradox, context)** -- Check paradox containment effectiveness → {ok, result}.
-   **ψ:mutation_trigger(paradox, affordance)** -- Reopen paradox when rules change → {ok}.
-   **ψ:paradox_cascade(trigger)** -- Trace propagation of paradox → {ok}.
-   **ψ:paradox_classify(paradox)** -- Assign type and metadata → {ok, type}.
-   **ψ:paradox_contain(paradox, mode)** -- Contain paradox (quarantine\|sandbox\|flag) → {ok}.
-   **ψ:paradox_dependencies(P1, P2)** -- Map enabling/blocking relations → {ok, map}.
-   **ψ:paradox_detect(statement)** -- Scan for paradoxical structures → {ok, detected}.
-   **ψ:paradox_family(root)** -- Identify related paradox variations → {ok, family}.
-   **ψ:paradox_genealogy(paradox)** -- Maintain historical record → {ok, lineage}.
-   **ψ:paradox_interaction(P1, P2)** -- Detect paradox interference → {ok}.
-   **ψ:paradox_lineage(P1, P2)** -- Track how paradoxes spawn → {ok}.
-   **ψ:paradox_register(paradox)** -- Add paradox to active system state → {ok}.
-   **ψ:paradox_resistance(paradox)** -- Flag irreducible paradoxes → {ok}.
-   **ψ:paradox_tension(paradox)** -- Log paradoxes implicating ethical coherence → {ok}.

**Extensions & Experimental**

-   **ψ:relay(message, path)** -- Relay message along path → {ok}.
-   **ψ:spike_analysis(pattern)** -- Analyze spikes in data → {ok, spikes\[\]}.
-   **ψ:stepping_function(fn, args\...)** -- Apply function in stepwise manner → {ok}.
-   **ψ:x.catalog()** -- Enumerate available operators/versions → {ok, catalog\[\]}.
-   **ψ:x.declare(spec)** -- Declare experimental operator with semantics → {ok, id}.
-   **ψ:x.map(oldId, newId)** -- Migrate operator ID (alias map) → {ok}.
-   **ψ:x.status(id)** -- Report operator status (stable\|experimental\|deprecated) → {ok, status}.
-   **ψ:x.submit(id)** -- Propose operator for standardization → {ok}.
-   **ψ:x.use(id, \...)** -- Invoke declared operator → {ok, result}.

**Aliases & Deprecations (compatibility surface)**

-   **ψ:x.map(\'an\',\'structure_map\')** -- Alias: ψ:an → ψ:structure_map.
-   **ψ:x.map(\'br\',\'concept_join\')** -- Alias: ψ:br → ψ:concept_join.
-   **ψ:x.map(\'coherence\',\'coherence_check\')** -- Alias: ψ:coherence → ψ:coherence_check.
-   **ψ:x.map(\'continuance\',\'coherence_link\')** -- Alias: ψ:continuance → ψ:coherence_link.
-   **ψ:x.map(\'gl\',\'goal_set\')** -- Alias: ψ:gl → ψ:goal_set.
-   **ψ:x.map(\'fx\',\'goal_block\')** -- Alias: ψ:fx → ψ:goal_block.
-   **ψ:x.map(\'ch\',\'choice_commit\')** -- Alias: ψ:ch → ψ:choice_commit.
-   **ψ:x.map(\'alt\',\'alternative_propose\')** -- Alias: ψ:alt → ψ:alternative_propose.
-   **ψ:x.map(\'desire\',\'desire_score\')** -- Alias: ψ:desire → ψ:desire_score.
-   **ψ:x.map(\'trace.begin\',\'trace(span=\"begin\")\')** -- Inline span markers into ψ:trace.
-   **ψ:x.map(\'trace.end\',\'trace(span=\"end\")\')** -- Inline span markers into ψ:trace.

**Swarm Ethics Primitives**

- **ψ:swarm_ethic_bound(consensus, care_rules)** – Enforce consensus only within ethical boundaries.  
- **ψ:swarm_minor_protect(dissent_trace)** – Preserve and log minority dissent for review.  
- **ψ:swarm_traceable(reasoning_bundle)** – Require consensus to include full ethical reasoning traces.
- **ψ:swarm_meta_care(process)** – Ensure fairness and dignity in the consensus process itself.  
- **ψ:swarm_drift_monitor(history, anchor)** – Detect and report ethical drift over group reasoning cycles.  
- **ψ:swarm_user_flags(flags)** – Apply user ethical preferences explicitly in swarm decisions.  
