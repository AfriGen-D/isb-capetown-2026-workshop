# African Genomic Medicine Portal (AGMP)

The **African Genomic Medicine Portal** is AfriGen-D's
curated resource for African-specific genomic medicine:
the genetic underpinnings of disease and drug response
in African populations and the African diaspora.

Explore: <https://agmp.afrigen-d.org>

::: info Hands-on checklist
This session is **Step 5** on the
[`/workflow`](/workflow#step-5-agmp-pharmacogenomic-lookup)
page -- keep it open for the explicit Data prep · QC ·
Run · Verify checklist.
:::

![AGMP landing page with search by variant, gene, drug, phenotype](/images/platforms/agmp-01-landing.png)

## Why AGMP?

African individuals -- and individuals of recent
African descent -- have the highest genomic diversity
of any continent. That diversity is associated with
susceptibility to communicable and non-communicable
diseases, and with response to the drugs used to treat
them. Yet African populations remain the most
under-represented in global genomic medicine
databases.

AGMP addresses this by curating African-specific
signals from **PharmGKB**, **DisGeNET**, and (since
v1.2) the **GWAS Catalogue**, and surfacing them in a
single portal organised around four entry points:
**variant**, **gene**, **drug**, and **phenotype**.

## Data at a Glance

*(As of AGMP v1.2, 2025-04-30)*

| Category | Count |
| --- | --- |
| Genes | 6,270 |
| Drugs | 48 |
| Phenotypes | 1,579 |
| Variants | 17,470 |
| Unique studies | 1,194 |

![AGMP data overview and top-ten graphs](/images/platforms/agmp-03-summary.png)

## Portal Objectives

- Provide **genotype-phenotype associations** as they
  pertain to African populations
- Provide **pharmacogenomics** information as it
  pertains to African populations
- Provide **disease information** as it pertains to
  African populations
- Provide access to existing resources and materials
  that enable the implementation, education, and
  practice of genomics and precision medicine in
  Africa

![AGMP About page with objectives, contributors, and data sources](/images/platforms/agmp-02-about.png)

## Hands-on (20 min)

::: warning Content being authored for 2026
This hands-on walkthrough is new for the 2026 edition.
The queries, screenshots, and sample exports below
are a scaffold -- the instructor will walk through
each step live and update this page afterward.
:::

By the end of the session, participants will be able
to:

1. Navigate AGMP and its four entry points (variant,
   gene, drug, phenotype)
2. Search for pharmacogenomic variants by gene, drug,
   or clinical annotation
3. Interpret evidence levels and curation status
4. Export curated variant sets for integration with
   external analyses
5. Connect AGMP evidence with imputed genotypes from
   the earlier FedImpute session

### Exercise 1 -- Drug-gene association

Search AGMP for a clinically relevant gene (for
example **CYP2D6** or **DPYD**) and find the drugs for
which African-relevant pharmacogenomic evidence
exists.

<!-- TODO(mamana): replace with the exact gene + drug
     combo you plan to walk through live, include a
     screenshot of the search result and the linked
     PharmGKB entries. -->

### Exercise 2 -- Export a variant set

Using the Summary view and the "top ten variants"
panel, pick a variant of interest and export its
associated study list as TSV/CSV.

<!-- TODO(mamana): verify the export flow and capture
     a screenshot of the export file format so
     participants know what to expect. -->

### Exercise 3 -- Integrate with imputation output

Take a variant you imputed earlier in the FedImpute
session, look it up in AGMP, and discuss what its
drug-response evidence (or lack thereof) means for
downstream clinical interpretation in an African
cohort.

<!-- TODO(mamana): suggest 3-5 variants from the
     tutorial VCF that have known AGMP entries so the
     exercise is reliably productive rather than
     speculative. -->

## How AGMP Was Built

AGMP v1.0 (2022-12-15) launched with African-specific
data curated from PharmGKB and DisGeNET. v1.1
(2024-01-15) updated the curation pipeline with
additional fields. v1.2 (2025-04-30) added the
GWAS Catalogue dataset and heat-map visualisations.

Development was driven by **H3ABioNet's Databases and
Resources Work Package** and the Precision Medicine
project. Ongoing maintenance is led by AfriGen-D.

## Cite AGMP

> Othman H., Zass L., da Rocha J.E.B., Radouani F.,
> Samtal C., Benamri I., Kumuthini J., Fakim Y.J.,
> Hamdi Y., Mezzi N., et al. (2022).
> *African Genomic Medicine Portal: A Web Portal for
> Biomedical Applications.* Journal of Personalised
> Medicine. <https://doi.org/10.3390/jpm12020265>

## Resources

- Portal: <https://agmp.afrigen-d.org>
- About AGMP: <https://agmp.afrigen-d.org/about>
- Summary dashboard: <https://agmp.afrigen-d.org/summary/>
- Documentation repo:
  <https://github.com/AfriGen-D/agmp-docs>
- AfriGen-D: <https://afrigen-d.org>
- Helpdesk: <https://helpdesk.afrigen-d.org>
