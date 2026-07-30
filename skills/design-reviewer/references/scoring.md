# Scoring

The score exists to answer one question: what should I look at first. It is a triage signal. It is not a grade, not a verdict, and not something to forward to a stakeholder as evidence that the design is fine.

Every report must state that limit. A number that pretends to more authority than it has is how automated review loses its audience, usually right after the first time it passes something that was obviously broken.

## The four categories

Each is scored 0 to 100, starting at 100 and deducting.

**Accessibility.** P6 through P9, plus the accessibility checks in the mode reference.
**Hierarchy and Attention.** P1 through P5, plus type scale, entry point, density, whitespace rhythm.
**System Compliance.** Token adherence, component drift, uncomponentised repetition, inline overrides.
**Completeness of States.** P10, plus long content, boundary values, overflow, error handling.

## Deductions

| Severity | Confidence high | Confidence medium | Confidence low |
|---|---|---|---|
| Blocker | 25 | 18 | 10 |
| Major | 12 | 8 | 4 |
| Minor | 4 | 3 | 1 |

A failed prohibition is always at least a major, and P2, P6, P7, P8 and P9 failures are blockers.

Floor each category at 0. Do not go negative, and do not let one catastrophic category be rescued by three clean ones.

## Overall

The overall score is the **lowest** of the scored categories, never the average.

This is deliberate. An interface with excellent hierarchy and a keyboard trap is not a 75. Averaging lets a strong category hide a disqualifying one, which is precisely the failure that makes dashboards stay green while defects ship.

**If any category is NOT SCORED, report the overall as a ceiling, not a value:**

> Overall: at most 14 (Completeness of States not scored)

An unscored category can only lower it. Writing a bare 14 would claim knowledge of something nobody checked.

## Coverage

Report coverage alongside the score, as a plain count. The denominator is the check count for the mode, given in the Step 1 table of `SKILL.md`: 34 for `SCREEN`, 40 for `CODE`, 33 for `SYSTEM`.

> Coverage: 24 of 34 checks evaluated. 10 not evaluable from a static screenshot.

**An unevaluable check must never raise a score.** Deducting only for observed failures means a category nobody could check scores 100, which is the exact opposite of what this file is for.

The obvious fix is to cap each category at its coverage percentage. Do not do that. It replaces one wrong number with a different wrong number, because it collapses two separate facts into one: how good the thing is, and how much of it you could see. A category capped at 25 reads as "this is bad" when the truth is "this is mostly unknown", and a reader acting on that number acts wrongly in a new direction.

**Below 50 percent coverage, a category is not scored at all.**

> Completeness of States: NOT SCORED (2 of 8 checks evaluable from a static frame)

That is the honest output, and it is the same rule the rest of this skill runs on. A reviewer told to say "I could not check this" about a finding does not get an exemption when the output is a number.

At or above 50 percent, score normally and report coverage beside it. Do not cap, and do not soften. The coverage figure carries that information without corrupting the score.

A score of 88 with 24 of 34 checks run is a weaker result than a 71 with all 34 run. Say that in the report when coverage is below 80 percent. Use 80 exactly, not "roughly 80". The user should never read a high score without immediately seeing how much of the surface it actually covered.

## What not to do

Do not round up. Do not soften a category score because the overall looks harsh. Do not add a category to raise the average. Do not describe a score as good, strong, or solid. Report the number, report the coverage, and let the findings carry the argument.
