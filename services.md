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
For African samples, use the **H3Africa panel on
FedImpute** (the AfriGen-D federated platform we use
in this workshop) -- it is the best-matched
African-specific panel and is the active service. The
**Sanger Imputation Service** (historical host of the
AGR panel) is **currently offline**, so AGR is not
directly reachable via a public endpoint right now.
**TOPMed on TOPMed Imputation Server** is the strong
second choice thanks to sheer sample size, especially
for rare-variant work. Michigan's KGP panel is a
legacy option rather than a first choice for African
imputation.
:::

## The services landscape

<!-- markdownlint-disable MD013 MD060 -->

| Service | URL | Imputation engine | Phasing | Access | Panels hosted |
| --- | --- | --- | --- | --- | --- |
| **FedImpute** (AfriGen-D) | [fedimpute.afrigen-d.org](https://fedimpute.afrigen-d.org) | Federates Minimac4 / WES nodes | Eagle | AfriGen-D Identity SSO, free academic | H3Africa (primary), others via federation |
| **Michigan Imputation Server 2** | [imputationserver.sph.umich.edu](https://imputationserver.sph.umich.edu) | Minimac4 | Eagle | Free academic, email signup | HRC r1.1, 1000G Phase 1/3, GAsP, CAAPA, HLA multi-ethnic, HapMap 2 |
| **TOPMed Imputation Server** | [imputation.biodatacatalyst.nhlbi.nih.gov](https://imputation.biodatacatalyst.nhlbi.nih.gov) | Minimac4 | Eagle | Free with BioData Catalyst account | TOPMed r3 (133,597 samples, 445 M variants) |
| *Sanger Imputation Service* (SIS) | <https://imputation.sanger.ac.uk> | PBWT | Eagle / ShapeIT | -- | HRC, AGR, 1000G Phase 3 -- **currently unavailable (site returns 410; down for maintenance since May 2025 with no ETA)** |
| *Legacy AfriGen-D Service* | ~~impute.afrigen-d.org~~ | Minimac4 | Eagle | -- | **Retired. Use FedImpute above for new jobs.** (URL still resolves but is not a target for new workflows.) |

<!-- markdownlint-enable MD013 MD060 -->

The currently active services (FedImpute, Michigan,
TOPMed) share **Minimac4 under the hood with Eagle
phasing**. The differences live in two places:
**which panels they host** (coverage
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
| **H3Africa v6** | 4,447 | 8,894 | **African (48 populations)**; full + African-only subsets available on FedImpute | GRCh37 + GRCh38 | AfriGen-D / H3ABioNet |
| **H3Africa v7** | *TBD* | *TBD* | **African-ancestry imputation** (live on FedImpute); successor to v6, expanded cohorts (AGenDA) | GRCh38 | AfriGen-D |
| **African Genome Resource (AGR)** | ~4,956 | ~9,912 | African + African-ancestry | GRCh37 | Sanger |
| **TOPMed r3** | 133,597 | ~267,194 | Multi-ancestry (US-focused) | GRCh38 | TOPMed Imputation Server |
| **HRC r1.1** | 32,470 | ~64,940 | Predominantly European | GRCh37 | Michigan, Sanger |
| **1000 Genomes Phase 3** | 2,504 | 5,008 | 26 global populations | GRCh37 + GRCh38 | Michigan, Sanger |
| **CAAPA** | 883 | 1,766 | African American | GRCh37 | Michigan |
| **Genome Asia v2 (GAsP)** | 6,461 | 12,922 | Asian | GRCh37 | Michigan |

<!-- markdownlint-enable MD013 MD060 -->

::: info H3Africa v6 → v7 -- both now live on FedImpute
Both **H3Africa v6** (the 8,894-haplotype / 48-population
panel used as the baseline in
[Sengupta et al. 2023][sengupta] when paired with AGR
at Sanger) **and the successor H3Africa v7** are
currently available on FedImpute according to its
[FAQ](https://fedimpute.afrigen-d.org). v7 targets
African-ancestry imputation and incorporates newer
cohorts, building on the work of initiatives such as
the [AGenDA project](https://doi.org/10.1038/s41586-025-09935-7).

<!-- TODO(mamana): fill in v7 haplotype count, sample
     count, population coverage, and benchmark-NDR
     numbers vs v6 when those numbers are published. -->
:::

## Sengupta 2023 -- the African-populations benchmark

[Sengupta et al. 2023, *Cell Genomics*][sengupta] --
led by AfriGen-D / H3Africa contributors including
Sengupta, Botha, Meintjes, and **Mbiyavanga**
(workshop organiser), with senior authors Hazelhurst,
Mulder, Ramsay, and Choudhury -- is the most complete
empirical comparison of imputation panels and
services for sub-Saharan African (SSA) data to date.
The headline finding: **population match beats panel
size**. The details matter.

### Study design

<!-- markdownlint-disable MD013 MD060 -->

| Element | Detail |
| --- | --- |
| **Study population** | ~10,900 SSA participants from the **AWI-Gen** study (4 African countries, East / West / South regions) |
| **Truth set** | 95 SSA high-coverage whole-genome sequences (held-out, used to score imputation accuracy) |
| **Panels evaluated** | 5: **AGR**, **TOPMed r2**, **HRC**, **KGP_S** (1000G on Sanger), **KGP_M** (1000G on Michigan) |
| **Services used** | **Sanger** (AGR, HRC, KGP_S), **TOPMed** (TOPMed), **Michigan** (KGP_M) |
| **Accuracy metrics** | Non-reference discordance rate (NDR), average INFO / R² score per alternate allele frequency (AAF) bin |

<!-- markdownlint-enable MD013 MD060 -->

### Headline results -- non-reference discordance rate

Lower NDR = more accurate imputation. Measured on the
95 SSA WGS truth set:

<!-- markdownlint-disable MD013 -->

| Panel | Host service | NDR on SSA samples |
| --- | --- | --- |
| **AGR** (African-specific) | Sanger (SIS) | **2.23 % ± 0.58 %** |
| TOPMed r2 | TOPMed (TIS) | 3.57 % ± 1.88 % |
| 1000G (KGP_M) | Michigan (MIS) | 6.74 % ± 2.32 % |
| 1000G (KGP_S) | Sanger (SIS) | 7.01 % ± 2.37 % |
| HRC | Sanger (SIS) | 7.64 % ± 2.28 % |

<!-- markdownlint-enable MD013 -->

::: tip The 20× size paradox
AGR contains ~**20× fewer samples** than TOPMed --
yet achieves **lower** SSA discordance and halves
TOPMed's NDR. A panel 20× larger drawn from a
Eurocentric distribution under-performs a small,
well-matched African panel. Population match > panel
size.
:::

### Panels by allele-frequency stratum

The top-line NDR number hides a more interesting
story once you stratify by allele frequency.
[Sengupta et al. 2023][sengupta] report the average
INFO / R² distribution per panel across AAF bins; the
picture differs for common vs rare variants:

- **AAF > 0.001 (common + low-frequency variants):**
  AGR is **competitive with TOPMed** despite the 20×
  size gap. The curated African haplotype structure
  matters more than raw sample count for variants
  that are reasonably frequent in African genomes.
- **AAF ≤ 0.001 (rare variants):** TOPMed's sheer
  size begins to tell. For very rare variants, the
  larger panel captures haplotype combinations AGR
  has never seen, and the rank order flips in
  TOPMed's favour.

The practical reading: **choose AGR / H3Africa for
common + low-frequency variants** (this is most
GWAS / candidate-gene work), **add TOPMed when rare
variants are the main event** (burden tests,
Mendelian discovery).

### Geographic variation inside Africa

SNP imputation *yield* -- how many imputed positions
you recover -- varied significantly between **East**,
**West**, and **South** African populations,
reinforcing the point from [theory §1](/theory#_1-african-genetic-diversity-10-min):
sub-continental structure is real and it affects
analytical outcomes, not just figure captions.

### The Khoe-San ancestry gap

The paper's most interesting finding, for curation
purposes, is a **gradient**: across every imputed
dataset, **NDR rose with the proportion of Khoe-San
ancestry** in an individual. Even the best panel
(AGR) fails progressively worse as Khoe-San ancestry
increases -- because even AGR under-represents
Khoe-San haplotypes.

This is the **under-representation-within-
under-representation** problem: African populations
are under-represented in global panels, and inside
African panels Khoe-San populations are further
under-represented. It is the concrete empirical case
for why H3Africa v7, AGenDA, and programmes that
explicitly sample under-represented ancestrally
distinct groups matter.

### Author recommendations

Direct from the paper:

1. For SSA datasets, **use AGR or TOPMed**. The
   other three panels (HRC, KGP_S, KGP_M) have NDR
   too high for most downstream analyses.
2. **Integrate not only geographically but also
   ancestrally diverse WGS data** into next-
   generation reference panels -- specifically
   Khoe-San and other currently under-represented
   ancestry groups.
3. Always **report panel, service, and pipeline
   version** in publications so imputation outputs
   can be interpreted and reproduced.

### What this means for the workshop

- First choice for African cohorts on FedImpute:
  **H3Africa panel** (African-specific, local
  infrastructure, ILIFU-hosted)
- Second choice if H3Africa access is unavailable:
  **TOPMed r3** (via the TOPMed Imputation Server).
  AGR on Sanger used to be the other strong
  African-specific option, but the Sanger Imputation
  Service is currently unavailable.
- Panels to deprioritise for African work: HRC and
  1000G-only -- their NDR on SSA samples exceeds
  acceptable thresholds for most downstream
  analyses
- Expect the v6 → v7 transition to push H3Africa
  accuracy *further* ahead, especially if AGenDA-
  derived cohorts add Khoe-San / under-represented
  ancestry coverage where current panels struggle

The workshop's hands-on in [`/workflow`](/workflow)
uses H3Africa v6 via FedImpute as the default panel
for exactly these reasons.

## Decision guide

For a typical analysis, pick the panel/service pair
using this short ladder:

1. **African cohort (any sub-continental group)** →
   **H3Africa** on **FedImpute** (this workshop's
   choice). AGR on Sanger *used to be* an equivalent
   backup; the Sanger service is currently offline
   (see the services table above).
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
