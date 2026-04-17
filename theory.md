---
description: >-
  30-minute theory slot for the AfriGen-D tutorial at ISB Cape Town 2026.
  African genetic diversity, reference panel selection, and biocuration
  context for the hands-on that follows.
---

# Theory: African diversity, reference panels, biocuration

The 30-minute theory slot at the top of the workshop
frames the three hands-on sessions that follow. It is
deliberately short -- just enough context to read the
plots you're about to generate, and to recognise why
each step is a **biocuration** task, not just a
computational one.

::: info Why these three themes together
Imputation accuracy depends on **African genetic
diversity** (the biological reality). Accuracy gains
come from **reference panels** that capture that
diversity. Panels, variants, and frequencies only
become reliable resources through **biocuration**.
Each section feeds the next.
:::

**Audience note:** most participants self-rate at
*Below average* to *Average* on "Foundations of
biocuration". Sections 1-2 assume genomics literacy
(VCF, MAF, haplotypes); section 3 assumes nothing and
builds the biocuration framing from first principles.

---

## 1. African genetic diversity (≈10 min)

### The oldest branch

Modern humans originated in sub-Saharan Africa
~200-300 thousand years ago. The Out-of-Africa
migration ~60 kya took a **single bottlenecked sample**
of this diversity and seeded every non-African
population. What remained in Africa is everything --
including the oldest branches of the human tree.

Practical consequence:

- African genomes have **more total variants** than
  any other continental group
- African haplotypes are **shorter** -- LD decays over
  shorter physical distances, meaning you need denser
  tagging to recover the same signal
- **Many African variants are absent** from panels
  built on European or admixed samples

### Sub-continental structure

"African" is not one population. Informative levels of
structure include:

- **West African:** Yoruba, Esan, Mende, Gambian...
- **East African:** Luhya, Kikuyu, Maasai, Somali...
- **Southern African:** Zulu, Sotho, Khoe-San, Tswana...
- **Central African:** Baka, Mbuti, Bantu-speaking
  Cameroonians...
- **North African:** Berber, Arab, Nilotic-influenced
  Sudanese...

AGVD's **11 population clusters** (see
[`/agvd`](/agvd)) reflect exactly this reality: they
resolve Western / Eastern / Southern / Central /
Northern Africa separately, plus Ex-Africa cohorts
(African-ancestry populations outside the continent)
and global comparators.

### H3Africa, AGVP, and the data that exists

Two initiatives created the base layer of African
genomic data:

- **H3Africa Consortium** (since 2012): pan-African
  genomic research network, funded by NIH and Wellcome.
  Produced the H3Africa reference panel -- 8,894
  haplotypes from **48 populations** -- purpose-built
  for African imputation.
- **African Genome Variation Project (AGVP)** ([Gurdasani
  et al. 2015][gurdasani]): the first continental-scale
  sequencing of African populations, laying out the
  genetic-structure map later refined by AGVD and
  others.

[gurdasani]: https://doi.org/10.1038/nature13997

### Why this matters for curation

A variant annotated as "African MAF 3%" is almost
always *under-curated*. It should be: "Western African
MAF 4.2% / Eastern African MAF 1.1% / Southern African
MAF 7.8%". The continent-scale rollup is a floor; the
sub-continental breakdown is the science.

This is the curation posture AfriGen-D takes across
its resources -- and the reason the workshop spends
time on AGVD's cluster-level search rather than just
gnomAD's "AFR" bin.

---

## 2. Reference panels (≈10 min)

### What a reference panel is

A reference panel is a collection of **densely
typed** (sequenced or chip + imputed + validated)
individuals whose haplotypes serve as a template.
Imputation takes your **sparse** genotypes (SNP-array
variants at, say, 500K–2M positions) and predicts the
millions of untyped positions by finding matching
haplotypes in the panel.

Accuracy depends on two things:

1. Does the panel **contain** the variant you are
   trying to impute?
2. Is there a **closely matching haplotype** for your
   sample in the panel?

Both are population-dependent. A panel of 100,000
European samples can fail badly on a variant that is
rare in Europe but common in East Africa.

### The public panel landscape

<!-- markdownlint-disable MD013 MD060 -->

| Panel | Scope | Approx. samples | Notes |
| --- | --- | --- | --- |
| **1000 Genomes Phase 3** | Global reference | ~2,500 | Legacy baseline; limited for rare variants |
| **HRC r1.1** | European-weighted | ~32,000 | Large but skewed; weak on African rare variants |
| **TOPMed Freeze 8** | Multi-ancestry | ~97,000 | Currently the largest public panel; strong rare-variant coverage |
| **H3Africa v6** | African-focused | 8,894 haplotypes / 48 populations | Purpose-built for sub-Saharan imputation |
| **African Genome Resource (AGR)** | African | ~4,956 | African-specific, dense coverage |

<!-- markdownlint-enable MD013 MD060 -->

### What the benchmark actually says

