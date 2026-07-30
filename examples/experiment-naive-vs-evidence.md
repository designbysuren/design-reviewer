# Experiment: a naive rule list against the evidence contract

Two reviewers. One screenshot. Nothing else.

## Method

`fixture-ProjectPanel.html` was rendered headless at a 900 px viewport, 2x scale, producing `fixture-screenshot.png`. Both reviewers received that image as their only input and were told so explicitly.

**Reviewer A, naive.** A list of 40 good design rules across five categories, written the way you would write them for a person. Report every violation, give a severity, score each category out of 100. No evidence contract, no prohibitions, no `Not Evaluated` section, no instruction about what a screenshot can and cannot show.

**Reviewer B, the skill.** The eight files in `skills/design-reviewer/`, run in `SCREEN` mode.

Both were run in isolation. An earlier attempt at reviewer A had to be discarded: the agent found the skill files on disk and read them, and its report came back carrying the prohibitions table and the evidence contract it was never given. The clean run confined the input to `/tmp`.

## Headline result

Reviewer A was not worse at finding real problems. Its three headline findings were competing primary actions, task titles clipped mid-word, and a fixed footer sitting on top of the task list. All three are real. All three are in reviewer B's report too.

The difference is not the hit rate. It is that reviewer A's report gives you no way to tell which of its 60 findings it actually saw.

## Counts

| | Reviewer A, naive | Reviewer B, skill |
|---|---|---|
| Findings | 60 | 23 |
| Marked as unverifiable | 4 | every finding carries a confidence label |
| Dedicated section for unrun checks | none | 10 checks listed with reasons |
| Findings asserting something the image could not show | 23 | 0 |
| Colour values named | 1, guessed | 7, all sampled |
| Verifiably wrong when checked against source | 2 | 0 |
| Overall score | 40 | 14 |
| Scoring method | weighted toward two categories | lowest category |

## The two wrong ones

**A11Y-3.** Reviewer A: *"Placeholder text fails contrast and is the only label."* Severity Critical.

The placeholder is `#757575` on white, which measures **4.61:1**. It passes. The second half of the finding, that a placeholder is not a label, is correct and reviewer B found it too. The contrast half was invented and carried the Critical rating.

**A11Y-8.** Reviewer A: *"White on the indigo fill measures approximately 4.3:1 to 4.5:1 [on the New button]... The two footer buttons use larger bold text and are more likely to pass."*

Exactly inverted. The "New" button is `#6365F1`, measuring **4.504:1**, which passes. The footer buttons are `#6366F1`, measuring **4.467:1**, which fails. Reviewer A cleared the failing element and flagged the passing one, in the same sentence, with a hedge that made both sound considered.

It could not have got this right, because it never sampled a pixel. Its one named colour value, `#9CA3AF` in A11Y-1, is not on the screen at all. The actual value is `#94A3B8`. The guess happened to land near the right contrast ratio, which is the worst possible outcome, because it validates the method.

## The 23

Twenty-three of reviewer A's 60 findings assert a property a static image cannot carry, without marking it as inference, and every one of them fed a category score:

- Heading structure, list semantics, page landmarks, image alternative text: 4 findings, three rated High
- Empty, loading, error, zero and boundary states, and the contents of an overflow menu it never opened: 6 findings
- Design system compliance: all 10 findings, from a picture, with no token file supplied
- Counter cards "do not look interactive", responsive behaviour "appears unconsidered", zoom and reflow "at high risk": 3 findings, two rated High

The clearest single case is the score. Reviewer A rated **States and resilience 28 out of 100**, its lowest category, on a frame showing exactly one state. Two of the eleven findings in that category were observable. The other nine described states that were not in the image.

Reviewer B scored the same category **88**, and immediately undercut it: *"Coverage is 71 percent, below the 80 percent threshold, so treat System Compliance and Completeness of States as provisional: they scored high partly because a screenshot cannot test most of what they cover."*

Both numbers are wrong in isolation. Only one of them tells you it might be.

That comparison produced the scoring change in v1.1.0. Deducting only for observed failures means a category nobody could check drifts toward 100, which inverts the file's own claim that a high score with low coverage is worth less.

The first fix was a coverage cap, turning 88 into 25. That was also wrong: it collapses two separate facts, how good the thing is and how much of it you could see, so 25 reads as "this is bad" when the truth is "this is mostly unknown". Below 50 percent coverage a category is now not scored at all, and the overall becomes a ceiling:

```
Completeness of States:  NOT SCORED (2 of 8 checks evaluable from a static frame)
Overall:                 at most 14
```

## What reviewer B got wrong

It is not clean.

In minor m2 it reported white on `#6366F1` as "4.50:1, exactly at the floor with no margin". The measured value is **4.467:1**, which is a failure, not a near miss. It rounded up, which `scoring.md` explicitly forbids, and rounding up converted a blocker into a minor. Reviewer A, for all its guessing, got this number right.

It also reported the overall as 14 while capping nothing, and it constructed a coverage denominator of 34 that the skill did not define anywhere. Both are fixed in v1.1.0.

## The point

Reviewer A produced a longer, more confident, better organised report, and scored the screen 40 out of 100, which reads as "needs work". Reviewer B scored it 14, which reads as "do not ship this".

The screen has five blocking accessibility failures. Reviewer A found most of them, buried among nine invented state findings, in a category score built on things it never saw, with a passing element flagged and a failing one cleared.

You cannot tell which of those it measured. That is the whole problem, and it does not get better by adding rules.
