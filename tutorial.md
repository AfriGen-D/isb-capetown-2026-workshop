# Genotype Imputation and Data Analysis for African Populations

A hands-on tutorial using AfriGen-D's curated African
genomic resources: the **FedImpute** federated
imputation platform, the **African Genomic Medicine
Portal (AGMP)**, and the **African Genome Variation
Database (AGVD)**.

**Event:** 19th Annual International Biocuration
Conference (ISB Cape Town 2026)  
**Date:** Monday, 20 April 2026, 14:00--18:00 SAST (targets 17:45 finish)  
**Venue:** Atlantic I, Lagoon Beach Hotel Conference
Centre and Spa, Milnerton, Cape Town, South Africa  
**Duration:** 3 h 45 min content + 15-min buffer  
**Organiser:** Mr Mamana Mbiyavanga (UCT / AfriGen-D)  

::: tip Captured against the live FedImpute platform
All sections below have been validated against the
current production platform at
<https://fedimpute.afrigen-d.org>. Screenshots show
the real UI you will see on the day: the
dashboard, New Job wizard, reference-panel
catalogue, Files and Logs tabs, and AGMP / AGVD
portals.
:::

::: info Checklist for each hands-on step
Each slot in the [schedule](/schedule) has an explicit
**Data prep · QC · Run · Verify** checklist on the
[`/workflow`](/workflow) page. Keep it open in a second
tab during the live session and tick each item as you
go -- especially the QC steps, which are where
imputation jobs typically fail silently.
:::

::: tip Tutorial narrative -- GWAS → impute → GWAS
The live workshop walks participants through a
**before-and-after loop**: run GWAS on the sparse input
genotypes first, see the thin Manhattan plot, then
submit an imputation job, download the imputed output,
and re-run GWAS. The comparison (sparse vs imputed
Manhattan + QQ) shows in pictures what panel-specific
accuracy numbers tell in tables.

The written tutorial below follows a more
textbook-linear order (introduction → account →
prepare → submit → download → QC → GWAS) but the
**live session uses the narrative ordering in
[`/schedule`](/schedule)**: GWAS first, then
imputation, then GWAS again. When re-capturing the
FedImpute step-by-step, fold the tutorial's existing
GWAS section in *twice* -- once as a baseline before
submission, once as the payoff after download.
:::

---

## 0. The FedImpute Platform

**FedImpute** (Federated Genotype Imputation Platform)
is AfriGen-D's unified, GA4GH-native interface to
**African-hosted** imputation infrastructure. You
sign in once with your AfriGen-D Identity, and
FedImpute routes your job to an African imputation
node -- currently the **H3Africa panel backend
hosted on the ILIFU research cloud at UCT**, with
additional federated African nodes to follow.
Michigan and TOPMed imputation servers are
**separate, non-federated services** -- FedImpute is
designed as an African-first alternative to them, not
a front-end over them.

![FedImpute landing page at fedimpute.afrigen-d.org](/images/fedimpute/00-landing-full.png)

### Why Federated?

- **African-led, African-hosted.** All infrastructure
  runs on the ILIFU research cloud at the University
  of Cape Town. Data stays in South Africa under
  POPIA.
- **One account, many panels.** Log in with your
  AfriGen-D Identity (SSO). Discover reference panels
  across all connected nodes; jobs are routed
  transparently.
- **Built on GA4GH standards.** The platform
  implements Beacon v2, DRS v1.5.0, WES v1.1.0,
  GA4GH Passport/Visa, Service Info, Data Connect
  v1.0.0, TRS v2, and RO-Crate.
- **Free for academic researchers.**

### Three-step workflow

1. **Discover** (Data Connect): query reference panels
   by build, population, continent, across federated
   nodes.
2. **Access** (DRS + Passport): authenticate via SSO,
   resolve DRS URIs, use visa-based access control
   for controlled datasets.
3. **Compute** (WES + RO-Crate): submit imputation
   jobs to federated WES nodes, track progress live,
   download results with full RO-Crate provenance.

### Log in

![FedImpute login screen -- single "Sign in with AfriGen-D Identity" SSO button](/images/fedimpute/01-login.png)

