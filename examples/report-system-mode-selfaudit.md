# Example output: SYSTEM mode, self-audit

The `design-reviewer` skill run against its own documentation, at v1.0.0. Abridged from the full report: the four-layer verdict, the counts, and the saturation paragraph are reproduced verbatim. Every change in v1.1.0 came from this.

---

**Reviewed:** 8 files, 566 lines, 5,654 words
**Mode:** SYSTEM (self-audit)
**Coverage:** 27 of 33 checks evaluated

| Category | Score |
|---|---|
| Accessibility | 64 |
| Hierarchy and Attention | 42 |
| System Compliance | 0 |
| Completeness of States | 15 |
| **Overall** | **0** |

## 1. The four layers

**Layer 1, Principles: PRESENT.**

**Layer 2, Precedence: PARTIAL.** Present for finding-versus-finding conflict. Absent for instruction-versus-instruction conflict, which is where this set actually breaks.

> `report-format.md` says "Every prohibition appears in this table. No exceptions, no omissions" and `SKILL.md` says "Keep the report shorter than the thing it reviewed." Reviewing a 12-line CSS file, the mandatory 10-row prohibition table alone exceeds the input. No rule resolves it, so two reviewers resolve it differently and neither is wrong.

**Layer 3, Prohibitions: PARTIAL.** Strong for the artifact under review. Absent for the reviewer's own output: 27 imperative prohibitions on reviewer behaviour are scattered across the eight files, none numbered, none checked, none surfaced in any report section.

**Layer 4, Acceptance tests: MISSING.**

> `system-review.md` defines the layer the set demands of everyone else: "Check whether the document tells anyone to look at the output before declaring the work done." That string is the only occurrence of acceptance-test language in the entire set. A search across all eight files for self-verification language returns nothing. `SKILL.md` ends at Step 6, "Write the report."
>
> Concrete failure this allows: a reviewer emits a report with an empty `Not Evaluated` section, no confidence label on any finding, a score computed by averaging rather than taking the lowest, and no line stating the score's limit. Every one of those violates a stated rule. Nothing in the set would catch it. The document that invented the phrase "check whether the document tells anyone to look at the output before declaring the work done" does not do so.

## 2. Vague terms

**55 instances in normative position.** 78 raw hits, minus 15 where the set is quoting vague words as examples of what to flag, minus 25 rhetorical, plus 17 undefined-threshold phrases no single-word scan catches.

The three expensive ones:

- **"colour weight"** is load-bearing in P1's detection procedure and defined nowhere
- **"anything the eye lands on first"** is a detection step given to a reviewer that has no eye, with no procedure substituted
- **"inferred" versus "subjective judgement"** is the boundary between medium and low confidence, worth 8 points at blocker level in the scoring table, with no calibration given for a distinction the set prices

## 3. Rules with no failure condition

**20.** The two serious ones: token adherence is called "the highest value check in this mode", and both of its primary rules are unfalsifiable unless the user volunteers a token file that nothing in the set asks for.

## 4. Internal contradictions

**14.** Selected:

**C1. Four different first sections.** `SKILL.md` says lead with prohibitions. `report-format.md` puts Scores first. `system-review.md` says lead a SYSTEM review with the missing layer. `precedence.md` says lead with blockers. A SYSTEM review satisfying all four is impossible. *I hit this contradiction writing this report.*

**C4. An illegal status value.** `prohibitions.md` instructs SCREEN mode to flag icon-only controls as NEEDS VERIFICATION. The report format permits only PASS, FAIL, NOT EVALUABLE. The value has no legal cell to sit in. Every SCREEN review containing an icon button hits this.

**C7. Stated cost against assigned weight.** `SKILL.md` calls P10 "the most expensive to skip". The scoring table makes it a major, 12 points, while target size is a blocker at 25. A component shipping with no error state scores 88 on Completeness of States. A component with a 42 pixel close button scores 75 on Accessibility. The set's own prose says the first is worse.

