---
description: >-
  Genotype imputation concepts, applications, and tools for the ISB Cape
  Town 2026 AfriGen-D tutorial. Background reading before the hands-on
  sessions.
---

# Genotype Imputation -- why, how, and with what

A focused briefing on imputation as a method,
separate from the *population-specific* discussion in
[`/theory`](/theory) and the *which-service, which-
panel* decision in [`/services`](/services). This
page is the connective tissue: what imputation *is*,
what it's *for*, and the *tools* you'll see behind
the scenes.

::: info Where this page fits

- [`/theory`](/theory) -- *African genetic diversity*
  and why panels matter
- **`/imputation` (this page)** -- *imputation as a
  method*: concept, applications, engines
- [`/services`](/services) -- *services and panels
  compared* (Michigan, TOPMed, FedImpute, Sanger)

:::

## 1. What imputation is

**Genotype imputation** is a statistical method for
predicting genotypes you did **not** observe, using
genotypes you did observe plus a densely typed
**reference panel**.

The problem it solves: SNP arrays typically measure
**500k--2M** variants per sample. A genome has
**~90M common + rare variants**. Sequencing every
sample would work but is expensive. Imputation lets
you get the cost profile of an array but the variant
density of a sequence (minus accuracy on truly rare
or unique variants).

The core idea:

1. Your sample carries long stretches of DNA --
   **haplotypes** -- that are shared with other
   humans.
2. If you know **some** genotypes on a haplotype and
   a reference panel has a matching haplotype with
   many more genotypes, the **unobserved genotypes**
   can be inferred probabilistically.
3. The probabilistic part is essential: each imputed
   genotype comes with a **quality metric** (R² or
   INFO score) and an **expected dosage** (0--2).

Imputation doesn't invent information; it
**interpolates** using patterns of linkage
disequilibrium (LD) already present in the reference.

### The idea in three pictures

The diagram below -- adapted from the AfriGen-D AGM
2025 reference-panel talk -- shows the imputation
workflow as three sequential states.

**1. Starting state.** Your sample has a few known
genotypes (red/green letters in the top two rows --
"GWAS Haplotypes") scattered across otherwise
unobserved positions. A dense reference panel (the
table below) has full haplotypes from many other
samples.

![Sparse GWAS haplotypes above a dense reference panel of 1000 Genomes haplotypes, showing just a handful of observed positions](/images/imputation-concept/01-gwas-haplotypes.png)

**2. Finding matches.** The algorithm scans the
reference panel for **haplotypes that match your
observed genotypes** at the positions you did
measure. Here the purple block (top-of-panel match)
and the green block (bottom-of-panel match) align
with the two sample haplotypes; a short orange block
picks up an additional match at the right edge.

![Same reference panel with three haplotype matches highlighted in purple, orange, and green boxes](/images/imputation-concept/02-match-reference.png)

**3. Imputing the missing genotypes.** Once matching
haplotypes are identified, the genotypes *they*
carry at the unobserved positions are transferred
back onto your sample. The lowercase letters in the
top panel are the **imputed** calls -- they weren't
measured on your array, but are inferred from the
reference haplotype the algorithm matched.

![Sample haplotypes now shown as complete sequences (lowercase imputed calls filled in from the matched reference haplotypes)](/images/imputation-concept/03-impute-genotype.png)

*Figures: AfriGen-D AGM 2025, reference-panel +
imputation + Beacon talk. Reproduced for educational
use in this workshop.*

## 2. Why imputation exists -- applications

### GWAS power-up

A SNP-array GWAS tests ~500k-2M variants directly.
Imputing from the same array against a dense panel
pushes the test count to **tens of millions**, often
without any additional sample-level cost. Smaller
effect sizes become detectable, and **the causal
variant itself is usually found among the imputed
set** rather than the directly typed set.

> Example: the tutorial dataset is 4,423 variants on
> chr22. After imputing against H3Africa you will
> have hundreds of thousands of variants on chr22
> alone -- a 70-100× density increase on the same
> samples.

### Meta-analysis across heterogeneous arrays