The login page is deliberately minimal: **one SSO
button** that redirects you to AfriGen-D Identity
(Kibali) at
[kibali.afrigen-d.org](https://kibali.afrigen-d.org).
No email / password form lives on FedImpute itself.

If you don't have an account,
[register here](https://kibali.afrigen-d.org/if/flow/afrigend-enrollment/)
-- this SSO account covers FedImpute. AGVD does
**not yet** share the SSO and requires a separate
signup at
<https://nyame.afrigen-d.org/accounts/login/>
(see the AGVD page for beta-release / manual-
activation caveats).

### Architecture (for the curious)

FedImpute has three layers:

<!-- markdownlint-disable MD013 -->

| Layer | Implementation | Role |
| --- | --- | --- |
| Frontend | Next.js (SSR React) | Job submission, monitoring, results |
| Orchestration API | Django + FastAPI | Auth, job routing, status aggregation |
| Backends | H3Africa panel on the ILIFU research cloud at UCT; future African nodes | Imputation via GA4GH-compliant adapters (WES, DRS, Passport) |

<!-- markdownlint-enable MD013 -->

Per the platform's own About page, the current
participating institutions are the **H3Africa
Consortium** and the **University of Cape Town /
ILIFU**.

**Current network state (April 2026):** 1 online
node (AfriGen-D Genotype Imputation Server at
ILIFU UCT), 32 total CPUs, 213 total jobs run,
4 reference panels exposed. The architecture is
designed for federation across African institutions
-- additional nodes are in onboarding.

---

## Overview

The African Genomics Data Hub (AfriGen-D) provides
essential curated resources and tools specifically
designed for analysing African genetic data, addressing
unique challenges in variant discovery, imputation
accuracy, and knowledge integration. Participants will
engage with real African genomic datasets through
practical exercises, learning to navigate the complete
biocuration pipeline from quality control through
variant annotation.

The workshop emphasises how curated population-specific
reference panels and specialised databases dramatically
improve analytical outcomes. Population-specific
African panels deliver substantially better imputation
accuracy than generic panels when applied to African
cohorts -- for example, [Sengupta et al. 2023][sengupta]
report the African Genome Resource (AGR) panel
achieving a **non-reference discordance rate of
~2.2%** on sub-Saharan African whole-genome samples,
compared to **~7.6%** for the European-focused HRC
panel (≈70% reduction in discordance, or about a
**3.4× accuracy advantage**).

[sengupta]: https://doi.org/10.1016/j.xgen.2023.100332

Through interactive sessions combining theoretical
foundations with hands-on practice, participants will:

- Master **FedImpute** -- the federated imputation
  platform
- Explore **AGMP** -- 17,470 curated variants across
  6,270 genes, 48 drugs, 1,579 phenotypes
- Use **AGVD** -- allele frequencies across 11
  population clusters (Western / Eastern / Southern /
  Central / Northern Africa, plus Ex-Africa cohorts)

This workshop directly contributes to addressing the
severe underrepresentation of African populations in
global genomic databases while building local capacity
for genomic data curation.

**Teaching:** ~2 hours  
**Hands-on exercises:** ~2 hours  

### Learning Objectives

After completing this tutorial, you will be able to:

1. Navigate the **FedImpute** interface at
   <https://fedimpute.afrigen-d.org>
2. Prepare genotype data for imputation (quality
   control)
3. Submit imputation jobs using African-specific
   reference panels
4. Monitor job progress and download results
5. Assess imputation quality using R² metrics
6. Perform basic GWAS visualisation (Manhattan and QQ
   plots)
7. Query AGMP for curated pharmacogenomic variants
   ([see the AGMP session](/agmp))
8. Use AGVD for population-specific allele frequency
   analysis ([see the AGVD session](/agvd))

### Prerequisites

- Laptop with a modern browser (Chrome, Firefox,
  Safari, or Edge)
- AfriGen-D Identity account
  ([register here](https://kibali.afrigen-d.org/if/flow/afrigend-enrollment/))
  -- this SSO account covers FedImpute. AGVD does
  not yet share SSO; register separately at
  <https://nyame.afrigen-d.org/accounts/login/>
- Basic understanding of VCF format is helpful but
  not required

### Tutorial Data

Download the sample data files served by this site:

- [VCF -- chr22, hg38, 661 samples, ~4,400 variants](/data/1k_afr_661_samples_4k_variants_hg38_agsc2025_chr22.vcf.gz)
- [Phenotype file for GWAS analysis](/data/1k_afr_661_samples_phenotype.txt)
- [Browse on GitHub](https://github.com/AfriGen-D/isb-capetown-2026-workshop/tree/main/public/data)

---

## 1. Introduction to Genotype Imputation

### What is Genotype Imputation?

Genotype imputation is a statistical method for inferring unobserved genotypes in a study population based on known genotypes from a reference panel.

> **💡 Key Concept: Imputation**
>
> Think of imputation like filling in the blanks of a puzzle. When you genotype samples using a SNP array, you only measure a subset of all possible genetic variants (~500K-2M SNPs). Imputation uses patterns of **linkage disequilibrium (LD)** - the non-random association between nearby variants - to predict the genotypes at millions of unmeasured positions.

**How it works:**

1. Your **study data** contains genotypes at specific positions (from SNP array)
2. A **reference panel** contains densely genotyped or sequenced individuals
3. The imputation algorithm finds **matching haplotypes** between your samples and the reference
4. It **predicts missing genotypes** based on what's observed in similar haplotypes

The same progression in three pictures
(from the AfriGen-D AGM 2025 reference-panel talk):

**Step 1 — starting state.** Your sample has only a
few known genotypes (top two rows: "GWAS
Haplotypes"). The reference panel below has full
haplotypes from many other individuals.

![Sparse GWAS haplotypes above a dense reference panel of 1000 Genomes haplotypes](/images/imputation-concept/01-gwas-haplotypes.png)

**Step 2 — finding matches.** The algorithm searches
the reference panel for **haplotypes that match your
observed genotypes**. Here the purple, green, and
orange blocks are three reference haplotypes that
align with the sample.

![Reference panel with three matching haplotypes highlighted in purple, orange, and green](/images/imputation-concept/02-match-reference.png)

**Step 3 — imputing the missing genotypes.** The
genotypes carried by the matched reference
haplotypes are transferred into your sample. The
lowercase letters in the top panel are the
**imputed** calls -- inferred, not measured.

![Sample haplotypes now shown as complete sequences with imputed calls filled in as lowercase letters](/images/imputation-concept/03-impute-genotype.png)

*(For the conceptual version of this explanation and
the tool-level details, see the
[Genotype Imputation background page](/imputation).)*

Imputation enables:

- **Increased marker density** for GWAS without additional genotyping costs
- **Meta-analysis** across studies using different genotyping arrays
- **Fine-mapping** of association signals
- **Integration** with sequencing data

### Why African-Specific Reference Panels?

> **💡 Key Concept: Reference Panels**
>
> A **reference panel** is a collection of fully sequenced or densely genotyped individuals used as a template for imputation. The panel contains complete genetic information (haplotypes) that the algorithm uses to "fill in" missing data in your study samples. The more similar your study population is to the reference panel, the better the imputation accuracy.

Sub-Saharan Africa has the greatest human genetic diversity. Standard reference panels (predominantly European) provide:

- ~96% coverage for European populations
- ~77% coverage for African populations

> **💡 Key Concept: Linkage Disequilibrium (LD)**
>
> **LD** is the non-random association between alleles at different positions. When two variants are in high LD, knowing the genotype at one tells you the likely genotype at the other.
>
> - **High LD**: Variants are inherited together (on the same haplotype block)
> - **Low LD**: Variants are inherited independently
>
> LD is the foundation of imputation - we use known variants to predict unknown ones based on their correlation patterns.

**Why does this matter?**

- African populations have **shorter LD blocks** (variants are less correlated over distance)
- Many **African-specific variants** are absent from European panels
- **Haplotype patterns** differ between populations

African-specific panels like those provided by AfriGen-D significantly improve imputation accuracy for African populations because they capture the unique genetic architecture of African genomes.

### Factors Affecting Imputation Quality and Accuracy

Several factors influence how well imputation performs. Understanding these helps you optimize your analysis and interpret results appropriately.

#### 1. Reference Panel Characteristics

| Factor | Impact on Quality |
|--------|-------------------|
| **Panel size** | Larger panels capture more haplotype diversity, improving accuracy |
| **Population match** | Panels matching your study population yield better results |
| **Sequencing depth** | Deeply sequenced panels have fewer errors to propagate |
| **Variant density** | Denser panels provide better coverage of rare variants |

#### 2. Study Data Quality

| Factor | Impact on Quality |
|--------|-------------------|
| **Genotyping accuracy** | Errors in input data propagate through imputation |
| **Missing data rate** | High missingness reduces information for haplotype matching |
| **Sample size** | Larger samples improve phasing accuracy |
| **SNP density** | More typed SNPs provide better scaffold for imputation |

#### 3. Variant-Specific Factors

| Factor | Impact on Quality |
|--------|-------------------|
| **Minor allele frequency (MAF)** | Rare variants (MAF < 1%) are harder to impute accurately |
| **Local LD structure** | Regions with low LD have fewer informative markers nearby |
| **Distance to typed SNPs** | Variants far from typed SNPs have lower accuracy |
| **Structural complexity** | Repetitive regions and CNVs are challenging to impute |

#### 4. Population-Specific Considerations

| Factor | Impact on Quality |
|--------|-------------------|
| **Genetic diversity** | High-diversity populations (e.g., African) require larger, matched panels |
| **Admixture** | Recently admixed populations may need multi-ancestry panels |
| **Population bottlenecks** | Founder populations may have unique haplotypes not in panels |
| **LD decay rate** | Populations with rapid LD decay need denser SNP arrays |

> **💡 Key Insight: The R² Metric**
>
> Imputation quality is typically measured by **R²** (squared correlation between imputed and true genotypes):
> - **R² > 0.8**: High quality - suitable for most analyses
> - **R² 0.3-0.8**: Moderate quality - use with caution
> - **R² < 0.3**: Low quality - consider filtering out
>
> FedImpute provides R² values for each imputed variant, allowing you to filter by quality.

### What FedImpute provides

- Access to African-specific reference panels
  (H3Africa v6 and v7)
- African-hosted infrastructure on the ILIFU research
  cloud at UCT -- data stays in South Africa under
  POPIA
- GA4GH-standards-native job submission, monitoring,
  and provenance (RO-Crate)
- Quality reports and visualisation

---

### 📝 Check Your Understanding: Introduction

<details>
<summary><strong>Question 1:</strong> What is the main purpose of genotype imputation?</summary>

**Answer:** Genotype imputation infers unobserved genotypes in a study population based on known genotypes from a reference panel. This allows researchers to increase marker density for GWAS without additional genotyping costs.

</details>

<details>
<summary><strong>Question 2:</strong> Why do African populations need specific reference panels?</summary>

**Answer:** Sub-Saharan Africa has the greatest human genetic diversity. Standard reference panels (predominantly European) provide only ~77% coverage for African populations compared to ~96% for European populations. African-specific panels significantly improve imputation accuracy.

</details>

<details>
<summary><strong>Question 3:</strong> What percentage coverage do standard European reference panels provide for African populations?</summary>

**Answer:** Approximately 77% coverage, compared to 96% for European populations.

</details>

---

## 2. Getting Started

FedImpute uses **AfriGen-D Identity** single sign-on,
served by the Kibali auth server
(`kibali.afrigen-d.org`). You register once with
Kibali, and the same account is used to log in to
FedImpute.

### 2.1 Creating an account

Open <https://fedimpute.afrigen-d.org/login> in your
browser and click **Register** (top-right) or
**Sign up** (inside the login card).

![FedImpute login page -- single "Sign in with AfriGen-D Identity" SSO button, Sign up link below](/images/fedimpute/01-login.png)

You will be redirected to the **AfriGen-D enrollment
page** at
<https://kibali.afrigen-d.org/if/flow/afrigend-enrollment/>.
Fill in the eight fields -- the first seven are
required, the last (Role / Position) is optional:

![Filled Kibali enrollment form: Full Name, Email, Username, Password, Confirm Password, Institution, Country, Role, two consent checkboxes, blue Continue button](/images/fedimpute/02-enroll-filled.png)

| Field | Expected input | Required |
| --- | --- | --- |
| Full Name | First and last name | ✓ |
| Email | Institutional email recommended | ✓ |
| Username | Unique handle, lowercase, no spaces | ✓ |
| Password | Meet complexity rules shown on the form | ✓ |
| Confirm Password | Same as Password | ✓ |
| Institution / Affiliation | e.g. *University of Cape Town* | ✓ |
| Country | e.g. *South Africa* | ✓ |
| Role / Position | e.g. *Researcher, PhD Student* | — |

Scroll to the bottom and tick the **two consent
checkboxes**:

- "I agree to the AfriGen-D Terms of Service and
  understand that access to controlled datasets
  requires a Data Access Agreement."
- "I have read and accept the Privacy Policy and
  understand my data will be processed per applicable
  regulations."

Click the blue **Continue** button. Kibali sends a
verification email to the address you supplied --
open it and click the confirmation link before
continuing to the next step.

### 2.2 Logging in to FedImpute

Once your email is verified, return to
<https://fedimpute.afrigen-d.org/login> and click
**Sign in with AfriGen-D Identity** (the big green
button). Kibali handles the login prompt in two
steps:

1. **Username step.** Enter your Kibali username (or
   the email address you registered with) and click
   **Log in**.
2. **Password step.** Kibali shows your avatar +
   username, then prompts for the password. Enter
   it and click **Continue**.

![Kibali password prompt showing the avatar/username above the password field](/images/fedimpute/07b-kibali-step2.png)

On success you are redirected back to FedImpute at
`/dashboard`, fully authenticated.

### 🏋️ Exercise 1 -- register, verify, log in

**Task:** create your AfriGen-D Identity, verify your
email, and sign in to FedImpute.

**Steps:**

1. Visit <https://fedimpute.afrigen-d.org/login>.
2. Click **Register**.
3. Fill in the enrollment form and accept both
   consent checkboxes.
4. Click **Continue**.
5. Open your email inbox and click the Kibali
   verification link.
6. Return to <https://fedimpute.afrigen-d.org/login>
   and sign in with **Sign in with AfriGen-D Identity**.

::: tip Workshop-day shortcut
If you already have an AfriGen-D Identity from another
service (AGVD via nyame is a *separate* account --
see the [Accounts note](/agvd#access)), you still
need to register with Kibali to use FedImpute. SSO
across AfriGen-D services is rolling out; as of this
workshop, FedImpute and AGVD have distinct account
systems.
:::

<details>
<summary><strong>✅ Verification checklist</strong></summary>

Confirm you can see, after signing in:

- [ ] You are redirected back to FedImpute (not
  Kibali)
- [ ] "Log in" in the top nav has been replaced with
  your name or account menu
- [ ] You can reach the authenticated area of the
  platform without being redirected again

</details>

---

## 3. Dashboard overview

Once signed in, FedImpute redirects you to
`/dashboard`, which is the main hub for everything
you do on the platform:

![FedImpute dashboard: welcome header, 4 KPI cards, 5 quick-access buttons, federated-nodes card, recent-jobs list](/images/fedimpute/08-dashboard.png)

### Left navigation (7 items)

| Item | Route | What it does |
| --- | --- | --- |
| **Dashboard** | `/dashboard` | Top-level KPIs + quick-access cards (this page) |
| **Nodes** | `/services` | Federated imputation-node catalogue |
| **Jobs** | `/jobs` | Your job history with status + search |
| **New Job** | `/jobs/new` | 5-step wizard to submit a new job |
| **Explorer** | `/explorer` | Browse datasets, results, and reference panels (GA4GH Data Connect) |
| **Workflows** | `/workflows` | All available pipelines and analysis tools |
| **Settings** | `/settings` | Account settings |

### Top-of-page KPIs

Four summary cards at the top of the dashboard:

- **Nodes Online** -- count of federated imputation
  nodes currently reachable (1 as of April 2026)
- **Reference Panels** -- panels discoverable across
  all federated nodes (4 as of April 2026)
- **Total CPUs** -- aggregate compute capacity
  currently registered (32)
- **Standards** -- GA4GH standards implemented (7:
  DRS v1.5.0, WES v1.1.0, Passport/Visa, Service
  Info, Data Connect v1.0.0, TRS v2, RO-Crate)

### Quick-access cards

Below the KPIs, five large action cards take you
straight to the most common tasks:

- **New Job** → submit an imputation or analysis job
- **Browse Nodes** → view node capacity and panels
- **Explore Files** → your uploads, results, and
  the reference-panel catalogue
- **Browse Workflows** → available pipelines
- **My Jobs** → your job history and results

### Federated Nodes + Recent Jobs

The bottom half of the dashboard splits into two
panels:

- **Federated Nodes** -- cards per online node with
  location, status badge, and a "View all" link to
  `/services`.
- **Recent Jobs** -- your last few submissions with
  workflow type, filename, timestamp, and status.
  Useful for a quick check-in after signing in.

### Related AfriGen-D Tools

Scrolling further shows a "Related AfriGen-D Tools"
band linking to
[AGVD](https://agvd.afrigen-d.org/),
[AGMP](https://agmp.afrigen-d.org/), and
[Beacon](https://beacon.afrigen-d.org/) --
useful as a one-click jump-off for the later
workshop sessions.

---

## 4. Exploring Available Pipelines

### 4.1 Accessing Pipelines

Click **Workflows** in the left nav (or visit
<https://fedimpute.afrigen-d.org/workflows> directly)
for the full pipeline catalogue:

![FedImpute /workflows: 3 cards (Genotype Imputation, VCF Liftover, Allele Switch Checker) plus GWAS Training; right-side details panel for the selected pipeline](/images/fedimpute/09-workflows.png)

As of April 2026 FedImpute hosts **five pipelines**
native to the platform (all running on the
AfriGen-D Genotype Imputation Server at ILIFU
UCT):

| Pipeline | Category | Runtime | Purpose |
| --- | --- | --- | --- |
| **Genotype Imputation** | Imputation | Nextflow (`imputationserver2` v2.0.12) | Eagle v2.4 phasing + Minimac4 imputation. Based on Michigan Imputation Server 2. |
| **VCF Liftover** | Data Preparation | Nextflow | Convert between genome builds (e.g. GRCh37/hg19 ↔ GRCh38/hg38) with QC reporting. |
| **Allele Switch Checker** | Data Preparation | Nextflow | QC tool: detects allele switches between a target VCF and a reference-panel legend file, optionally fixes mismatches. |
| **GWAS Training** | Training | Nextflow (PLINK2) | Full GWAS workflow: VCF-to-PLINK conversion, QC, HWE filtering, association analysis. Designed for training. |
| **Imputation QC** | QC | Nextflow | Post-imputation quality assessment. Upload an imputed VCF (with INFO/R2) and get an interactive report with R² distribution, MAF-stratified R², and filtered VCFs at standard quality cutoffs (R² > 0.3, > 0.5, > 0.8). Removes the need to run `bcftools view -e 'INFO/R2<...'` locally. |

::: tip You can run the whole workshop on FedImpute
The **GWAS Training** pipeline means you can
produce both the "before" and "after" Manhattan
plots for the imputation payoff entirely on
FedImpute -- no local PLINK install required. The
Step 4 wizard accepts:

- **Input VCF** via the VCF drop-zone
  (`.vcf`/`.vcf.gz`, ≤500 MB)
- **Phenotype File** via a dedicated `.txt`/`.tsv`
  drop-zone below the VCF (tab-separated,
  `FID IID <phenotype_col>` header)
- **Phenotype column name** (defaults to `B1`)
- **Covariate File (optional)** -- same format

Run time for the tutorial input (661 samples, chr22
sparse or R²-filtered imputed) is **1-3 minutes**
end-to-end. Outputs include the PLINK2 `.glm.firth`
summary stats, Manhattan + QQ + PCA plots, lambda,
and a Nextflow timeline -- see
[§10](#_10-basic-gwas-visualization).
:::

Click any pipeline card to see the right-hand
**Workflow Details** panel with type, version, node,
source repo (e.g.
[github.com/afrigen-d/imputationserver2](https://github.com/afrigen-d/imputationserver2))
and the default parameter set. The bottom **Run this
workflow** button jumps you straight into the **New
Job** wizard (§6) pre-scoped to that pipeline.

### 4.2 Available Reference Panels

FedImpute's reference-panel catalogue lives at
<https://fedimpute.afrigen-d.org/explorer?tab=panels>
(or click the "Reference Panels" KPI card on the
dashboard). The current **four panels**, with the
exact metadata FedImpute exposes:

![FedImpute Explorer → Reference Panels tab: 4 panel cards with build, sample + variant counts, and access badges](/images/fedimpute/11-reference-panels.png)

<!-- markdownlint-disable MD013 -->

| Panel | Build | Samples | Variants | Population | Access |
| --- | --- | --- | --- | --- | --- |
| **H3Africa v6 (full)** | hg38 | 4,447 | 58,669,063 | Global: 48 countries, 182 ethnic groups, 39% African (KGP, HGDP, 54gene, GAPW, SAALS, AWI-Gen cohorts) | Granted after enrolment |
| **H3Africa v6 African-only** | hg38 | 1,895 | 42,331,932 | African: 22 countries, 118 ethnic groups, 100% African. Smaller and faster for African-ancestry imputation. | Granted after enrolment |
| **H3Africa v7** | hg38 | 6,213 | 78,600,000 | Global: 6 continents, 5 African regions, 39% African. Updated variant calling + expanded sample set. | **Request Access** |
| **HapMap2 chr20 (CEU)** | hg19 | 60 | 37,855 | CEU (European). For benchmarking / testing only (chr20 only). | Granted |

<!-- markdownlint-enable MD013 -->

Each panel card in the Explorer also shows the
underlying **DRS URI** (for example
`drs://api-drs.afrigen-d.dev/4c27d0d5-…`), a
**Reference** / **Read-Only** tag, a star rating, and
the job count that has used that panel. H3Africa v7
is gated by a Data Access Agreement -- click
**Request Access** to review and accept the DAA
terms in-app.

[sengupta-panels]: https://doi.org/10.1016/j.xgen.2023.100332

**Recommended panels for African cohorts**

- **H3Africa v7** is the default choice for African
  and African-ancestry studies on FedImpute.
- **H3Africa v6** (full or African-only subset) is
  the direct backward-compatible option -- useful if
  you are reproducing an earlier analysis or want to
  compare v6 → v7 accuracy on your cohort.
- HapMap2 (CEU) is intentionally not recommended for
  primary African-cohort analysis; use it for
  benchmarking only (see
  [`/services`](/services#sengupta-2023-the-african-populations-benchmark)
  for why European-ancestry panels under-perform on
  SSA samples).

::: warning Genome build
If your input data is in **hg19** and you want to
use an hg38-only panel, run the **VCF Liftover**
pipeline (§4.3) first to convert coordinates before
imputation.
:::

---

### 📝 Check Your Understanding: Pipelines

<details>
<summary><strong>Question 1:</strong> Which reference panels are available on FedImpute?</summary>

**Answer:** Per the FedImpute FAQ:
**H3Africa v6** (full and African-only subsets) and
**H3Africa v7** for African-ancestry imputation,
plus **HapMap2 (CEU)** for benchmarking. More panels
are added as they are published by the H3Africa
Consortium.

</details>

<details>
<summary><strong>Question 2:</strong> Which panel is the recommended default for an African-ancestry cohort?</summary>

**Answer:** **H3Africa v7**. It is the successor to
v6 and is specifically targeted at African-ancestry
imputation. H3Africa v6 (full or African-only subset)
is the main alternative, used for reproducing earlier
analyses or for v6 → v7 comparison.

</details>

<details>
<summary><strong>Question 3:</strong> If your data is in GRCh37/hg19 format, what should you do before imputation?</summary>

**Answer:** Run the **VCF Liftover** pipeline first
(§4.3) to convert coordinates to hg38 if the panel
you want to use is hg38-only.

</details>

---

### 4.3 Companion pipelines

Alongside the imputation pipeline, FedImpute hosts
three companion workflows (confirmed live at
`/workflows` -- see §4.1): **GWAS Training**, **VCF
Liftover**, and **Allele Switch Checker**. The
sections below describe what each does conceptually
so you recognise when to run them -- the click-path
is the same 5-step wizard as for Genotype Imputation
(§6). Where FedImpute doesn't cover a step, the
sections also note the offline equivalent (bcftools,
CrossMap, Picard).

#### GWAS training workflow

A parameterised GWAS pipeline built around PLINK2
for hands-on teaching.

- **Inputs:** genotype VCF, phenotype table
  (tab-delimited), optional covariates (PCA).
- **Key parameters:** phenotype column name, MAF
  threshold (typically 0.01), sample missingness
  (0.1), SNP missingness (0.1), HWE cutoff (1e-6).
- **Output:** association summary statistics +
  Manhattan / QQ plots.

The workshop runs this pipeline **twice** (once on
sparse input, once on imputed output) to expose the
before/after difference -- see
[§10 GWAS visualisation](#_10-basic-gwas-visualization).

#### Allele-switch checker

A pre-imputation QC step that reconciles the target
VCF's REF/ALT orientation against the reference
panel it will be imputed against.

- **Detects:** strand flips (A↔T, C↔G ambiguity),
  allele switches (REF/ALT swapped relative to the
  panel), and sites with invalid alleles.
- **Resolves:** either *corrects* the site
  (recommended; swaps REF/ALT to match the panel)
  or *removes* the site (conservative; drops the
  problematic variant).

On FedImpute the equivalent check runs automatically
during submission; for local pre-flight,
`bcftools norm --check-ref` and `bcftools +fixref`
do the same work offline.

#### VCF liftover

Convert variant coordinates between genome builds
(most commonly hg19 → hg38 for H3Africa v6/v7
panels).

- **Source / target build:** your input and the
  panel's build.
- **Chain file:** selected automatically based on
  source/target; for manual runs, use the UCSC
  `hg19ToHg38.over.chain.gz` chain.
- **Validate output:** always spot-check a few
  lifted coordinates against
  <https://genome.ucsc.edu> to catch chain
  edge-cases (chromosome boundaries, inversions).

CrossMap and Picard `LiftoverVcf` are the standard
offline equivalents.

---

## 5. Data Preparation Before Upload

FedImpute publishes its input requirements in the
landing-page FAQ at
<https://fedimpute.afrigen-d.org>. This section
summarises them and adds a few practical notes for
the workshop dataset.

### 5.1 Supported file formats

FedImpute accepts **VCF**, either plain or
**bgzip-compressed** (`.vcf.gz`).

<!-- markdownlint-disable MD013 -->

| Format | Extensions | Notes |
| --- | --- | --- |
| **VCF** | `.vcf` | Plain text VCF |
| **bgzipped VCF** | `.vcf.gz` | **Recommended.** Must be bgzip, not plain gzip (use `bgzip`, not `gzip`). |

<!-- markdownlint-enable MD013 -->

Check a `.gz` file is bgzipped with `file <name>.gz`
-- you should see `BGZF` in the output (as in the
tutorial VCF:
`file sparse.vcf.gz` → *"Blocked GNU Zip Format
(BGZF; gzip compatible)"*).

### 5.2 FedImpute input requirements

Straight from the FedImpute FAQ:

- ✅ Sorted by **chromosomal position**
- ✅ Use a supported **reference build: hg19 or hg38**
- ✅ Contain at least **20 samples**

Additionally, for clean imputation you should also:

- ✅ Keep **autosomal chromosomes** (chr1--22) unless
  your panel / analysis explicitly supports
  chrX/chrY
- ✅ Use **biallelic SNPs** (split multi-allelic
  sites with `bcftools norm -m -`)
- ✅ Ensure **REF matches the chosen reference**
  (run the Allele Switch Checker -- §4.3.2 -- or
  `bcftools +fixref` first)
- ✅ Give variants **unique IDs** where possible
- ✅ Remove **duplicate samples** and known
  first-degree relatives as appropriate for your
  analysis

### 5.3 What FedImpute does with your file

Once uploaded:

- Input VCFs are kept on the ILIFU research cloud
  (UCT) for **30 days** before automatic deletion
- Imputed results are kept for **7 days** after
  completion
- Results are **encrypted with a one-time password**
  delivered by email -- download them before the
  7-day expiry
- All storage is **POPIA-compliant**; data stays on
  African infrastructure

(From the FedImpute FAQ "Where is my data stored?"
and "How long are my results kept?")

### 5.4 Pre-upload checklist

Before submitting:

1. File is **bgzipped VCF** (`.vcf.gz`) -- `file`
   shows `BGZF`
2. File is **sorted** (`bcftools sort`) and
   **tabix-indexed** if multi-chromosome
3. Genome build is **hg19 or hg38** and matches the
   panel you will choose
4. Sample count **≥ 20**
5. Appropriate **MAF filter** applied for your
   downstream analysis (typically MAF > 1% for
   common-variant GWAS; lower if rare-variant work
   is the goal)
6. **Allele Switch Checker** run (§4.3.2) -- flips
   or drops variants whose REF disagrees with the
   panel

::: tip MAF and imputation accuracy
Imputation R² drops as MAF decreases. A common
pattern: R² > 0.9 for MAF > 0.05, R² 0.5--0.9 for
low-frequency variants, and highly variable for
rare variants. Filter after imputation by R² (not
just MAF) if rare-variant analysis is the goal.
:::

---

### 📝 Check Your Understanding: Data Preparation

<details>
<summary><strong>Question 1:</strong> Why should you remove non-autosomal chromosomes before imputation?</summary>

**Answer:** Non-autosomal chromosomes (X, Y, MT) have different inheritance patterns and ploidy, requiring specialized imputation methods. Most imputation services focus on autosomal chromosomes (1-22) for standard GWAS analysis.

</details>

<details>
<summary><strong>Question 2:</strong> What is the recommended file format for uploading data?</summary>

**Answer:** Compressed VCF format (**.vcf.gz**) is recommended. It's the most widely supported format and compression reduces upload time and storage requirements.

</details>

<details>
<summary><strong>Question 3:</strong> True or False: You can upload multiallelic variants for imputation.</summary>

**Answer:** **False.** Your input data should contain **biallelic SNPs only**. Multiallelic sites should be split or removed before uploading.

</details>

---

### 🏋️ Exercise 2: Data Quality Checklist

**Task:** Review the sample data file and verify it meets quality requirements.

For the file `1k_afr_binary_1000k_chr22.vcf.gz`, answer these questions:

<details>
<summary><strong>Question A:</strong> What chromosome does this file contain?</summary>

**Answer:** Chromosome 22 (as indicated by "chr22" in the filename).

</details>

<details>
<summary><strong>Question B:</strong> Is the file compressed?</summary>

**Answer:** Yes, the `.vcf.gz` extension indicates it's a gzip-compressed VCF file.

</details>

<details>
<summary><strong>Question C:</strong> Is this file ready for upload?</summary>

**Answer:** Yes, based on the filename it appears to be:

- A VCF file (correct format) ✅
- Compressed (.gz) ✅
- Contains a single autosomal chromosome (chr22) ✅

</details>

---

## 6. Submitting an Imputation Job

*→ Live checklist: [Workflow Step 2 -- Submit the imputation job](/workflow#step-2-submit-the-imputation-job)*

FedImpute's job submission is a **5-step wizard**.
Click **New Job** in the left nav (or the green
quick-access button on the dashboard) to start at
`/jobs/new`.

![Step 1 of the New Job wizard: four workflow cards -- Genotype Imputation, VCF Liftover, Allele Switch Checker, GWAS Training](/images/fedimpute/13-new-job.png)

### 6.1 Select Workflow

Step 1 offers the four hosted pipelines from §4.1.
For imputation, click the **Genotype Imputation**
card (top-left) and then the green **Continue**
button. For the full workshop flow you will revisit
this step for **GWAS Training** later on to run the
before / after GWAS.

### 6.2 Select Service

Step 2 shows the federated nodes that can run the
chosen workflow. There is currently one node online
(AfriGen-D Genotype Imputation Server at ILIFU UCT)
which is pre-selected.

![Step 2: service selection -- AfriGen-D node card, 500 MB max file size, vcf + vcf.gz formats](/images/fedimpute/14-new-job-service.png)

The right-hand **Service Details** panel surfaces
the hard constraints you need to check:

- **Max File Size: 500 MB per file**
- **Supported Formats: vcf, vcf.gz**
- Continent: Africa
- GA4GH endpoints exposed: WES, DRS, Data Connect

Click **Continue**.

### 6.3 Select Panel

Step 3 is where the **most scientifically
consequential** decision happens. Pick a reference
panel from the four described in
[§4.2](#_4-2-available-reference-panels).

![Step 3: panel cards showing H3Africa v6 (full), v6 African-only, v7, HapMap2 chr20 (CEU) with samples/variants/population metadata](/images/fedimpute/15-new-job-panel.png)

::: tip Panel choice for African cohorts
- **H3Africa v6 (full)** -- broad reference surface
  (58.7M variants, global) with a solid African
  representation. **Recommended default for sparse
  input data (e.g. SNP-array coverage ~4-10k
  variants per chromosome)** because the larger
  panel increases overlap.
- **H3Africa v6 African-only** -- smaller (42.3M
  variants, 1,895 samples, 100% African). Tighter
  population match; best for denser input data
  (exome/WGS). For the sparse 4,423-variant tutorial
  VCF, prefer v6 (full) -- the larger panel gives
  enough per-chunk overlap to run cleanly.
- **H3Africa v7** -- newest panel (78.6M variants,
  6,213 samples). Recommended once you have Data
  Access Agreement approval (click
  **Request Access**).
- **HapMap2 chr20 (CEU)** -- benchmarking only.
:::

Click the chosen panel card, then **Continue**.

### 6.4 Upload & Configure

Step 4 combines file upload and parameter editing.

![Step 4: upload drop zone on the left, job summary on the right showing service, reference panel, workflow, parameters](/images/fedimpute/17-file-uploaded.png)

**Upload.** Drag-and-drop a VCF into the dashed drop
zone, or click to pick a file. The right-hand **Job
Summary** updates in real time to show file count,
total size, and (once uploaded) a computed input
hash for provenance. Our tutorial input is
`1k_afr_661_samples_4k_variants_hg38_agsc2025_chr22.vcf.gz`
at 219 KB.

**Parameters.** Below the upload area, the form
exposes the same parameters the pipeline runs with:

| Parameter | Default | Notes |
| --- | --- | --- |
| Job Name | (filename) | Free text -- give it something searchable, e.g. `isb-2026-tutorial-chr22-v6afr`. |
| Array Build | hg38 | Must match the panel. Use VCF Liftover (§4.3) if it doesn't. |
| Phasing Engine | `eagle` | Eagle v2.4 (phased output). |
| Allele Frequency Check | `mixed` | Use `mixed` for cosmopolitan / admixed cohorts; leave as-is for African studies. |
| rsq Filter | `0` (off) | Post-imputation R² cutoff -- leave at 0 and filter downstream in §9. |
| Mode | Quality Control & Imputation | End-to-end. The other choice (QC-only) is useful for pre-flighting. |
| AES 256 Encryption | No | Optional; if enabled, FedImpute emails a one-time password for the output VCF. |
| Generate Meta-imputation File | No | Only relevant when combining panels. |

Click **Continue** when the upload and parameters
are set.

### 6.5 Review & Submit

Step 5 is a read-only summary of everything above,
plus the **Data Use Agreement** checkboxes:

![Step 5: review card with service, workflow, reference panel, input & parameters, DUA checkboxes ticked, green Submit Job button](/images/fedimpute/19-dua-checked.png)

Three things to check before submitting:

1. **The Service / Workflow / Reference Panel** cards
   match what you intended.
2. The **Estimated duration** near the bottom of the
   page (computed from previous runs). In the live
   test this showed *"9h 47m, based on 2 previous
   runs (limited data)"* -- the estimate can be
   wildly off for panels with few prior runs; your
   actual job often completes much faster.
3. Both **Data Use Agreement** checkboxes are
   ticked:
   - "I will not attempt to re-identify or contact
     research participants."
   - "I will report any inadvertent data release,
     security breach or other data management
     incident of which I become aware."

When both boxes are checked the green **Submit Job**
button in the top-right activates. Click it. FedImpute
assigns a UUID Job ID, queues the run, and redirects
you to `/jobs/<uuid>` -- the monitoring view covered
in [§7](#_7-monitoring-job-progress).

**Save the Job ID** (copy it from the URL or the
page header) -- you need it if you close the tab.

Once submitted, the rest of the workflow is
asynchronous: the platform runs the job, emails you
when it completes, and keeps the output available
for **7 days** ([§5.3](#_5-3-what-fedimpute-does-with-your-file)).


---

### 📝 Check Your Understanding: Job Submission

<details>
<summary><strong>Question 1:</strong> What phasing method is recommended for imputation?</summary>

**Answer:** **Eagle** is the recommended phasing method. It's fast, accurate, and the default choice for most imputation services.

</details>

<details>
<summary><strong>Question 2:</strong> Why is it important to select the correct genome build?</summary>

**Answer:** The genome build determines the coordinate system for variant positions. Using the wrong build (e.g., GRCh38 data with GRCh37 reference) will result in incorrect imputation because variant positions won't match the reference panel.

</details>

<details>
<summary><strong>Question 3:</strong> What should you do if your file is larger than 100 MB?</summary>

**Answer:** You have two options:

1. Split your file by chromosome and submit multiple jobs (note: splitting by chromosome is **required** regardless of file size—the service only accepts single-chromosome files)
2. Contact support at helpdesk.afrigen-d.org for assistance with larger files

</details>

---

### 🏋️ Exercise 3: Submit your first job

**Task:** Submit an imputation job using the tutorial
sample data.

**Steps:** follow
[Workflow Step 2](/workflow#step-2-submit-the-imputation-job)'s
Data-prep → QC → Run → Verify checklist end-to-end:

1. Log in to FedImpute ([§2](#_2-getting-started))
2. Upload the tutorial VCF
   ([`/data/1k_afr_661_samples_4k_variants_hg38_agsc2025_chr22.vcf.gz`](/data/1k_afr_661_samples_4k_variants_hg38_agsc2025_chr22.vcf.gz))
3. Select **H3Africa v7** reference panel
4. Set a descriptive job name like
   `afr_chr22_imputation_<yourname>`
5. Confirm genome build is **hg38** (matches the
   sample VCF and the panel)
6. Submit and note the job ID

<details>
<summary><strong>✅ Success criteria</strong></summary>

You should see:

- [ ] Job submission confirmation
- [ ] Job ID assigned
- [ ] Status shows "Queued" or "Running"
- [ ] Job appears in your jobs list

</details>

<details>
<summary><strong>🆘 If upload or submit fails</strong></summary>

See [§13 Troubleshooting](#_13-troubleshooting) for
the action-by-symptom table. The most common
failures at submit time are **wrong compression**
(plain gzip instead of bgzip), **wrong sort order**,
**REF/ALT disagreement with the panel**, and
**build mismatch**. All four are covered in the
troubleshooting section.

</details>

---

## 7. Monitoring Job Progress

*→ Live checklist: [Workflow Step 3 -- Download imputed results + R² QC](/workflow#step-3-download-imputed-results-r2-qc) (monitoring + download combined in one slot)*

After submission, the job runs asynchronously on
FedImpute's backend. You don't need to keep the
browser open -- the platform emails you when it
completes and keeps results retrievable for 7 days.
But if you want to watch progress live (and during
the workshop the watching is the interesting part),
this section covers what to look for.

### 7.1 Job status categories

Imputation services use broadly the same status
vocabulary, whatever the specific UI labels:

| Status | Meaning |
| --- | --- |
| **Queued / Pending** | Submitted, waiting for compute capacity |
| **Running / In progress** | Actively processing |
| **Completed / Success** | Finished; download link available |
| **Failed / Error** | Job halted with an error; see the error message |
| **Cancelled** | Stopped on user request |

### 7.2 What the job actually does

FedImpute's job view exposes **six pipeline stages**
with a dedicated progress bar per stage:

![Job detail page: six-stage pipeline progress with Queued / Input Validation / Quality Control / Phasing / Imputation / Post-processing; Cancel button top-right; Overview / Files / Usage / Logs tabs](/images/fedimpute/21-job-progress-1.png)

| # | Stage | What it does |
| --- | --- | --- |
| 1 | **Queued** | Submission received, waiting for compute capacity. Typically fast (seconds to a few minutes). |
| 2 | **Input Validation** | Format check: parses the VCF header, confirms bgzip, verifies ≥20 samples. |
| 3 | **Quality Control** | Harmonisation against the panel: strand flips, A/T & C/G genotypes, allele switches, monomorphic sites, typed-only variants (present in input, absent from panel). Emits `qc_report.txt`, `snps-typed-only.txt`, `snps-excluded.txt`, `chunks-excluded.txt`. |
| 4 | **Phasing** | Eagle v2.4 reconstructs per-sample haplotypes. |
| 5 | **Imputation** | Minimac4 matches phased haplotypes against the reference panel and infers missing genotypes. |
| 6 | **Post-processing** | Writes the imputed dose VCF, computes per-variant R² / INFO, packages all outputs. |

The underlying pipeline is
[afrigen-d/imputationserver2](https://github.com/afrigen-d/imputationserver2)
v2.0.12 running on Nextflow 25.10.4 (visible in the
**Logs** tab).

### 7.3 QC statistics

While QC runs, the **QC STATISTICS** panel populates
in real time with the harmonisation counts -- this
is the most informative part of the whole monitoring
view:

![QC STATISTICS section: Input Validation (SNPs call rate < 90%), Quality Control (alt-freq >0.5 sites, match, reference overlap, etc.)](/images/fedimpute/23-job-progress-3.png)

Typical counts to expect (real values from the
tutorial chr22 input):

| Metric | Value |
| --- | --- |
| SNPs call rate < 90% | 0 |
| Alternative allele freq > 0.5 sites | 4,335 |
| Match (matched to panel) | 1,803 |
| Reference Overlap | 40.81% |
| Typed only sites (input, not in panel) | 2,616 |
| Monomorphic sites | 3 |
| Excluded sites in total | 4 |
| Allele mismatch | 1 |
| Strand flip | 0 |
| A/T, C/G genotypes | 0 |
| Invalid alleles | 0 |
| Duplicated sites | 0 |

**Reference overlap** is the headline number: how
many input SNPs matched a panel site. **<~50% on
the African-only subset is a red flag** for sparse
input -- fall back to H3Africa v6 (full).

### 7.4 Expected wall-clock

**For the tutorial input (661 samples, chr22,
~4,400 variants) on H3Africa v6 (full), plan on
15-30 minutes.** The platform shows its own
**Estimated duration** near the top of the job
page (computed from previous runs) -- treat it as
a rough ceiling rather than an exact target;
estimates can swing widely for panels with few
prior runs.

### 7.5 Managing a running job

Controls available on the job detail page:

- **Cancel** (top-right) -- stops a running job.
  Cancelled jobs keep their partial outputs in the
  Files tab for inspection.
- **Retry** -- appears when a job has Failed. Opens
  the New Job wizard pre-populated with the failed
  job's parameters so you can tweak one setting
  (typically a different panel) and resubmit.

![Failed job view: red "Job Failed" banner with the reason, Retry button top-right, pipeline showing which stage failed](/images/fedimpute/26-job-failed-logs.png)

- **View logs** -- opens the raw Nextflow pipeline
  output showing each process submission and the
  failure line.
- **Workflow repo** -- external link to the
  pipeline's source on GitHub. Useful when the UI
  error is terse and you want to read the actual
  process code.
- **Tabs** (Overview / Files / Usage / Logs):
  - **Files** lists intermediate + output files as
    they're produced; you can download mid-run.
  - **Usage** shows CPU, memory, and wall-clock
    consumed per process.
  - **Logs** shows the Nextflow console output and
    the workflow parameters JSON.

---

### 📝 Check Your Understanding: Job Monitoring

<details>
<summary><strong>Question 1:</strong> What are the main processing steps in the imputation workflow?</summary>

**Answer:** The main steps are:

1. **Quality Control** - Validates input data
2. **Phasing** - Estimates haplotypes using Eagle
3. **Imputation** - Infers missing genotypes using Minimac4
4. **Post-processing** - Calculates quality metrics (R²)
5. **Completion** - Makes results available for download

</details>

<details>
<summary><strong>Question 2:</strong> What should you do if your job fails?</summary>

**Answer:**

1. Click on the job to view error messages
2. Check the error description for the cause
3. Fix the issue (e.g., data format, genome build)
4. Submit a new job with the corrected data
5. If the problem persists, contact support

</details>

<details>
<summary><strong>Question 3:</strong> How long does a typical imputation job take?</summary>

**Answer:** 15-60 minutes, depending on:

- Input data size (number of samples and variants)
- Queue length (how many jobs are ahead of yours)
- Selected reference panel size
- Server load

</details>

---

## 8. Downloading Results

*→ Live checklist: [Workflow Step 3 -- Download imputed results + R² QC](/workflow#step-3-download-imputed-results-r2-qc)*

When a job finishes, FedImpute exposes the output via
the job's Results view. There is a **7-day retention
window** from completion: after that, the output is
purged and you would need to re-run the job. Pull
the files to your laptop during the workshop so the
R² QC and downstream GWAS steps can work off a local
copy.

### 8.1 What is produced

FedImpute's **Files** tab lists outputs grouped into
sections. On a successful run against H3Africa v6
(full), the completed job's Files tab looks like
this (sizes from the live tutorial run on chr22):

![Completed job Files tab: INPUT FILES, RESULTS (chr_22.zip 644.7 MB), REPORTS (quality-control.html), STATISTICS, PROVENANCE (ro-crate-metadata.json)](/images/fedimpute/44-v6full-completed-files.png)

**INPUT FILES** (carried through from your submission)

| File | Size | Notes |
| --- | --- | --- |
| *(your uploaded VCF)* | 219 KB for the tutorial | The exact file you uploaded, for provenance. |

**RESULTS** -- the main scientific outputs

| File | Size | Notes |
| --- | --- | --- |
| `chr_<N>.zip` | **~645 MB** for chr22 | Imputed genotypes with dosage and quality scores. AES-256-encrypted ZIP containing `chr_<N>.dose.vcf.gz` (imputed VCF) + `chr_<N>.info.gz` (per-variant R² / INFO). The encryption password appears in the Overview tab's **TIMING** panel (click the eye icon to reveal, copy icon to clipboard-copy). |

**REPORTS** -- browser-viewable quality assessment

| File | Size | Notes |
| --- | --- | --- |
| `quality-control.html` | 1.9 MB | Interactive imputation quality report with per-chromosome R² metrics, MAF-stratified distributions, and cumulative coverage curves. Open in any browser. |

**STATISTICS** (emitted during QC; appear even if the job later fails)

| File | Size | Notes |
| --- | --- | --- |
| `qc_report.txt` | ~700 bytes | Summary of input QC checks: sample count, SNP overlap, strand alignment. Uses `::group::` markdown for the Files-tab preview renderer. |
| `qc_output.txt` | ~300 bytes | Stdout from `imputationserver-utils` (the genepi QC tool that runs before phasing). Shows the utility version, e.g. `imputationserver-utils 1.5.3`. |
| `chunks_summary.txt` | ~100 bytes | Per-chromosome chunk accounting: `Chunks total / Chunks passed QC / Chunks excluded`. For the tutorial input: 2 / 2 / 0 (all chunks passed). |
| `snps-typed-only.txt` | ~40 KB for the tutorial | Typed-only SNPs -- present in your input but not in the reference panel. Passed through as-is, not imputed. |
| `snps-excluded.txt` | ~200 bytes | SNPs removed during QC (monomorphic, low call rate, or allele mismatch). |

**PROVENANCE**

| File | Size | Notes |
| --- | --- | --- |
| `ro-crate-metadata.json` | ~100 KB | RO-Crate GA4GH workflow run record -- parameters, input/output hashes, tool versions, timing. Attach this to your downstream analysis for full reproducibility. |

The Files tab populates **incrementally** -- you can
see `qc_report.txt` within seconds of the QC stage
starting, long before the main imputed ZIP lands.
Useful for diagnosing a job that looks slow.

::: tip Plan for the download size
A single-chromosome imputed ZIP against H3Africa v6
is ~600 MB; a full genome-wide submission pushes
into several GB. Make sure you download on a
reliable connection within the 7-day retention
window -- the platform does not keep partial
downloads.
:::

### 8.2 Retrieving the files

Every row in the Files tab has a per-file
**Download** button. The button resolves to the
**GA4GH WES v1.1.0 outputs endpoint** on the
federated node -- e.g.
`https://<node>/ga4gh/wes/v1/runs/<wes-run-id>/outputs/<filename>` --
so scripted retrieval (via `curl` with your session
cookie) works as a drop-in. The WES run ID is shown
in the Overview tab's right-hand panel under **WES
RUN ID**.

Workflow for the tutorial:

1. **Copy the encryption password first.** On the
   completed job's **Overview** tab, scroll to the
   right-hand panel: below *WES RUN ID* is an
   **ENCRYPTION PASSWORD** row showing a masked
   string. Click the eye icon to reveal and the
   copy-to-clipboard icon to grab it. Save it
   somewhere you can find again -- without it the
   main RESULTS ZIP is unusable.
2. **Download `chr_<N>.zip`.** This is the main
   scientific output (~600 MB per chromosome).
3. **Download `quality-control.html`** -- the
   interactive R² report that §9 walks through.
4. **Download `ro-crate-metadata.json`** -- the
   GA4GH workflow-run provenance record. Attach it
   to your downstream analysis for reproducibility.
5. Extract the ZIP with the password:

   ```bash
   # macOS / Linux
   unzip -P "<paste the password>" chr_22.zip
   # Produces:
   #   chr_22.dose.vcf.gz
   #   chr_22.info.gz
   ```

6. Do a sanity check on the output size. For the
   tutorial input (661 samples, chr22, sparse
   4,423-variant baseline) against H3Africa v6
   (full), expect the imputed dose VCF to be
   **hundreds of MB** uncompressed -- the panel has
   58.7M variants and most chr22 loci (~3M) will be
   imputed. A dose VCF under ~10 MB is a red flag.

Remember the **7-day retention window** starts when
the job completes, not when you download. Pull the
files as soon as the email arrives (or as soon as
you see *Completed* on the job page).

### 8.3 Understanding the Info File

The `.info` file contains quality metrics for each variant:

| Column | Description |
|--------|-------------|
| **SNP** | Variant identifier |
| **REF/ALT** | Reference and alternate alleles |
| **MAF** | Minor allele frequency |
| **R²** | Imputation quality score (0-1) |
| **Genotyped** | Whether variant was in input data |

> **💡 Key Concept: R² (Imputation Quality Score)**
>
> **R²** (also called Rsq or INFO score) measures how well the imputed genotypes match what we would expect from actual genotyping. It ranges from 0 to 1:
>
> - **R² = 1.0**: Perfect imputation (as reliable as direct genotyping)
> - **R² = 0.0**: No information (random guessing)
>
> R² is calculated by comparing the variance of imputed dosages to the expected variance under Hardy-Weinberg equilibrium. Higher values indicate the algorithm was more "confident" in its predictions.

**R² Interpretation:**

- **R² > 0.8** - High quality, reliable for analysis
- **0.3 < R² < 0.8** - Moderate quality, use with caution
- **R² < 0.3** - Low quality, consider filtering

---

### 📝 Check Your Understanding: Results

<details>
<summary><strong>Question 1:</strong> What does an R² value of 0.95 indicate?</summary>

**Answer:** An R² of 0.95 indicates **high quality** imputation. The imputed genotypes are highly reliable and can be confidently used in downstream analyses like GWAS. R² > 0.8 is generally considered high quality.

</details>

<details>
<summary><strong>Question 2:</strong> Which file contains the imputation quality scores?</summary>

**Answer:** The **.info** file (or .info.gz if compressed) contains the imputation quality scores (R²) for each variant.

</details>

<details>
<summary><strong>Question 3:</strong> If a variant has R² = 0.25, should you include it in your GWAS analysis?</summary>

**Answer:** **Probably not.** An R² of 0.25 is below the common threshold of 0.3, indicating low imputation quality. This variant should be filtered out before GWAS analysis to avoid false positives from poorly imputed genotypes.

</details>

---

### 🏋️ Exercise 4: Download and Examine Results

**Task:** Download the results from your completed job and identify key files.

**Steps:**

1. Open your completed job on FedImpute and go to
   its results view (platform-specific; follow
   [Workflow Step 3](/workflow#step-3-download-imputed-results-r2-qc))
2. Pull all output files to your laptop
3. Open the info / quality file and find:
   - A variant with high R² (> 0.8)
   - A variant with low R² (< 0.3)

<details>
<summary><strong>💡 Hint: Reading the Info File</strong></summary>

You can view the info file using:

- A text editor (for small files)
- `zcat file.info.gz | head -20` (command line)
- Excel/Google Sheets (import as tab-delimited)

Look for the column named "Rsq" or "R2" for quality scores.

</details>

<details>
<summary><strong>✅ Expected Results</strong></summary>

You should find:

- Most variants have R² > 0.8 (well-imputed)
- Some variants, especially rare ones, may have R² < 0.3
- The "Genotyped" column shows "Genotyped" for original variants and "Imputed" for inferred variants

</details>

---

## 9. Quality Assessment

*→ Live checklist: [Workflow Step 3 -- Download imputed results + R² QC](/workflow#step-3-download-imputed-results-r2-qc) (Verify block)*

### 9.1 Imputation Quality Metrics

After downloading your results, assess imputation quality using R² scores.

**Key metrics to evaluate:**

1. **Overall R² distribution** - Most variants should have R² > 0.3
2. **MAF-stratified R²** - Rare variants typically have lower R²
3. **Comparison with genotyped variants** - Validation of accuracy

::: tip Hosted alternative: the Imputation QC pipeline
FedImpute now hosts a dedicated **Imputation QC**
pipeline (§4.1) that does everything in this
section as a single job: upload the imputed VCF
(with `INFO/R2`) and receive an interactive report
with R² distribution, MAF-stratified R², and
**filtered VCFs at standard quality cutoffs
(R² > 0.3, > 0.5, > 0.8)** -- so you don't need to
run the `bcftools view -e 'INFO/R2<...'` filter
locally. It's the best option for participants who
don't want to install `bcftools`.

The local/notebook path below remains useful when
you want to sit with the numbers, customise the
cutoff, or combine R² filters with other VCF
manipulations in one pipeline.
:::

### 9.2 Plotting R² Distribution (Hands-on)

Use the provided Jupyter notebook to visualize imputation quality.

**Open the notebook:** `plot_r2_distribution.ipynb`

```python
# Required libraries
import pandas as pd
import matplotlib.pyplot as plt
import re

# Read the info file
info_file = "your_imputed_data.info.gz"
```

**Steps in the notebook:**

1. Load the info file
2. Extract R² values
3. Create a histogram of R² distribution
4. Add quality threshold line (R² = 0.3)
5. Save the plot

**Expected output:**

- Histogram showing R² distribution
- Most variants should cluster near R² = 1.0
- Red dashed line at R² = 0.3 cutoff

### 9.3 Filtering by Quality

For downstream analysis, filter variants by R².
Minimac4 output carries R² in the VCF `INFO/R2`
field, so `bcftools` can filter in place:

```bash
# Keep only well-imputed variants (R² > 0.3)
bcftools view \
  -e 'INFO/R2<0.3' \
  -Oz -o chr22.imputed.r2filt.vcf.gz \
  chr22.dose.vcf.gz
bcftools index -t chr22.imputed.r2filt.vcf.gz

# Stricter cutoff for fine-mapping (R² > 0.8)
bcftools view \
  -e 'INFO/R2<0.8' \
  -Oz -o chr22.imputed.r2hi.vcf.gz \
  chr22.dose.vcf.gz
```

Some platforms ship the per-variant metrics in a
separate `.info.gz` sidecar file rather than in the
VCF INFO field; in that case, filter the VCF against
the list of variant IDs that clear your R² threshold.

---

### 📝 Check Your Understanding: Quality Assessment

<details>
<summary><strong>Question 1:</strong> Why do rare variants typically have lower R² scores?</summary>

**Answer:** Rare variants have lower R² because:

1. They appear in fewer individuals in the reference panel
2. There's less information to accurately infer their haplotype context
3. The statistical power to impute them correctly is reduced
4. LD patterns around rare variants are less informative

</details>

<details>
<summary><strong>Question 2:</strong> What R² threshold would you use for fine-mapping studies?</summary>

**Answer:** For fine-mapping studies, use **R² > 0.8** (stricter threshold). Fine-mapping requires high confidence in genotype calls to accurately identify causal variants, so only high-quality imputed variants should be included.

</details>

<details>
<summary><strong>Question 3:</strong> Your imputation results show 60% of variants have R² > 0.8 and 85% have R² > 0.3. Is this good quality?</summary>

**Answer:** **Yes, this is good quality.** Having 85% of variants above the R² > 0.3 threshold is acceptable for most GWAS analyses. The 60% with R² > 0.8 represents high-confidence variants suitable for fine-mapping or more stringent analyses.

</details>

---

### 🏋️ Exercise 5: Generate R² Distribution Plot

**Task:** Use the Jupyter notebook to create an R² distribution plot.

**Steps:**

1. Open `plot_r2_distribution.ipynb`
2. Update the file path to your downloaded .info file
3. Run all cells
4. Examine the histogram

<details>
<summary><strong>💡 Hint: Expected Distribution Shape</strong></summary>

A good imputation should show:

- A **peak near R² = 1.0** (many well-imputed variants)
- A **smaller peak or tail** towards lower R² values
- The majority of variants **above the red dashed line** (R² = 0.3)

If most variants are below 0.3, there may be a problem with:

- Reference panel choice (population mismatch)
- Input data quality
- Genome build mismatch

</details>

---

## 10. Basic GWAS Visualization

*→ Live checklists: [Workflow Step 1 -- GWAS on SPARSE](/workflow#step-1-gwas-on-sparse-data-baseline) (baseline) and [Workflow Step 4 -- GWAS on IMPUTED + comparison](/workflow#step-4-gwas-on-imputed-data-comparison)*

### 10.1 Introduction to GWAS Plots

> **💡 Key Concept: GWAS (Genome-Wide Association Study)**
>
> A **GWAS** tests millions of genetic variants across the genome to find associations with a trait or disease. For each variant, it calculates a **p-value** measuring the strength of association.
>
> - **Null hypothesis**: The variant has no effect on the trait
> - **Small p-value**: Evidence the variant is associated with the trait
> - **Genome-wide significance**: p < 5×10⁻⁸ (accounts for multiple testing)
>
> Imputation dramatically increases the number of variants available for GWAS, improving the resolution to detect and localize causal variants.

After imputation, you may perform Genome-Wide Association Studies. Key visualizations include:

- **Manhattan Plot** - Shows -log10(p-values) across the genome
- **QQ Plot** - Compares observed vs expected p-value distribution

::: tip FedImpute produces these plots natively
Submit the **GWAS Training** pipeline (§4.1) with
the sparse input VCF + phenotype, and it emits:

- `gwas_results.B1.glm.firth` -- PLINK2 summary
  statistics
- `gwas_manhattan.png` + `manhattan_plot.png` --
  Manhattan plots
- `qq_plot.png` + `gwas_qq.png` -- QQ plots
- `publication_combined.png` -- combined figure
- `pca_scatter.png` + `pca_scree.png` -- PCA QC
- `lambda.txt` -- genomic inflation factor + a
  human-readable interpretation

Run time is ~1-3 min for the tutorial input. The
§10.2 notebook path below is a useful offline
alternative when you want to re-plot the same
statistics with `gwaslab` for publication.
:::

### Live walkthrough: sparse vs imputed (chr22, 661 samples)

Running the pipeline twice -- once on the 4,423-
variant sparse input and once on the R²>0.5-
filtered imputed dose VCF (19,171 variants) --
produced the headline comparison the workshop is
built around:

| Metric | Sparse GWAS | Imputed GWAS (R² > 0.5) |
| --- | --- | --- |
| Variants analysed | **889** (post-PLINK QC) | **15,779** (post-PLINK QC) |
| Top hit | chr22:36276581 (p = 1.74e-11) | chr22:36276581 (p = 5.97e-11) |
| Variants at p < 5e-8 | 1 | **5** (chr22:36276581, 36281936, 36282430, 50237830-40142) |
| New locus revealed | -- | **chr22:50.2Mb region** (3 genome-wide-sig SNPs, invisible in sparse) |
| Nearby fine-mapping at top locus | 1 peak SNP | 4 peak SNPs within 10 kb (36276230, 36276581, 36279104, 36281936, 36282430) |
| Genomic inflation λ | 2.54 | 2.52 |
| Wall-clock | 1m 34s | 2m 3s |

**Sparse Manhattan + QQ (baseline)**

![Sparse Manhattan plot](/images/gwas/sparse-gwas_manhattan.png)

![Sparse QQ plot](/images/gwas/sparse-qq_plot.png)

**Imputed Manhattan + QQ (R² > 0.5 filter)**

![Imputed Manhattan plot](/images/gwas/imputed-gwas_manhattan.png)

![Imputed QQ plot](/images/gwas/imputed-qq_plot.png)

Two visual read-outs dominate:

1. The Manhattan plot's gap-filled skyline effect --
   the sparse baseline has wide empty stretches
   across chr22; the imputed version fills them in
   and shows a *second* genome-wide-significant
   cluster near 50.2 Mb that the sparse sample
   rate simply couldn't see.
2. The QQ tail extends further on the imputed run
   -- more low p-values, unchanged λ, consistent
   with added power rather than added confounding.

### 10.2 Using the GWAS Visualization Notebook (Hands-on)

**Open the notebook:** `gwas_visualization.ipynb`

This notebook uses the `gwaslab` package for publication-quality plots.

#### Step 1: Load GWAS Results

```python
import gwaslab as gl
import pandas as pd
import matplotlib.pyplot as plt

# Load your GWAS results
results_file = "gwas_results.glm.firth"
sumstats = gl.Sumstats(results_file, fmt="plink2")
```

#### Step 2: Create Manhattan Plot

```python
# Generate Manhattan plot
sumstats.plot_mqq(
    mode="m",                  # Manhattan plot
    title="GWAS Manhattan Plot",
    anno=True,                 # Annotate significant variants
    save="manhattan_plot.png",
    dpi=300
)
```

**Interpreting the Manhattan Plot:**

- X-axis: Chromosomal position
- Y-axis: -log10(p-value)
- Red line: Genome-wide significance threshold (p < 5×10⁻⁸)
- Peaks indicate associated regions

> **💡 Key Concept: Manhattan Plot**
>
> Named after the New York City skyline it resembles, a **Manhattan plot** displays the statistical significance of genetic variants across all chromosomes. Each dot represents one variant.
>
> **Reading the plot:**
>
> - **Higher dots** = stronger association (smaller p-values)
> - **Peaks/towers** = genomic regions with many associated variants (due to LD)
> - **Significance line** (usually red) = genome-wide significance threshold
> - Variants above this line are considered significant hits

#### Step 3: Create QQ Plot

```python
# Generate QQ plot
sumstats.plot_mqq(
    mode="qq",                 # QQ plot
    title="GWAS QQ Plot",
    save="qq_plot.png",
    dpi=300
)
```

**Interpreting the QQ Plot:**

- Compares observed vs expected p-values
- Diagonal line = null expectation
- **λ (lambda)** - Genomic inflation factor
  - λ ≈ 1.0: Well-controlled confounding
  - λ > 1.1: Possible population stratification

> **💡 Key Concept: Genomic Inflation Factor (λ)**
>
> **Lambda (λ)** measures whether your GWAS p-values are systematically inflated compared to what's expected by chance. It's calculated as the median observed chi-squared statistic divided by the expected median.
>
> | Lambda Value | Interpretation |
> |--------------|----------------|
> | λ = 1.0 | Perfect - no inflation |
> | λ = 1.0-1.05 | Acceptable |
> | λ = 1.05-1.10 | Minor inflation, investigate |
> | λ > 1.10 | Significant inflation - likely population stratification or relatedness |
>
> **If λ is high**, consider: adding principal components as covariates, removing related individuals, or using mixed models.

#### Step 4: Combined Plot

```python
# Create publication-ready combined figure
# (See notebook for full implementation)
```

### 10.3 Saving Your Visualizations

All plots are saved as PNG files with 300 DPI resolution, suitable for:

- Publications
- Presentations
- Reports

---

### 📝 Check Your Understanding: GWAS Visualization

<details>
<summary><strong>Question 1:</strong> What does a peak in a Manhattan plot indicate?</summary>

**Answer:** A peak in a Manhattan plot indicates a **genomic region associated with the trait** being studied. The height of the peak corresponds to the strength of association (-log10 of p-value). Peaks crossing the genome-wide significance threshold (red line, p < 5×10⁻⁸) are considered significant.

</details>

<details>
<summary><strong>Question 2:</strong> Your QQ plot shows λ = 1.35. What does this suggest?</summary>

**Answer:** A λ (genomic inflation factor) of 1.35 suggests **possible population stratification** or other systematic bias in the data. Values above 1.1 warrant investigation. You should:

1. Check for population substructure
2. Include principal components as covariates
3. Use mixed models for association testing
4. Verify sample quality

</details>

<details>
<summary><strong>Question 3:</strong> What is the genome-wide significance threshold and why is it used?</summary>

**Answer:** The genome-wide significance threshold is **p < 5×10⁻⁸**. It's used because:

1. It corrects for multiple testing (~1 million independent tests)
2. It's based on Bonferroni correction for common variants
3. It minimizes false positives while maintaining power
4. It's the established standard in the field

</details>

---

### 🏋️ Exercise 6: Create GWAS Visualizations

**Task:** Generate Manhattan and QQ plots using the provided notebook.

**Steps:**

1. Open `gwas_visualization.ipynb`
2. Run the cells to load the sample GWAS results
3. Generate the Manhattan plot
4. Generate the QQ plot
5. Check the λ (lambda) value

<details>
<summary><strong>💡 Hint: Interpreting Your Results</strong></summary>

For the sample data, you should see:

- **Manhattan plot**: May show some suggestive peaks (depending on data)
- **QQ plot**: Points should follow the diagonal line
- **Lambda (λ)**: Should be close to 1.0 for well-controlled data

</details>

<details>
<summary><strong>🎯 Challenge: Create a Combined Figure</strong></summary>

**Advanced Task:** Modify the notebook to create a single figure with:

- Manhattan plot on the left (80% width)
- QQ plot on the right (20% width)

See the "Combined Plot" section in the notebook for implementation hints.

</details>

---

## 11. Case Study: Complete Imputation and GWAS Workflow

*→ Live walkthrough: [Workflow steps 1--4 end-to-end](/workflow) (this case study covers the same sparse → impute → compare loop as a single narrative).*

This section demonstrates a complete end-to-end
workflow from raw genotype data to GWAS results,
comparing outcomes between sparse (original) and
imputed data.

::: tip Reproduce this on FedImpute
Every number in this case study came out of the
same **New Job** wizard you used in §§6 and 10:
one imputation on **H3Africa v6 (full)** plus two
GWAS runs (sparse baseline, then R²-filtered
imputed). You can reproduce the entire flow on
your own account.
:::

### 11.1 Study Overview

**Dataset:** 661 African samples with sparse genotyping data on chromosome 22

| Dataset | Variants | Description |
|---------|----------|-------------|
| **Sparse (original)** | 4,423 | SNP array input, chr22, hg38, bgzipped |
| **Imputed (raw)** | 726,241 | Minimac4 output, H3Africa v6 (full) panel, all R² |
| **Imputed (R² > 0.3)** | 36,897 | Discovery-grade filter |
| **Imputed (R² > 0.5)** | 19,171 | Workshop-demo filter (used for §11.4 GWAS) |
| **Imputed (R² > 0.8)** | 4,672 | Fine-mapping-grade filter |

**Variant density increase:** up to **164× more
variants** raw, 4× more after the workshop-demo R²
> 0.5 filter. Tighter filters trade density for
confidence.

### 11.2 Pre-GWAS: Data Preparation Pipeline

Before running GWAS, the data must be properly prepared. This involves several quality control steps:

#### Step 1: VCF Liftover (if needed)

If your data is in GRCh37/hg19 format, convert to GRCh38/hg38:

| Parameter | Value |
|-----------|-------|
| Input Build | GRCh37 (hg19) |
| Output Build | GRCh38 (hg38) |
| Chain File | hg19ToHg38.over.chain |

**Why liftover?** The H3Africa v6 reference panel uses GRCh38 coordinates. Using mismatched coordinates will result in failed imputation.

#### Step 2: Allele Switch Check

Validate REF/ALT allele orientation against the reference panel:

| Metric | Value |
|--------|-------|
| Duration | 15 seconds |
| Input Variants | 4,423 |
| Corrected Sites | Automatic |
| Output | Allele-corrected VCF |

**What it checks:**
- REF/ALT allele orientation matches reference genome
- Strand flips (A/T, C/G ambiguous SNPs)
- Allele switches (REF and ALT swapped)

**Options:**
- **Remove switched sites** - Delete problematic variants
- **Correct switched sites** - Swap alleles to match reference (recommended)

#### Step 3: Genotype Imputation

Impute missing genotypes using the H3Africa v6 (full) panel:

| Parameter | Value |
|-----------|-------|
| Duration (reference run) | 17 m 32 s |
| Reference Panel | H3Africa v6 (full) (GRCh38, 4,447 samples, 58.7 M variants) |
| Population | Mixed / Unknown (works for African cohorts) |
| Phasing | Eagle v2.4 |
| Imputation | Minimac4 (via `imputationserver2` v2.0.12) |

### 11.3 Imputation Quality Summary

Values from the reference v6 (full) run:

| Metric | Value |
|--------|-------|
| Input SNPs | 4,423 |
| Reference Overlap | 55.68 % |
| Matched Variants | 2,460 |
| Typed-only Sites | 1,959 |
| Alternative allele freq > 0.5 sites | 4,335 |
| Monomorphic Sites | 3 |
| Allele Mismatch | 1 |
| Invalid Alleles | 0 |
| Allele Switches | 0 |
| Strand Flips | 0 |
| Chunks total / passed / excluded | 2 / 2 / 0 |
| Output Variants (raw) | 726,241 |

### 11.4 Running GWAS

Two GWAS analyses were performed through FedImpute's
hosted **GWAS Training** pipeline (§10):

#### GWAS Parameters (same for both runs)

| Parameter | Value |
|-----------|-------|
| Phenotype Column | B1 (binary trait) |
| MAF Threshold | 0.01 |
| Sample Missingness | 0.1 |
| SNP Missingness | 0.1 |
| HWE P-value | 1 × 10⁻⁶ |
| Method | PLINK2 Firth logistic regression |

#### GWAS on Sparse Data

| Metric | Value |
|--------|-------|
| Input VCF | `1k_afr_661_samples_4k_variants_hg38_agsc2025_chr22.vcf.gz` (219 KB) |
| Variants submitted | 4,423 |
| Variants analysed (post-PLINK QC) | **889** |
| Wall-clock | 1 m 34 s |
| Samples | 661 |
| Genomic inflation λ | 2.54 |

#### GWAS on Imputed Data

| Metric | Value |
|--------|-------|
| Input VCF | `chr22.imputed.r2med.vcf.gz` (87 MB, R² > 0.5 filter via `bcftools`) |
| Variants submitted | 19,171 |
| Variants analysed (post-PLINK QC) | **15,779** |
| Wall-clock | 2 m 3 s |
| Samples | 661 |
| Genomic inflation λ | 2.52 |

### 11.5 Post-GWAS: Results Comparison

#### Key Differences in Manhattan Plots

| Metric | Sparse Data | Imputed Data (R² > 0.5) |
|--------|-------------|--------------|
| **Variants analysed** | 889 | 15,779 |
| **Top signal** | chr22:36276581 (p = 1.74 × 10⁻¹¹) | chr22:36276581 (p = 5.97 × 10⁻¹¹) |
| **Variants at p < 5 × 10⁻⁸** | 1 | **5** |
| **Fine-mapping at top locus** | 1 peak SNP | 4 adjacent peak SNPs within 10 kb (36276230, 36279104, 36281936, 36282430) |
| **New locus revealed** | — | **chr22:50.2 Mb region** (3 sig SNPs: 50237830, 50239025, 50240142) |
| **Density** | thin / sparse | dense skyline |
| **Genomic inflation λ** | 2.54 | 2.52 |

#### Manhattan Plot: Sparse Data (889 variants analysed)

![Sparse Manhattan plot from FedImpute GWAS Training](/images/gwas/sparse-gwas_manhattan.png)

- Single genome-wide-significant peak at
  **chr22:36276581** (p = 1.74 × 10⁻¹¹,
  -log₁₀P ≈ 10.8)
- Scattered points with wide gaps between variants
- Limited ability to fine-map the signal
- λ = 2.54 indicates substantial inflation --
  worth investigating population stratification

#### Manhattan Plot: Imputed Data (R² > 0.5; 15,779 variants analysed)

![Imputed Manhattan plot from FedImpute GWAS Training](/images/gwas/imputed-gwas_manhattan.png)

- Same primary signal at **chr22:36276581**
  (p = 5.97 × 10⁻¹¹) -- now *fine-mapped* with four
  adjacent SNPs also p < 5 × 10⁻⁸
  (chr22:36276230, 36279104, 36281936, 36282430)
- **NEW locus at chr22:50.2 Mb** -- three SNPs at
  p ≈ 8.6 × 10⁻⁸ (50237830, 50239025, 50240142)
  that were invisible in the sparse baseline
- Much denser coverage across the chromosome
- λ = 2.52 (unchanged vs sparse) -- the added
  variants bring power, not confounding

#### QQ plots

![Sparse QQ plot](/images/gwas/sparse-qq_plot.png)

![Imputed QQ plot](/images/gwas/imputed-qq_plot.png)

The imputed QQ tail extends to smaller p-values --
more bins of tested variants, same λ.

### 11.6 Key Findings Summary

| Finding | Sparse Data | Imputed Data |
|---------|-------------|--------------|
| Primary signal detected | ✅ Yes | ✅ Yes |
| Fine-mapping at top locus | ❌ 1 SNP only | ✅ 4 adjacent peak SNPs |
| Second independent locus | ❌ No | ✅ **chr22:50.2 Mb (NEW)** |
| Suggestive signals visible | Few | Many |

### 11.7 Interpretation

> **💡 Key Insight: Why Imputation Matters for GWAS**
>
> Two complementary discoveries emerged from the
> imputed data:
>
> 1. **Fine-mapping at the known locus.** The top
>    signal at chr22:36276581 gains four adjacent
>    genome-wide-significant SNPs within 10 kb, which
>    would support LD-based credible-set analyses
>    and downstream colocalisation with eQTLs.
> 2. **A second independent locus is revealed.**
>    chr22:50.2 Mb has three genome-wide-significant
>    SNPs in the imputed data that the 4,423-variant
>    sparse baseline could not see.
>
> Both are driven by one mechanism -- imputation
> raises chr22 coverage from ~900 analysed variants
> to ~16,000 at the R² > 0.5 filter (~4×) or ~37,000
> at R² > 0.3 (~40×). With an unchanged genomic
> inflation factor (λ ≈ 2.5 in both), the extra
> signals reflect power, not confounding.

### 11.8 Practical Implications

**When to use imputed data for GWAS:**
- ✅ Discovery of new associations
- ✅ Fine-mapping causal variants
- ✅ Meta-analysis across different arrays
- ✅ Increasing statistical power
- ✅ Detecting secondary independent signals

**Quality considerations:**
- Filter imputed variants by R² > 0.3 for discovery
  (the GWAS Training pipeline's default)
- Use R² > 0.8 for fine-mapping
- Always compare results with directly genotyped
  variants (the `TYPED` flag in Minimac4 output)
- Check for population stratification (λ value in
  QQ plot; GWAS Training emits `lambda.txt` with a
  human-readable interpretation)
- Consider adding PCs as covariates if λ is high --
  GWAS Training emits `pca_results.eigenvec` for
  exactly this purpose

### 11.9 Complete Workflow Timeline

Wall-clock from the reference run:

| Step | Tool / pipeline | Duration | Output |
|------|------|----------|--------|
| 1. Sparse GWAS | GWAS Training (FedImpute) | 1 m 34 s | Manhattan, QQ, λ, `.glm.firth` |
| 2. Imputation | Genotype Imputation (FedImpute, v6 full) | 17 m 32 s | Encrypted `chr_22.zip` (645 MB), `quality-control.html`, RO-Crate |
| 3. Extract + R² filter | `unzip -P` + `bcftools view -e 'INFO/R2<0.5'` | ~30 s local | `chr22.imputed.r2med.vcf.gz` (87 MB, 19,171 variants) |
| 4. Imputed GWAS | GWAS Training (FedImpute) | 2 m 3 s | Manhattan, QQ, λ, `.glm.firth` |
| **Total** | | **~22 min** | Complete sparse → imputed comparison |

---

### 📝 Check Your Understanding: Case Study

<details>
<summary><strong>Question 1:</strong> How many times more variants were available after imputation?</summary>

**Answer:** Minimac4 emitted **726,241 imputed variants** from the 4,423-variant sparse input (**~164×**) on the full v6 panel. After the R² > 0.5 discovery filter (the one used in §11.4's GWAS run), 19,171 variants survive -- still ~4× the sparse input and enough to reveal the second locus. Tighter filters (R² > 0.8) leave ~4,600 variants, fine-mapping-grade only.

</details>

<details>
<summary><strong>Question 2:</strong> Why were the new signals at chr22:50.2 Mb only detected after imputation?</summary>

**Answer:** The 4,423-variant sparse array simply did not contain variants in strong LD with the causal SNP in the 50.2 Mb region, so the locus was effectively invisible pre-imputation. Minimac4 filled in chr22 at much higher density; at the R² > 0.5 filter, 15,779 variants reach the GWAS post-PLINK-QC cut, including three at p ≈ 8.6 × 10⁻⁸ around 50.2 Mb. This is the canonical "imputation reveals untyped causal regions" result.

</details>

<details>
<summary><strong>Question 3:</strong> Both analyses detected the primary signal at chr22:36276581. Does this mean imputation wasn't necessary for this signal?</summary>

**Answer:** Both runs detected the single sparse SNP at 36276581 -- but the imputed run *also* found **four additional genome-wide-significant SNPs within 10 kb** (36276230, 36279104, 36281936, 36282430). That's the fine-mapping payoff: without imputation you have one peak SNP; with imputation you have a credible set.

</details>

<details>
<summary><strong>Question 4:</strong> What was the reference overlap percentage, and what does this mean?</summary>

**Answer:** The reference overlap was **55.68 %** -- 2,460 of the 4,423 input sites matched a panel site. 1,959 sites were "typed-only" (present in your input but not in the panel; passed through as-is, not imputed), 3 sites were monomorphic, and 1 had an allele mismatch. Reference overlap of 50-70 % is typical for sparse African SNP-array data against the H3Africa v6 panel; dropping much below that is a red flag for panel-population mismatch or build mismatch.

</details>

<details>
<summary><strong>Question 5:</strong> The imputation took 17 m 32 s while GWAS on the imputed data took only 2 m 3 s. Why is imputation much slower?</summary>

**Answer:** Imputation is computationally intensive because it:
1. **Phases the data** - Determines which alleles are on each haplotype using Eagle
2. **Searches the reference panel** - Finds matching haplotypes among millions of variants
3. **Imputes missing genotypes** - Calculates posterior probabilities for each variant
4. **Calculates quality metrics** - Computes R² scores for all imputed variants

GWAS is faster because it simply runs regression tests on pre-existing genotypes without the complex haplotype matching.

</details>

<details>
<summary><strong>Question 6:</strong> What would happen if you ran GWAS on the imputed data without filtering by R²?</summary>

**Answer:** Including low-quality imputed variants (R² < 0.3) could lead to:
- **False positives** - Poorly imputed variants may show spurious associations
- **Reduced power** - Noise from uncertain genotypes dilutes true signals
- **Inflated test statistics** - Unreliable dosages affect regression estimates

Best practice is to filter to R² > 0.3 for discovery and R² > 0.8 for fine-mapping.

</details>

---

### 🏋️ Exercise 7: Replicate the Case Study

**Task:** Run the complete imputation and GWAS workflow on your own data.

**Steps:**

1. **Prepare your input VCF**
   - Single chromosome, hg38 (or liftover first)
   - bgzipped (`file <name>.gz` must show *BGZF*),
     sorted by position
   - ≥ 20 samples

2. **GWAS on sparse input (FedImpute → GWAS Training)**
   - New Job → GWAS Training → AfriGen-D node
   - Upload sparse VCF + phenotype file (`.txt`/`.tsv`,
     header `FID IID B1`)
   - Defaults: MAF 0.01, Sample Missing 0.1,
     Genotype Missing 0.1, HWE 1 × 10⁻⁶
   - Submit, wait ~1-2 min
   - Download Manhattan, QQ, `.glm.firth`, `lambda.txt`

3. **Imputation on FedImpute → Genotype Imputation**
   - New Job → Genotype Imputation → AfriGen-D node
   - Panel: **H3Africa v6 (full)** (recommended for
     sparse input; see [§6.3](#_6-3-select-panel))
   - Upload sparse VCF; tick both DUA checkboxes
   - Submit, wait ~15-20 min
   - Copy the Overview-tab encryption password

4. **Extract + filter imputed output locally**
   - Download `chr_<N>.zip` from the Files tab
   - `unzip -P "<password>" chr_<N>.zip`
   - Filter with bcftools (keeps the upload under
     the 500 MB GWAS Training limit):

     ```bash
     bcftools view -e 'INFO/R2<0.5' \
       -Oz -o chr22.imputed.r2med.vcf.gz \
       chr_22.dose.vcf.gz
     bcftools index -t chr22.imputed.r2med.vcf.gz
     ```

5. **GWAS on imputed data (FedImpute → GWAS Training)**
   - New Job → GWAS Training, same parameters as
     Step 2, but upload the filtered imputed VCF +
     the same phenotype file
   - Submit, wait ~2-3 min

6. **Document your findings**
   - Analysed-variant count: sparse vs imputed
   - Any new genome-wide-significant loci after
     imputation?
   - What's the λ on each run? Did it change?
   - Reference Overlap from the imputation
     QC Statistics panel?

<details>
<summary><strong>✅ Success Criteria</strong></summary>

You have successfully completed this exercise if:

- [ ] Both GWAS jobs finished on FedImpute with no
  errors (PCA-stage retries are OK, final status
  must be "completed")
- [ ] Imputation job finished successfully, ZIP
  downloaded and extracted
- [ ] You produced Manhattan + QQ plots for both
  sparse and imputed inputs
- [ ] You identified at least a ~4× increase in
  analysed variants after the R² > 0.5 filter
  (higher if you use R² > 0.3)
- [ ] You documented any new genome-wide-significant
  signals that the sparse run missed

</details>

---

## 12. Best practices and tips

### Data Preparation

✅ **Do:**

- Use compressed files (.vcf.gz) for faster upload
- Remove related individuals before imputation
- Apply standard GWAS QC filters beforehand
- Use consistent chromosome naming (chr1-chr22 for hg38)

❌ **Don't:**

- Upload raw, unfiltered data
- Include non-autosomal chromosomes
- Use outdated genome builds without liftover
- Submit extremely small datasets (<100 samples)

### Reference Panel Selection

| Study Population | Recommended FedImpute Panel |
|------------------|-------------------|
| West African (e.g. Yoruba, Igbo) | H3Africa v6 (full) |
| East African (e.g. Luhya, Kikuyu) | H3Africa v6 (full) |
| South African (e.g. Xhosa, Zulu) | H3Africa v6 (full) |
| African American / Afro-Caribbean | H3Africa v6 (full) |
| Purely African-ancestry cohort (sequencing-grade input) | H3Africa v6 African-only (denser match; note: **sparse input may fail QC** -- see [§6.3](#_6-3-select-panel)) |
| Pan-African research with DAA approval | H3Africa v7 (newer, richer; Request Access) |
| European-ancestry benchmark only | HapMap2 chr20 (CEU) -- do not use for African-cohort discovery |

### Quality Filtering

**Recommended post-imputation filters:**

- R² > 0.3 (minimum for association testing)
- R² > 0.8 (for fine-mapping)
- MAF > 0.01 (for well-powered GWAS)

---

### 📝 Final Quiz: Test Your Knowledge

<details>
<summary><strong>Quiz Question 1:</strong> You have genotype data from a Yoruba population in Nigeria. Which reference panel should you use?</summary>

**Answer:** On FedImpute, choose the **H3Africa v6 (full)** panel from the reference-panel picker (§4.2). For sparse SNP-array input, v6 (full) gives the best reference overlap; its backend YAML is the H3Africa V6HC-S panel family. For denser (exome/WGS) input, v7 is a stronger match once you have Data Access Agreement approval.

</details>

<details>
<summary><strong>Quiz Question 2:</strong> Your imputation job failed at the QC step. List 3 possible causes.</summary>

**Answer:** Possible causes include:

1. **Wrong genome build** - Data coordinates don't match reference panel (hg38)
2. **Multiallelic variants** - Should be biallelic only
3. **Duplicate variant IDs** - Each variant needs a unique ID
4. **File format issues** - Corrupted or malformed VCF
5. **Allele mismatch** - REF/ALT alleles don't match reference genome

</details>

<details>
<summary><strong>Quiz Question 3:</strong> What does R² (Rsq) measure in imputation quality?</summary>

**Answer:** R² (imputation quality score) estimates the correlation between imputed and true genotypes. It ranges from 0 to 1:

- **R² = 1.0**: Perfect imputation (variant was directly genotyped or imputed with complete certainty)
- **R² > 0.8**: High quality imputation
- **R² > 0.3**: Acceptable for GWAS (commonly used threshold)
- **R² < 0.3**: Low quality, often filtered out

</details>

<details>
<summary><strong>Quiz Question 4:</strong> Why might some variants have low R² values?</summary>

**Answer:** Low R² values typically occur due to:

- **Rare variants**: Low minor allele frequency (MAF < 1%) variants are harder to impute accurately
- **Poor reference panel coverage**: Variant not well-represented in the reference panel
- **Population mismatch**: Study population differs from reference panel ancestry
- **Low LD**: Variant in region with low linkage disequilibrium with typed markers

</details>

---

## 13. Troubleshooting

Platform-agnostic failure modes first -- these are
the ones worth memorising because they recur
regardless of which imputation service you run on.

<!-- markdownlint-disable MD013 -->

| Symptom | Likely cause | What to do |
| --- | --- | --- |
| **Upload rejected** | Wrong compression -- plain `gzip` instead of `bgzip` | Recompress with `bgzip` (`file <name>.gz` must show *BGZF*) |
| **Upload rejected: "must be sorted"** | VCF isn't sorted by position | `bcftools sort -Oz -o sorted.vcf.gz unsorted.vcf.gz` |
| **Upload rejected: "minimum 20 samples"** | Cohort smaller than FedImpute's minimum | Add samples or run on a local imputation stack |
| **Job fails at QC: allele mismatch** | REF allele disagrees with the chosen panel | Run the [allele-switch check](#allele-switch-checker) first; flip or drop offenders |
| **Job fails at QC: build mismatch** | Input is hg19 but panel is hg38 (or vice versa) | Liftover with [VCF Liftover](#vcf-liftover) -- hg19 → hg38 is the common case |
| **Job stuck in queue** | Service busy at the workshop-day peak | Wait; the job runs once capacity frees |
| **Low R² across the board** | Population-panel mismatch | See [/services](/services) -- African cohorts should use H3Africa, not HRC/1000G |
| **Low R² on rare variants only** | Expected -- imputation is statistical | Filter by R² (e.g. R² > 0.8) before rare-variant analysis |
| **Missing variants in output** | Variant absent from the panel | Expected; fold in a second panel if you need them |
| **Can't download: "password expired"** | The one-time password email is >7 days old | Re-submit; results are deleted after 7 days |
| **Submit button stays disabled** | Data Use Agreement checkboxes not ticked | Scroll to the bottom of Review & Submit and check **both** DUA boxes |
| **AGVD "Login Required" on variant detail** | Per-population frequency breakdowns require a signed-in AGVD account | Sign in at <https://nyame.afrigen-d.org/accounts/login/> (register in advance if possible) |
| **Feeding an imputed VCF back in as input** | The job's `chr_<N>.zip` output isn't available as a direct input to a follow-up job yet | Download the ZIP from the imputation job's Files tab (§8), extract it locally (`unzip -P <password>`), filter by R² with the hosted **Imputation QC** pipeline (§4.1) or with `bcftools` (§9.3), and upload the filtered dose VCF as a new input. |

<!-- markdownlint-enable MD013 -->

::: tip When things fail silently
The most damaging failure mode is a job that
**completes** but produces low-quality output. Always
look at the R² histogram and variant count before
drawing conclusions -- the
[Workflow Step 3 checklist](/workflow#step-3-download-imputed-results-r2-qc)
walks through the QC that catches this.
:::

### FedImpute-specific diagnostics

- **Auth redirect loop:** if clicking *Sign in with
  AfriGen-D Identity* bounces you back to the login
  page, clear cookies for
  `kibali.afrigen-d.org` and
  `fedimpute.afrigen-d.org`, then retry.
- **Account not recognised after registration:** the
  verification email has a 24-hour window. If it
  expires, re-register with the same email.
- **Download link expired:** FedImpute keeps imputed
  results for **7 days** after completion, encrypted
  with a one-time password sent by email. Re-run the
  job if the window has passed.

### Getting help

- **Documentation:** <https://afrigen-d.org>
- **Support / helpdesk:** <https://helpdesk.afrigen-d.org>
- **Email:** <support@bioinformaticsinstitute.africa>

---

## 14. Summary

### What You Learned

1. ✅ How to register for FedImpute and navigate its interface
2. ✅ How to prepare data for imputation
3. ✅ How to submit and monitor imputation jobs
4. ✅ How to download and interpret results
5. ✅ How to assess imputation quality with R² plots
6. ✅ How to create GWAS visualizations

### Key Takeaways

- **African-specific reference panels** significantly improve imputation for African populations
- **R² > 0.3** is the minimum threshold for reliable imputed variants
- **Quality assessment** is essential before downstream analysis
- The **FedImpute** provides an accessible platform for African genomics research

### Next Steps

- Explore other AfriGen-D resources (AGMP, AGVD)
- Apply imputed data to your research questions
- Consider contributing to African reference panels

---

## Resources

### AfriGen-D Resources

- **AfriGen-D Portal:** [afrigen-d.org](https://afrigen-d.org)
- **Imputation Service:** [fedimpute.afrigen-d.org](https://fedimpute.afrigen-d.org)
- **African Genomics Medicine Portal (AGMP):** [agmp.afrigen-d.org](https://agmp.afrigen-d.org)
- **African Genome Variation Database (AGVD):** [agvd.afrigen-d.org](https://agvd.afrigen-d.org)

### External Resources

- **Michigan Imputation Server:** [imputationserver.sph.umich.edu](https://imputationserver.sph.umich.edu)
- **H3ABioNet:** [h3abionet.org](https://h3abionet.org)
- **1000 Genomes Project:** [internationalgenome.org](https://internationalgenome.org)

### Publications

- Baichoo S, et al. (2018). Developing reproducible bioinformatics analysis workflows for heterogeneous computing environments. *BMC Bioinformatics*, 19(1):457.
- Das S, et al. (2016). Next-generation genotype imputation service and methods. *Nature Genetics*, 48(10):1284-1287.

---

## Appendix: Workshop Schedule (14:00--18:00 block, targets 17:45 finish)

The canonical live schedule is at
[**`/schedule`**](/schedule), and per-step checklists
(Data prep · QC · Run · Verify) live on
[**`/workflow`**](/workflow). This tutorial only
duplicates the schedule at the time of writing --
if the two disagree, `/schedule` is the source of
truth.

---

**Tutorial Version:** 2.0
**Last Updated:** April 2026
**Authors:** Mamana Mbiyavanga, AfriGen-D Training Team

*Originally developed for the 1st African Genomics
Short Course (Cape Town, December 2025). Adapted and
extended for the 19th Annual International Biocuration
Conference (ISB Cape Town, April 2026).*
