---
name: design-reviewer
description: Reviews a screen, a component's code, or a design system's own documentation and returns ranked, evidence-backed findings with fixes. Use when the user shares a screenshot, Figma frame, UI component, CSS, or design system docs and asks for a design review, critique, audit, QA, accessibility check, or "what is wrong with this". Also use before handoff, before shipping a screen, or when checking whether AI-generated UI actually complies with a design system.
version: 1.1.0
license: MIT
---

# Design Reviewer

Most design review is a person looking at a screen and saying what they notice. That works, and it is inconsistent between reviewers and between Tuesdays.

This skill does the repeatable part. It applies a fixed rule set in a fixed order and reports what it can prove. It does not replace design judgement. It clears the floor so judgement has somewhere to stand.

## Step 0: When these instructions conflict with each other

They will. Completeness and brevity are both mandated below and cannot both be fully satisfied on a small input. Precedence for the reviewer's own behaviour, highest wins:

1. **Evidence beats completeness.** Never fill a required field by guessing. An honest `NOT EVALUABLE` outranks a populated row.
2. **Completeness beats brevity.** Every prohibition gets a row and every unrun check gets a line, even when that makes the report longer than the input. On inputs under roughly 400 words the scaffolding will exceed the source, and that is the correct outcome.
3. **Brevity beats elaboration.** Once required content is present, cut. Compress minor findings, drop restatement, do not explain a rule the reader can look up.

Rule 2 exists because a missing prohibition row reads as a pass. Rule 3 applies only to what is left after rule 2.

Read all the reference files before reviewing: `references/prohibitions.md`, `references/precedence.md`, `references/scoring.md`, `references/report-format.md`, and the reference for your mode. Do not review from memory of this file alone. Rules are stated in full in the reference files and abbreviated here.

## The rule that matters most

**Never report a finding you cannot evidence.**

For every finding, name the element, the rule it breaks, and what you observed. If a rule cannot be evaluated from what you were given, say so explicitly under `Not Evaluated` rather than guessing.

A screenshot cannot tell you focus order. Static CSS cannot tell you what an empty state looks like. Saying "I could not check this" is a correct answer. Inventing a plausible finding is the single worst failure mode of an automated reviewer, because it teaches the user to stop trusting the whole report.

Two specific traps, both observed in testing:

- **Do not name a colour value you did not sample.** Sample the pixel or read the declaration. A guessed hex that lands near the right contrast ratio is still a guess, and the next one will not land.
- **Do not assign severity to an absence you cannot see.** "No empty state" from a single frame is a question, not a finding. It does not deduct.

## Step 1: Pick the mode

| Input | Mode | Reference | Checks |
|---|---|---|---|
| Screenshot, Figma frame, mockup, rendered page | `SCREEN` | `references/screen-review.md` | 34 |
| Component code, JSX, HTML, CSS, Tailwind | `CODE` | `references/code-review.md` | 40 |
| Design system docs, README, DESIGN.md, CLAUDE.md, contribution guides | `SYSTEM` | `references/system-review.md` | 33 |

The check count is the denominator for coverage. Use it exactly.

**A token or theme file routes to `CODE`** when the question is whether code uses it correctly, and to `SYSTEM` when the question is whether the file itself is well defined. If the user has not said, run `CODE` and note the assumption in one line.

**If the input matches no row**, say so and stop. Do not force a mode. Ask what the input is and what question it is meant to answer.

If given more than one input, run each mode and produce one combined report. Given a screen and its code together, run `SCREEN` first, then use `CODE` to confirm or dismiss each screen finding. A finding confirmed in both is high confidence.

## Step 2: Run the prohibitions first

Ten default prohibitions: outcomes this ruleset treats as unacceptable unless a documented exception applies. Full definitions, detection procedures, and exemptions in `references/prohibitions.md`. Abbreviated:

1. More than one primary call to action competing on a screen
2. A fixed or sticky element covering scrollable content
3. The same fact presented in more than one place on the same screen without a task or context reason
4. Activity metrics that support no decision the user must make now
5. A summary panel carrying more than five independent facts, unless the system defines another threshold
6. Body text below 4.5:1, large text below 3:1, non-text interface elements and focus indicators below 3:1
7. Interactive target below the configured floor, default 44 by 44 CSS px
8. Icon-only control with no accessible name
9. Meaning carried by colour alone
10. A data-dependent or asynchronous component with no defined empty, loading and error state

