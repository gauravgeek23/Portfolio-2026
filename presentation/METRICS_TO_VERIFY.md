# Metrics and claims to verify before the interview

Every figure in the deck comes from the brief for this presentation. The original sources it mentions (`Pasted text.txt` and the earlier PowerPoint draft) were not available, so nothing below has been checked against them. Work through this list with the original data.

Legend: **⚠ Conflict**, the figures disagree with each other. **? Confirm**, the definition, base or method is unknown. **✓ Arithmetic checks out**, but the source still needs confirming.

## Conflicts to resolve first

| # | Slide | Claim | Issue |
|---|---|---|---|
| 1 | 09 | Referral paid users are **9.38% of all paid** | ⚠ 1,274 ÷ 15,930 unique payers = **8.0%**, and 1,274 ÷ 20,152 payments = 6.3%. A 9.38% share implies a base of about 13,580. Which base is it? The slide shows 9.38% "as reported", with a footnote. |
| 2 | 07 | **14.4%** Study Buddy → NSAT paid, from **110,589** users | ⚠ 14.4% × 110,589 ≈ **15,925**, almost exactly the season's 15,930 unique payers. That would mean nearly every payer came through Study Buddy, which doesn't fit referral contributing 1,274 paid. Is the 14.4% measured on a subset (e.g. active users), or is "paid" counted differently? |
| 3 | 08 | **20,152** payments, including retries | ⚠ Your resume says "20,000+ entrance exam **registrations**". The deck treats 20,152 as payment transactions, not students. Use one label consistently. |

## Act I: growth system

| # | Slide | Claim | Check |
|---|---|---|---|
| 4 | 03 | Season Sep → Jun; discovery peak Dec → Mar | ? Confirm the months. |
| 5 | 03 | Campuses: Delhi, Pune, Bengaluru, Hyderabad | ? Confirm the list for 2025–26. |
| 6 | 04 | No design team when you joined; you built and led it; five business verticals | ? Have the five vertical names ready. The slide shows V1–V5 on purpose. Know the team size you built. |
| 7 | 05 | Brand standardised in **September 2025**; central brand portal | ? Confirm the month and that the portal existed. The slide shows the real NST logo; the other tiles are slots for your own brand assets. |
| 8 | 06 | **18 pages in 21 days** | ? Confirm. |
| 9 | 06 | Signup conversion **21.3% → 23.6%**, **+2.3 percentage points**, **98% confidence** | ? Confirm the test design (A/B or before/after), sample sizes, period and how confidence was computed. Don't restate this as "+10.8%" (the relative change) unless that's how it was reported. |
| 10 | 07 | Head Start: free courses in Python, C++, fundamentals | ? Confirm. |
| 11 | 07 | PWA users converted to NSAT payment **23% higher** | ? Relative (×1.23) or percentage points? Group sizes? Shown as an observed difference, not caused by the PWA. |
| 12 | 08 | **909,850** unique top-of-funnel acquisitions; **15,930** unique payers | ? Confirm both are de-duplicated people for the same season and scope. |
| 13 | 08 | **≈1.75%** acquisitions → payers | ✓ Derived: 15,930 ÷ 909,850 = 1.751%. Labelled as derived. |
| 14 | 09 | **3,468** referral users → **1,274** paid → **36.7%** | ✓ 1,274 ÷ 3,468 = 36.74%. Confirm the source. |
| 15 | 09 | Referral conversion **+21% YoY** | ? Relative improvement? What was last year's rate? (Not shown on the slide.) |
| 16 | 10 | Notification centre viewers converted **30% higher** | ? Relative or percentage points? Group sizes? Shown as observational. |
| 17 | 10 | Application page **33,424** unique visitors → **15,930** unique payers → **47.7%** | ✓ 15,930 ÷ 33,424 = 47.66%. Confirm that the same 15,930 unique payers all passed through the application page (the deck uses one figure for both the season and this step). |
| 18 | 11 | Product lead; senior developer + 8 engineers; ~6 marketers; content writers; academic and teaching teams | ? Confirm counts. Marketing is shown as approximate. |

## Act II: exam interface

| # | Slide | Claim | Check |
|---|---|---|---|
| 19 | 12–20, cover | The exam screenshot is the **shipped** interface | ? The only image available is the composite from your portfolio (desktop, plus two phones). It has mock-up artefacts: the left phone's background reads "JEE Mains Mock Test Mains", and the right phone shows two status bars (9:41 and 12:30). Confirm it matches what shipped, or say it's the final design. |
| 20 | 13 | Students could spend **~5–6 minutes** understanding the interface | ? How was this observed or measured? Shown as "Reported". |
| 21 | 13 | The previous interface lacked cohesion; section switching meant back-and-forth | ? No screenshots of the old interface were available. Slide 13 has an `old-exam` slot: a real screenshot there would strengthen the problem, otherwise remove the slot. |
| 22 | 15 | Dark mode to reduce perceived glare | ? Intent, not a measured result. The screenshot shows a theme toggle (sun icon) but only light mode. |
| 23 | 15 | Right-side question navigation is **collapsible** | ? The screenshot doesn't show the collapsed state; confirm the behaviour. |
| 24 | 16 | "Marked and Answered (will be considered for evaluation)" | ✓ Visible in the screenshot. |
| 25 | 17 | Backend and storage constraints; internal testing; online students contacted; revised patterns tested with a small group before wider release | ? Know roughly how many students and how they were recruited, if asked. Nothing is invented on the slide. |
| 26 | 18 | ~80% of the code implemented with Claude; ~2–3 hours of developer integration | ? Candidate-reported. Be ready to explain what the other ~20% was and what integration involved. |
| 27 | 19 | Satisfaction **3.7 → 4.2 / 5** | ? Confirm the baseline (if another source has a different baseline, use the documented one), the survey question, sample sizes for both scores, timing, and whether the same population answered both. The slide says it isn't a controlled result. |

## Other things to keep consistent

| # | Where | Note |
|---|---|---|
| 28 | Resume | The resume says "₹375+ Cr revenue impact" and "lifted conversions by up to 30%". These aren't in the deck; if asked, be ready to source them. |
| 29 | Deck typography | The deck uses Helvetica Neue (as on the site). On a Mac it renders as designed; on Windows it falls back to Arial. The PDF and PPTX have the type baked in. |
