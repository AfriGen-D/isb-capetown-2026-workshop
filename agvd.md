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

::: warning AGVD is in beta -- plan around manual activation
The AGVD frontend shows a banner:
"AGVD is currently in beta release and requires
**manual account activation**." Sign-ups are not
instant. For the live workshop we rely on:

- **Public search** (no login needed) -- accepts Gene,
  Variant ID, or genomic Region, returns a variant
  table with **AGVD cumulative African MAF vs
  gnomAD MAF** side-by-side.
- **Pre-approved accounts** for per-population
  breakdowns, interactive charts, and cross-dataset
  comparisons. Participants who want these during
  the workshop should register at
  <https://nyame.afrigen-d.org/accounts/login/>
  **several days in advance**, or use the
  "Continue with Google" SSO.
:::

By the end of the session, participants will be able
to:

1. Run a gene-level AGVD search and read the
   variant-by-variant AGVD-vs-gnomAD MAF columns
2. Click into a variant detail page and read the
   overview, clinical significance, transcripts, and
   functional-score panels
3. Cross-reference a variant to the 10 integrated
   external databases (dbSNP, ClinVar, Ensembl, UCSC,
   gnomAD, CADD, PubMed, Google Scholar, GeneCards,
   OMIM) in one click
4. Interpret cluster-level differences and their
   implications for variant pathogenicity

### Exercise 1 -- Gene-level lookup: BRCA1

1. Open <https://agvd.afrigen-d.org/search>.
2. Leave the release selector on **AGVD 24A Main**.
3. Type `BRCA1` and press Enter.

You should see the results page at
`/search/res?type=gene&input=BRCA1&dataset=AGVD_24A_Main`:

![AGVD BRCA1 search results with AGVD MAF vs gnomAD MAF](/images/platforms/agvd-03-brca1.png)

**5,400 variants** match. The table shows, per row:

| Column | Example |
| --- | --- |
| Variant ID | `17-43039818-G-A` (chr-pos-ref-alt, hg38) |
| RSID | `rs150356989` |
| Gene | `BRCA1` |
| **AGVD MAF** | `0.0130` |
| **gnomAD MAF** | `0.0044` |

Use the left-hand **Filters** pane to narrow by
**Population** (5 African sub-regions + 6 global) or
by an **Allele Frequency** threshold (slider with
"≤ threshold" / "≥ threshold" toggles). The top-right
**Export TSV** button dumps the current filtered
table.

::: tip Why the numbers differ
Many variants where AGVD MAF > 0.01 show gnomAD MAF
as `0.0000` or `-` (not seen). This is the clinical
signal AGVD is built to surface: a variant that is
"not seen in gnomAD" in an African patient often
**is** seen at 0.1--1% in AGVD, which changes how you
interpret it under ACMG.
:::

### Exercise 2 -- Variant detail drill-down

Click into the variant `17-43039818-G-A` (or any row
of interest). The detail page opens at
`/variant?id=...&dataset=AGVD_24A_Main`:

![AGVD variant detail page -- overview, frequencies, clinical, transcripts, functional scores](/images/platforms/agvd-04-variant-detail.png)

The page is structured as several collapsible
sections:

1. **Variant Overview** -- chromosome, position, ref,
   alt, type (SNV/indel), dbSNP ID.
2. **Population Frequencies** -- AGVD cumulative
   African MAF is public (e.g. `0.0130`); the
   per-population breakdown is gated behind login
   (you will see a **"Login Required"** card here
   unless you're signed in).
3. **Clinical Significance** -- ClinVar lookup
   ("Not found in ClinVar" for most variants; known
   pathogenic classifications when present).
4. **Gene & Transcript Information** -- ENSEMBL +
   REFSEQ transcripts, consequence annotation
   (`downstream gene variant`,
   `regulatory region variant`, etc.), biotype,
   strand.
5. **Functional Predictions and Conservation** --
   **CADD Scaled** (0--99 PHRED-like; <10 = benign),
   **CADD Raw**, **GERP++**, **PhastCons**, **PhyloP**
   with interpretive labels ("Fast evolving",
   "Not conserved", etc.).
6. **View in External Databases** -- one-click links
   to dbSNP, ClinVar, Ensembl, UCSC Genome Browser,
   gnomAD, CADD, PubMed, Google Scholar, GeneCards,
   OMIM.

### Exercise 3 -- ACMG BA1/BS1 implications

For a candidate pathogenic variant, check whether its
AGVD African MAF exceeds the ACMG **BA1** (>5%) or
**BS1** (>1%) thresholds. Does the classification
change once you use a population-appropriate
frequency? (This is the clinical motivation for
AGVD.) Try `17-43039818-G-A`: AGVD MAF is 1.30%, so
**BS1 is met** based on AGVD data but not on
gnomAD-global.

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
  required. Gene / variant / region queries run
  unauthenticated, as does the variant detail page
  with cumulative African MAF, ClinVar, transcripts,
  functional scores, and external-DB links.
- **Per-population frequency breakdowns + interactive
  charts:** require login. Sign in at
  <https://nyame.afrigen-d.org/accounts/login/> using
  an AGVD-specific account, or **Continue with
  Google**. AGVD currently uses its **own account
  system (Django allauth on nyame)** -- it does **not
  yet** share the Kibali SSO used by FedImpute, so a
  separate sign-up is required.
- **New accounts require manual activation.**
  The login screen carries the note: *"AGVD is
  currently in beta release and requires manual
  account activation."* Register well before the
  workshop if you want per-population access on the
  day.

![AGVD beta login screen with Google SSO option and manual-activation notice](/images/platforms/agvd-05-login.png)

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
