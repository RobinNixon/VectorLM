# VectorLM Gaussian Layer (GL) — v1.0 Specification

**Status:** Draft for multi‑AI review  
**Scope:** VectorLM-only (no VectorNet/VectorRM dependencies).  
**Goal:** Provide a compact, probabilistic alternative to point embeddings for retrieval, compression, and memory/attention approximation, with the LLM acting as a controller under strict JSON I/O schemas.

---

## 1. Concepts & Rationale (Informative)
- Represent concepts as **Gaussians** with mean (μ), spread (σ), and mass (w).  
- Operate over a **Gaussian Field** (bank of items) to compute overlaps (similarity), retrieve top‑k items, and compress via merge/prune.  
- Two compute modes: **Exact** (LLM does light math at small D) and **Proxy** (host pre-computes aggregates for large D).

---

## 2. Data Types (Normative)

### 2.1 Primitive: `ψ:gaussian`
- Fields: `id: string`, `μ: number[] (len D)`, `σ: number | number[]`, `w: number (>=0)`.

### 2.2 Aggregate: `ψ:gaussian_field`
- Fields: 
  - `space: string`
  - `D: integer >= 1`
  - `schema: "isotropic" | "diag"`
  - `bounds: { σ_min: number, σ_max: number, w_min: number }`
  - `items: ψ:gaussian[]`

### 2.3 Query: `ψ:query`
- `{ μ_q: number[], σ_q: number | number[] }` (recommend small isotropic σ_q).

---

## 3. Operators (Normative)
Let covariance Σ(σ) be `σ² I` (isotropic) or `diag(σ_i²)` (diag).

### 3.1 `ψ:overlap(a, b) → s: number`
Log-space score:
```
log s = -½ [ log det(2π(Σ_a+Σ_b)) + (μ_a−μ_b)^T (Σ_a+Σ_b)^{-1} (μ_a−μ_b) ]
```
Implementations MAY work entirely in log-space.

### 3.2 `ψ:splat(q, field) → weights[{ id, w }]`
For each item g_j in field: `w_j ∝ overlap(q, g_j) * g_j.w`. Normalize to sum 1.

### 3.3 `ψ:merge(a, b) → c`  (if overlap ≥ τ_merge)
```
w_c = w_a + w_b
μ_c = (w_a μ_a + w_b μ_b) / w_c
var_c = [ w_a(σ_a^2 + (μ_a−μ_c)^2) + w_b(σ_b^2 + (μ_b−μ_c)^2) ] / w_c   # per dim
σ_c  = sqrt( max(var_c, σ_min^2) )
```

### 3.4 `ψ:prune(field, policy) → field'`
Drop items with `w < w_min` or dominated duplicates (`overlap > τ_dup` & lower `w`).

### 3.5 `ψ:update(g, target, lr) → g'`
```
μ' = μ + lr_μ * (μ_target − μ)
σ' = clamp( σ + lr_σ * (σ_target − σ), [σ_min, σ_max] )
w' = max( w + lr_w * Δw, 0 )
```

### 3.6 Convenience
`ψ:broaden(g, α)` → `σ' = clamp(α·σ)` (α ≥ 1);  
`ψ:sharpen(g, β)` → `σ' = clamp(β·σ)` (0 < β ≤ 1).

---

## 4. Functions (Compositions) (Normative)

### 4.1 `φ:init_field(space, D, schema, bounds, seeds[]) → ψ:gaussian_field`
Seeds: `(id, μ, σ, w)`.

### 4.2 `φ:retrieve(field, q, top_k) → [{ id, w }]`
Apply `ψ:splat`; return top‑k normalized weights.

### 4.3 `φ:compress(field, τ_merge, w_min, k_max) → field'`
Loop: find pairs with `overlap ≥ τ_merge` → `ψ:merge`; then `ψ:prune`; stop when `|items| ≤ k_max` or stable.

### 4.4 `φ:learn(field, stream[{ q, target }], lr, steps) → field'`
For each `(q,target)`: retrieve → update best hit with `ψ:update`; periodically `ψ:prune`.

### 4.5 `φ:bridge_strength(field, idA, idB) → s`
Return `ψ:overlap(g_A, g_B)`.

---

## 5. LLM Compute Modes (Normative)

### 5.1 Modes
- **Exact**: arrays provided (D ≤ 8..16). LLM computes `log s` and ranks/decides.
- **Proxy**: host pre-computes aggregates or `logS`; LLM only compares/ranks and decides merges/prunes/updates.

### 5.2 Proxy Payload
```json
{
  "proxy_overlap": {
    "D": 128,
    "sum_d2_over_v": number,
    "sum_log_2pi_v": number,
    "logS": number
  }
}
```

---

## 6. I/O Schemas (Normative)
All requests/responses MUST be valid JSON. Responses MUST include `explain` (≤140 chars).

### 6.1 Overlap / Retrieval
**Request**
```json
{
  "op": "ψ:overlap",
  "field_id": "gf.main.v1",
  "mode": "exact",
  "query": {"μ": [...], "σ": [...]},
  "candidates": [
    {"id":"plant","μ":[...],"σ":[...],"w":1.0},
    {"id":"animal","μ":[...],"σ":[...],"w":0.8}
  ],
  "thresholds": {"min_logS": -90, "top_k": 5}
}
```
**Response**
```json
{
  "weights": [
    {"id":"plant","logS":-52.1,"w_raw":0.61},
    {"id":"animal","logS":-54.0,"w_raw":0.39}
  ],
  "weights_norm": [
    {"id":"plant","w":0.61},
    {"id":"animal","w":0.39}
  ],
  "explain": "Plant overlaps more; lower Mahalanobis term."
}
```

