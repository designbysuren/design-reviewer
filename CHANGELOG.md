# Changelog

## 1.1.0

Every change in this release came from running `SYSTEM` mode on this skill's own documentation. The self-audit scored it **0 overall** and found the fourth layer, acceptance tests, entirely missing from the thing that demands acceptance tests of everyone else.

The full self-audit output is in [`examples/report-system-mode-selfaudit.md`](examples/report-system-mode-selfaudit.md).

### Added

- **Step 7, the acceptance test.** A ten-point check the reviewer runs against its own finished report before returning it. The audit's finding: nothing in the skill told the reviewer to look at its own output, so a report could ship with an empty `Not Evaluated`, an averaged score, and no confidence labels, violating three stated rules, and nothing would catch it.
- **Step 0, instruction-level precedence.** The skill had precedence for findings and none for its own instructions. `report-format.md` mandated a full prohibitions table; `SKILL.md` mandated a report shorter than its input. On a 12-line CSS file both cannot hold. Evidence now beats completeness, completeness beats brevity, brevity beats elaboration.
- **`NEEDS VERIFICATION`** as a fourth legal prohibition value. `prohibitions.md` instructed SCREEN mode to use it while the report format permitted only three values, so it had no legal cell to sit in. Every SCREEN review with an icon button hit this.
- **Unscored categories.** An unevaluable check deducted nothing, so a category nobody could check scored 100. That is the exact inversion of the file's own claim that a high score with low coverage is worth less.

  The first fix was a coverage cap, capping each category at its evaluated percentage. That was wrong, and a reviewer of the draft article caught it: it collapses two separate facts into one number, so a category capped at 25 reads as "this is bad" when the truth is "this is mostly unknown". Below 50 percent coverage a category is now `NOT SCORED`, and if any category is unscored the overall is reported as a ceiling ("at most 14") rather than a value. A skill built to say "I could not check this" does not get an exemption when the output is a number.
- **Explicit check counts per mode**, 34 / 40 / 33. `scoring.md` had used a worked example of "34 of 41" and no mode contained 41 checks.
- **A "when this does not cover your case" section**, naming dark mode, RTL, reduced motion, multi-screen flows and re-review as deliberate gaps. `system-review.md` calls this the single most important missing section in most design systems, and it was missing here.
- **A version field** and this changelog. `system-review.md` names a stopped changelog as a drift signal. There was none to stop.

### Changed

- **P7 target size** now states its provenance honestly. 44 by 44 is WCAG 2.1 AAA and Apple HIG; WCAG 2.2 AA is 24 by 24; Material is 48dp. The previous text called it WCAG-derived without qualification, which was wrong at AA. The floor is now configurable and the unit is CSS pixels, with an instruction to halve device measurements on a 2x render and say so.
- **P10 scoped to data-dependent and asynchronous components.** It previously applied to every component, which would flag a divider for having no error state.
- **P5 reframed as a default policy** rather than a universal truth. Five is a design system decision. If your system says seven, the reviewer now uses seven.
- **P8 no longer deducts in SCREEN mode.** A screenshot cannot show an accessible name.
- **Enumeration conflict resolved.** `code-review.md` said report every instance; `report-format.md` said compress above eight. Now: blockers and majors enumerate in full, minors compress above eight.
- **Token file routing tie-break.** A `tokens.json` matched both the CODE and SYSTEM rows with no resolution.
- **P6 restored in full in `SKILL.md`**, which had dropped the 3:1 non-text and focus indicator clause present in `prohibitions.md`, so a reviewer working from the summary would report P6 as passing without checking focus indicators.
- **Precedence rule 3 restored in full in `SKILL.md`**, which had dropped the exception that consistency loses to a prohibition. Without it, a reviewer defends an inaccessible pattern on the grounds that it is the standard one.
- **Two anti-guessing rules added** to the evidence section, both from observed failures in testing: do not name a colour you did not sample, and do not assign severity to an absence you cannot see.
- **"The mechanical 80 percent" removed.** It was never measured.
- **"Roughly 80 percent" coverage threshold** fixed to 80 percent exactly, since two files gave different precisions for the same threshold.

### Known and not fixed

- The audit counted 55 unquantified terms in normative position and 20 rules with no failure condition. The worst of both are fixed above. The rest are open. "Colour weight" in P1's detection procedure is still undefined and is still load-bearing.
- There is still no procedure for adding a rule, no owner, and no decision log.
- `examples/` is still excluded from the packaged `.skill` bundle, so an installed skill ships with no worked example.

## 1.0.0

Initial release. Three modes, ten prohibitions, four-layer model, evidence contract.