[Sengupta et al. 2023][sengupta] evaluated multiple
panels on whole-genome sequenced sub-Saharan African
samples. Lower **non-reference discordance rate
(NDR)** is better:

| Panel | NDR on SSA samples |
| --- | --- |
| **AGR** (African-specific) | **2.23% ± 0.58%** |
| TOPMed | 3.57% ± 1.88% |
| KGP 1000G | 6.74-7.01% |
| HRC | 7.64% ± 2.28% |

The African-specific AGR panel halved TOPMed's
discordance and was ~70% more accurate than HRC --
despite being **about 20× smaller** than TOPMed. Size
is not destiny; **population match** is.

[sengupta]: https://doi.org/10.1016/j.xgen.2023.100332

### Panel choice *is* a curation decision

Picking the wrong panel is analytically cheap and
scientifically expensive. FedImpute's federated pitch
is: **don't force one choice globally**. The same
platform can route jobs to H3Africa, Michigan
Imputation Server, or other federated nodes via
GA4GH adapters. The curator's job is to document the
choice with full provenance (RO-Crate) so downstream
analyses can interpret the output correctly.

---

## 3. Biocuration context (≈10 min)

### Biocuration in one sentence

**Biocuration** is the structured, expert-reviewed
process of assembling data from disparate sources
(literature, databases, sequencing, arrays) into a
**reusable resource** whose annotations you can trust.

Curation is the *process*; annotations are the
*output*. Without curation, an annotation is a
one-person guess that didn't scale. With curation, it
is a versioned, provenanced claim with known
provenance, known quality controls, and a known
update cadence ([Howe et al. 2008][howe]).

[howe]: https://doi.org/10.1038/455047a

### FAIR as the north star

The [FAIR Guiding Principles][wilkinson] ([Wilkinson
et al. 2016][wilkinson]) define four properties of a
well-curated resource:

- **Findable** -- globally unique persistent
  identifiers; indexed; discoverable
- **Accessible** -- retrievable by identifier through
  standard protocols, with authentication where
  needed
- **Interoperable** -- uses open, community-governed
  standards (ontologies, schemas, formats)
- **Reusable** -- rich metadata, clear licence,
  documented provenance

[wilkinson]: https://doi.org/10.1038/sdata.2016.18

FAIR is not a checklist you complete; it is a
gradient along which your resource moves over time
through deliberate curation work.

### The AfriGen-D curation stack

Today's hands-on walks three resources, each of which
is a different kind of curation:

<!-- markdownlint-disable MD013 -->

| Resource | Curated object | Sources |
| --- | --- | --- |
| **AGMP** | Pharmacogenomic variants | PharmGKB + DisGeNET + GWAS Catalogue, African-filtered |
| **AGVD** | Allele frequencies | African cohort WGS joint call set, 11 population clusters |
| **FedImpute** | Imputation jobs + outputs | Reference panels, VCF inputs, RO-Crate-wrapped provenance |

<!-- markdownlint-enable MD013 -->

The three are meant to compose: a well-imputed VCF
from FedImpute feeds a lookup in AGMP (is this
variant known to affect drug response?) and AGVD (is
it common in the participant's population cluster?).
**The provenance chain survives** because every step
uses community standards -- GA4GH on the compute
side, PharmGKB/DisGeNET on the curation side,
RO-Crate to package them together.

### What a biocurator should leave with

By the end of today's workshop the expectation is not
that you become an imputation expert. It is that you
can:

1. **Evaluate** a reference panel for your population
   of interest
2. **Lookup** pharmacogenomic and frequency evidence
   for a variant without defaulting to a
   European-weighted resource
3. **Recognise** the curation layer in each AfriGen-D
   tool, and know where its provenance lives
4. **Feed the curation back** -- report issues,
   suggest new signals, contribute to ongoing data
   resources

---

## Ready for the hands-on?

The theory ends here. Next:

- [**Tutorial: Genotype Imputation**](/tutorial) --
  the long-form walkthrough (GWAS → impute → GWAS
  loop, aligned to the [schedule](/schedule))
- [**AGMP session**](/agmp) -- pharmacogenomic variant
  lookups
- [**AGVD session**](/agvd) -- population-specific
  frequency queries

### References

- Gurdasani D. et al. (2015). *The African Genome
  Variation Project shapes medical genetics in
  Africa.* Nature 517, 327–332.
  <https://doi.org/10.1038/nature13997>
- Howe D. et al. (2008). *Big data: The future of
  biocuration.* Nature 455, 47–50.
  <https://doi.org/10.1038/455047a>
- Sengupta D. et al. (2023). *Performance and
  accuracy evaluation of reference panels for
  genotype imputation in sub-Saharan African
  populations.* Cell Genomics 3(6), 100332.
  <https://doi.org/10.1016/j.xgen.2023.100332>
- Wilkinson M.D. et al. (2016). *The FAIR Guiding
  Principles for scientific data management and
  stewardship.* Scientific Data 3, 160018.
  <https://doi.org/10.1038/sdata.2016.18>