**C11. The scoring mechanism inverts its own stated intent.** `SKILL.md` says "a high score with three unevaluable rules is worth less than a lower score with everything checked." `scoring.md` starts at 100 and deducts, with no deduction defined for an unevaluable check. Unevaluable checks therefore raise the score. A SCREEN review where every state check is unevaluable scores exactly 100 on Completeness of States, the maximum, on zero evidence.

**C14. A denominator that matches no mode.** `scoring.md` gives the worked example "Coverage: 34 of 41 checks evaluated." No mode contains 41 checks. The number is not derivable from anything in the set.

## 5. Saturation

> The reviewer opens `SKILL.md`, then `code-review.md`, then `prohibitions.md`, and begins. Before any finding there are 3 header lines, a 6-row score table, a sentence on the score's limit, a coverage sentence, and a 10-row prohibitions table. That is 21 rows of scaffolding against a 60-line file.
>
> CODE mode contains 38 distinct evaluations, and nothing may be skipped silently, and every unrun check must be listed with a reason and a question. So all 38 produce output whether they fired or not. Each finding that fires carries seven mandatory fields. Twelve hex values become twelve findings with twelve named replacements, which `report-format.md` simultaneously demands be compressed to a pattern. The reviewer does both, badly, or picks one and violates the other silently.
>
> The output is 38 check results, 12 questions, 16 table rows, and a precedence paragraph per conflict. Somewhere between 1,800 and 2,600 words against a source file of roughly 500. It violates its own brevity rule by a factor of four, and it is the thing that rule names in the next sentence: "A review nobody finishes reading changed nothing."
>
> The diagnosis is written into the set already. `precedence.md` describes "the most common failure in generated interfaces, where every principle has been applied independently and simultaneously, so nothing has priority and the screen shows everything." Substitute report for screen and that sentence describes the output of this document set. The set built a precedence layer for findings and no precedence layer for its own instructions, so when brevity collides with completeness there is no rule and everything ships.

## 6. Coverage gaps

- **No procedure for adding a rule.** No criteria distinguishing a prohibition from a check, no numbering rule, no required sections. All ten existing prohibitions have some subset of detect / evidence / not-a-violation / why-it-matters, and none has all four.
- **No versioning, no changelog.** `system-review.md` names "a changelog that stops" as a drift signal. This set has none to stop.
- **No owner, no decision log.**
- **No "what to do when the system does not have what you need".** `system-review.md` calls this the single most important missing section in most design systems. Nothing says what to do when input matches no mode row, matches two rows, is empty, or when the user's instruction contradicts a skill rule. This is the P10 failure: the skill is a data-consuming component with a single render path.
- **The worked example is unreachable.** Both documented install paths exclude `examples/`, so an installed skill ships with zero worked examples, against the set's own rule that a rule with no counterexample is much harder to apply.
- **Accessibility thresholds underspecified while demanding specificity of others.** WCAG cited once, with no version and no conformance level. The claim that rules 6 through 9 are WCAG-derived is wrong for P7: 44 by 44 is WCAG 2.1 AAA and Apple HIG, not AA. WCAG 2.2 AA is 24 by 24. P7 states its threshold in points and works its example in pixels, a unit the set never reconciles.
- **Absent entirely.** Dark mode, RTL and non-Latin content, reduced motion, multi-screen flows, re-review and regression, and what the reviewer does when it is wrong. The repo ships a false-positive issue template; no file in the skill mentions false positives or how a user disputes a finding.

## The one thing

> Add Step 7 to `SKILL.md`: a numbered acceptance test the reviewer runs against its own finished report before returning it, and make the first line of that test the instruction-level precedence rule the set is missing, so that when completeness collides with brevity there is an answer instead of a silent choice.

---

Done in v1.1.0. See [`CHANGELOG.md`](../CHANGELOG.md) for what was fixed and what was left open.
