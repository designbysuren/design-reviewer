# Report format

Use this structure exactly. Keep the report shorter than the thing it reviewed.

---

## Design Review

**Reviewed:** what you were given, in one line
**Mode:** SCREEN, CODE, SYSTEM, or a combination
**Coverage:** N of M checks evaluated

### Scores

| Category | Score |
|---|---|
| Accessibility | N |
| Hierarchy and Attention | N |
| System Compliance | N |
| Completeness of States | N |
| **Overall** | **N** |

One sentence stating the limit of the score, and if coverage is below 80 percent, one sentence saying so.

### Prohibitions

| # | Rule | Result |
|---|---|---|
| P1 | One primary action per screen | PASS / FAIL / NOT EVALUABLE / NEEDS VERIFICATION |
| ... | | |

Every prohibition appears in this table. No exceptions, no omissions. Those four are the only legal values. This table exceeding the length of a small input is the correct outcome, per Step 0 of `SKILL.md`: a missing row reads as a pass.

### Blockers

For each, in precedence order:

**B1. One line naming the defect**
Evidence: what you observed or measured.
Fix: one concrete change.
Confidence: high, medium, or low.

If there are none, write "None found" and then, on the next line, note how many of the blocker-level checks were actually evaluable. "None found" from a review that could only check half the rules is a misleading sentence on its own.

### Major

Same structure, numbered M1, M2. Ranked by precedence, not by category.

### Minor

Same structure, numbered m1, m2. Compress these. One line each, and above eight, list the pattern with a count and the first three locations rather than every instance.

Enumeration rule, which resolves the conflict between "report every instance" and "compress": **blockers and majors enumerate in full, minors compress above eight.** A blocker with twelve instances gets twelve locations, because each is a fix. Twelve minor spacing near-misses get one line naming the pattern and a count.

### Conflicts

Any two findings that suggest opposite fixes. State both, then state which wins under precedence and why. Omit this section if there are none.

### Not Evaluated

Required section. Never omit it, never leave it empty without saying why.

List every check you could not run and the reason. Then list the questions you would need answered, phrased so each can be answered in a sentence:

> What renders here when the list is empty?
> What is the longest project name this can receive?

### The one thing

Close with a single sentence naming the change that would move the most. Not a summary of the report. One change.

### Acceptance test

One line, required, last. State that the Step 7 test in `SKILL.md` was run and name anything it caught and you fixed. If it caught nothing, say that.

> Acceptance test run. Caught two findings asserting DOM properties not visible in the input; both moved to Not Evaluated.

---

## Tone

Direct, specific, and unhedged about facts. Hedged, explicitly, about judgement.

Write "the contrast ratio is 3.1:1 against a 4.5:1 requirement", not "contrast could be improved". Write "this is a judgement call and I could be wrong" when it is one.

Never open with praise before criticism. The person asked for a review, and a warm-up paragraph delays the part they need. If something genuinely works and the reader should not change it, say so in the relevant finding, where it is useful, rather than at the top, where it is padding.
