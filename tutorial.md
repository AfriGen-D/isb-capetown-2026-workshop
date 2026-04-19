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

::: warning Screenshots note -- read before you start
The workshop now uses **FedImpute** at
<https://fedimpute.afrigen-d.org> for every step, and
all URLs and instructions below target it.

**Rewritten against FedImpute (current):**
sections 2 (Getting Started), 4.2 (Reference
Panels, from the live FedImpute FAQ), 5 (Data
Preparation), and 13 (Troubleshooting).

**Softened to concept-level pending re-capture:**
sections 3 (Dashboard) and 4.1 (Pipeline listing).
The text no longer asserts specific UI details that
may have changed; the FedImpute-specific layout will
be documented after an authenticated walkthrough.

**Still carry legacy screenshots and step-by-step
from the retired `impute.afrigen-d.org` service:**
sections 6--11 (Submit / Monitor / Download / QC /
GWAS / Case Study). The *concepts* transfer directly,
the *UI screens* have changed. Lean on
[section 0](#_0-the-fedimpute-platform) and the
[`/workflow`](/workflow) checklists for the current
flow while those sections are re-captured in
Phase 2.
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

![FedImpute landing page](/images/platforms/elwazi-01-landing.png)

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

![FedImpute login screen](/images/platforms/elwazi-03-login.png)

Log in with your **AfriGen-D Identity** account. If
you don't have one,
[register here](https://kibali.afrigen-d.org/if/flow/afrigend-enrollment/)
-- this SSO account covers FedImpute. AGVD does
**not yet** share the SSO and requires a separate
signup at
<https://nyame.afrigen-d.org/accounts/login/>.

<!-- TODO(mamana): re-capture detailed step-by-step
     screens (upload VCF, select reference panel,
     configure parameters, monitor progress, download
     results) against FedImpute. Sections 2-11 below
     still show the retired legacy UI; the URLs have
     been updated to fedimpute.afrigen-d.org but the
     screenshots have not yet been refreshed. -->

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

![FedImpute About page -- participating institutions: H3Africa Consortium and UCT/ILIFU](/images/platforms/elwazi-02-about.png)

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

![FedImpute login page with Register button top-right and Sign up link inside the card](/images/fedimpute/01-login.png)

You will be redirected to the **AfriGen-D enrollment
page** at
<https://kibali.afrigen-d.org/if/flow/afrigend-enrollment/>.
Fill in the eight fields -- the first six are
required, the last field (Role / Position) is
optional:

![Top of the Kibali enrollment form: Full Name, Email, Username, Password, Confirm Password](/images/fedimpute/02-enroll-top.png)

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

Scroll to the bottom, tick the two consent checkboxes,
and click **Continue**:

![Bottom of the enrollment form: Institution, Country, Role, two consent checkboxes, blue Continue button](/images/fedimpute/03-enroll-bottom.png)

- "I agree to the AfriGen-D Terms of Service and
  understand that access to controlled datasets
  requires a Data Access Agreement."
- "I have read and accept the Privacy Policy and
  understand my data will be processed per applicable
  regulations."

Kibali then sends a verification email to the address
you supplied -- open it and click the confirmation
link before continuing to the next step.

### 2.2 Logging in to FedImpute

Once your email is verified, return to
<https://fedimpute.afrigen-d.org/login> and click
**Sign in with AfriGen-D Identity** (the big green
button). Kibali handles the username + password
prompt, then redirects you back to FedImpute as a
logged-in user.

<!-- TODO(mamana): after the first authenticated run,
     add a screenshot of the post-login FedImpute
     dashboard here and update section 3 below. -->

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

::: warning FedImpute UI capture pending
This section describes the **legacy AfriGen-D
Imputation Service** dashboard. The exact FedImpute
dashboard layout (button names, menus, panel
sections) will be documented after an authenticated
re-capture pass. The concepts below -- jobs list,
status categories, navigation -- map to any modern
imputation service and are a good mental model to
arrive with.
:::

Once signed in, a typical imputation-service
dashboard lets you:

- **See your submitted jobs** with a status for each
  (queued, running, completed, failed)
- **Submit a new job** through a pipeline selector
- **Download results** from completed jobs
- **Manage your account** (profile, logout, Data
  Access Agreements)

On FedImpute specifically, the screens live under the
authenticated routes at
<https://fedimpute.afrigen-d.org> after you sign in
via AfriGen-D Identity (§2).

### Navigation on the live platform

FedImpute exposes Home and About as public routes;
everything else becomes reachable once you are
signed in. The exact menu structure will be
documented alongside screenshots in the Phase-2
re-capture pass.

<!-- TODO(mamana): capture the FedImpute dashboard
     once authenticated + list the actual nav items.
     Replace the "typical imputation-service
     dashboard" bullets with FedImpute-specific ones.
  -->

---

## 4. Exploring Available Pipelines

### 4.1 Accessing Pipelines

::: warning FedImpute UI capture pending
The pipeline list below inherits from the legacy
AfriGen-D Imputation Service. The **Genotype
Imputation** pipeline is definitely on FedImpute
(it's the platform's main purpose). Whether the
supporting tools (GWAS Training, Allele Switch
Checker, VCF Liftover) are hosted on FedImpute
itself or are separate services will be confirmed
during the Phase-2 authenticated re-capture.
:::

The pipelines this tutorial references:

- **Genotype Imputation** -- the main workflow,
  using African-specific reference panels (see §4.2)
- **GWAS Training Workflow** -- GWAS analysis using
  PLINK2 on the imputed output
- **Allele Switch Checker** (Checkref) -- QC tool
  for detecting strand / allele issues before
  imputation (§4.3.2)
- **VCF Liftover** -- convert between genome builds
  (hg19 ↔ hg38) before imputation when the input
  build doesn't match the panel (§4.3.3)

<!-- TODO(mamana): confirm during Phase-2
     authenticated walkthrough which of these
     pipelines are actually on FedImpute's /run (or
     equivalent) page vs separate tools. Update this
     list accordingly. -->

### 4.2 Available Reference Panels

Per the live FedImpute FAQ at
<https://fedimpute.afrigen-d.org>:

<!-- markdownlint-disable MD013 -->

| Panel | Build | Notes |
| --- | --- | --- |
| **H3Africa v6 (full)** | hg38 (hg19 via liftover) | African-specific, 48 populations, 8,894 haplotypes. The baseline panel used in [Sengupta et al. 2023][sengupta-panels]. |
| **H3Africa v6 (African-only subset)** | hg38 | Sub-set of v6 restricted to African-ancestry haplotypes; useful when the admixed cohorts in v6 would dilute the population match. |
| **H3Africa v7** | hg38 | Successor to v6, targets **African-ancestry imputation** specifically. Incorporates newer cohorts. This is the recommended default for African studies on FedImpute. |
| **HapMap2 (CEU)** | hg19 / hg38 | European-ancestry panel, kept for **benchmarking** against African panels -- not for primary analysis of African cohorts. |

<!-- markdownlint-enable MD013 -->

[sengupta-panels]: https://doi.org/10.1016/j.xgen.2023.100332

More panels are added as they are published by the
H3Africa Consortium -- check the FAQ item "Which
reference panels are available?" at
<https://fedimpute.afrigen-d.org> for the current
list.

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

### 4.3 Additional Pipelines

The AfriGen-D service offers several additional pipelines beyond imputation:

#### GWAS Training Workflow

A complete Genome-Wide Association Study (GWAS) workflow using PLINK2 for training purposes.

![Figure 5: GWAS training workflow configuration](/images/11-gwas-training-workflow.png)

*Figure 5: GWAS training workflow configuration*

**Input requirements:**

- **Genotype file**: VCF format
- **Phenotype file**: Tab-delimited format with phenotype columns
- **Covariate file** (optional): PCA results or other covariates

**Key parameters:**

- **Column name**: Specify which phenotype column to analyze
- **MAF threshold**: Minor allele frequency filter (default: 0.01)
- **Sample missingness**: Maximum missing rate per sample (default: 0.1)
- **SNP missingness**: Maximum missing rate per variant (default: 0.1)
- **HWE p-value threshold**: Hardy-Weinberg equilibrium filter (default: 0.000001)

#### Allele Switch Checker (Checkref)

A quality control tool for detecting and fixing allele switches between your target VCF and reference panels.

![Figure 6: Allele switch checker (Checkref) tool](/images/12-allele-switch-checker.png)

*Figure 6: Allele switch checker (Checkref) tool*

**Use this tool to:**

- Validate your VCF files before imputation
- Detect strand issues and allele mismatches
- Fix identified issues automatically

**Options for handling switches:**

- **Remove Switched Sites**: Delete problematic variants
- **Correct Switched Sites**: Swap REF/ALT alleles to match reference

#### VCF Liftover

Convert genomic coordinates between genome builds (e.g., GRCh37/hg19 to GRCh38/hg38).

![Figure 7: VCF liftover tool for genome build conversion](/images/13-vcf-liftover.png)

*Figure 7: VCF liftover tool for genome build conversion*

**When to use:**

- Your data is in an older genome build (hg19) but the reference panel requires hg38
- You need to harmonize data from different sources

**Configuration options:**

- **Source build**: Your input file's genome build
- **Target build**: Desired output genome build
- **Chain file**: Automatically selected based on source/target
- **Validate output**: Optional validation checks

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

This section covers the **four things** every
imputation-service submission requires, regardless of
platform: the input file, the reference panel, the
job configuration, and the submission itself. The
FedImpute-specific UI labels (button names,
navigation paths) will be documented during the
authenticated re-capture pass; the **decisions** you
make at each stage are covered here and are
transferable across services.

### 6.1 Data upload

::: tip FedImpute upload requirements
Already covered in [§5](#_5-data-preparation-before-upload):
**bgzipped VCF, sorted by position, hg19 or hg38,
≥20 samples**. The platform performs automatic
format validation during upload and will reject
files that don't meet these requirements.
:::

- **One chromosome per file is the common case** --
  many imputation services require (or strongly
  prefer) single-chromosome uploads. Split
  multi-chromosome VCFs with
  `bcftools view -r chrN input.vcf.gz -Oz -o chrN.vcf.gz`
  before submitting if that applies to your
  workflow.
- **Watch for the validation step.** After upload,
  FedImpute runs basic format and content checks.
  Common failure modes (wrong build, REF/ALT flips,
  non-bgzip `.gz`) are all caught here -- if the
  file is rejected, the platform reports what
  failed so you can fix it client-side.

For the tutorial we use the sample VCF at
`/data/1k_afr_661_samples_4k_variants_hg38_agsc2025_chr22.vcf.gz`
-- 661 samples, chr22, hg38, already bgzipped and
sorted.

### 6.2 Reference panel selection

This is the **most scientifically consequential
decision** in the whole workflow. See
[§4.2](#_4-2-available-reference-panels) for the
current FedImpute panel list and
[`/services`](/services#sengupta-2023-the-african-populations-benchmark)
for the Sengupta et al. 2023 benchmark showing
African panels deliver roughly 3.4× better NDR
accuracy on SSA samples than European-focused
panels.

**Default for an African cohort in this workshop:
H3Africa v7.** Fall back to H3Africa v6 (full or
African-only subset) when reproducing older
analyses.

### 6.3 Job configuration

Most imputation services surface the same small set
of job parameters. FedImpute's exact form layout
will be documented in the Phase-2 capture; the
parameters themselves are standard:

<!-- markdownlint-disable MD013 -->

| Parameter | What it means | Typical choice |
| --- | --- | --- |
| **Job name** | Human-readable label for yourself | `afr_chr22_imputation_2026-04-20` |
| **Reference panel** | Panel to match against | H3Africa v7 for African cohorts |
| **Genome build** | Coordinate system of the input VCF | Match the panel; liftover if they differ |
| **Phasing** | Haplotype-phasing algorithm | **Eagle** (fast, accurate, Minimac4 default) |
| **Population** | Study-cohort ancestry | African for H3Africa panels |
| **Output** | Result format | Compressed VCF (imputed genotypes + dosages) |

<!-- markdownlint-enable MD013 -->

::: tip Phasing, briefly
**Phasing** determines which alleles are inherited
together on the same chromosome copy. Imputation
matches your sample's phased **haplotypes** against
the reference panel's, so better phasing → better
matches → better imputation. **Eagle** is the
standard phasing algorithm -- fast, accurate,
scales to 100k+ samples, and pairs with Minimac4.
:::

### 6.4 Submit

When you confirm the job, the platform assigns a
**Job ID**, queues the run, and routes you to the
monitoring view ([§7](#_7-monitoring-job-progress)
continues from there). **Save the job ID** -- you'll
need it if you close the tab and want to come back
to the job later.

Once submitted, the rest of the workflow is
asynchronous: the platform runs the job, emails you
when it completes, and keeps the output available
for **7 days** ([§5.3](#_5-3-what-fedimpute-does-with-your-file)).

<!-- TODO(mamana): after the authenticated walkthrough,
     add screenshots of the four submission screens
     (upload, panel, config, review) here, and
     replace the TODO note. The conceptual content
     above already holds. -->

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

### 7.1 Job Status Overview

Navigate to **"Jobs"** to see all your submissions:

![Figure 11: Jobs list showing submitted imputation jobs](/images/05-jobs-list.png)

*Figure 11: Jobs list showing submitted imputation jobs*

| Status | Description | Icon |
|--------|-------------|------|
| **Queued** | Waiting to start | Gray clock |
| **Running** | Currently processing | Blue spinner |
| **Completed** | Successfully finished | Green checkmark |
| **Failed** | Error occurred | Red exclamation |
| **Cancelled** | User cancelled | Gray square |

### 7.2 Viewing Job Details

1. Click on a job name to view detailed information:
   - **Job metadata** (ID, name, submission time)
   - **Progress bar** (for running jobs)
   - **Input Validation** summary
   - **Quality Control** statistics
   - **Phasing and Imputation** progress
   - **Error messages** (if failed)

![Figure 12: Job details page with progress information](/images/06-job-details.png)

*Figure 12: Job details page with progress information*

### 7.3 Job Processing Steps

Typical imputation workflow stages:

1. **Quality Control** - Input data validation
2. **Phasing** - Haplotype estimation using Eagle
3. **Imputation** - Genotype inference using Minimac4
4. **Post-processing** - Quality metrics calculation
5. **Completion** - Results available for download

> **Estimated Time:** 15-60 minutes depending on data size and queue

### 7.4 Managing Jobs

From the Jobs page, you can:

- **Cancel** a running job (click Cancel button)
- **Retry** a failed job (click Retry button)
- **Delete** old jobs (click Delete icon)
- **Filter** by status using the dropdown

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

### 8.1 Accessing Completed Results

1. Navigate to **"Jobs"** and find your completed job

2. Click on the job name to open details

3. Click on the **"Results"** tab to see downloadable files

![Figure 13: Job results tab with downloadable files](/images/07-job-results.png)

*Figure 13: Job results tab with downloadable files*

### 8.2 Available Output Files

| File | Description | Format |
|------|-------------|--------|
| **Imputed VCF** | Imputed genotypes | .vcf.gz |
| **Info File** | Imputation quality metrics (R²) | .info.gz |
| **Statistics** | Summary statistics | .txt |
| **Log File** | Processing log | .log |

### 8.3 Downloading Files

1. Click the **"Download"** button next to each file, OR

2. Click **"Download All"** for bulk download

3. Files will be downloaded to your computer

### 8.4 Understanding the Info File

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

1. Find your completed job in the Jobs list
2. Click on the job name
3. Download all result files
4. Open the .info file and find:
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

For downstream analysis, filter variants by R²:

```bash
# Keep only well-imputed variants (R² > 0.3)
# This is typically done with bcftools or similar tools
```

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

This section demonstrates a complete end-to-end workflow from raw genotype data to GWAS results, comparing outcomes between sparse (original) and imputed data.

### 11.1 Study Overview

**Dataset:** 661 African samples with sparse genotyping data on chromosome 22

| Dataset | Variants | Description |
|---------|----------|-------------|
| **Sparse (original)** | 4,423 | SNP array data on chromosome 22 |
| **Imputed** | 797,319 | After imputation with H3Africa V6HC-S panel |

**Variant density increase:** 180× more variants after imputation

### 11.2 Pre-GWAS: Data Preparation Pipeline

Before running GWAS, the data must be properly prepared. This involves several quality control steps:

#### Step 1: VCF Liftover (if needed)

If your data is in GRCh37/hg19 format, convert to GRCh38/hg38:

| Parameter | Value |
|-----------|-------|
| Input Build | GRCh37 (hg19) |
| Output Build | GRCh38 (hg38) |
| Chain File | hg19ToHg38.over.chain |

**Why liftover?** The H3Africa V6HC-S reference panel uses GRCh38 coordinates. Using mismatched coordinates will result in failed imputation.

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

Impute missing genotypes using the H3Africa V6HC-S reference panel:

| Parameter | Value |
|-----------|-------|
| Duration | 21 min 14 sec |
| Reference Panel | H3Africa V6HC-S (GRCh38) |
| Population | African (AFR) |
| Phasing | Eagle |
| Imputation | Minimac4 |

### 11.3 Imputation Quality Summary

| Metric | Value |
|--------|-------|
| Input SNPs | 4,423 |
| Reference Overlap | 55.68% |
| Matched Variants | 2,460 |
| Invalid Alleles | 0 |
| Allele Switches | 0 |
| Strand Flips | 0 |
| Output Variants | 797,319 |

### 11.4 Running GWAS

Two GWAS analyses were performed using the GWAS Training Workflow:

#### GWAS Parameters

| Parameter | Value |
|-----------|-------|
| Phenotype Column | B1 (binary trait) |
| MAF Threshold | 0.01 |
| Sample Missingness | 0.1 |
| SNP Missingness | 0.1 |
| HWE P-value | 0.000001 |
| Method | PLINK2 Firth regression |

#### GWAS on Sparse Data

| Metric | Value |
|--------|-------|
| Input VCF | chr22_sparse_peaks_dense.corrected.vcf.gz |
| Variants Tested | 4,423 |
| Duration | 24 seconds |
| Samples | 661 |

#### GWAS on Imputed Data

| Metric | Value |
|--------|-------|
| Input VCF | chr22.dose.vcf.gz |
| Variants Tested | 797,319 |
| Duration | 38 seconds |
| Samples | 661 |

### 11.5 Post-GWAS: Results Comparison

#### Key Differences in Manhattan Plots

| Metric | Sparse Data | Imputed Data |
|--------|-------------|--------------|
| **Variants tested** | 4,423 | 797,319 |
| **Top signal** | Chr22:36276581 | Chr22:36276581 |
| **Secondary signal** | Not detected | **Chr22:39277008 (NEW!)** |
| **Signal resolution** | Single peak | Multiple peaks with fine-mapping |
| **Density** | Sparse dots | Dense coverage across chromosome |

#### Manhattan Plot: Sparse Data (4,423 variants)

![Manhattan plot from sparse data](/images/gwas-sparse-manhattan.png)

*Figure 15: Manhattan plot from sparse/original data showing limited variant coverage. Note the single genome-wide significant peak and large gaps between variants.*

**Observations:**
- Single genome-wide significant peak at **Chr22:36276581**
- Scattered points with large gaps between variants
- Limited ability to fine-map the signal
- Peak reaches -log10(P) ≈ 11

#### Manhattan Plot: Imputed Data (797,319 variants)

![Manhattan plot from imputed data](/images/gwas-imputed-manhattan.png)

*Figure 16: Manhattan plot from imputed data showing dense variant coverage. Note the additional secondary signal and much better resolution across the chromosome.*

**Observations:**
- Same primary signal at **Chr22:36276581** (-log10P ≈ 10)
- **NEW secondary signal at Chr22:39277008** (-log10P ≈ 8.5)
- Much denser coverage allowing better regional characterization
- Multiple suggestive signals visible across the chromosome
- Better resolution for identifying causal variants

#### Side-by-Side Comparison

![Side-by-side Manhattan plot comparison](/images/gwas-comparison-side-by-side.png)

*Figure 17: Side-by-side comparison of Manhattan plots from sparse (left) and imputed (right) data, highlighting the dramatic increase in variant density and the discovery of the secondary signal.*

### 11.6 Key Findings Summary

| Finding | Sparse Data | Imputed Data |
|---------|-------------|--------------|
| Primary signal detected | ✅ Yes | ✅ Yes |
| Secondary signal detected | ❌ No | ✅ **Yes (NEW)** |
| Fine-mapping resolution | Low | High |
| Regional characterization | Limited | Comprehensive |
| Suggestive signals visible | Few | Many |

### 11.7 Interpretation

> **💡 Key Insight: Why Imputation Matters for GWAS**
>
> The imputed data revealed a **second genome-wide significant signal** (Chr22:39277008) that was completely missed in the sparse data. This demonstrates that:
>
> 1. **Sparse genotyping arrays miss important signals** - The secondary association was invisible without imputation
> 2. **Imputation enables discovery** - 180× more variants means better coverage of the genome
> 3. **Fine-mapping improves** - Dense variants help narrow down causal regions
> 4. **African reference panels work** - H3Africa V6HC-S successfully imputed variants in African samples

### 11.8 Practical Implications

**When to use imputed data for GWAS:**
- ✅ Discovery of new associations
- ✅ Fine-mapping causal variants
- ✅ Meta-analysis across different arrays
- ✅ Increasing statistical power
- ✅ Detecting secondary independent signals

**Quality considerations:**
- Filter imputed variants by R² > 0.3 for discovery
- Use R² > 0.8 for fine-mapping
- Always compare results with directly genotyped variants
- Check for population stratification (λ value in QQ plot)

### 11.9 Complete Workflow Timeline

| Step | Tool | Duration | Output |
|------|------|----------|--------|
| 1. Liftover (if needed) | VCF Liftover | ~1 min | hg38 VCF |
| 2. Allele Check | Allele Switch Checker | 15 sec | Corrected VCF |
| 3. Imputation | Genotype Imputation | 21 min | Imputed VCF (797K variants) |
| 4. GWAS (sparse) | GWAS Training | 24 sec | Manhattan, QQ plots |
| 5. GWAS (imputed) | GWAS Training | 38 sec | Manhattan, QQ plots |
| **Total** | | **~23 min** | Complete analysis |

---

### 📝 Check Your Understanding: Case Study

<details>
<summary><strong>Question 1:</strong> How many times more variants were available after imputation?</summary>

**Answer:** Approximately **180 times more variants** (797,319 ÷ 4,423 ≈ 180). This dramatic increase in variant density is typical when imputing from a SNP array to a whole-genome reference panel.

</details>

<details>
<summary><strong>Question 2:</strong> Why was the secondary signal at Chr22:39277008 only detected in the imputed data?</summary>

**Answer:** The sparse SNP array data likely did not contain variants in strong LD with the causal variant at this locus. Imputation filled in the missing variants, including those that tag the secondary association signal. This demonstrates how sparse genotyping can miss real biological signals.

</details>

<details>
<summary><strong>Question 3:</strong> Both analyses detected the primary signal at Chr22:36276581. Does this mean imputation wasn't necessary for this signal?</summary>

**Answer:** While both detected the primary signal, the imputed data provides **better characterization** of the region with more variants. This is valuable for:
- Fine-mapping to identify causal variants
- Understanding the LD structure around the signal
- Identifying multiple independent signals within a locus
- More accurate effect size estimates

</details>

<details>
<summary><strong>Question 4:</strong> What was the reference overlap percentage, and what does this mean?</summary>

**Answer:** The reference overlap was **55.68%**, meaning that 55.68% of the input variants were found in the H3Africa V6HC-S reference panel. The remaining variants were either:
- Not present in the reference panel
- Filtered due to quality issues (monomorphic, allele mismatch, etc.)

A reference overlap of 50-70% is typical for African SNP array data when using African-specific reference panels.

</details>

<details>
<summary><strong>Question 5:</strong> The imputation took 21 minutes while GWAS on the imputed data took only 38 seconds. Why is imputation much slower?</summary>

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

1. **Prepare your VCF file**
   - Ensure it contains a single chromosome
   - Check the genome build (hg19 or hg38)
   - Compress with gzip if not already

2. **Run Allele Switch Check**
   - Navigate to Run → Allele Switch Checker
   - Upload your VCF file
   - Download the corrected output

3. **Run Imputation**
   - Navigate to Run → Genotype Imputation
   - Upload the allele-corrected VCF
   - Select H3Africa V6HC-S panel
   - Wait for completion (~20 min)

4. **Run GWAS on both datasets**
   - Run GWAS Training on original (sparse) data
   - Run GWAS Training on imputed data
   - Compare the Manhattan plots

5. **Document your findings**
   - How many variants before vs after imputation?
   - Did you discover any new signals?
   - What was your reference overlap percentage?

<details>
<summary><strong>✅ Success Criteria</strong></summary>

You have successfully completed this exercise if:

- [ ] Allele Switch Check completed without errors
- [ ] Imputation job finished successfully
- [ ] You can compare Manhattan plots from both datasets
- [ ] You identified the variant count increase (should be >100×)
- [ ] You documented any new signals discovered

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

| Study Population | Recommended Panel |
|------------------|-------------------|
| West African | H3Africa Panel |
| East African | H3Africa Panel |
| South African | H3Africa Panel |
| African American | African Genome Resources |
| Mixed/Unknown | 1000 Genomes (AFR subset) |

### Quality Filtering

**Recommended post-imputation filters:**

- R² > 0.3 (minimum for association testing)
- R² > 0.8 (for fine-mapping)
- MAF > 0.01 (for well-powered GWAS)

---

### 📝 Final Quiz: Test Your Knowledge

<details>
<summary><strong>Quiz Question 1:</strong> You have genotype data from a Yoruba population in Nigeria. Which reference panel should you use?</summary>

**Answer:** The **H3Africa V6HC-S** reference panel is the best choice for Yoruba (West African) populations, as it contains African-specific haplotypes optimized for Pan-African populations.

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
| **Job fails at QC: allele mismatch** | REF allele disagrees with the chosen panel | Run [Allele Switch Checker](#allele-switch-checker-checkref) first; flip or drop offenders |
| **Job fails at QC: build mismatch** | Input is hg19 but panel is hg38 (or vice versa) | Liftover with [VCF Liftover](#vcf-liftover) -- hg19 → hg38 is the common case |
| **Job stuck in queue** | Service busy at the workshop-day peak | Wait; the job runs once capacity frees |
| **Low R² across the board** | Population-panel mismatch | See [/services](/services) -- African cohorts should use H3Africa, not HRC/1000G |
| **Low R² on rare variants only** | Expected -- imputation is statistical | Filter by R² (e.g. R² > 0.8) before rare-variant analysis |
| **Missing variants in output** | Variant absent from the panel | Expected; fold in a second panel if you need them |
| **Can't download: "password expired"** | The one-time password email is >7 days old | Re-submit; results are deleted after 7 days |

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
