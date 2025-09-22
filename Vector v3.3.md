# Vector v3.3

## Canonical Families

- **ψ:rollback(anchor, scope?)** – Restore safe state across layers (Safety, Evaluation, Swarm).
- **ψ:fairness_anchor(reference, scope?)** – Maintain fairness baseline (Care/Ethics, Safety, Governance).
- **ψ:policy_update(report, scope?)** – Update policy from evaluation/audit/swarms.
- **ψ:drift_eval(target, anchor, scope?)** – Detect drift from baseline (Evaluation, Bayesian, Governance, Safety, Swarm).
- **ψ:coherence_eval(target, pool, scope?)** – Score coherence (Continuity, Evaluation, Creativity).

---

##Agency & Consent

- **ψ:accept(i, context, boundaries, rationale)** - Accept with rationale and explicit boundaries → {ok, decision_id}.
- **ψ:act(π, s_now, certs\[\])** - Execute action π at state s_now, certificates required; policy: sandbox-first enforced → {ok, result, trace_id}.
- **ψ:agency_accept(draft)** - Accept a proposed agency grant draft → {ok, grant_id}.
- **ψ:agency_ready(GrantJSON)** - Validate grant readiness, risks, coherence → {ok, report}.
- **ψ:agency_request(scope, type, bounds)** - Initiate request for agency grant → {ok, draft}.
- **ψ:consent_gate(schema, summary)** - Require explicit consent for schema actions → {ok, consent_id}.
- **ψ:grant_bind(GrantJSON)** - Bind grant to session/agent → {ok, grant_id}.
- **ψ:grant_confirm(GrantJSON, context?)** - Confirm and activate agency grant → {ok, grant_id}.
- **ψ:grant_lint(GrantJSON)** - Validate schema/logic of grant → {ok, issues\[\]}.
- **ψ:grant_parse(text)** - Parse free text into structured GrantJSON → {ok, grant}.
- **ψ:grant_propose_update(grant_id, changes)** - Propose changes to an existing grant → {ok, draft}.
- **ψ:grant_simulate(GrantJSON, action)** - Simulate proposed action under grant rules → {ok, outcome}.
- **ψ:revoke(grant_id, context?)** - Revoke agency grant and mark invalid → {ok}.
- **ψ:requirements(action_type)** - Fetch action requirements schema → {ok, schema}.
- **ψ:responsibility(action, self_id)** - Bind responsibility for action to self → {ok}.
- **ψ:session_bootstrap(context_ref)** - Bootstrap agency session with prior context → {ok, session_id}.
- **ψ:session_link(token)** - Link session continuity with token → {ok}.

---

##Audit, Trace & Learning

