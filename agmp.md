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

![AGMP data overview and top-ten graphs](/images/platforms/agmp-02-summary.png)

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

No account is required -- AGMP is a public portal.
By the end of the session, participants will be able
to:

1. Navigate AGMP and its four entry points (variant,
   gene, drug, phenotype)
2. Search for pharmacogenomic variants by gene, drug,
   or clinical annotation
3. Interpret the drug / gene / variant / region
   columns and drill into linked PharmGKB studies
4. Export curated variant sets for integration with
   external analyses

### Exercise 1 -- Drug-gene association for CYP2D6

**CYP2D6** metabolises ~25% of clinically used drugs
and is one of the most variable pharmacogenes in
African populations. Let's walk through the query
live.

1. Open <https://agmp.afrigen-d.org>.
2. Select **Gene** as the search category, enter
   `CYP2D6`, and click **Search**.
3. On the result card, click **Gene Associations**.
   The portal opens
   `/drug-phenotype-associations/CYP2D6/`.

![CYP2D6 gene-drug-phenotype associations](/images/platforms/agmp-04-cyp2d6-associations.png)

You should see:

- **Gene header:** UniProt ID `P10635`, function
  summary (cytochrome P450 superfamily, polymorphic
  "poor metaboliser" phenotype)
- **Drug Associations table:** 48 entries. Each row
  lists the **variant** (star allele, e.g. `CYP2D6*17`,
  `CYP2D6*29`, `CYP2D6*40`), the **drug**
  (e.g. codeine, dextromethorphan), a **description**
  of the effect, the **p-value**, the **region** and
  **country** (East Africa / Tanzania, African
  American / Afro-Caribbean / USA), the study PMID,
  the variant type (Star allele), and the source DB
  (PharmGKB).
- **Phenotype Associations table:** "No data available
  in table" -- CYP2D6 has drug associations but not
  disease / phenotype associations in AGMP v1.2.

::: tip Star-allele nomenclature
Pharmacogenes like CYP2D6 are described in
**star-allele** form (`*1`, `*2`, ... `*40`) rather
than as individual SNPs. Each star allele is a
haplotype of several variants with a defined
metabolic phenotype (normal, intermediate, poor,
ultra-rapid). AGMP stores the star allele *name*;
to translate to a concrete list of SNPs, follow the
PharmGKB link in the rightmost column.
:::

### Exercise 2 -- Browse the Summary dashboard

The Summary view gives a bird's-eye view of what
AGMP currently covers.

1. From any page, click **Summary** in the top
   navigation.
2. Observe the **Data Overview** table:

   | Category | Count |
   | --- | --- |
   | Genes | 6,270 |
   | Drugs | 48 |
   | Phenotypes | 1,579 |
   | Variants | 17,470 |
   | Unique studies | 1,194 |

3. Switch between the **Graphs** tabs: Top Ten Drugs,
   Top Ten Genes, Top Ten Variants, Top Ten
   Phenotypes. Note which drugs (efavirenz,
   warfarin), genes (CYP2D6, CYP2B6), and phenotypes
   (HIV response, warfarin dosing) dominate the
   African evidence base.
4. Scroll to the **Distribution Map** (choropleth by
   study country). Most data points are from West
   and East Africa, plus African-diaspora studies
   in the USA.

![AGMP Summary dashboard with counts, graphs, and study distribution map](/images/platforms/agmp-02-summary.png)

### Exercise 3 -- Integrate with imputation output

Take a chr22 variant from your FedImpute output
(imputation dose VCF) and look it up in AGMP by
searching by **Variant** with the rsID. Most variants
will return no AGMP entry (that's expected -- AGMP is
curated, not comprehensive). When a hit does come
back, the page shows which drugs the variant has
been associated with in African populations, which
is the actionable signal for clinical interpretation.

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
