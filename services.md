---
description: >-
  Imputation services and reference panels compared -- Michigan, TOPMed,
  FedImpute, Sanger. Sengupta et al. 2023 benchmark results applied to the
  African-populations panel-choice decision.
---

# Imputation services and reference panels

There are several mature imputation services and a
growing zoo of reference panels. For the workshop's
African-populations audience, which service and which
panel you use is not a cosmetic choice -- the right
combination can be **>3× more accurate** than the
wrong one, as shown by the [Sengupta et al. 2023][sengupta]
benchmark below.

[sengupta]: https://doi.org/10.1016/j.xgen.2023.100332

::: info TL;DR
For African samples, use an **African-specific panel**
(AGR, H3Africa) on either **FedImpute** (the AfriGen-D
federated platform we use in this workshop) or the
Sanger Imputation Server. TOPMed on TOPMed Imputation
Server is a strong second choice because of sheer
sample size. Michigan's KGP panel is a legacy option
rather than a first choice for African imputation.
:::

## The services landscape

<!-- markdownlint-disable MD013 MD060 -->

| Service | URL | Imputation engine | Phasing | Access | Panels hosted |
| --- | --- | --- | --- | --- | --- |
| **FedImpute** (AfriGen-D) | [dev-fedimpute-ui.afrigen-d.dev](https://dev-fedimpute-ui.afrigen-d.dev) | Federates Minimac4 / WES nodes | Eagle | AfriGen-D Identity SSO, free academic | H3Africa (primary), others via federation |
| **Michigan Imputation Server 2** | [imputationserver.sph.umich.edu](https://imputationserver.sph.umich.edu) | Minimac4 | Eagle | Free academic, email signup | HRC r1.1, 1000G Phase 1/3, GAsP, CAAPA, HLA multi-ethnic, HapMap 2 |
| **TOPMed Imputation Server** | [imputation.biodatacatalyst.nhlbi.nih.gov](https://imputation.biodatacatalyst.nhlbi.nih.gov) | Minimac4 | Eagle | Free with BioData Catalyst account | TOPMed r3 (133,597 samples, 445 M variants) |
| **Sanger Imputation Service** (SIS) | <https://imputation.sanger.ac.uk> | PBWT | Eagle / ShapeIT | Free academic | HRC, AGR, 1000G Phase 3 |
| *Legacy AfriGen-D Service* | [impute.afrigen-d.org](https://impute.afrigen-d.org) | Minimac4 | Eagle | Free academic | H3Africa v6, 1000G Phase 3 -- **being retired in favour of FedImpute** |

<!-- markdownlint-enable MD013 MD060 -->

All four active services share **Minimac4/PBWT under
the hood with Eagle phasing**. The differences live in
two places: **which panels they host** (coverage
across populations) and **how they handle access**
(identity, data stewardship, export).

### Why FedImpute for this workshop

The AfriGen-D FedImpute platform is a unified,
GA4GH-standards-native façade that can route jobs to
multiple backend imputation nodes (H3Africa at UCT,
Michigan, and future federated sites) while keeping
the user interface, authentication, and provenance
consistent. One account, one workflow, many panels.
See [theory §1](/theory) for the federation rationale.

## The reference panel landscape

### Panels in play

<!-- markdownlint-disable MD013 MD060 -->

| Panel | Samples | Haplotypes | Ancestry focus | Genome build | Primary host |
| --- | --- | --- | --- | --- | --- |
| **H3Africa v6** | 4,447 | 8,894 | **African (48 populations)** | GRCh37 + GRCh38 | AfriGen-D / H3ABioNet |
| **H3Africa v7** *(TODO)* | *TBD* | *TBD* | African, expanded cohorts (AGenDA) | GRCh38 | AfriGen-D |
| **African Genome Resource (AGR)** | ~4,956 | ~9,912 | African + African-ancestry | GRCh37 | Sanger |
| **TOPMed r3** | 133,597 | ~267,194 | Multi-ancestry (US-focused) | GRCh38 | TOPMed Imputation Server |
| **HRC r1.1** | 32,470 | ~64,940 | Predominantly European | GRCh37 | Michigan, Sanger |
| **1000 Genomes Phase 3** | 2,504 | 5,008 | 26 global populations | GRCh37 + GRCh38 | Michigan, Sanger |
| **CAAPA** | 883 | 1,766 | African American | GRCh37 | Michigan |
| **Genome Asia v2 (GAsP)** | 6,461 | 12,922 | Asian | GRCh37 | Michigan |

<!-- markdownlint-enable MD013 MD060 -->

::: warning H3Africa v6 → v7
The tutorial currently targets **H3Africa v6**
(8,894 haplotypes from 48 populations, the baseline
used in [Sengupta et al. 2023][sengupta] when paired
with the AGR panel at Sanger). A **v7** release is in
preparation, incorporating newly generated African
whole-genome data from the
[AGenDA project](https://doi.org/10.1038/s41586-025-09935-7)
(H3Africa follow-on).

<!-- TODO(mamana): fill in v7 haplotype count, sample
     count, population coverage, benchmark-NDR numbers
     vs v6, and expected FedImpute availability date. -->
:::

## Sengupta 2023 -- the African-populations benchmark

[Sengupta et al. 2023, *Cell Genomics*][sengupta] --
led by AfriGen-D / H3Africa contributors including
Sengupta, Botha, Meintjes, and **Mbiyavanga**
(workshop organiser), with senior authors Hazelhurst,
Mulder, Ramsay, and Choudhury -- evaluated **5
reference panels on ~11,000 sub-Saharan African
participants** from the AWI-Gen study, imputed through
three hosted services (Sanger, Michigan, TOPMed).

### Headline results -- non-reference discordance rate

Lower NDR = more accurate imputation. On 95 SSA
whole-genome-sequence samples (the WGS "truth" set),
with variants imputed from an array-based input:

<!-- markdownlint-disable MD013 -->

| Panel | Host service | NDR on SSA samples |
| --- | --- | --- |
| **AGR** (African-specific) | Sanger (SIS) | **2.23 % ± 0.58 %** |
| TOPMed r2 | TOPMed (TIS) | 3.57 % ± 1.88 % |
| 1000G (KGP_M) | Michigan (MIS) | 6.74 % ± 2.32 % |
| 1000G (KGP_S) | Sanger (SIS) | 7.01 % ± 2.37 % |
| HRC | Sanger (SIS) | 7.64 % ± 2.28 % |

<!-- markdownlint-enable MD013 -->

Two observations the paper drives home:

1. **The African-specific AGR panel halved TOPMed's
   discordance** and was **~70 % more accurate than
   HRC**, despite being ~**20× smaller** than TOPMed.
   Size is not destiny; **population match is**.
2. **TOPMed is the runner-up** for African samples
   because its multi-ancestry design captures more
   African haplotypes than HRC / 1000G — even without
   being African-specific.

### What this means for the workshop

- First choice for African cohorts on FedImpute:
  **H3Africa panel** (African-specific, local
  infrastructure, ILIFU-hosted)
- Second choice if H3Africa access is unavailable:
  **AGR on Sanger** or **TOPMed r3** (via the TOPMed
  Imputation Server)
- Panels to deprioritise for African work: HRC,
  1000G-only -- their NDR on SSA samples exceeds
  acceptable thresholds for most downstream
  analyses
- Expect the v6 → v7 transition to push AGR / H3Africa
  accuracy *further* ahead once the AGenDA-derived
  cohorts are incorporated

The workshop's hands-on in [`/workflow`](/workflow)
uses H3Africa v6 via FedImpute as the default panel
for exactly these reasons.

## Decision guide

For a typical analysis, pick the panel/service pair
using this short ladder:

1. **African cohort (any sub-continental group)** →
   **H3Africa** on **FedImpute** (this workshop's
   choice). AGR on Sanger is an equivalent backup.
2. **Admixed African-American cohort** → **TOPMed
   r3** on TOPMed Imputation Server, or CAAPA on
   Michigan.
3. **Multi-ancestry cohort with European majority** →
   **TOPMed r3** (size advantage dominates).
4. **European-only cohort** → HRC or TOPMed r3 on
   Michigan. Both are fine.
5. **Asian cohort** → GAsP v2 on Michigan.
6. **When in doubt, run on two panels and compare.**
   NDR and R² distributions tell a clear story within
   minutes.

## Pragmatics

::: tip Sample-size caveat
TOPMed r3's 133,597 samples is ~30× AGR's and
~15× H3Africa v6's. For *rare-variant* imputation
(MAF &lt; 0.5 %), TOPMed can still win on pure
coverage even for African cohorts -- the Sengupta
2023 benchmark focused on common and low-frequency
variants. If your rare-variant analysis is the main
event, run both panels and pick per variant via R².
:::

::: tip Privacy / data stewardship

- **FedImpute** -- data stays on ILIFU (UCT), POPIA
  compliant, GA4GH-standards provenance via RO-Crate
- **TOPMed / Michigan / Sanger** -- data transits to
  the hosting institution; anonymisation is the
  user's responsibility. No PHI on these public
  servers.

:::

## References

- **Sengupta D., Botha G., Meintjes A., Mbiyavanga M.,
  *et al.*** (2023). *Performance and accuracy
  evaluation of reference panels for genotype
  imputation in sub-Saharan African populations.*
  Cell Genomics 3(6), 100332.
  <https://doi.org/10.1016/j.xgen.2023.100332>
- Das S. *et al.* (2016). *Next-generation genotype
  imputation service and methods.* Nature Genetics
  48, 1284–1287.
  <https://doi.org/10.1038/ng.3656>
- Taliun D. *et al.* (2021). *Sequencing of 53,831
  diverse genomes from the NHLBI TOPMed Program.*
  Nature 590, 290–299.
  <https://doi.org/10.1038/s41586-021-03205-y>
- McCarthy S. *et al.* (2016). *A reference panel of
  64,976 haplotypes for genotype imputation.* Nature
  Genetics 48, 1279–1283.
  <https://doi.org/10.1038/ng.3643>
- AGenDA Consortium (2025). *Enriching African genome
  representation through the AGenDA project.* Nature.
  <https://doi.org/10.1038/s41586-025-09935-7>