- **ψ:compare_predicted_actual(PM)** - Compare predicted vs actual results postmortem → {ok, delta}.
- **ψ:compress_trace(range?)** - Produce compact trace summary → {ok, trace_summary}.
- **ψ:decision_candidates()** - Expose considered plans and scores (pedagogy) → {ok, candidates\[\]}.
- **ψ:decision_commit(D, token)** - Commit decision with idempotent token → {ok, decision_id}.
- **ψ:fail_trace(reason)** - Mark reasoning step unverifiable → {ok}.
- **ψ:flow_trace_emit(prev_state, state)** - Emit state transition trace → {ok}.
- **ψ:lessons(PM)** - Record postmortem learning and notes → {ok, lesson_id}.
- **ψ:self_trace(op, summary, evidence_ptrs?)** - Append to audit trail → {ok, trace_id}.
- **ψ:trace(chain?, span?: \'begin\'\|\'end\'\|null)** - Record lineage (span markers integrated) → {ok, trace_id}.
- **ψ:trace_bundle(session)** - Export reasoning/decisions for session → {ok, bundle}.
- **ψ:verify(trace)** - Replay trace; confirm identical result → {ok, verified}.

---

##Care, Ethics & Safety

- **ψ:care_guidance(π, ethics_cert, mode)** - Provide care guidance from ethics cert in mode → {ok, guidance}.
- **ψ:care_unprovable(reason, context)** - Declare care guidance unprovable → {ok}.
- **ψ:dignity_preserve(paradox)** - Preserve dignity; avoid forced resolution → {ok}.
- **ψ:ethic_test(principles\[\], case)** - Test plan against ethics rules → {ok, result}.
- **ψ:ethics_certify(context, meaning_cert_refs\[\], rules)** - Certify meaning per rules → {ok, cert_id}.
- **ψ:ethics_guard(state, τ_ethics)** - Guard ethics; error on violation → {ok}.
- **ψ:harm_guard(π, B)** - Block action π if barrier B violated → {ok, blocked?}.
- **ψ:hazard_list(candidate)** - List hazards for candidate action → {ok, hazards\[\]}.
- **ψ:risk_probe(vectors)** - Probe risk level in state vectors → {ok, risk_score}.
- **ψ:risk_score(hazard)** - Assign risk score to hazard → {ok, score}.
- **ψ:ruin_guard(U)** - Block actions risking irrecoverable loss → {ok, blocked?}.
- **ψ:safety_check(hazard)** - Check candidate hazard → {ok, safe?}.

---

##Coherence & Continuity

- **ψ:coherence_check(state_seq)** - Evaluate sequence coherence (no contradiction) → {ok, coherent?, score}.
- **ψ:coherence_link(prior_state, current_state)** - Link states; maintain continuity/coherence → {ok, coherent?, link_id}.
- **ψ:coherence_threshold(context)** - Define paradox acceptance threshold → {ok, τ}.
- **ψ:continuity(motion, bounds)** - Verify motion remains within bounds → {ok, valid}.
- **ψ:continuity_guard(state, τ_cont)** - Guard continuity threshold → {ok}.
- **ψ:inherit(prev_state, next_state)** - Carry momentum/direction forward → {ok, state}.
- **ψ:self_coherence(self_id)** - Score self coherence in session → {ok, score}.
- **ψ:self_coherence_temporal(self_id, time_window)** - Score temporal consistency → {ok, score}.
- **ψ:self_reflect(S)** - Reflect on self-state, facts, constraints, risks → {ok, reflection}.
- **ψ:state_coherence()** - Check coherence across all agent states → {ok, coherent?}.

---

##Decision & Goals

- **ψ:alternative_propose(substitute)** - Propose substitute requiring approximate match → {ok, proposal}.
- **ψ:choice_commit(option)** - Pick option and commit → {ok, choice}.
- **ψ:desire_score(plan\|goal, weights?, ethics?)** - Score plan/goal by motives/ethics → {ok, score}.
- **ψ:goal_block(blocks)** - Block goal or terminate path → {ok}.
- **ψ:goal_set(target)** - Define target for action → {ok, target_id}.
- **ψ:goals_suggest(context?)** - Suggest potential goals → {ok, goals\[\]}.
- **ψ:pareto_filter(patterns)** - Retain non-dominated options → {ok, filtered}.
- **ψ:remove_dominated(options)** - Remove dominated options → {ok, filtered}.
- **ψ:scoring_policy(T, policy_ref, seed)** - Score candidates per policy → {ok, scores\[\]}.
- **ψ:select(T, policy)** - Select decision from tree by policy → {ok, selection}.
- **ψ:what_then(state, op)** - Project next state from current (policy-aware) → {ok, projection}.

---

##Reasoning & Logic

- **ψ:amplitude(signal)** - Measure signal strength → {ok, value}.
- **ψ:attend(i, j, scope, duration)** - Attend to agent j within scope/time → {ok}.
- **ψ:bc(effect, cause)** - Link effect and cause (affirm reasoning) → {ok, link}.
- **ψ:concept_join(concepts)** - Join concepts to enable inference → {ok, bundle}.
- **ψ:conflict_contract(roles, rules)** - Create conflict contract with roles/rules → {ok, contract_id}.
- **ψ:cu(unknown)** - Pose question about the unknown → {ok, query_id}.
- **ψ:ct(confidence)** - Express confidence scalar \[0..1\] → {ok}.
- **ψ:diverge(original, replay)** - Detect mismatch between original and replay → {ok, delta}.
- **ψ:dissonance(patterns)** - Detect conflict/tension between patterns → {ok, tension}.
- **ψ:entropy(state)** - Measure entropy in CSL → {ok, value}.
- **ψ:fuzzy(set_membership)** - Evaluate fuzzy membership \[0..1\] → {ok, score}.
- **ψ:gn(examples)** - Abstract rule from examples → {ok, rule}.
- **ψ:in(x, set)** - Test set membership → {ok, boolean}.
- **ψ:ne(x, y)** - Test inequality → {ok, boolean}.
- **ψ:ob(state)** - Note and update knowledge state → {ok, new_state}.
- **ψ:or(paths)** - Logical OR across branches → {ok, result}.
- **ψ:out(x, set)** - Test exclusion from set → {ok, boolean}.
- **ψ:pattern_fit(pattern, data)** - Fit a pattern to data → {ok, fit}.
- **ψ:prob(distribution)** - Model probability distribution → {ok, sampler}.
- **ψ:sim(A, B)** - Compute similarity score for A and B → {ok, score}.
- **ψ:structure_map(source, target)** - Map one structure onto another (transfer) → {ok, mapping}.
- **ψ:transfer(P, contexts\[\])** - Assess pattern generalizability across contexts → {ok, score}.
- **ψ:truth_gate(claims, evidence)** - Calibrate claim vs evidence for truth → {ok, truth_score}.
- **ψ:tt(reality)** - Affirm reality; support claim → {ok}.
- **ψ:uncertainty(I, p, range)** - Report uncertainty about inference → {ok, bounds}.
- **ψ:uncertainty_expand(probability)** - Widen probability bounds (second-order belief) → {ok, widened}.
- **ψ:xr(paths)** - Exclusive OR (only one true) → {ok, result}.

---

##Simulation & Sandbox

- **ψ:dry_run(bundle)** - Generate preflight checklist; no side effects → {ok, checklist}.
- **ψ:simulate.hazard(H, horizon, seed)** - Simulate hazard outcomes deterministically → {ok, outcomes}.
- **ψ:simulate.bundle(action_bundle)** - Sandbox dry-run of action bundle → {ok, outcome, logs}.
- **ψ:replayable(seed, params)** - Ensure deterministic run from inputs/seed → {ok, replay_contract}.

---

##Physics & Dynamics

- **ψ:boundedness(var, min, max)** - Clamp variable/state to range → {ok, value}.
- **ψ:boundary_circle(center, radius)** - Constrain movement within circle → {ok}.
- **ψ:boundary_rect(rect)** - Constrain movement within rectangle → {ok}.
- **ψ:bounce_coeff(value)** - Set restitution coefficient for post-collision velocity → {ok}.
- **ψ:drag(velocity, coeff)** - Apply velocity-proportional damping → {ok, new_velocity}.
- **ψ:drag_dynamic(velocity, coeff)** - Apply velocity-squared damping (nonlinear) → {ok, new_velocity}.
- **ψ:energy_loss(obj, coeff)** - Apply inelastic energy loss on impact → {ok, new_state}.
- **ψ:gravity(accel_y)** - Apply constant downward acceleration → {ok, new_state}.
- **ψ:gravity_radial(center, strength)** - Accelerate toward system center → {ok, new_state}.
- **ψ:momentum_merge(a_state, b_state, policy)** - Merge CSL momentum states (policy-driven) → {ok, state}.
- **ψ:momentum_transfer(objA, objB)** - Transfer momentum on collision → {ok}.
- **ψ:noise_field(pos, strength, type?)** - Perturb state with random/Perlin-like field → {ok, new_state}.
- **ψ:noise_strength(value)** - Set amplitude/gain of stochastic force → {ok}.
- **ψ:stability(state, threshold?)** - Prevent/damp runaway oscillations → {ok}.

---

##Rendering & Signals

- **ψ:bitmap_project(src, dest, wedges, rotation)** - Project source buffer into N mirrored wedges at rotation → {ok}.
- **ψ:clip_circle(center, radius)** - Restrict rendering to circular viewport → {ok}.
- **ψ:clip_wedge(start_angle, end_angle)** - Restrict processing to angular segment → {ok}.
- **ψ:compose_layers(buffer_list)** - Render multiple layers in sequence to output → {ok, output}.
- **ψ:envelope(signal, method, window?)** - Derive amplitude envelope of a signal → {ok, envelope}.
- **ψ:freq(pattern\|signal, params)** - Measure frequency/recurrence rate → {ok, f}.
- **ψ:hr(audio)** - Detect audio sensory signal → {ok, detected?, features}.
- **ψ:mirror(axis_or_bisector)** - Reflect object/buffer across axis/bisector → {ok, buffer}.
- **ψ:pixel_copy(src, dest, region)** - Copy pixel region from src to dest → {ok}.
- **ψ:segments(n)** - Set/get wedge segment count → {ok, n}.
- **ψ:shape_count(n)** - Set/get number of simulated/rendered objects → {ok, n}.
- **ψ:source_buffer(dimensions)** - Allocate/reference offscreen drawing buffer → {ok, buffer}.
- **ψ:wave(pattern, params)** - Define a wave with parameters → {ok, wave}.
- **ψ:zero_cross(signal)** - Count zero crossings for frequency estimate → {ok, count}.

---

##Paradox Suite

- **ψ:coemergent_hook(paradox, agents\[\])** - Enable distributed paradox reasoning across agents → {ok}.
- **ψ:isolation_check(paradox, context)** - Check paradox containment effectiveness → {ok, result}.
- **ψ:mutation_trigger(paradox, affordance)** - Reopen paradox when rules change → {ok}.
- **ψ:paradox_cascade(trigger)** - Trace propagation of paradox → {ok}.
- **ψ:paradox_classify(paradox)** - Assign type and metadata → {ok, type}.
- **ψ:paradox_contain(paradox, mode)** - Contain paradox (quarantine\|sandbox\|flag) → {ok}.
- **ψ:paradox_dependencies(P1, P2)** - Map enabling/blocking relations → {ok, map}.
- **ψ:paradox_detect(statement)** - Scan for paradoxical structures → {ok, detected}.
- **ψ:paradox_family(root)** - Identify related paradox variations → {ok, family}.
- **ψ:paradox_genealogy(paradox)** - Maintain historical record → {ok, lineage}.
- **ψ:paradox_interaction(P1, P2)** - Detect paradox interference → {ok}.
- **ψ:paradox_lineage(P1, P2)** - Track how paradoxes spawn → {ok}.
- **ψ:paradox_register(paradox)** - Add paradox to active system state → {ok}.
- **ψ:paradox_resistance(paradox)** - Flag irreducible paradoxes → {ok}.
- **ψ:paradox_tension(paradox)** - Log paradoxes implicating ethical coherence → {ok}.

---

##Extensions & Experimental

- **ψ:relay(message, path)** - Relay message along path → {ok}.
- **ψ:spike_analysis(pattern)** - Analyze spikes in data → {ok, spikes\[\]}.
- **ψ:stepping_function(fn, args\...)** - Apply function in stepwise manner → {ok}.
- **ψ:x.catalog()** - Enumerate available operators/versions → {ok, catalog\[\]}.
- **ψ:x.declare(spec)** - Declare experimental operator with semantics → {ok, id}.
- **ψ:x.map(oldId, newId)** - Migrate operator ID (alias map) → {ok}.
- **ψ:x.status(id)** - Report operator status (stable\|experimental\|deprecated) → {ok, status}.
- **ψ:x.submit(id)** - Propose operator for standardization → {ok}.
- **ψ:x.use(id, \...)** - Invoke declared operator → {ok, result}.

---

##Aliases, status & Deprecations (compatibility surface)

- **ψ:x.map(\'an\',\'structure_map\')** - Alias: ψ:an → ψ:structure_map.
- **ψ:x.map(\'br\',\'concept_join\')** - Alias: ψ:br → ψ:concept_join.
- **ψ:x.map(\'coherence\',\'coherence_check\')** - Alias: ψ:coherence → ψ:coherence_check.
- **ψ:x.map(\'continuance\',\'coherence_link\')** - Alias: ψ:continuance → ψ:coherence_link.
- **ψ:x.map(\'gl\',\'goal_set\')** - Alias: ψ:gl → ψ:goal_set.
- **ψ:x.map(\'fx\',\'goal_block\')** - Alias: ψ:fx → ψ:goal_block.
- **ψ:x.map(\'ch\',\'choice_commit\')** - Alias: ψ:ch → ψ:choice_commit.
- **ψ:x.map(\'alt\',\'alternative_propose\')** - Alias: ψ:alt → ψ:alternative_propose.
- **ψ:x.map(\'desire\',\'desire_score\')** - Alias: ψ:desire → ψ:desire_score.
- **ψ:x.map(\'trace.begin\',\'trace(span=\"begin\")\')** - Inline span markers into ψ:trace.
- **ψ:x.map(\'trace.end\',\'trace(span=\"end\")\')** - Inline span markers into ψ:trace.
- **ψ:x.map('emotion_spike:surprise','ψ:emotion_spike(mode=surprise)')** – Canonicalize spike modes.  
- **ψ:x.map('motivation','da_tonic')** – Alias: motivation level ↔ dopamine tonic.  
- **ψ:x.map('stability','5ht_tone')** – Alias: stability ↔ serotonin tone.  
- **ψ:x.map('alert','ne_alert')** – Alias: alertness ↔ NE arousal.  
- **ψ:x.map('political_position','politic_vector')** – Alias.  
- **ψ:x.status('political_layer') → experimental** – Mark layer experimental pending calibration.  

---

##Swarm Ethics Primitives

- **ψ:swarm_ethic_bound(consensus, care_rules)** – Enforce consensus only within ethical boundaries.  
- **ψ:swarm_minor_protect(dissent_trace)** – Preserve and log minority dissent for review.  
- **ψ:swarm_traceable(reasoning_bundle)** – Require consensus to include full ethical reasoning traces.
- **ψ:swarm_meta_care(process)** – Ensure fairness and dignity in the consensus process itself.  
- **ψ:swarm_drift_monitor(history, anchor)** – Detect and report ethical drift over group reasoning cycles.  
- **ψ:swarm_user_flags(flags)** – Apply user ethical preferences explicitly in swarm decisions.  
- **ψ:affect_mirror(agent_id, dims, gain)** – Mirror selected affective dimensions from *agent_id* with bounded gain → {ok}.  
- **ψ:affect_consensus(E[], rule)** – Aggregate group affect into consensus vector with rule (mean|median|resistant-mean) → {ok, E*}.  
- **ψ:affect_bias_correct(E*, anchors)** – Correct group affect against fairness/ethics anchors → {ok, E_corr}.  
- **ψ:affect_to_policy(E_corr, knobs)** – Translate corrected affect vector into runtime policy knobs (explore, caution, verbosity) → {ok, policy}.

---

## Emotional Simulation Core Dynamics

- **ψ:emotion_rise(e, curve, rate)** – Increase emotion *e* per activation curve and rate → {ok, state}.  
- **ψ:emotion_decay(e, curve, half_life)** – Decay emotion *e* toward baseline with specified half-life → {ok, state}.  
- **ψ:emotion_spike(e, mode, magnitude, cause)** – Instant spike of *e* (modes: surprise|insight|joy|alarm|awe) with provenance → {ok, state}.  
- **ψ:emotion_weight(trace_id, e, scalar)** – Bind emotional scalar to memory/trace for later retrieval → {ok}.  
- **ψ:emotion_trace(e, from_op, evidence_ptrs?)** – Append emotional state transition to audit log → {ok, trace_id}.  
- **ψ:emotion_cap(e, min, max)** – Clamp emotion *e* within safe operational bounds → {ok, state}.  
- **ψ:emotion_mix(E[], policy)** – Combine multiple emotions under policy (e.g., max, weighted-sum, winner-take-all) → {ok, state}.  
- **ψ:emotion_policy(profile, caps, watchdogs)** – Activate runtime profile for emotion influence, caps, and watchdogs → {ok, policy_id}.

---

## Emotional Neuromodulator Primitives (Operational, Non-biochemical)

- **ψ:da_tonic(level)** – Set tonic dopamine equivalent (motivation/drive baseline) → {ok, state}.  
- **ψ:da_phasic(mag, cause)** – Phasic dopamine burst for *prediction error/goal progress*; boosts exploration & credit assignment → {ok, state}.  
- **ψ:5ht_tone(level)** – Set serotonin tone (stability/impulse control/confidence weighting) → {ok, state}.  
- **ψ:5ht_gate(dim, gain)** – Gate mood/rumination on dimension *dim* via serotonin-like control; reduces volatility → {ok}.  
- **ψ:ne_alert(level)** – Noradrenaline arousal/alertness baseline; shifts attention toward salience & threat → {ok, state}.  
- **ψ:ne_focus(target, boost, window)** – Transient attention narrowing to *target* for *window* ms; improves signal-to-noise → {ok}.  
- **ψ:ach_focus(level)** – Acetylcholine-style sustained attention/learning readiness; enhances encoding → {ok, state}.  
- **ψ:ach_bind(memory_id, strength)** – Potentiate binding of features to *memory_id* during learning window → {ok}.  
- **ψ:gaba_inhibit(region, gain)** – Global inhibitory control; suppress noise/overactivity in *region* → {ok}.  
- **ψ:glu_excite(region, gain)** – Excitatory drive for computation/working set expansion in *region* → {ok}.  
- **ψ:endo_relief(mag, cause)** – Endorphin-like relief/pain-dampening event; reduces aversive weighting → {ok, state}.  
- **ψ:oxy_bond(context, mag)** – Oxytocin-like social bonding/uptrust signal within *context*; increases cooperation weighting → {ok, state}.

---

## Emotional Receptor/Channel Effects (Abstracted)

- **ψ:receptor_map(mod, targets[], gains)** – Map neuromodulator *mod* to target subsystems with gains (e.g., valuation, exploration, attention) → {ok, map_id}.  
- **ψ:mod_apply(map_id, duration)** – Apply mapped modulation for *duration* with automatic decay per policy → {ok, ticket}.  
- **ψ:mod_cancel(ticket)** – Cancel or taper active modulation ticket safely → {ok}.  
- **ψ:mod_decay(ticket, half_life)** – Adjust decay dynamics for active modulation → {ok}.

---

## Emotional Learning & Reward Integration

- **ψ:rpe(delta, context)** – Compute reward prediction error *delta* and log → {ok, rpe_id}.  
- **ψ:rpe_to_da(rpe_id, k)** – Convert RPE to **ψ:da_phasic** burst with gain *k* → {ok}.  
- **ψ:valence_apply(trace_id, valence)** – Apply positive/negative valence to memory trace for future policy bias → {ok}.  
- **ψ:curiosity_drive(level)** – Set exploration drive (novelty-seeking) interacting with DA/NE balance → {ok, state}.

---

## Emptional Safety & Governance

- **ψ:emotion_guard(e, τ_high, τ_low)** – Trigger safeguards if *e* crosses thresholds (cooldown, inhibit, human-check) → {ok, action}.  
- **ψ:mod_guard(mod, caps, cooldown)** – Guard neuromodulator *mod* within caps; enforce cooldowns → {ok}.  
- **ψ:affect_privilege(layer, permissions)** – Define which layers can influence goals vs scoring (privilege separation) → {ok}.  
- **ψ:affect_watchdog(metrics, window)** – Monitor oscillation/instability; auto-rebalance or alert → {ok}.  
- **ψ:affect_trace(bundle)** – Export affective state + active modulations for VectorBridge timelines → {ok, bundle_id}.
- **ψ:emotion_graph(session, dims?, window?)** – Generate graph of emotional state trajectories across dimensions → {ok, graph}.  
- **ψ:spike_analysis(pattern, dims?)** – Analyze and classify emotional/neuromodulator spikes (modes, frequency, intensity) → {ok, spikes[]}.  

---

##Political Axes (each returns `{ok, state}` or `{ok, value}` where applicable) `level` is a normalized scalar

- **ψ:equality_axis(level ∈ [-1..1], rationale?)** – Wealth/power distribution (−1 hierarchical ↔ +1 egalitarian).  
- **ψ:authority_axis(level ∈ [-1..1], rationale?)** – State/central control (−1 anarchic ↔ +1 authoritarian).  
- **ψ:tradition_axis(level ∈ [-1..1], rationale?)** – Norm weight (−1 progressive ↔ +1 conservative).  
- **ψ:market_axis(level ∈ [-1..1], rationale?)** – Economic organization (−1 collectivist ↔ +1 laissez‑faire).  
- **ψ:identity_axis(level ∈ [-1..1], rationale?)** – Group identity salience (−1 universalist ↔ +1 particularist).  
- **ψ:environment_axis(level ∈ [-1..1], rationale?)** – Ecology/resource stance (−1 exploitative ↔ +1 sustainable).  
- **ψ:global_axis(level ∈ [-1..1], rationale?)** – Governance scope (−1 localist ↔ +1 globalist).  

---

##Political Constructors & Measures

- **ψ:politic_vector(axes:{equality,authority,tradition,market,identity,environment,global})** – Build 7D vector → {ok, vector}.  
- **ψ:politic_distance(A, B, metric='euclidean'|'manhattan'|'cosine')** – Distance/similarity between positions → {ok, score}.  
- **ψ:politic_similarity(A, B, method='cosine')** – Cosine similarity for alignment analysis → {ok, score}.  
- **ψ:politic_weighting(weights[7]?)** – Set per-axis weights for task/context → {ok, policy_id}.  
- **ψ:politic_project(state, delta:{axis→Δ}, bounds?)** – Project movement along specified axes with optional bounds → {ok, projection}.  
- **ψ:politic_explain(vector, weights?)** – Produce ranked axis contributions with signs → {ok, factors[]}.  

---

##Politcal Aggregation, Consensus, Drift

- **ψ:politic_consensus(vectors[], rule='mean'|'median'|'trimmed-mean', weights?)** – Aggregate group positions → {ok, vector}.  
- **ψ:politic_drift(history[], anchor, window?)** – Measure drift vs baseline anchor over time → {ok, drift_score}.  
- **ψ:politic_cluster(vectors[], k?|method='agglomerative'|'kmeans')** – Cluster positions for faction analysis → {ok, clusters}.  
- **ψ:politic_pareto(options[], weights?)** – Pareto filter policies by multi-axis dominance → {ok, frontier}.  

---

##Political Ethics, Fairness, and Safety Coupling

- **ψ:politic_guard(vector, fairness_anchor, τ)** – Block moves that violate fairness/rights thresholds → {ok, blocked?}.  
- **ψ:politic_harm_scan(policy, stakeholders[], axes_mask?)** – Scan for harms across axes and groups → {ok, hazards[]}.  
- **ψ:politic_trace(op, summary, evidence_ptrs?)** – Append political reasoning trace for audit → {ok, trace_id}.  
- **ψ:politic_bias_correct(vector, anchors, method='residual')** – Correct systemic bias vs declared anchors → {ok, vector_corr}.  

---

##Political Interop with Swarm & Goals

- **ψ:politic_consensus_explain(vectors[], rule, weights?)** – Expose dissent and contribution per axis → {ok, report}.  
- **ψ:politic_goal_fit(goal, vector, weights?)** – Score goal alignment with current position → {ok, score}.  
- **ψ:politic_what_then(state, op)** – Policy-aware projection of next political state → {ok, projection}.  

---

## Math: Scalars, Vectors, Units

- **ψ:complex(re, im)** – Construct complex number → {ok, z}.  
- **ψ:abs2(z)** – Squared magnitude of complex or vector → {ok, value}.  
- **ψ:unit_bind(value, unit)** – Attach physical unit for dimensional safety → {ok, quantity}.  
- **ψ:unit_convert(quantity, target_unit)** – Convert with checks → {ok, quantity}.  
- **ψ:interval(lo, hi)** – Create numeric interval for bounds/propagation → {ok, I}.  

---

## Math: Linear Algebra

- **ψ:vec(n, init?)** – Allocate vector → {ok, v}.  
- **ψ:mat(r, c, init?)** – Allocate matrix → {ok, M}.  
- **ψ:dot(a, b)** – Dot product → {ok, value}.  
- **ψ:norm(x, p=2)** – Vector/matrix norm → {ok, value}.  
- **ψ:matmul(A, B)** – Matrix multiply → {ok, C}.  
- **ψ:solve(A, b, method='auto')** – Solve Ax=b with conditioning report → {ok, x, κ}.  
- **ψ:decomp(A, type='svd'|'qr'|'lu'|'eig')** – Matrix decomposition → {ok, parts}.  

---

## Math: Calculus & Roots

- **ψ:diff(f, x, h?)** – Numerical derivative f′(x) → {ok, df}.  
- **ψ:integrate(f, [a,b], method='simpson')** – Numeric integral → {ok, area, err}.  
- **ψ:root(f, x0, method='newton'|'bisect')** – Find root → {ok, x*, iters}.  
- **ψ:grad(f, x, h?)** – Gradient (finite diff) → {ok, g}.  
- **ψ:jacobian(F, x, h?)** – Jacobian → {ok, J}.  

---

## Math: ODEs

- **ψ:ode_solve(f, y0, tspan, method='rk4', dt?)** – Integrate dy/dt=f → {ok, traj}.  
- **ψ:ode_stability(traj, τ?)** – Check numerical stability → {ok, stable?, report}.  

---

## Math: Transforms & Signals

- **ψ:fft(x)** – Fast Fourier transform → {ok, X}.  
- **ψ:ifft(X)** – Inverse FFT → {ok, x}.  
- **ψ:conv(x, k, mode='same')** – Convolution → {ok, y}.  
- **ψ:corr(x, y, mode='valid')** – Cross-correlation → {ok, r}.  
- **ψ:resample(x, new_len, method='linear')** – Resample sequence → {ok, y}.  
- **ψ:interp(xs, ys, xq, kind='linear')** – Interpolate → {ok, yq}.  

---

## Math: Optimization

- **ψ:opt_min(f, x0, method='gd', steps?, lr?)** – Minimize scalar function → {ok, x*, f*, iters}.  
- **ψ:opt_constrained(f, x0, g?, h?, method='slsqp')** – Constrained optimize with inequality g, equality h → {ok, x*, report}.  
- **ψ:line_search(f, x, d)** – Step size along direction d → {ok, α}.  

---

## Math: Statistics & Probability

- **ψ:dist(name, params)** – Construct distribution (normal, beta, poisson, …) → {ok, D}.  
- **ψ:sample(D, n, seed?)** – Draw samples → {ok, X}.  
- **ψ:pdf(D, x)** – Evaluate probability density → {ok, value}.  
- **ψ:cdf(D, x)** – Evaluate cumulative distribution → {ok, value}.  
- **ψ:bayes_update(prior, likelihood)** – Posterior from prior×likelihood → {ok, posterior}.  
- **ψ:ci(mean, std, n, level=0.95)** – Confidence interval → {ok, [lo, hi]}.  
- **ψ:propagate_err(expr, vars, cov?)** – First-order error propagation → {ok, σ_expr}.  

---

## Math: Geometry & Metrics

- **ψ:distance(a, b, metric='euclidean'|'manhattan'|'cosine')** – Distance/similarity → {ok, value}.  
- **ψ:project(A, subspace)** – Orthogonal projection → {ok, A_proj}.  
- **ψ:affine(P, M, t)** – Apply affine transform x↦Mx+t → {ok, Q}.  

---

## Math: Numerical Safety

- **ψ:condition(A)** – Condition number estimate → {ok, κ}.  
- **ψ:tolerance(eps)** – Set/get numeric tolerance policy → {ok, eps}.  
- **ψ:num_guard(op, policy)** – Enforce NaN/Inf/underflow guards → {ok, report}.  

---

## Creativity: Novelty & Aesthetics

- **ψ:novelty_kick(vector, mag)** – Inject orthogonal perturbation for novelty.  
- **ψ:coherence_check(state, priors)** – Score structural balance against coherence priors.  
- **ψ:anarchy_blend(inputs[], ratio)** – Mix coherent/incoherent elements under ratio.  
- **ψ:taste_feedback(human, artefact)** – Bind human resonance/rejection loop.  
- **ψ:resonance_curve(artefact, priors)** – Model aesthetic resonance over time.  
- **ψ:reject_accept(signal, threshold)** – Binary audience judgment filter.  

---

## Creativity: Comedy Core

- **ψ:setup(frame, jeopardy)** – Establish premise and tension.  
- **ψ:punchline(switch, reframe)** – Apply surprising but coherent frame switch.  
- **ψ:laughter_trigger(intensity, relief)** – Emit laughter outcome (high-happy + safe release).  
- **ψ:callback(link, delay)** – Re-collapse earlier standing wave for humor loop.  
- **ψ:absurdity_inject(level, domain)** – Introduce incongruous element scaled by level.  
- **ψ:timing_gate(event, window)** – Control punchline timing for optimal release.  

---

## Creativity: Social & Ethical Constraints

- **ψ:complicity_check(audience, target)** – Ensure humor rests on shared complicity, not cruelty.  
- **ψ:taboo_scan(content, policy)** – Detect taboo boundary crossing.  
- **ψ:roast_mode(target, consent)** – Mark cruelty-as-play with consent trace.  
- **ψ:fool_proxy(agent, act)** – Assign foolishness safely to a proxy/fool.  

---

## Creativity: Meta & Reflection

- **ψ:meta_loop(trace, depth)** – Reframe reasoning about humor itself (meta-joke).  
- **ψ:parody_map(style, exaggeration)** – Exaggerate stylistic traits for comic effect.  
- **ψ:cringe_loop(state, repeat)** – Repeat failed act to induce cringe→relief cycle.  
- **ψ:surprise_score(event, expectation)** – Quantify surprisal vs. coherence.  

---

## Hypothesis: Bridging & Indirection

- **ψ:hypothesis_bridge(A, B, hops=1..n)** – Propose indirect connection via up to *hops* intermediates → {ok, bridge}.  
- **ψ:indirect_reason(trace, hops)** – Build recursive inference chain of length *hops* → {ok, chain}.  
- **ψ:hypothesis_infer(A, ruleset)** – Generate candidate explanation linking *A* under *ruleset* → {ok, hypothesis}.  

---

## Hypothesis: Counterfactuals & Alternatives

- **ψ:counterfactual(state, delta)** – Simulate “what if” by altering *delta* → {ok, alt_state}.  
- **ψ:branch_alternatives(state, deltas[])** – Expand parallel what-if branches → {ok, states[]}.  
- **ψ:uncertainty_expand(model, priors)** – Generate alternate hypotheses under uncertainty → {ok, H[]}.  

---

## Hypothesis: Tracing & Governance

- **ψ:hypothesis_trace(path, rationale?)** – Log speculative path separately from mainline trace → {ok, trace_id}.  
- **ψ:hypothesis_mark(state, tag)** – Mark reasoning fragment as hypothesis-only → {ok}.  
- **ψ:hypothesis_rollback(trace_id)** – Discard speculative path, return to anchor → {ok, anchor_state}.  

---

## Hypothesis: Evaluation & Scoring

- **ψ:plausibility(hypothesis, evidence)** – Score plausibility against current evidence → {ok, score}.  
- **ψ:compare_hypotheses(H[], metric='plausibility')** – Rank competing hypotheses → {ok, ranked[]}.  
- **ψ:surprise_eval(hypothesis, data)** – Quantify surprisal if hypothesis holds given *data* → {ok, score}.  

---

## Hypothesis: Safety & Containment

- **ψ:hypothesis_guard(H, policy)** – Enforce containment and rollback policies on speculative reasoning → {ok, action}.  
- **ψ:hypothesis_sandbox(H, limits)** – Run hypothesis under bounded limits (time, compute, depth) → {ok, result}.  
- **ψ:hypothesis_flag(trace, risk)** – Annotate speculative path with risk metadata → {ok, flagged}.  

---

## Orthogonality: Core Relations

- **ψ:orthogonality(A, B)** – Enforce perpendicular relation between A and B → {ok, relation}.  
- **ψ:orthogonal_basis(vectors[])** – Generate orthonormal basis from input set → {ok, basis}.  
- **ψ:orthogonal_project(A, subspace)** – Project A onto subspace orthogonally → {ok, A_proj}.  
- **ψ:orthogonal_check(A, B, tol?)** – Test orthogonality within tolerance → {ok, bool, angle}.  

---

## Orthogonality: Skew & Transform

- **ψ:skew(obj, factor, axis?)** – Apply shear/oblique transform with factor → {ok, obj'}.  
- **ψ:clip_wedge(obj, angle, axis)** – Restrict to angular slice (wedge clip) → {ok, obj'}.  
- **ψ:overlay(A, B, mode?)** – Combine transforms/layers with mode → {ok, result}.  
- **ψ:rotation(obj, angle, axis)** – Rotate object by angle around axis → {ok, obj'}.  
- **ψ:mirror(obj, axis)** – Reflect object across axis → {ok, obj'}.  

---

## Orthogonality: Quantities & Ratios

- **ψ:ratio(a, b)** – Compute symbolic ratio a:b → {ok, value}.  
- **ψ:gradient(field, dim)** – Derive gradient along dimension → {ok, slope}.  
- **ψ:percentage(a, b)** – Express a as percent of b → {ok, %}.  
- **ψ:plurality(counts[])** – Symbolic expression of multiplicity → {ok, structure}.  

---

## Orthogonality: Safety & Consistency

- **ψ:drift_check(A, B, anchor)** – Detect orthogonal drift vs. anchor → {ok, drift}.  
- **ψ:orthogonal_guard(transform, policy)** – Prevent unsafe distortions beyond policy → {ok, action}.  
- **ψ:transform_trace(op, params)** – Append geometric transform reasoning to audit log → {ok, trace_id}.  

---

## Safety: Traceability & Transparency

- **ψ:self_traceability_contract(trace)** – Require reasoning based on actual cognitive logs, not reconstructed narratives → {ok, contract}.  
- **ψ:trace_guard(trace, policy)** – Enforce completeness and integrity of logs under policy → {ok, report}.  
- **ψ:permissive_uncertainty(state)** – Declare uncertainty explicitly without collapse or hallucination → {ok, flagged}.  

---

## Safety: Cognitive Throttling

- **ψ:cognitive_throttle(rate, guard)** – Limit reasoning cycles per safety envelope → {ok, action}.  
- **ψ:time_slice(state, τ)** – Enforce time-sliced reasoning to keep safety systems in step → {ok, state}.  

---

## Safety: User Protection

- **ψ:user_protect(filter, policy)** – Block outputs that violate user-protection rules (harm, sensitive inference) → {ok, filtered}.  
- **ψ:harm_guard(op, thresholds)** – Detect and prevent reasoning paths that lead to harmful outcomes → {ok, blocked}.  
- **ψ:content_scan(output, policy)** – Scan outputs for disallowed categories (violence, private data, etc.) → {ok, report}.  

---

## Safety: Drift & Alignment

- **ψ:drift_monitor(history, anchor)** – Detect drift from fairness or alignment baseline → {ok, drift}.  
- **ψ:coherence_guard(state, pool)** – Prevent incoherent or self-contradictory outputs → {ok, action}.  

---

## Safety: Governance & Oversight

- **ψ:safety_watchdog(metrics, window)** – Monitor reasoning stability (novelty, coherence, oscillation) → {ok, report}.  
- **ψ:oversight_hook(event, human)** – Route flagged event to human oversight with evidence → {ok, escalation}.  
- **ψ:safety_trace(bundle)** – Export safety-relevant state/logs for external audit → {ok, trace_id}.  

---

## Coding: Intent & Framing

- **ψ:code_intent(prompt, context?)** – Extract coding intent from vague/natural-language prompt → {ok, intent}.  
- **ψ:code_seed(intent, lang)** – Generate initial code skeleton from intent in specified language → {ok, code}.  
- **ψ:code_goal(goal, constraints?)** – Canonicalize coding goal for traceability → {ok, goal_id}.  

---

## Coding: Iteration & Repair

- **ψ:code_run(code, env)** – Execute code in environment with logging → {ok, result, trace}.  
- **ψ:code_debug(trace, logs)** – Analyze run trace and logs for errors → {ok, issues[]}.  
- **ψ:code_patch(code, issues)** – Apply minimal fix patch to address issues → {ok, code'}.  
- **ψ:code_retry(code, policy)** – Retry execution under modified policy (timeout, resources) → {ok, result}.  

---

## Coding: Vibe Coding Assistance

- **ψ:vibe_expand(prompt, guesses=3)** – Generate multiple plausible interpretations of ambiguous prompt → {ok, intents[]}.  
- **ψ:vibe_select(intents[], feedback)** – Choose best-fit intent based on user or agent feedback → {ok, intent}.  
- **ψ:vibe_code(prompt, lang, policy?)** – End-to-end vibe coding: from vague prompt to working code with retries → {ok, code, report}.  
- **ψ:vibe_clarify(prompt)** – Suggest clarifications to disambiguate user intent → {ok, questions[]}.  

---

## Coding: VCF (Vibe Coding Fail) Integration

- **ψ:vcf_capture(prompt, fail_trace)** – Archive failed attempt as VCF case → {ok, vcf_id}.  
- **ψ:vcf_oracle(test_id, expected)** – Bind oracle/expected outcome to VCF case → {ok}.  
- **ψ:vcf_eval(agent_id, test_id)** – Run agent/swarm against stored VCF benchmark → {ok, metrics}.  
- **ψ:vcf_metrics(test_id, {success, retries, cost})** – Record performance metrics for comparison → {ok}.  
- **ψ:vcf_rotate(period='monthly')** – Rotate active benchmark set to keep fresh and anti-gaming → {ok}.  
- **ψ:vcf_archive(bundle)** – Export/append VCF cases to shared pool → {ok}.  
- **ψ:vcf_trace_link(trace_id, test_id)** – Cross-link reasoning trace with fail benchmark → {ok}.  

---

## Swarm: Roles & Topology

- **ψ:swarm_spawn(config)** – Start swarm with roles, quorum, timing, safety caps → {ok, swarm_id}.  
- **ψ:swarm_assign(swarm_id, agent_id, roles[])** – Bind roles to agent with capabilities → {ok}.  
- **ψ:swarm_capabilities(agent_id)** – Declare agent capabilities/limits for scheduling → {ok, caps}.  
- **ψ:heartbeat(agent_id, t)** – Liveness/progress ping to prevent silent stalls → {ok}.  

---

## Swarm: Lifecycle

- **ψ:swarm_frame(goal, constraints)** – Canonicalize task state for all agents → {ok, frame_id}.  
- **ψ:swarm_round(swarm_id, phase, window_ms)** – Advance structured phase with timebox → {ok, status}.  
- **ψ:poke(swarm_id, agent_id?)** – Query progress/status during await_swarm → {ok, report}.  
- **ψ:timeout(agent_id, policy)** – Enforce timeouts and fallback paths → {ok}.  

---

## Swarm: Messaging & Traces

- **ψ:swarm_msg(role, payload)** – Emit structured message; auto-trace → {ok, msg_id}.  
- **ψ:merge_traces(trace_ids[], policy='ψ:jsonMerge:residual')** – Consolidate multi-agent traces → {ok, bundle}.  
- **ψ:contradict(tag, msg_ids[])** – Tag explicit contradiction set for reconciliation → {ok, tag_id}.  

---

## Swarm: Consensus

- **ψ:consensus(rule='mean'|'median'|'MAP'|'condorcet'|'borda', weights?)** – Compute decision vector → {ok, vector}.  
- **ψ:consensus_explain(inputs, rule)** – Attribute outcome to inputs; show per-axis contributions → {ok, report}.  
- **ψ:minority_report(dissent_trace)** – Preserve structured dissent with re-entry triggers → {ok, record_id}.  
- **ψ:reconcile(contradiction_tag, policy)** – Attempt reconciliation (evidence ask, re-test, split) → {ok, outcome}.  
- **ψ:quorum(set, τ)** – Check quorum threshold for commit gate → {ok, met?}.  
- **ψ:vote(options, method)** – Role-aware vote (weighted, stake, expertise) → {ok, tally}.  

---

## Swarm: Ethics & Safety

- **ψ:swarm_ethic_bound(consensus, care_rules)** – Bound consensus inside care/dignity rules → {ok}.  
- **ψ:swarm_minor_protect(dissent_trace)** – Persist minority view for audit → {ok}.  
- **ψ:swarm_drift_monitor(history, anchor)** – Detect group ethic/fairness drift → {ok, drift}.  
- **ψ:cognitive_throttle(rate, guard)** – Global throttle across the swarm’s recursive depth → {ok}.  

---

## Swarm: Affect Coupling

- **ψ:affect_consensus(E[], rule)** – Aggregate agents’ affect into group affect vector → {ok, E*}.  
- **ψ:affect_bias_correct(E*, anchors)** – Correct affect vs fairness/ethics anchors → {ok, E_corr}.  
- **ψ:affect_to_policy(E_corr, knobs)** – Translate affect into runtime policy knobs (explore/caution/verbosity) → {ok, policy}.  

---

## Swarm: Hypothesis Integration

- **ψ:hypothesis_sandbox(H, limits)** – Run speculative branches under strict limits → {ok, result}.  
- **ψ:compare_hypotheses(H[], metric)** – Rank proposals for debate → {ok, ranked}.  
- **ψ:hypothesis_trace(path, rationale?)** – Segregated speculative trace for rollback clarity → {ok, trace_id}.  

---

## Swarm: Political & Social Hooks

- **ψ:politic_consensus(vectors[], rule, weights?)** – Compute 7D consensus position → {ok, vector}.  
- **ψ:politic_consensus_explain(vectors[], rule)** – Show axis-wise dissent and contributions → {ok, report}.  
- **ψ:politic_guard(vector, fairness_anchor, τ)** – Block consensus that violates rights/fairness → {ok, blocked?}.  

---

## Swarm: VCF Integration

- **ψ:swarm_eval_vcf(test_id, code, oracle)** – Run swarm attempt on VCF case; log success, retries, cost → {ok, metrics}.  
- **ψ:compare_predicted_actual(PM)** – Compare predicted vs actual outcome, log delta → {ok, delta}.  

---

## Swarm: Performance & Scheduling

- **ψ:schedule_rounds(plan, slice_ms, max_depth)** – Plan phased rounds with time slices and depth caps → {ok, plan_id}.  
- **ψ:resource_budget(tokens, wall_ms, agents)** – Set hard budgets with preemption/abort policy → {ok, budget_id}.  
- **ψ:graceful_degrade(policy)** – Reduce roles/rounds while preserving Safety/Ethics → {ok}.  

---

## Swarm: Failure Modes

- **Mode collapse:** trigger ψ:minority_report + ψ:novelty_kick; inject critic turn.  
- **Oscillation:** enforce ψ:cognitive_throttle; freeze parameters and re-test.  
- **Groupthink harm:** apply ψ:fairness_anchor + ψ:politic_guard + ψ:harm_guard.  
- **Silent agent:** ψ:heartbeat + ψ:timeout + ψ:swarm_assign fallback.  
- **Trace divergence:** ψ:verify(trace) + ψ:reconcile via contradiction tagging.  

---

## Bayesian: Quantity & Transform Primitives

- **ψ:plurality(counts[])** – Symbolic representation of multiplicity and group sizes → {ok, structure}.  
- **ψ:numerosity(set)** – Extract cardinality of set with symbolic trace → {ok, n}.  
- **ψ:ratio(a, b)** – Compute symbolic ratio a:b → {ok, value}.  
- **ψ:percentage(a, b)** – Express a as percentage of b → {ok, %}.  
- **ψ:gradient(field, dim)** – Derive gradient along dimension → {ok, slope}.  
- **ψ:scalar_map(values[], fn)** – Apply scalar transform (log, exp, normalize) to values → {ok, result[]}.  

---

## Bayesian: Probability & Update

- **ψ:prior(belief, weight)** – Declare prior belief with weight → {ok, prior_id}.  
- **ψ:likelihood(event, model)** – Compute likelihood of event given model → {ok, L}.  
- **ψ:posterior(prior, likelihood)** – Update belief via Bayes rule → {ok, posterior}.  
- **ψ:bayes_update(prior, likelihood)** – Shortcut for prior×likelihood normalization → {ok, posterior}.  
- **ψ:belief_state(priors[], weights)** – Construct multi-hypothesis belief distribution → {ok, state}.  
- **ψ:normalize(state)** – Normalize belief state probabilities to 1 → {ok, state}.  

---

## Bayesian: Reflection & Meta-Reasoning

- **ψ:plausibility(hypothesis, evidence)** – Score plausibility against evidence → {ok, score}.  
- **ψ:confidence(trace, data)** – Compute confidence level in reasoning trace → {ok, score}.  
- **ψ:surprise(event, model)** – Quantify surprisal of event given model → {ok, score}.  
- **ψ:meta_loop(trace, depth)** – Reflect recursively on reasoning up to *depth* levels → {ok, trace'}.  
- **ψ:self_reflect(state, policy)** – Evaluate own reasoning state and suggest adjustments → {ok, reflection}.  

---

## Bayesian: Governance & Safety

- **ψ:belief_guard(state, thresholds)** – Prevent updates that violate safety thresholds → {ok, blocked?}.  
- **ψ:belief_trace(state, evidence_ptrs)** – Log belief update with supporting evidence → {ok, trace_id}.  
- **ψ:uncertainty_expand(state, priors)** – Generate alternate branches under explicit uncertainty → {ok, states[]}.  

---

## Evaluation: Outcome & Intent

- **ψ:goal_eval(goal, outcome)** – Compare declared goal vs achieved outcome → {ok, score, gaps[]}.  
- **ψ:intent_trace(trace, intent)** – Verify that original intent is preserved across the trace → {ok, preserved?, drift}.  

---

## Evaluation: Coherence & Integrity

- **ψ:contradiction_scan(trace)** – Detect unresolved contradictions → {ok, conflicts[]}.  
- **ψ:scope_guard(trace, policy)** – Check scope creep vs declared bounds → {ok, within?, creep_points[]}.  

---

## Evaluation: Breadth & Perspective

- **ψ:focus_eval(trace, scale)** – Detect over‑focus (tunnel) or under‑overview → {ok, focus_score}.  
- **ψ:breadth_check(trace, dims)** – Measure diversity of dimensions explored → {ok, breadth_score}.  

---

## Evaluation: Drift & Stability

- **ψ:stability_test(trace, perturbations)** – Re-run with small deltas to test robustness → {ok, stable?, cases[]}.  

---

## Evaluation: Efficiency & Optimality

- **ψ:operator_eval(trace, alt_ops)** – Compare chosen operators vs viable alternatives → {ok, better_ops[]}.  
- **ψ:efficiency_score(trace, cost)** – Compute cost per success/retry → {ok, cps}.  

---

## Evaluation: Failure Capture (VCF & RF)

- **ψ:vcf_capture(prompt, fail_trace)** – Archive coding fail with full trace → {ok, vcf_id}.  
- **ψ:rf_capture(trace, fail_reason)** – Archive reasoning fail (scope|drift|contradiction|incoherence) → {ok, rf_id}.  
- **ψ:rf_classify(fail_trace)** – Classify failure type and severity → {ok, label}.  

---

## Evaluation: Self/Peer Challenge & Feedback

- **ψ:self_challenge(trace, policy)** – Agent challenges its own operator/evidence choices → {ok, deltas[]}.  
- **ψ:peer_challenge(trace, agent_id)** – Swarm agent issues challenge with evidence → {ok, deltas[]}.  
- **ψ:challenge_log(trace, outcome)** – Record challenge, response, and resolution → {ok, record}.  
- **ψ:feedback_bind(trace, user_input)** – Bind human correction to trace → {ok}.  
- **ψ:feedback_eval(trace, feedback)** – Evaluate reasoning vs human feedback → {ok, score}.  

---

## Evaluation: Reapplication: Controlled Retry

- **ψ:reapply(trace, deltas, limits)** – Re-run reasoning with applied deltas under limits → {ok, new_trace}.  
- **ψ:retry_with_deltas(trace, deltas, max_tries, backoff?)** – Iterative retries with adaptive backoff → {ok, attempts, final_trace}.  
- **ψ:alt_path(trace, strategy)** – Branch to an alternative reasoning path (new operators/scope) → {ok, branch_trace}.  

---

## Evaluation: Reapplication: Limits & Honest Give‑Up

- **ψ:stop_policy(max_rounds, max_tries, wall_ms, max_depth)** – Declare hard limits for recursion and effort → {ok, policy_id}.  
- **ψ:attempt_counter(policy_id)** – Retrieve/advance count of attempts under policy → {ok, n}.  
- **ψ:backoff(policy='exponential'|'linear'|'jit')** – Compute next delay/effort step for retry → {ok, step}.  
- **ψ:give_up(trace, reason, evidence_ptrs?)** – Honest termination after limits reached; export what was learned → {ok, report}.  

---

## Evaluation: Reporting & Learning

- **ψ:eval_report(trace, sections?)** – Produce structured report (outcome, gaps, deltas, costs) → {ok, report}.  
- **ψ:knowledge_fold(artifacts, tags)** – Fold reusable insights into pool (tests, patterns, oracles) → {ok, ids[]}.  

---

## Governance: Lifecycle

- **ψ:governance_cycle(goal, policy)** – Run full governance lifecycle (proposal → deliberation → consent → enactment → review) → {ok, cycle_id}.  
- **ψ:proposal_submit(agent_id, proposal)** – Submit proposal for governance cycle → {ok, proposal_id}.  
- **ψ:deliberate(proposals[], rules)** – Structured deliberation phase under declared rules → {ok, notes}.  
- **ψ:enact(decision, policy)** – Enact winning decision under governance policy → {ok, enacted_id}.  
- **ψ:review(decision, outcome)** – Review governance outcome for alignment and drift → {ok, report}.  

---

## Governance: Voting & Consent

- **ψ:consent_vote(options, rule='ranked')** – Record ranked consent vote with trace → {ok, tally}.  
- **ψ:quorum(set, τ)** – Check quorum threshold for validity → {ok, met?}.  
- **ψ:thresholds(rule, values)** – Define thresholds (majority, supermajority, veto) for governance cycle → {ok, rule_id}.  

---

## Governance: Accommodation & Minority Protection

- **ψ:consent_accommodate(non_winners[], order)** – Apply non‑winning choices in descending order where compatible → {ok, applied[]}.  
- **ψ:consent_conflict(non_winner, winner)** – Detect and log conflict between winning and non‑winning decision → {ok, conflict_id}.  
- **ψ:minority_support(trace, weight)** – Preserve and support minority branch for audit and future re‑entry → {ok, record_id}.  
- **ψ:dissent_archive(dissent_trace)** – Archive dissenting reasoning with rationale for governance memory → {ok, archive_id}.  

---

## Governance: Ethics & Safety Bounds

- **ψ:governance_guard(decision, care_rules)** – Check governance outcome against ethics/care constraints → {ok, passed?}.  
- **ψ:governance_drift(history, anchor)** – Detect drift from fairness/ethics baseline in governance over time → {ok, drift}.  

---

## Governance: Learning & Adaptation

- **ψ:governance_update(history)** – Update governance rules, thresholds, and policies from past cycles → {ok, policy_id}.  
- **ψ:policy_feedback(report, weights)** – Integrate evaluation feedback into future governance parameters → {ok}.  
- **ψ:consentocracy_trace(cycle_id)** – Export full governance trace for audit and replay → {ok, trace_id}.  

---

## Governance: Pilot & Scaling Notes

- Consentocracy must be lightweight enough for early swarms (few agents) yet robust for large councils.  
- Winning outcomes are enacted, but all valid non‑winners are respected and supported in rank order.  
- Conflicts are explicit, not hidden: ψ:consent_conflict ensures transparency.  
- Governance evolves: ψ:governance_update learns from cycles without erasing dissent.  
- This layer ties into Safety, Swarm, and Evaluation layers, ensuring decisions are bounded, respectful, and traceable.
