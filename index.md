---
layout: home

hero:
  name: "ISB Cape Town 2026"
  text: "Genotype Imputation and Data Analysis for African Populations"
  tagline: "Hands-on with FedImpute, AGMP, and AGVD -- African-led, African-hosted infrastructure for genomic imputation, pharmacogenomics, and population-specific variant interpretation."
  image:
    src: /afrigen-d-logo.png
    alt: AfriGen-D
  actions:
    - theme: brand
      text: Start the tutorial
      link: /tutorial
    - theme: alt
      text: Schedule
      link: /schedule
    - theme: alt
      text: View on GitHub
      link: https://github.com/AfriGen-D/isb-capetown-2026-workshop

features:
  - icon: 🧬
    title: FedImpute -- Federated Imputation
    details: >-
      A unified interface to multiple imputation backends (H3Africa,
      Michigan Imputation Server) over GA4GH standards. African-hosted
      on the ILIFU research cloud, data stays in South Africa under POPIA.
    link: /tutorial
    linkText: Hands-on tutorial
  - icon: 💊
    title: AGMP -- Pharmacogenomics for Africa
    details: >-
      17,470 curated variants, 6,270 genes, 48 drugs, 1,579 phenotypes
      across 1,194 studies. Search genotype-phenotype associations,
      drug response, and disease information for African populations.
    link: /agmp
    linkText: AGMP session
  - icon: 🌍
    title: AGVD -- Population Allele Frequencies
    details: >-
      Open-access allele frequencies across 11 population clusters
      (Western / Eastern / Southern / Central / Northern Africa, plus
      Ex-Africa cohorts). Filter by MAF, search by gene or region.
    link: /agvd
    linkText: AGVD session
---

## Workshop at a Glance

<!-- markdownlint-disable MD013 MD060 -->

| Field       | Detail |
| ----------- | ------ |
| Event       | 19th Annual International Biocuration Conference |
| Date        | Monday, 20 April 2026 -- 14:00 start, targets 17:45 finish (18:00 block) |
| Venue       | Atlantic I, Lagoon Beach Hotel Conference Centre and Spa, Milnerton |
| Duration    | 3 h 45 min content + 15-min buffer (workshop block: 14:00--18:00) |
| Organiser   | Mr Mamana Mbiyavanga (UCT / AfriGen-D) |
| Format      | ~1 hour teaching + ~2½ hours hands-on; 30-min break at the 2-hour mark |

<!-- markdownlint-enable MD013 MD060 -->

## Why This Matters

The African Genomics Data Hub (AfriGen-D) provides essential curated resources
for analysing African genetic data, addressing unique challenges in variant
discovery, imputation accuracy, and knowledge integration. Despite having the
highest genomic diversity of any continent, African populations remain the
least studied in human genetic variation.

Population-specific reference panels deliver **substantially better imputation
accuracy** than generic panels when applied to African cohorts. In the
[Sengupta et al. 2023][sengupta] benchmark on ~11,000 sub-Saharan African
participants, the African Genome Resource panel achieved a non-reference
discordance rate of **2.23%**, versus **7.64%** for the European-weighted HRC
panel — a **~3.4× accuracy advantage** despite AGR being ~20× smaller than
the next-best panel (TOPMed). Population match beats panel size. See the
[Services & Panels page](/services) for the full comparison.

This workshop contributes directly to addressing the severe underrepresentation
of African populations in global genomic databases while building local
capacity for genomic data curation.

[sengupta]: https://doi.org/10.1016/j.xgen.2023.100332

## What You'll Learn

- Submit end-to-end imputation jobs via **FedImpute** (the AfriGen-D
  federated platform)
- Apply quality control, monitor runs, and interpret R² metrics
- Compare sparse vs imputed GWAS results (Manhattan, QQ plots)
- Query **AGMP** for curated pharmacogenomic variants, genes, and drugs
- Use **AGVD** for population-specific allele frequency analysis
- Connect the three tools into a single biocuration pipeline

## Prerequisites

- Laptop with a modern browser (Chrome, Firefox, Safari, or Edge)
- AfriGen-D Identity account
  ([register here](https://dev-auth.afrigen-d.dev/if/flow/afrigend-enrollment/))
  -- this SSO account covers **FedImpute**. AGVD
  currently requires a **separate** account
  ([register on AGVD](https://nyame.afrigen-d.org/accounts/login/))
- Basic understanding of VCF format is helpful but not required

::: tip About AfriGen-D
Part of the [African Genomics Data Hub](https://afrigen-d.org) -- an
interconnected suite of resources supporting African genomics research,
funded by NIH Grant U24HG012750 and hosted on the ILIFU research cloud at
the University of Cape Town.
:::
