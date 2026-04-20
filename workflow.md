---
description: >-
  Per-step hands-on workflow for the AfriGen-D ISB Cape Town 2026 tutorial.
  Data prep, QC, run, and verify checklists for every session in the
  schedule.
---

<!-- markdownlint-disable MD024 -->
<!-- MD024 disabled deliberately: the four stages
     "Data prep / QC / Run / Verify" repeat on purpose
     at every step -- that is the page's whole point. -->

# Hands-on Workflow

A single reference page for the entire hands-on
portion of the workshop. Every step from the
[schedule](/schedule) appears below with an explicit
**Data prep · QC · Run · Verify** block -- the same
four-part rhythm every time, so nothing is skipped.

::: tip Keep this tab open during the workshop
Open `/workflow` in a browser tab next to the
[tutorial](/tutorial) and work through the checklists
as you go. When stuck, check the current block -- did
you skip a data-prep step? Did you run QC before
interpreting?
:::

## The shape of every hands-on step

Every block follows the same structure:

<!-- markdownlint-disable MD013 -->

| Stage | What it covers |
| --- | --- |
| **Data prep** | File format, genome build, sample/variant filters, paths |
| **QC** | Pre-run sanity checks: MAF, missingness, HWE, ref match, allele orientation |
| **Run** | The actual tool invocation (UI click path or command) |
| **Verify** | Post-run checks: expected outputs exist, plots are sane, numbers match expectations |

<!-- markdownlint-enable MD013 -->

If any stage fails, back up one stage rather than
ploughing ahead. A failed `Verify` at step 3 usually
means a missed `QC` at step 2.

---

## Step 1 -- GWAS on SPARSE data (baseline)

::: info Schedule
**14:55--15:10 (15 min)** -- runs immediately after
the theory slot. The *point* is to see a thin,
under-powered Manhattan plot so imputation feels
motivated.
:::

**Goal:** produce a baseline Manhattan + QQ plot from
the **sparse** input VCF (~4,400 variants on chr22),
establishing what GWAS "looks like" before imputation.

