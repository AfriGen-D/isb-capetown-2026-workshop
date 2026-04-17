# Workshop Schedule

**Monday, 20 April 2026 · 14:00--18:00 SAST · Atlantic I, Lagoon Beach Hotel**

*Content targets **14:00 start, finish by 17:45**, with a 30-min break at
the 2-hour mark (16:00--16:30) and a 15-min buffer from 17:45 to 18:00.*

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
| 14:00--14:15 | Welcome, introductions, workshop overview | 15 min |
| 14:15--14:35 | **Introduction to AfriGen-D Resources and Data Discovery** (recording -- Sumir Panji / Lyndon Zass): overview of AfriGen-D resources, navigating the AfriGen-D catalogues | 20 min |
| 14:35--14:55 | Theory: African genetic diversity, reference panels, biocuration context | 20 min |
| 14:55--15:10 | Hands-on: **GWAS on SPARSE data** (baseline) -- thin Manhattan, motivate imputation | 15 min |
| 15:10--15:35 | Hands-on: Submit imputation job on FedImpute (account, upload, configure) | 25 min |
| 15:35--16:00 | Hands-on: Download imputed results + R² quality assessment (job completes during this slot) | 25 min |
| **16:00--16:30** | **Break** (30 min at the 2-hour mark -- refreshments, stretch, light conversation) | 30 min |
| 16:30--17:00 | Hands-on: **GWAS on IMPUTED data** -- side-by-side Manhattan + QQ vs baseline | 30 min |
| 17:00--17:20 | Hands-on: AGMP -- pharmacogenomic variants | 20 min |
| 17:20--17:35 | Hands-on: AGVD -- population-specific frequencies | 15 min |
| 17:35--17:45 | Integration, discussion, Q&A, feedback | 10 min |
| 17:45--18:00 | *Buffer / free Q&A / instructor available (workshop block officially runs to 18:00)* | 15 min |

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

## Pre-recorded Intro (14:15)

The 20-minute **Introduction to AfriGen-D Resources
and Data Discovery** (Sumir Panji / Lyndon Zass) is
played as a recording. Laptops down during this slot
-- it's a one-speaker-to-room format, and the
recording plus slides are made available afterward on
this site.

## Break Logistics

- **30-min break (16:00--16:30):** falls at the
  two-hour mark. Refreshments are provided by the
  conference in the main foyer. By this point
  participants have already submitted the imputation
  job, downloaded the output, and completed R² QC --
  the break gives room to digest the baseline GWAS
  and the imputed R² distributions before the
  after-break GWAS-on-imputed payoff.
- The room is available continuously, so you can keep
  your laptop set up during the break.

## After the Workshop

- Materials on this site stay live beyond the conference.
- Continue with the [full tutorial](/tutorial) at your
  own pace.
- For support after the workshop, see
  [afrigen-d.org](https://afrigen-d.org) or the
  [helpdesk](https://helpdesk.afrigen-d.org).