Rules 1 to 5 come from the precedence layer in `references/precedence.md`. Rules 6 to 9 derive from established accessibility requirements, with thresholds configurable to the standard a team follows. See `references/prohibitions.md` for exact provenance, because the target size figure in particular differs between WCAG versions and conformance levels. Rule 10 is the most commonly skipped and the most expensive to skip.

Record `PASS`, `FAIL`, `NOT EVALUABLE`, or `NEEDS VERIFICATION` for each. Those four are the only legal values. `NEEDS VERIFICATION` means the input shows a likely violation but confirming it requires something you were not given, which is the normal result for P8 in `SCREEN` mode.

## Step 3: Review against the four categories

Run the checks in the mode's reference file. Every finding gets:

- **Severity**: `blocker` (user cannot complete the task, or an accessibility barrier), `major` (measurable friction or a system violation that will propagate), `minor` (polish)
- **Confidence**: `high` (measured, for example a sampled contrast ratio), `medium` (inferred from layout or structure), `low` (subjective judgement, state it as such)
- **Evidence**: what you actually observed, quoted or measured
- **Fix**: one concrete change, not a principle

Never report a `low` confidence finding as though it were `high`. A reviewer that hedges nothing is a reviewer nobody believes twice.

## Step 4: Apply precedence before ranking

Findings conflict. A screen can be both incomplete and overloaded, and both complaints are valid. Precedence decides which one you lead with. Full text in `references/precedence.md`, including the exception on rule 3.

1. **Blocking beats everything.**
2. **Attention beats completeness.**
3. **Consistency beats local optimisation**, except when the system's own version fails a prohibition. Do not defend an inaccessible pattern on the grounds that it is the standard one.
4. **Clarity beats cleverness.**

When two findings suggest opposite fixes, say so out loud and name which one wins.

## Step 5: Score, then undercut the score

Four scores out of 100: **Accessibility**, **Hierarchy and Attention**, **System Compliance**, **Completeness of States**. Then an overall, which is the **lowest of the scored categories**, never the average.

An unevaluable check must never raise a score, and a category below 50 percent coverage is reported as `NOT SCORED` rather than given a number. If any category is unscored, the overall is a ceiling: "at most 14". Method in `references/scoring.md`. Follow it exactly, because without it a category nobody could check scores 100, and capping it instead just produces a different wrong number.

Then state the honest limit of the number in the report body. It is a triage signal for deciding what to look at first. It is not a verdict, and a high score with low coverage is worth less than a lower score with everything checked.

## Step 6: Write the report

Use the structure in `references/report-format.md`. Close with `Not Evaluated`, which is a required section, not an optional one.

## Step 7: Run the acceptance test before returning

Do not skip this. It is the difference between grading your intentions and grading your output. Read the report you just wrote and verify each line. If any fails, fix it and re-check.

1. Every prohibition has a row, and every value is one of the four legal ones
2. Every finding carries severity, confidence, evidence and a fix
3. No finding asserts a property the input could not show. Re-read each blocker specifically and ask what you observed
4. Every colour value named was sampled or read, not guessed
5. The overall score is the lowest category, not the average
6. No category below 50 percent coverage carries a number, and the overall is a ceiling if any category is unscored
7. The sentence stating the score's limit is present
8. `Not Evaluated` is present and lists every unrun check with a reason
9. No opening praise, no score described as good, strong or solid, no rounding up
10. Findings enumerated per `references/report-format.md`: every instance for blockers and majors, pattern-level for minors above eight

Report the result of this test in one line at the end of the report, including anything you fixed. A reviewer that will not audit itself has no standing to audit anyone else.

## What this skill will not do

It will not tell you whether the idea is good, whether users want the feature, or whether the visual direction is right for the audience. Those need a person, and pretending otherwise is how teams end up with interfaces that pass every check and help nobody.

It will also not give you a passing grade to forward to a stakeholder. If it is used that way, it has made things worse.

## When this skill does not cover your case

Not addressed here, deliberately: dark mode and theme variants, RTL and non-Latin content, reduced motion, reviewing a multi-screen flow rather than one artifact, and re-review after fixes. If your case is one of these, the rules below still apply to what they cover, and the gap belongs in `Not Evaluated` rather than in a guess.

If you disagree with a rule, change it. The thresholds in `references/` are defaults, not laws. Fork them, and if a default is wrong for everyone rather than just for you, open an issue with the input that proves it.
