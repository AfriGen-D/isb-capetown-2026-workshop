# Genotype Imputation and Data Analysis for African Populations

A hands-on tutorial using AfriGen-D's curated African
genomic resources: the **FedImpute** federated
imputation platform, the **African Genomic Medicine
Portal (AGMP)**, and the **African Genome Variation
Database (AGVD)**.

**Event:** 19th Annual International Biocuration
Conference (ISB Cape Town 2026)  
**Date:** Monday, 20 April 2026, 14:00--18:00 SAST  
**Venue:** Atlantic I, Lagoon Beach Hotel Conference
Centre and Spa, Milnerton, Cape Town, South Africa  
**Duration:** 4 hours  
**Organiser:** Mr Mamana Mbiyavanga (UCT / AfriGen-D)  

::: warning Platform transition -- read before you start
The step-by-step walkthrough below (sections 2--11)
targets the **legacy** imputation UI at
<https://impute.afrigen-d.org>. For ISB Cape Town 2026
the workshop uses the new
**Federated Genotype Imputation Platform (FedImpute)**
at <https://dev-fedimpute-ui.afrigen-d.dev>.

The *concepts* (imputation theory, reference panel
choice, R² interpretation, GWAS comparison) all carry
over. The specific UI screens, button labels, and
submission flow have changed -- see section 0 below
for the FedImpute overview, and expect the downstream
sections to be re-captured against FedImpute before
the workshop day.
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
is AfriGen-D's new unified interface to multiple
imputation backends. Instead of managing separate
accounts with separate services, you sign in once and
FedImpute routes your job to the right backend --
H3Africa, Michigan Imputation Server, or a future
federated node.

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
[register here](https://dev-auth.afrigen-d.dev/if/flow/afrigend-enrollment/)
-- this SSO account covers FedImpute. AGVD does
**not yet** share the SSO and requires a separate
signup at
<https://nyame.afrigen-d.org/accounts/login/>.

<!-- TODO(mamana): re-capture detailed step-by-step
     screens (upload VCF, select reference panel,
     configure parameters, monitor progress, download
     results) against FedImpute. Sections 2-11 below
     still show the legacy impute.afrigen-d.org UI. -->

### Architecture (for the curious)

FedImpute has three layers:

| Layer | Implementation | Role |
| --- | --- | --- |
| Frontend | Next.js (SSR React) | Job submission, monitoring, results |
| Orchestration API | Django + FastAPI | Auth, job routing, status aggregation |
| Backends | H3Africa, Michigan Imputation Server | Imputation via GA4GH-compliant adapters |

![FedImpute architecture + participating institutions](/images/platforms/elwazi-02-about.png)

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
panel (≈70% reduction in discordance).

*TODO(mamana): the workshop abstract cites a "15--40%
accuracy improvement" -- confirm the exact source.*

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

1. Navigate the FedImpute interface (or the legacy
   AfriGen-D Imputation Service, covered below)
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
  ([register here](https://dev-auth.afrigen-d.dev/if/flow/afrigend-enrollment/))
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
> The AfriGen-D service provides R² values for each imputed variant, allowing you to filter by quality.

### The AfriGen-D Imputation Service

The AfriGen-D Imputation Service provides:

- Access to African-specific reference panels
- Connection to H3Africa and other imputation services
- User-friendly web interface
- Quality reports and visualization

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

### 2.1 Creating an Account

1. Open your web browser and navigate to **[impute.afrigen-d.org](https://impute.afrigen-d.org)**

![Figure 1: AfriGen-D Imputation Service landing page](/images/01-landing-page.png)

*Figure 1: AfriGen-D Imputation Service landing page*

2. Click **"Register"** or **"Sign Up"**

3. Fill in the registration form:
   - **Username**: Choose a unique username
   - **Email**: Enter your institutional email
   - **Password**: Create a strong password
   - **Confirm Password**: Re-enter your password

4. Click **"Create Account"**

5. Check your email for verification (if required)

### 2.2 Logging In

1. Navigate to **[impute.afrigen-d.org](https://impute.afrigen-d.org)**

2. Enter your credentials:
   - **Username**: Your registered username
   - **Password**: Your password

![Figure 2: Login page](/images/02-login-page.png)

*Figure 2: Login page*

3. Click **"Sign In"**

![Figure 3: Login form with credentials](/images/03-login-filled.png)

*Figure 3: Login form with credentials*

4. You will be redirected to the **Home Page**

![Figure 4: Home page after successful login](/images/04-home-logged-in.png)

*Figure 4: Home page after successful login*

---

### 🏋️ Exercise 1: Create Your Account

**Task:** Register for an account on the AfriGen-D Imputation Service.

**Steps:**

1. Go to [impute.afrigen-d.org](https://impute.afrigen-d.org)
2. Click "Register"
3. Fill in your details
4. Verify your email (if required)
5. Log in to access the Dashboard

<details>
<summary><strong>✅ Verification Checklist</strong></summary>

Confirm you can see:

- [ ] Dashboard page after login
- [ ] Navigation menu on the left
- [ ] Your username in the top right corner
- [ ] "Total Jobs" statistic (should be 0 for new accounts)

</details>

---

## 3. Dashboard Overview

After logging in, the Dashboard provides an overview of your imputation activities:

### Dashboard Components

| Section | Description |
|---------|-------------|
| **Total Jobs** | Number of all submitted jobs |
| **Completed Jobs** | Successfully finished imputation jobs |
| **Running Jobs** | Jobs currently being processed |
| **Success Rate** | Percentage of successful jobs |
| **Recent Jobs** | List of your most recent submissions |
| **Service Health** | Status of connected imputation services |

### Navigation Menu

The top navigation bar provides access to:

- **Home** - Dashboard with overview and statistics
- **Run** - Access available pipelines (Imputation, GWAS, Liftover, etc.)
- **Jobs** - View and manage your submitted jobs
- **Help** - Access support and documentation
- **Contact** - Contact the AfriGen-D team
- **Profile** (username dropdown) - Account settings and logout

---

### 📝 Check Your Understanding: Dashboard

<details>
<summary><strong>Question:</strong> What information does the "Success Rate" metric show?</summary>

**Answer:** The Success Rate shows the percentage of your submitted jobs that completed successfully without errors. A high success rate indicates good data quality and proper job configuration.

</details>

---

## 4. Exploring Available Pipelines

### 4.1 Accessing Pipelines

The AfriGen-D Imputation Service provides several genomics pipelines accessible via the **Run** menu in the navigation bar:

1. Click **"Run"** in the navigation menu

2. Browse the available pipelines:
   - **Genotype Imputation** - Main imputation workflow with African-specific reference panels
   - **GWAS Training Workflow** - Complete GWAS analysis using PLINK2
   - **Allele Switch Checker** - QC tool for detecting strand/allele issues
   - **VCF Liftover** - Convert between genome builds (hg19 ↔ hg38)

3. Select a pipeline to open its submission form

### 4.2 Available Reference Panels

The AfriGen-D Imputation Service provides the following reference panels:

| Panel | Build | Description |
|-------|-------|-------------|
| **H3Africa V6HC-S** | GRCh38/hg38 | African-specific reference panel optimized for Pan-African populations |
| **1000 Genomes** | GRCh37/hg19 | Global reference panel with worldwide population diversity |

**Recommended Panel for African Populations:**

The **H3Africa V6HC-S** panel is the primary recommended choice for African population studies:
- **African-specific haplotypes**: Contains genetic variation patterns common in African populations
- **High coverage**: Optimized for imputation accuracy in diverse African ancestries
- **GRCh38/hg38 build**: Uses the latest human genome reference assembly

> **Note**: If using H3Africa V6HC-S and your input data is in GRCh37/hg19 format, use the **VCF Liftover** pipeline first to convert coordinates to GRCh38/hg38 before imputation.

---

### 📝 Check Your Understanding: Pipelines

<details>
<summary><strong>Question 1:</strong> What reference panel is available on the AfriGen-D Imputation Service?</summary>

**Answer:** The **H3Africa V6HC-S** reference panel is available, which is specifically optimized for African and Pan-African populations using the GRCh38/hg38 genome build.

</details>

<details>
<summary><strong>Question 2:</strong> How do you access the available pipelines on the AfriGen-D service?</summary>

**Answer:** Click on the **Run** menu in the navigation bar. This displays a dropdown with all available pipelines including Genotype Imputation, GWAS Training Workflow, Allele Switch Checker, and VCF Liftover.

</details>

<details>
<summary><strong>Question 3:</strong> If your data is in GRCh37/hg19 format, what should you do before imputation?</summary>

**Answer:** Use the **VCF Liftover** pipeline to convert your data from GRCh37/hg19 to GRCh38/hg38 coordinates, since the H3Africa V6HC-S reference panel uses the hg38 build.

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

Before uploading your data, ensure it meets the quality requirements.

### 5.1 Supported File Formats

| Format | Extensions | Description |
|--------|------------|-------------|
| **VCF** | .vcf, .vcf.gz | Variant Call Format |

**Maximum file size:** 100 MB (contact support for larger files)

### 5.2 Data Quality Requirements

Your input data should:

- ✅ Contain **autosomal chromosomes only** (chr1-22)
- ✅ Have **biallelic SNPs only**
- ✅ Use **GRCh37 (hg19)** or **GRCh38 (hg38)** coordinates
- ✅ Have **consistent REF/ALT alleles** with reference genome
- ✅ Have **unique variant IDs**
- ✅ Have **no duplicate samples**

### 5.3 Pre-upload Checklist

Before uploading, verify:

1. **File format is correct** (VCF)
2. **File is compressed** (.vcf.gz recommended)
3. **Genome build is known** (GRCh37 or GRCh38)
4. **Sample size is appropriate** (not too small for reliable imputation)
5. **MAF filter applied** (typically MAF > 1%)

> **💡 Key Concept: MAF (Minor Allele Frequency)**
>
> **MAF** is the frequency of the less common allele at a genetic variant in a population. It ranges from 0 to 0.5:
>
> - **MAF = 0.5**: Both alleles equally common
> - **MAF = 0.01**: Rare variant (1% of chromosomes carry minor allele)
> - **MAF < 0.01**: Very rare variant
>
> MAF matters for imputation because **rare variants are harder to impute accurately** - there are fewer examples in the reference panel to learn from.

> **Note:** The imputation service will perform additional QC checks after upload, but pre-cleaning your data improves success rates.

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

### 6.1 Starting a New Job

1. Click **"Run"** in the navigation menu to see available pipelines

![Figure 8: Run menu showing available pipelines](/images/08-run-menu.png)

*Figure 8: Run menu showing available pipelines*

Available pipelines include:

- **Genotype Imputation** - Main imputation workflow
- **GWAS Training Workflow** - Run GWAS analysis (see Section 4.3)
- **Allele Switch Checker** - QC tool for validating VCF files
- **VCF Liftover** - Convert between genome builds

2. Select **"Genotype Imputation"** from the dropdown

3. You will see the job submission form

![Figure 9: Job submission form for imputation](/images/09-job-submission-form.png)

*Figure 9: Job submission form for imputation*

### 6.2 Step 1: Upload Your Data

1. **Drag and drop** your file into the upload area, OR
2. Click **"Browse"** to select a file from your computer

3. Wait for the upload to complete (progress bar will show status)

4. The system will validate your file format

> **Tip:** For this tutorial, we'll use sample data: `1k_afr_binary_1000k_chr22.vcf.gz`
>
> ⚠️ **Important: One Chromosome Per File** - The imputation service requires each file to contain **only one chromosome**. Files with multiple chromosomes will be rejected. Split your VCF by chromosome before uploading (e.g., `chr1.vcf.gz`, `chr2.vcf.gz`, etc.).

### 6.3 Step 2: Select Reference Panel

1. **Select Reference Panel:**
   - Click the dropdown to see available panels
   - Choose **"H3Africa V6HC-S (GRCh38/hg38)"** for African populations

![Figure 10: Reference panel selection dropdown](/images/10-reference-panel-dropdown.png)

*Figure 10: Reference panel selection dropdown*

2. Review the panel description to confirm it matches your needs

### 6.4 Step 3: Configure Job Parameters

Fill in the job configuration form:

| Parameter | Description | Recommended Value |
|-----------|-------------|-------------------|
| **Job Name** | Descriptive name for your job | e.g., "AFR_chr22_imputation" |
| **Genome Build** | Reference genome version | GRCh37 (hg19) or GRCh38 |
| **Phasing** | Pre-phasing method | Eagle (recommended) |
| **Population** | Study population | African / Mixed |
| **QC Filters** | Quality control options | Default settings |
| **Output Format** | Result file format | VCF (compressed) |

> **💡 Key Concept: Phasing**
>
> **Phasing** (or haplotype phasing) is the process of determining which alleles are inherited together on the same chromosome. Humans have two copies of each chromosome (one from each parent), and phasing figures out which variants came from which parent.
>
> **Why does it matter for imputation?**
>
> - Imputation works by matching your sample's **haplotypes** to reference panel haplotypes
> - Accurate phasing improves imputation accuracy because it preserves the true LD structure
> - **Eagle** is the recommended phasing algorithm - it's fast and accurate for large datasets

### 6.5 Step 4: Review and Submit

1. Review all settings on the confirmation page:
   - Input file name and size
   - Selected service and reference panel
   - Job parameters

2. Click **"Submit Job"**

3. Note your **Job ID** for tracking

4. You will be redirected to the job monitoring page

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

### 🏋️ Exercise 3: Submit Your First Job

**Task:** Submit an imputation job using the sample data.

**Steps:**

1. Navigate to Jobs → Create New Job
2. Upload `1k_afr_binary_1000k_chr22.vcf.gz`
3. Select H3Africa Imputation Service
4. Choose the H3Africa Panel
5. Set job name: "Tutorial_chr22_[YourName]"
6. Select GRCh37 genome build
7. Review and Submit

<details>
<summary><strong>✅ Success Criteria</strong></summary>

You should see:

- [ ] Job submission confirmation
- [ ] Job ID assigned
- [ ] Status shows "Queued" or "Running"
- [ ] Job appears in your Jobs list

</details>

<details>
<summary><strong>🆘 Troubleshooting: Upload Failed</strong></summary>

If your upload fails:

1. Check your internet connection
2. Verify file format is .vcf.gz
3. Ensure file size is under 100 MB
4. Try a different browser
5. Clear browser cache and retry

</details>

---

## 7. Monitoring Job Progress

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

## 12. Best Practices and Tips

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

## 12. Troubleshooting

### Common Issues and Solutions

| Problem | Possible Cause | Solution |
|---------|----------------|----------|
| Upload fails | File too large | Compress file or split by chromosome |
| Job stuck in queue | Service busy | Wait or try different time |
| Job fails at QC | Data format issues | Check file format and genome build |
| Low R² values | Population mismatch | Use appropriate reference panel |
| Missing variants | Not in reference | Expected for rare variants |

### Getting Help

- **Documentation:** [afrigen-d.org](https://afrigen-d.org)
- **Support:** [helpdesk.afrigen-d.org](https://helpdesk.afrigen-d.org)
- **Email:** <support@bioinformaticsinstitute.africa>

---

## 13. Summary

### What You Learned

1. ✅ How to register and navigate the AfriGen-D Imputation Service
2. ✅ How to prepare data for imputation
3. ✅ How to submit and monitor imputation jobs
4. ✅ How to download and interpret results
5. ✅ How to assess imputation quality with R² plots
6. ✅ How to create GWAS visualizations

### Key Takeaways

- **African-specific reference panels** significantly improve imputation for African populations
- **R² > 0.3** is the minimum threshold for reliable imputed variants
- **Quality assessment** is essential before downstream analysis
- The **AfriGen-D Imputation Service** provides an accessible platform for African genomics research

### Next Steps

- Explore other AfriGen-D resources (AGMP, AGVD)
- Apply imputed data to your research questions
- Consider contributing to African reference panels

---

## Resources

### AfriGen-D Resources

- **AfriGen-D Portal:** [afrigen-d.org](https://afrigen-d.org)
- **Imputation Service:** [impute.afrigen-d.org](https://impute.afrigen-d.org)
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

## Appendix: Workshop Schedule (4 hours, 14:00--18:00)

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