Different cohorts use different SNP arrays. A raw
meta-analysis is restricted to the **intersection**
of variants -- often a small core. Imputing each
cohort against the **same reference panel** expands
every cohort to (nearly) the same variant space,
making meta-analysis tractable and well-powered.
This is how most modern GWAS consortia (PGC, GIANT,
CHARGE, H3Africa AWI-Gen) operate.

### Fine-mapping

A GWAS hit is rarely the causal variant. It is
usually a **tag SNP** in LD with the causal variant.
Fine-mapping methods (SuSiE, CAVIAR, FINEMAP) rely
on **dense variant coverage** inside the credible
region -- exactly what imputation provides. Without
imputation most causal variants remain invisible.

### Rare-variant aggregation

Individual rare variants are usually too under-
powered to test alone. Aggregation tests (**burden
tests**, **SKAT**, **SKAT-O**) combine multiple rare
variants in a gene or region. These tests are only
as good as the rare-variant coverage -- which
imputation of a well-matched panel provides at
scale.

::: warning Rare variants with caveats
Rare-variant imputation accuracy drops sharply as
MAF decreases. Always filter by R² (e.g. R² > 0.8
for rare work) and cross-check with a sequencing-
based cohort where available.
:::

### Polygenic Risk Scores (PRS)

PRS depend on variants with small effects across the
genome. The more variants you can accurately include,
the better the predictive score -- **but only if
the imputation was done against a population-matched
panel**. PRS constructed on European summary stats
and applied to African participants via a European-
trained imputation consistently under-perform. This
is where AfriGen-D's panel choice (covered in
[`/services`](/services)) directly shapes the
downstream science.

### Ancestry inference and PCA stability

Principal component analysis of ancestry needs dense,
well-typed variants. Imputed dosages are often used
as the PCA input because they give more **stable**
PC loadings than the sparse input.

### Worked African-specific example

Your study imputes a West African cohort against
TOPMed. A known pharmacogenomic variant in **CYP2D6**
is *rare* globally (MAF ~ 0.5%) but *common* in some
West African populations (MAF ~ 3%). If TOPMed's
African subset happens to contain enough West
African haplotypes, you can impute this variant with
R² > 0.8 despite it being globally rare -- a
downstream AGMP lookup is now possible for every
sample. That's **imputation + curation composed**.

## 3. How imputation actually works

### The three-stage pipeline

<!-- markdownlint-disable MD013 -->

| Stage | What happens | Tools in use |
| --- | --- | --- |
| **1. QC + harmonisation** | VCF format, genome build, strand, allele orientation | bcftools, checkref, VCF Liftover |
| **2. Phasing** | Separate each sample's two chromosome copies (haplotypes) | Eagle, SHAPEIT5 |
| **3. Imputation** | Match phased haplotypes against the reference panel and infer missing genotypes | Minimac4, Beagle, IMPUTE5 |

<!-- markdownlint-enable MD013 -->

Output per imputed variant:

- **Dosage** (expected number of alt alleles, a
  continuous 0--2 value) -- what most downstream
  tools actually consume.
- **R² / INFO score** (variant-level quality; higher
  = more confident imputation).
- **MAF** (in your sample, not the reference).

### Per-variant quality metrics

| Metric | Interpretation |
| --- | --- |
| **R² > 0.8** | High quality -- safe for most analyses |
| **R² 0.3 -- 0.8** | Moderate quality -- filter by MAF, interpret with care |
| **R² < 0.3** | Low quality -- generally filter out |

Imputation R² is **not** the same as a regression R².
It is the correlation between imputed dosage and the
truth (estimated from held-out samples), squared.
Both metric types can be computed per variant from
what the panel already knows about each position.

## 4. Imputation tools -- the engines

<!-- markdownlint-disable MD013 -->