**Tutorial cross-reference:**
[§10 Basic GWAS Visualization](/tutorial#_10-basic-gwas-visualization)
for Manhattan / QQ plot basics;
[§11 Case Study](/tutorial#_11-case-study-complete-imputation-and-gwas-workflow)
walks the full sparse → impute → compare loop end-to-end.

### Data prep

- [ ] Download the sparse VCF:
  [`1k_afr_661_samples_4k_variants_hg38_agsc2025_chr22.vcf.gz`](/data/1k_afr_661_samples_4k_variants_hg38_agsc2025_chr22.vcf.gz)
  (~225 KB, bgzipped, chr22, hg38)
- [ ] Download the phenotype file:
  [`1k_afr_661_samples_phenotype.txt`](/data/1k_afr_661_samples_phenotype.txt)
- [ ] Confirm both files opened locally -- open with
  a text editor or `zcat` to see a VCF header and a
  `FID IID B1` phenotype header
- [ ] Note the genome build (**hg38**) -- must match
  downstream reference panels

### QC

- [ ] VCF is valid: `gunzip -t <file>` (or in-browser
  upload check) -- no corruption
- [ ] Variant count ~4,400, sample count ~661
- [ ] Phenotype file has one row per sample + a
  header; sample IDs match the VCF's `#CHROM` line
- [ ] Single chromosome (chr22) -- intentional for
  demo speed
- [ ] No samples excluded for relatedness or missing
  phenotype (already filtered upstream in the
  prepared dataset)

### Run

::: warning Live-platform limitation (April 2026)
FedImpute's **GWAS Training** pipeline wizard only
uploads VCF files; the Phenotype File field expects
the file pre-staged on the backend, and without it
the job fails at `UPDATE_PHENOTYPE` with *"cannot
open ... No such file or directory"*. Until that's
fixed, **run GWAS locally with PLINK** on the sparse
VCF (same phenotype file). See
[tutorial §10.2](/tutorial#_10-2-using-the-gwas-visualization-notebook-hands-on)
for the notebook-based path.
:::

Either:

- [ ] **Local PLINK (recommended for the live
  session):** load `plot_r2_distribution.ipynb` /
  `gwas_visualization.ipynb` with the sparse VCF
  and phenotype file, run PLINK2 logistic GWAS
  (`B1 → logistic`), save Manhattan + QQ plots.
- [ ] **FedImpute GWAS Training (pre-staged
  phenotype):** launch the pipeline, upload the VCF,
  type the phenotype filename in the text field,
  submit -- but only if the workshop-day admin has
  confirmed the pheno file is staged on the backend.

### Verify

- [ ] Pipeline completes (should be fast on this
  small input -- seconds to a minute)
- [ ] Download results and inspect:
  - [ ] **Manhattan plot:** visibly thin / sparse --
    gaps across chr22, hard to see a signal
  - [ ] **QQ plot:** most points hug the identity
    line (no inflation), but the low-p tail is
    truncated because there aren't enough variants
- [ ] Save the plots -- you will compare them with
  the post-imputation plots at step 4
- [ ] Note the **total variant count** used in GWAS
  (you'll compare this number too)

::: warning Pacing
This step is deliberately quick (15 min). If
participants are stuck on data prep / upload, help
them fast -- the narrative hinges on *everyone*
having a baseline plot to compare against later.
:::

---

## Step 2 -- Submit the imputation job

::: info Schedule
**15:10--15:35 (25 min)** -- account, upload,
configure, submit. The job runs on the server while
you continue to Step 3 (Download + QC) in the next
slot; for a chr22-only input of this size, typical
wall-clock is well under 25 min.
:::

**Goal:** submit a chr22 imputation job on FedImpute
using the H3Africa reference panel.

**Tutorial cross-reference:**
[§2 Getting Started](/tutorial#_2-getting-started)
(account + login),
[§5 Data Preparation](/tutorial#_5-data-preparation-before-upload)
(VCF QC + bgzip + sort),
[§6 Submitting an Imputation Job](/tutorial#_6-submitting-an-imputation-job)
(upload → panel → configure → submit).

### Data prep

- [ ] Same sparse VCF from step 1 (no re-prep needed
  for this dataset; but in the real world you'd bgzip
  and tabix-index each chromosome)
- [ ] Confirm bgzip format (`file <vcf>` → "BGZF")
  not plain gzip
- [ ] Confirm genome build (**hg38**) matches the
  panel you will choose -- if panel is hg19 you need
  a liftover first
  ([tutorial §4.3.3](/tutorial#vcf-liftover))

### QC

- [ ] **Allele Switch Checker** (checkref): run on
  the sparse VCF to flag positions where your `REF`
  disagrees with the panel's `REF` -- swap or drop
  before submitting
  ([tutorial §4.3.2](/tutorial#allele-switch-checker-checkref))
- [ ] Sample count within service limits (≤ 110,000
  samples for the legacy service; verify FedImpute
  limits on the day)
- [ ] No private / PHI data being uploaded
  (confirmed: tutorial dataset is public)

### Run

FedImpute's **New Job** flow is a 5-step wizard at
[`/jobs/new`](https://fedimpute.afrigen-d.org/jobs/new):

- [ ] Log in to **FedImpute** via AfriGen-D Identity
  SSO:
  [`fedimpute.afrigen-d.org/login`](https://fedimpute.afrigen-d.org/login)
- [ ] **Step 1 — Select Workflow:** click
  **Genotype Imputation** → Continue
- [ ] **Step 2 — Select Service:** AfriGen-D
  Genotype Imputation Server (only node online);
  note **Max File Size 500 MB** → Continue
- [ ] **Step 3 — Select Panel:** **H3Africa v6
  (full)** for sparse input (more overlap, more
  forgiving of thin SNP array coverage). African-
  only is smaller but tutorial input is too sparse
  for it; see [tutorial §6.3](/tutorial#_6-3-select-panel)
  for why. → Continue
- [ ] **Step 4 — Upload & Configure:** drag & drop
  `1k_afr_661_samples_4k_variants_hg38_agsc2025_chr22.vcf.gz`;
  set **Job Name** to something searchable
  (e.g. `isb-2026-chr22-sparse-v6full`); leave
  Array Build `hg38`, Phasing `eagle`, rsq Filter
  `0`, Mode **Quality Control & Imputation**. →
  Continue
- [ ] **Step 5 — Review & Submit:** verify the
  summary, tick **both Data Use Agreement**
  checkboxes, then click **Submit Job**
- [ ] Note the **job UUID** in the URL after submit
  (`/jobs/<uuid>`) -- save it for the download step

### Verify

- [ ] Job enters "queued" then "running" within ~30s
- [ ] No upload error, no QC failure on the service
  side -- if it fails, back up to the QC stage above
- [ ] Job progress visible in the jobs list
- [ ] **Proceed to Step 3** while the job runs in the
  background -- for a chr22 / 661-sample input the
  job typically finishes within the 25-min Step 3
  slot

::: warning If submission fails
Most submission failures are one of three things:
**(1) wrong genome build** (panel/input mismatch),
**(2) allele-switch errors** (skipped checkref), or
**(3) file-format** (plain gzip not bgzip). Back up
to the relevant QC checklist item.
:::

---

## Step 3 -- Download imputed results + R² QC

::: info Schedule
**15:35--16:00 (25 min)** -- job should complete
during this slot; download results and assess
imputation quality by R². Finish before the break at
16:00.
:::

**Goal:** pull down the imputed VCF + stats, filter
by R², and confirm you have a markedly denser variant
set.

**Tutorial cross-reference:**
[§7 Monitoring Job Progress](/tutorial#_7-monitoring-job-progress),
[§8 Downloading Results](/tutorial#_8-downloading-results),
[§9 Quality Assessment](/tutorial#_9-quality-assessment)
(R² interpretation + filtering).

### Data prep

- [ ] Job from step 2 is in **Completed** state
- [ ] Have the **job ID** or jobs-list row open
- [ ] Free disk space for the imputed output
  (chr22-only → tens of MB for this dataset)

### QC

- [ ] Download: imputed VCF(s), per-chromosome stats
  / `info` file, RO-Crate provenance package (new in
  FedImpute)
- [ ] Unzip / inspect the `info` or `.info.gz` file
  -- should contain `SNP`, `REF`, `ALT`, `MAF`, `R2`
  columns (or platform equivalent)
- [ ] Variant count **much greater** than the input
  (~4,400 → hundreds of thousands, panel-dependent)

### Run

- [ ] Plot **R² distribution** (histogram) across all
  imputed variants -- most imputed SNPs should sit
  above R² 0.5 for a well-matched panel
- [ ] Plot **R² vs MAF** (binned) -- rare variants
  (MAF < 0.01) are the harder ones; their R² will
  skew lower
- [ ] Apply the standard filter: **R² > 0.3** (keep)
  or R² > 0.8 (stringent) -- see
  [tutorial §9](/tutorial#9-quality-assessment)
- [ ] Save the filtered imputed VCF for step 4

### Verify

- [ ] R² histogram shape is sensible (bulk of
  variants ≥ 0.5, low-R² tail mostly rare variants)
- [ ] Filtered variant count is still **much larger**
  than the sparse input -- otherwise the panel match
  was bad (review panel choice and re-submit)
- [ ] RO-Crate manifest is present and references the
  input VCF, reference panel, tool versions -- this
  is your provenance trail

::: tip If R² is unexpectedly low
Likely causes: (1) panel-population mismatch (see
[Sengupta et al. 2023](/theory#what-the-benchmark-actually-says)
-- HRC on African samples is a known failure mode),
(2) genome build mismatch that survived submission,
(3) allele-switch issues that degraded phasing.
:::

---

## Step 4 -- GWAS on IMPUTED data + comparison

::: info Schedule
**16:30--17:00 (30 min, first slot after the break)**
-- the payoff. Re-run GWAS on the imputed VCF,
compare plots side-by-side with the baseline from
step 1.
:::

**Goal:** see the Manhattan plot **fill in**, the QQ
tail **extend**, and understand what imputation
bought you.

**Tutorial cross-reference:**
[§10 Basic GWAS Visualization](/tutorial#_10-basic-gwas-visualization)
(Manhattan + QQ + sparse/imputed comparison);
[§11 Case Study](/tutorial#_11-case-study-complete-imputation-and-gwas-workflow)
has the fully-worked comparison with interpretation.

### Data prep

- [ ] Filtered imputed VCF from step 3 (R² > 0.3 at
  minimum)
- [ ] Same phenotype file from step 1 (unchanged)
- [ ] Baseline plots from step 1 saved and to hand

### QC

- [ ] Sample IDs still match phenotype file (no
  samples dropped by imputation)
- [ ] Filter by MAF (≥ 0.01 typical -- or match what
  you used in the baseline for a fair comparison)
- [ ] Post-imputation HWE filter if your study design
  needs it
- [ ] Confirm genome build unchanged (hg38)

### Run

Same live-platform caveat as Step 1: the FedImpute
**GWAS Training** wizard doesn't accept phenotype
uploads as of April 2026. Prefer the local path for
a like-for-like comparison with Step 1:

- [ ] Re-run the GWAS locally with PLINK on the
  **imputed dose VCF** (post R² > 0.3 filter from
  Step 3)
- [ ] Keep the same phenotype, model (logistic), and
  thresholds (MAF ≥ 0.01, missingness 0.1) as Step 1
- [ ] The imputed dose VCF is much larger than the
  sparse baseline -- expect minutes, not seconds,
  for PLINK to finish

### Verify

- [ ] Manhattan plot shows **much denser coverage**
  across chr22 -- gaps filled in
- [ ] QQ plot tail extends to smaller p-values --
  more statistical power
- [ ] Genomic inflation factor (λ) should still be
  close to 1.0 (not inflated by imputation)
- [ ] Compare side-by-side with baseline from step 1
  -- this is the *teaching moment*
- [ ] Variant count used in GWAS: imputed >> baseline
  (note the magnitude of the increase)

::: warning If the QQ plot is inflated
Over-inflation (λ >> 1) after imputation usually
means: a low-quality R² bin slipped through (raise
the R² threshold), or population-structure
correction was dropped -- include PCs if not already.
:::

---

## Step 5 -- AGMP pharmacogenomic lookup

::: info Schedule
**17:00--17:20 (20 min)** -- move from discovery
(GWAS) to curation-backed interpretation.
:::

**Goal:** for a small variant set from the imputed
output, look up curated pharmacogenomic evidence in
AGMP and export a TSV of drug-gene-variant
associations.

**Page cross-reference:** [`/agmp`](/agmp) -- the
dedicated AGMP session page. Covers data at a glance
(17,470 variants, 6,270 genes, 48 drugs, 1,579
phenotypes), portal objectives, and the hands-on
exercises that use this step's checklist.

### Data prep

- [ ] A short-list of variants from step 4 to look up
  (e.g. top hits from the imputed GWAS, or pick from
  the [golden-variant set](#golden-variants))
- [ ] Extract variant identifiers (rsID preferred;
  `chr:pos:ref:alt` otherwise)
- [ ] Note genome build (hg38) -- AGMP's data are
  build-agnostic for rsIDs but explicit for
  coordinates

### QC

- [ ] Confirm rsIDs resolve -- malformed IDs return
  empty results and waste time
- [ ] If using `chr:pos:ref:alt`, alleles are in the
  same orientation AGMP expects (check one variant
  by hand against the database)

### Run

- [ ] Visit <https://agmp.afrigen-d.org>
- [ ] For each variant:
  - Search → by **Variant**, **Gene**, **Drug**, or
    **Phenotype** (pick the most specific)
  - Review the result page: gene, drug, association,
    evidence level, original study
- [ ] Export results as TSV/CSV from the Summary or
  detail view

### Verify

- [ ] Each variant you searched either returns an
  evidence row or a clear "not in AGMP" result
- [ ] Exported TSV opens in your editor / Excel and
  has the expected columns
- [ ] For at least one variant, the AGMP evidence
  **agrees** with what you'd expect from a global
  resource like PharmGKB (sanity check)

::: tip Wire back to the imputation
Pick a variant that was imputed at R² > 0.8 in your
step 3 output. Discuss: would a GWAS-array-only study
have missed this variant? (Often yes, and that is the
biocuration payoff.)
:::

---

## Step 6 -- AGVD population-frequency comparison

::: info Schedule
**17:20--17:35 (15 min)** -- the "frequency
interpretation in the right population" story.
:::

**Goal:** for the same variants as step 5, pull
AGVD's population-cluster frequencies and compare
against gnomAD-African / 1000G-AFR.

**Page cross-reference:** [`/agvd`](/agvd) -- the
dedicated AGVD session page. Covers the 11 population
clusters (Western / Eastern / Southern / Central /
Northern Africa + Ex-Africa + global comparators),
the MAF threshold filter, and the three hands-on
exercises mapped onto this step's checklist.

### Data prep

- [ ] Same variant short-list from step 5 (rsIDs or
  `chr:pos:ref:alt`)
- [ ] A second tab open on gnomAD (<https://gnomad.broadinstitute.org>)
  or 1000 Genomes Browser for the comparison
- [ ] Decide on an AGVD release (default
  `AGVD_24A_Main`) for reproducibility

### QC

- [ ] Alleles in the orientation AGVD expects
  (important -- a flipped allele looks like a
  totally different frequency)
- [ ] Variants present in the chosen AGVD release
  (older releases may not have all variants)
- [ ] Genome build matches the release

### Run

- [ ] Visit <https://agvd.afrigen-d.org/search>
- [ ] Choose release (e.g. `AGVD_24A_Main`)
- [ ] For each variant, search and read frequencies
  by **Cluster**: Western / Eastern / Southern /
  Central / Northern Africa / Ex-Africa / Europe /
  Asia etc.
- [ ] Note any variant where African clusters
  disagree significantly (MAF ≥ 2-3× difference)
- [ ] In parallel, look up the same variant in
  gnomAD-African and 1000G-AFR

### Verify

- [ ] At least one variant shows a clear
  **sub-continental** difference (the AGVD value for
  it)
- [ ] Your gnomAD-AFR "flat" value is meaningfully
  different from the AGVD cluster-specific value
- [ ] For a candidate pathogenic variant: check
  whether the AGVD African-cluster MAF crosses ACMG
  **BA1** (>5%) or **BS1** (>1%) thresholds -- would
  you classify differently using AGVD vs gnomAD?

::: tip The workshop's payoff
A variant can be "rare globally" and "common in West
Africa". ACMG classification using gnomAD-global can
miscall such variants -- AGVD's sub-continental view
catches this. This is the whole argument for
population-specific curation.
:::

---

## Golden variants {#golden-variants}

The **golden set** of 3-5 example variants for steps
5-6 is being chosen by the instructor ahead of the
workshop. They will be:

- Imputable from the chr22 sparse input (R² > 0.8)
- Present in AGMP with pharmacogenomic evidence
- Present in AGVD with cluster-level frequency
  divergence
- Ideally at least one where African-specific
  frequency flips an ACMG BA1 (>5%) or BS1 (>1%)
  classification

Expect a table of 3-5 variants here on the workshop
day.

<!-- TODO(mamana): fill in the golden variant table
     once the set is chosen. See ROADMAP.md. -->

---

## Integration: end-of-session recap (17:35--17:45, 10 min)

By this point participants have, in 3 hours:

1. Baseline GWAS on sparse data (step 1)
2. Imputation submission with panel selection (step 2)
3. Imputed-output QC by R² (step 3)
4. GWAS on imputed data + comparison (step 4)
5. Pharmacogenomic lookup in AGMP (step 5)
6. Population-frequency comparison in AGVD (step 6)

Every step had an explicit **Data prep · QC · Run ·
Verify** rhythm. Every step used a community-curated,
African-specific resource. The provenance chain --
sparse VCF → phased/imputed VCF (RO-Crate) → GWAS
output → AGMP/AGVD lookup -- is auditable end-to-end.

That is biocuration-first analysis.

## Troubleshooting index

- Legacy imputation troubleshooting:
  [tutorial §13](/tutorial#_13-troubleshooting)
- FedImpute-specific issues:
  <https://helpdesk.afrigen-d.org>
- AGMP / AGVD data issues:
  [afrigen-d.org](https://afrigen-d.org) → contact
