# Workshop Schedule

**Monday, 20 April 2026 · 14:45--17:45 SAST · Atlantic I, Lagoon Beach Hotel**
*(3 hours total, including a 10-min coffee break.)*

::: tip Narrative-first structure
The imputation hands-on follows a **GWAS → impute → GWAS**
loop. Participants first run GWAS on the sparse input
genotypes and see a thin, under-powered Manhattan plot.
They then submit an imputation job on FedImpute,
download the imputed output, and re-run GWAS -- and
*see* the Manhattan plot fill in. This motivates
imputation viscerally rather than mechanically.
:::

::: info Keep [`/workflow`](/workflow) open during every hands-on slot
The [Hands-on Workflow](/workflow) page lists every
step for each slot below as an explicit **Data prep ·
QC · Run · Verify** checklist. Work through those
checklists as the session progresses -- if something
breaks, back up one stage rather than pushing ahead.
:::

::: tip Note from the organiser
This schedule is a working draft. Pacing will be adjusted
on the day based on participant progress.
:::

<!-- markdownlint-disable MD013 -->

| Time | Topic | Duration |
| --- | --- | --- |
| 14:45--14:55 | Welcome, introductions, workshop overview | 10 min |
| 14:55--15:15 | **Introduction to AfriGen-D Resources and Data Discovery** (recording -- Sumir Panji / Lyndon Zass): overview of AfriGen-D resources, navigating the AfriGen-D catalogues | 20 min |
| 15:15--15:30 | Theory: African genetic diversity, reference panels, biocuration context | 15 min |
| 15:30--15:45 | Hands-on: **GWAS on SPARSE data** (baseline) -- thin Manhattan, motivate imputation | 15 min |
| 15:45--16:10 | Hands-on: Submit imputation job on FedImpute (account, upload, configure) | 25 min |
| 16:10--16:20 | Coffee break (imputation job runs in background) | 10 min |
| 16:20--16:40 | Hands-on: Download imputed results + R² quality assessment | 20 min |
| 16:40--17:05 | Hands-on: **GWAS on IMPUTED data** -- side-by-side Manhattan + QQ vs baseline | 25 min |
| 17:05--17:20 | Hands-on: AGMP -- pharmacogenomic variants | 15 min |
| 17:20--17:35 | Hands-on: AGVD -- population-specific frequencies | 15 min |
| 17:35--17:45 | Integration, discussion, Q&A, feedback | 10 min |

<!-- markdownlint-enable MD013 -->

## What to Bring

- Laptop with power adapter and a modern browser
- **AfriGen-D Identity** account ready ahead of time --
  [register here](https://dev-auth.afrigen-d.dev/if/flow/afrigend-enrollment/).
  This SSO account covers **FedImpute**.
- **AGVD account** (separate for now) --
  [register on AGVD](https://nyame.afrigen-d.org/accounts/login/).
  AGVD does **not yet** share the AfriGen-D Identity
  SSO, so it needs its own signup.
- Accounts can be created on the day, but doing both
  in advance saves time.

## Pre-recorded Intro (14:55)

The 20-minute **Introduction to AfriGen-D Resources
and Data Discovery** (Sumir Panji / Lyndon Zass) is
played as a recording. Laptops down during this slot
-- it's a one-speaker-to-room format, and the
recording plus slides are made available afterward on
this site.

## Break Logistics

- **Coffee break (16:10, 10 min):** in the main
  conference foyer -- refreshments are provided by
  the conference. The imputation job is submitted
  just before the break and completes in the
  background, so you walk back to a ready-to-
  download result.
- The room is available continuously, so you can keep
  your laptop set up during breaks.

## After the Workshop

- Materials on this site stay live beyond the conference.
- Continue with the [full tutorial](/tutorial) at your
  own pace.
- For support after the workshop, see
  [afrigen-d.org](https://afrigen-d.org) or the
  [helpdesk](https://helpdesk.afrigen-d.org).