| Engine | Core idea | Typical use | Speed profile |
| --- | --- | --- | --- |
| **Minimac4** | HMM on phased haplotypes, low-memory; Michigan / TOPMed / FedImpute default | Web-service back ends, most users hit this via a hosted service | Fast, scales to 100k+ samples |
| **Beagle 5.4** | Different HMM formulation, often better at rare variants | Offline / local imputation; strong rare-variant recall | Slower than Minimac4 at scale |
| **IMPUTE5** | Pre-BWT-compressed panels, population-scale focus | Large reference panels (UK Biobank-scale) | Very fast, high memory |
| **PBWT / Sanger** | Positional BWT for match-finding, very memory-efficient | Sanger Imputation Service back end | Fast; different accuracy profile |
| **Eagle / SHAPEIT5** | Phasing (not imputation) -- used *before* the engines above | Phasing step across every service | Fast |

<!-- markdownlint-enable MD013 -->

For this workshop: **all paths go through
Minimac4** regardless of whether you submit via
FedImpute, Michigan, or TOPMed. The differences you
care about are **panel** and **service UX**, not the
engine.

## 5. Worked example -- what to expect on the day

Your input on workshop day:

- **Samples:** 661 African individuals
- **Variants:** 4,423 typed SNPs on chr22, hg38
  ([download](/data/1k_afr_661_samples_4k_variants_hg38_agsc2025_chr22.vcf.gz))

After imputing against **H3Africa v6** on
**FedImpute**, expect (orders of magnitude, exact
depends on filters):

- **Variant count:** ~200k--500k on chr22 post-
  filter (R² > 0.3)
- **Rare variants (MAF < 0.01):** most will be
  lower-R²; aggressive filter for rare-variant
  analysis
- **Common variants (MAF > 0.05):** typical R² >
  0.9 with a population-matched panel
- **Wall-clock:** single-chromosome job usually
  completes in minutes on FedImpute's H3Africa
  backend

This is the numerical shape of "the Manhattan plot
fills in" that the [workflow](/workflow) hands-on
targets.

## 6. Common pitfalls

- **Build mismatch.** Input hg19, panel hg38 → the
  coordinates don't match and the imputation is
  garbage. Always liftover first.
- **Strand / allele flips.** If your REF is the
  panel's ALT for a variant, you need to flip or
  drop before imputation
  (see [Allele Switch Checker](/tutorial#allele-switch-checker-checkref)).
- **Population mismatch.** European-weighted panel
  on African samples → R² distribution shifts left,
  Manhattan plot under-counts variants.
- **Rare-variant over-interpretation.** Filtering
  R² > 0.3 works for common variants; for rare
  work, push to R² > 0.8 minimum.
- **Imputed dosages as hard calls.** Treating a 1.7
  dosage as a "1" is lossy -- use the dosage
  directly when the downstream tool supports it
  (most regression tools do).

## 7. Further reading

- **Methodological foundation:** Howie B., Marchini
  J., Stephens M. (2011). *Genotype imputation with
  thousands of genomes.* G3 1, 457–470.
  <https://doi.org/10.1534/g3.111.001198>
- **Minimac4 service paper:** Das S. *et al.*
  (2016). *Next-generation genotype imputation
  service and methods.* Nature Genetics 48,
  1284–1287. <https://doi.org/10.1038/ng.3656>
- **African-specific benchmark (this workshop's
  core reference):** Sengupta D., Botha G.,
  Meintjes A., **Mbiyavanga M.**, *et al.* (2023).
  *Performance and accuracy evaluation of reference
  panels for genotype imputation in sub-Saharan
  African populations.* Cell Genomics 3(6), 100332.
  <https://doi.org/10.1016/j.xgen.2023.100332>
- **Beagle 5:** Browning B.L., Tian X., Zhou Y.,
  Browning S.R. (2021). *Fast two-stage phasing of
  large-scale sequence data.* American Journal of
  Human Genetics 108, 1880–1890.
  <https://doi.org/10.1016/j.ajhg.2021.08.005>
- **IMPUTE5:** Rubinacci S., Delaneau O., Marchini
  J. (2020). *Genotype imputation using the
  Positional Burrows Wheeler Transform.* PLOS
  Genetics 16(11), e1009049.
  <https://doi.org/10.1371/journal.pgen.1009049>

---

Ready for the panel-choice decision? Continue to
[**Services & Panels**](/services) for the Michigan /
TOPMed / FedImpute / Sanger comparison and the
Sengupta 2023 benchmark in full.
