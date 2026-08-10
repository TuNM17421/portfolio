# VCareer Case Study Contract

> **Status:** Active implementation contract
> **Scope:** `src/app/[locale]/projects/vcareer/page.tsx`, VCareer project data
> and the homepage VCareer card
> **Source date:** 2026-08-10

## Screen job

Give a recruiter verifiable evidence of Nguyen Manh Tu's direct contribution to
VCareer without implying ownership of the entire product or inventing business
outcomes. The reader can inspect six real product screens, open the live product
and read the public architecture report.

## Verified facts

| Topic | Public statement allowed |
| --- | --- |
| Timeline | Development began in 05/2026. The four-person team spent six weeks from ideation and Product Owner interviews through the pilot-ready product. |
| Direct scope | Tu set up the baseline LiveKit/WebRTC path and developed the deeper CV analysis, CV-to-JD matching and JD Builder workflows. |
| Product technology | Three.js TalkingHead remains in use. Cloudflare R2 and Amazon S3 currently coexist. Production runs on Vercel; the AWS Singapore target has been built/verified but user cutover is pending. |
| Pilot | 150+ real VinUni learners tested the system. |
| User outcome | Survey feedback was qualitatively associated with higher confidence. There is no verified employment-placement uplift metric or percentage. |
| Expert review | CV evaluation/scoring was reviewed by the Product Owner from VinUni Career Services. Do not state quantified accuracy or formal validation. |
| Repository | Private because the source code is owned under the university contract. Render explanatory status text, not a repo button. |
| Public destinations | Live product: `https://topportfolio-sage.vercel.app/`. Architecture report: `https://vcareea-architecture.lovable.app/`. |
| Screenshots | All six files under `public/projects/vcareer/` are approved for public use. |

## Hackathon boundary

- VCareer entered **Track 4 — Transform with Codex** as an already-live product
  and won **2nd Prize: $5,000 in OpenAI API credits**.
- VCareer was not conceived or built from scratch during the event. Do not use
  “built in 24 hours” or equivalent language for VCareer.
- WonderLens is a separate project: **Track 1, 1st Prize**. Its result must not
  be merged into the VCareer case study or award amount.

## Evidence hierarchy

1. Product problem and current pending-funding status.
2. Three verified outcomes: 150+ learners, qualitative confidence feedback and
   expert review of CV scoring.
3. Tu's direct scope, stated before the broader system architecture.
4. Six-week delivery timeline and correct Track 4 recognition.
5. Architecture context and all six product screenshots.
6. Current product capabilities, pending roadmap and private-repo explanation.

## Current versus roadmap

Current product evidence may include live AI interview with TalkingHead,
CV analysis/improvement, CV-to-JD matching, JD Builder, interview review and the
learner dashboard.

The following are roadmap items pending university funding and must never be
presented as shipped:

- mentor meeting booking;
- learner progress tracking;
- matching candidate CVs with Career Services job postings so staff can review
  fit and candidates can discover suitable roles.

## Interaction and responsive rules

- The page has one `h1` and sequential `h2`/`h3` hierarchy.
- Live product and architecture report are 44px-minimum external actions.
- Private source is non-interactive status text.
- All six screenshots have descriptive localized alt/caption text.
- At 375 / 768 / 1024 / 1440px, both locales and themes must have no horizontal
  overflow. The narrative remains fully readable without JavaScript.

## Forbidden claims

- Production-page placeholders such as 2,000+ sessions, 1,080+ students, 4.9★
  or offer-rate testimonials.
- Any increase in job offers or placement rate.
- A $10,000 VCareer prize.
- VCareer built during the one-day hackathon.
- Completed replacement of R2 by S3.
- Ownership by Tu of every component shown in the architecture report.