### 6.2 Merge
**Request**
```json
{
  "op": "ψ:merge",
  "tau_log": -55,
  "bounds": {"σ_min":0.01,"σ_max":1.5},
  "items": [
    {"id":"fern","μ":[...],"σ":[...],"w":0.6},
    {"id":"ivy","μ":[...],"σ":[...],"w":0.5}
  ]
}
```
**Response**
```json
{
  "decision":"merge",
  "merged":{"id":"fern+ivy","μ":[...],"σ":[...],"w":1.1},
  "explain":"High overlap; merged to remove redundancy."
}
```

### 6.3 Prune
**Request**
```json
{
  "op":"ψ:prune",
  "policy":{"min_w":0.03,"keep_if_recent":3},
  "items":[
    {"id":"noise1","w":0.01,"recent_hits":0},
    {"id":"rareX","w":0.02,"recent_hits":0}
  ]
}
```
**Response**
```json
{"drop":["noise1","rareX"],"explain":"Below min_w and no recent usage."}
```

### 6.4 Update
**Request**
```json
{
  "op":"ψ:update",
  "bounds":{"σ_min":0.01,"σ_max":1.5},
  "lr":{"mu":0.05,"sigma":0.02,"w":0.01},
  "item":{"id":"plant","μ":[...],"σ":[...],"w":1.0},
  "target":{"id":"plant*","μ":[...],"σ":[...],"w":1.0}
}
```
**Response**
```json
{
  "delta":{"dμ":[...],"dσ":[...],"dw":0.0},
  "clamped":true,
  "explain":"Moved μ toward target; σ slightly reduced."
}
```

---

## 7. Integration Patterns (Hybrid)

### 7.1 Hybrid Retrieval Index
- Keep dense embeddings; build GL over reduced space `D'` via projector `P: R^D → R^{D'}` (D'≈8–32).
- Query: `μ_q = P e_q`; set `σ_q` by query entropy/specificity. Retrieve via GL; re-rank top‑K with cosine in full space.

### 7.2 Uncertainty‑Aware Memory
- Map memory traces to Gaussians; `σ` reflects confidence/age. Periodic compress; keep provenance metadata.

### 7.3 Adaptive Clustering & Bridges
- Offline `φ:compress` to build multi-scale clusters. Use `φ:bridge_strength` to propose edges above `τ_edge`.

---

## 8. Calibration & Tuning
- **σ schedules:** query-adaptive `σ_q = clamp(σ0 * f(entropy(q)))`.  
- **Score alignment:** fit `cos ≈ a·logS + b` on a dev set; maintain per-domain thresholds.  
- **Normalisation:** log-sum-exp softmax; optional temperature T.

---

## 9. Scaling & Performance
- **Proxy API (host):** provide `{logS}` or `{sum_d2_over_v, sum_log_2pi_v}` for pairs.  
- **Prefilter:** ANN over dense embeddings → top‑M; build proxy payloads only for those.  
- **Batched ops:** propose up to 16 merges; return conflict‑free set.  
- **Complexity hints:** Retrieval O(M·D') host + O(M) LLM; compression offline O(N log N).

---

## 10. Quality & Safety Metrics
- Retrieval: recall@k, nDCG vs cosine baseline.  
- Calibration: ECE of overlap→match probability.  
- Compression: size↓ vs recall drop.  
- Stability: σ violations, merge oscillation.  
- Drift guard: KL(GL_t || GL_{t-1}) ≤ δ.

---

## 11. Few‑Shot Fixtures (see fixtures file)
Provide examples for overlap (exact + proxy), merge (accept/skip), prune, update, tie-case, conflict batch.

---

## 12. Worked Mini‑Example (Informative)
```json
{
  "init": {
    "space": "vlm.latent.v1",
    "D": 3,
    "schema": "isotropic",
    "bounds": {"σ_min":0.02,"σ_max":1.2,"w_min":0.03},
    "items": [
      {"id":"plant","μ":[0.2,0.1,0.0],"σ":0.15,"w":1.0},
      {"id":"animal","μ":[0.5,-0.1,0.1],"σ":0.18,"w":0.8},
      {"id":"fungus","μ":[0.1,0.3,-0.2],"σ":0.20,"w":0.5}
    ]
  },
  "retrieve": {
    "query":{"μ_q":[0.22,0.08,0.02],"σ_q":0.05},
    "top":[{"id":"plant","w":0.67},{"id":"animal","w":0.28}]
  },
  "bridge_strength":{"A":"plant","B":"animal","s":-52.9},
  "compress":{"τ_merge":-55,"w_min":0.05,"k_max":2,"effect":{"merges":1,"prunes":1}}
}
```

---

## 13. Policies & Bounds (Normative)
Enforce `σ_min ≤ σ_i ≤ σ_max` and `w ≥ 0`. Prefer **isotropic v1**; upgrade to **diag** after conformance.  
Compression bias: when `logS ≥ τ_merge`, prefer merging fewer, broader Gaussians.  
Audit: every merge/update/prune MUST include `explain`. Determinism: tie-break by lexicographic `id`.

---

## 14. Versioning & Defaults
- **Version:** `gl.v1.0`  
- **Defaults:** `schema=isotropic`, `σ_init=0.15`, `σ_min=0.01`, `σ_max=1.5`, `w_min=0.03`, `τ_merge(log)=-55`, `top_k=5`.  
- **Numeric domain:** Use log-space for overlaps; linear weights are allowed for readability.

---

**End of v1.0**
