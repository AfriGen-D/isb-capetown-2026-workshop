# AfriGen-D Tutorial -- ISB Cape Town 2026

Tutorial materials for **"Genotype Imputation and
Data Analysis for African Populations: A Hands-on
Tutorial Using AfriGen-D's Curated African Genomic
Resources"**, held at the 19th Annual International
Biocuration Conference, Atlantic I, Lagoon Beach
Hotel, Cape Town -- Monday 20 April 2026, 14:00--18:00 (content to 17:45)
SAST.

**View Tutorial Online:** <https://afrigen-d.github.io/isb-capetown-2026-workshop/>

## Overview

This site is a VitePress-based tutorial covering three
AfriGen-D resources:

- **FedImpute** -- Federated Genotype Imputation
  Platform. GA4GH-native (Beacon, DRS, WES,
  Passport). African-led, African-hosted on the ILIFU
  research cloud at UCT; routes jobs to the H3Africa
  panel backend with further federated African nodes
  to follow. (Michigan and TOPMed imputation servers
  are separate, non-federated services.)
  <https://fedimpute.afrigen-d.org>
- **AGMP** -- African Genomic Medicine Portal.
  17,470 curated variants across 6,270 genes, 48
  drugs, 1,579 phenotypes, 1,194 studies.
  <https://agmp.afrigen-d.org>
- **AGVD** -- African Genome Variation Database.
  Allele frequencies across 11 population clusters
  (five African regions plus global comparators).
  <https://agvd.afrigen-d.org>

## Contents

- `index.md` -- home (hero + three feature cards)
- `tutorial.md` -- the long-form imputation tutorial
  (section 0 covers FedImpute; sections 2--11 are a
  step-by-step walkthrough inherited from the 2025
  short course and are being re-captured against
  FedImpute)
- `agmp.md` -- AGMP session (portal overview +
  hands-on scaffold)
- `agvd.md` -- AGVD session (portal overview +
  hands-on scaffold)
- `schedule.md` -- 14:00--17:45 agenda (15-min
  buffer to 18:00)
- `venue.md` -- Lagoon Beach Hotel Conference Centre
  + travel notes
- `public/data/` -- sample VCF (chr22, hg38, 661
  samples, ~4,400 variants) and phenotype file for
  GWAS
- `public/images/` -- tutorial UI screenshots
- `public/images/platforms/` -- landing pages for
  FedImpute, AGMP, AGVD

## Development

```bash
npm install
npm run docs:dev       # local preview at http://localhost:5173
npm run docs:build     # produces .vitepress/dist
npm run docs:preview   # preview the built site
```

The site auto-deploys to GitHub Pages via
`.github/workflows/pages.yml` on every push to `main`.

## Accounts

- **AfriGen-D Identity** (SSO):
  [register](https://kibali.afrigen-d.org/if/flow/afrigend-enrollment/)
  -- this SSO account covers **FedImpute**. AGVD
  currently requires a separate signup at
  <https://nyame.afrigen-d.org/accounts/login/>.
- **AGMP** currently requires no account for search.

## Support

- Documentation: <https://afrigen-d.org>
- Help Desk: <https://helpdesk.afrigen-d.org>
- Email: <support@bioinformaticsinstitute.africa>

## License

Materials are provided for educational purposes as
part of the AfriGen-D training programme and the 19th
Annual International Biocuration Conference.
