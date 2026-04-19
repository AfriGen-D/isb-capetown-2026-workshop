# African Genome Variation Database (AGVD)

The **African Genome Variation Database** is
AfriGen-D's open-access resource for African genomic
diversity, allele frequencies, and variant
interpretation.

Explore: <https://agvd.afrigen-d.org>

::: info Hands-on checklist
This session is **Step 6** on the
[`/workflow`](/workflow#step-6-agvd-population-frequency-comparison)
page -- keep it open for the explicit Data prep · QC ·
Run · Verify checklist.
:::

![AGVD landing page -- mission, objectives, and future releases](/images/platforms/agvd-01-landing.png)

## Why AGVD?

Despite having the **highest genomic diversity of any
continent**, African populations are the least studied
in the context of human genetic variation. When a
clinical variant is observed in a patient of African
ancestry, looking it up in a European-dominant
frequency database often returns a misleading result
-- a variant that is rare globally can be common in
a specific African population, and vice versa.

AGVD fixes this by curating allele frequencies from
African cohorts (and cohorts of African ancestry) and
surfacing them with the population structure intact.
The initial release reports frequencies from a joint
called set of **~4,000 samples**; future releases
will add targeted sequencing, exomes, additional
whole genomes, and array genotyping.

## Search Interface

AGVD's search accepts a **Gene**, **variant ID**, or
**genomic region**, and returns allele frequencies
broken down by population cluster.

![AGVD search page with cluster filters and MAF threshold slider](/images/platforms/agvd-02-search.png)

### Population Clusters

Results are stratified across 11 clusters:

- **African:** Western, Eastern, Southern, Central,
  and Northern Africa
- **Ex-Africa:** continental cohorts of African
  ancestry
- **Global comparators:** Europe, Asia, Oceania,
  North America, South America

This is what separates AGVD from gnomAD-African or
1000 Genomes AFR: sub-continental resolution inside
Africa, not one flat "AFR" bin.

### Filters

- **Minor Allele Frequency (MAF) threshold** --
  slider with "less than or equal to" / "greater than
  or equal to" modes
- **Release selector** -- pin results to a specific
  AGVD release (e.g. `AGVD_24A_Main`) for
  reproducibility

## Hands-on (15 min)

::: warning Content being authored for 2026
This hands-on walkthrough is new for the 2026 edition.
The variant examples, screenshots, and expected
outputs below are a scaffold -- the instructor will
walk through each step live and update this page
afterward.
:::

By the end of the session, participants will be able
to:

1. Query AGVD for allele frequencies across African
   population clusters
2. Compare AGVD frequencies against gnomAD and 1000
   Genomes for the same variant
3. Interpret cluster-level differences and their
   implications for variant pathogenicity assessment
4. Export frequency tables for downstream variant
   prioritisation

### Exercise 1 -- Cluster-level frequency lookup

Pick one variant from the imputed VCF you produced in
the FedImpute session, search AGVD for its allele
frequency across African clusters, and compare the
cluster-specific MAFs.

<!-- TODO(mamana): pick 3-5 variants from the tutorial
     VCF known to have cluster-varying frequencies
     (ideally with published clinical relevance), so
     the exercise produces an informative contrast. -->

### Exercise 2 -- AGVD vs gnomAD comparison

Take the same variant and look it up in gnomAD
(African / AFR bin) and in 1000 Genomes Phase 3
(AFR). Discuss why the three sources might disagree
and what that means for interpretation.

### Exercise 3 -- ACMG BA1/BS1 implications

For a candidate pathogenic variant, check whether its
AGVD African-cluster frequency exceeds the ACMG
**BA1** (>5%) or **BS1** (>1%) thresholds. Does the
classification change once you use a population-
appropriate frequency? (This is the clinical
motivation for AGVD.)

<!-- TODO(mamana): suggest one candidate variant with
     divergent frequencies (e.g. HBB variants, or
     PCSK9) where the ACMG call differs between
     gnomAD-global and AGVD-African. -->

## Releases

- **AGVD_24A_Main** -- initial release, joint called
  set of ~4,000 samples, autosomal + chrX
- Future releases will incorporate targeted,
  exome, and additional WGS data, plus array
  genotyping

Pin analyses to a specific release for
reproducibility. Check the
[releases page](https://agvd.afrigen-d.org/releases)
for the current list.

## Access

- **Browsing and search:** open access, no account
  required
- **Downloads / controlled data:** register and log in
  at <https://nyame.afrigen-d.org/accounts/login/>.
  AGVD currently uses its **own account system
  (nyame)** -- it does **not yet** share the AfriGen-D
  Identity SSO used by FedImpute, so you need a
  separate signup.

## Resources

- Portal: <https://agvd.afrigen-d.org>
- About AGVD: <https://agvd.afrigen-d.org/about>
- Releases: <https://agvd.afrigen-d.org/releases>
- Help: <https://agvd.afrigen-d.org/help>
- Documentation repo:
  <https://github.com/AfriGen-D/agvd-docs>
- Back-end (nyame auth):
  <https://github.com/AfriGen-D/nyame>
- AfriGen-D: <https://afrigen-d.org>
