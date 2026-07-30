# Prohibitions

These are outcomes that are never acceptable regardless of intent. They run before any other check.

Each prohibition below gives the rule, how to detect it, what counts as evidence, and what does not count. Record one of exactly four values for every one: `PASS`, `FAIL`, `NOT EVALUABLE`, or `NEEDS VERIFICATION`. Never silently skip a prohibition. A skipped prohibition reported as a pass is a lie the user will act on.

`NEEDS VERIFICATION` means the input shows a likely violation but confirming it needs something you were not given. It is not a softer `FAIL`. It deducts nothing and it appears in `Not Evaluated` with the specific thing to check.

**Thresholds are defaults, not laws.** P5, P6 and P7 carry numbers a team may legitimately set differently. If the design system under review defines its own threshold, use theirs and say so. If it does not, use the default and say that instead. Never present a default as though the standard mandated it.

---

## P1. One primary action per screen

**Rule.** At most one visually dominant call to action in a viewport.

**Detect.** Count elements that read as primary: filled high contrast buttons, elements with the largest colour weight, anything the eye lands on first. Secondary and tertiary actions are fine in any number.

**Evidence.** List every competing element and where it sits.

**Not a violation.** A primary action repeated in a sticky footer for a long form, provided it is the same action. Two primaries in genuinely separate regions of a dashboard, provided the regions are visually separated and independently scoped.

**Why it matters.** Multiple primaries do not offer choice. They transfer the prioritisation work from the designer to the user, at the exact moment the user has the least context.

---

## P2. Nothing fixed may cover scrollable content

**Rule.** Fixed, sticky, or floating elements must not occlude content the user needs to read, at any viewport height.

**Detect.** In `SCREEN` mode, look for content clipped or partially hidden behind a docked panel, chat bar, cookie banner, or floating action button. In `CODE` mode, look for `position: fixed` or `sticky` without a matching padding or margin reservation on the scroll container.

**Evidence.** Name the fixed element and the content it covers.

**Why it matters.** This failure is invisible at the designer's viewport height and reliable at everyone else's. It also tends to cover the highest-stakes content, because warnings and blocked items sit at the bottom of a flow.

---

## P3. One fact, one place

**Rule.** A given piece of information appears exactly once per screen.

**Detect.** Look for the same count, status, name, or pending item rendered in a summary panel, a card, a badge, and a list. Duplication across genuinely different scopes, for example a global count and a filtered count, is not a violation if both are labelled to make the scope obvious.

**Evidence.** Name the fact and every location it appears.

**Why it matters.** Duplicated facts drift. The moment two places can disagree, the user has to work out which one to trust, and they will pick wrong at least some of the time.

---

## P4. No decision, no metric

**Rule.** Do not display activity metrics unless they support a decision the user must make right now.

**Detect.** Look for elapsed time, item counts, tokens processed, steps completed, files scanned, percentage complete on work the user cannot influence.

**Evidence.** Quote the metric and state what decision it would inform. If you cannot name one, it fails.

**Not a violation.** Progress on an operation the user might cancel. A count the user will act on, for example an unread queue they must clear.

**Why it matters.** Effort is not progress. Reporting effort makes a system look busy and makes the user feel behind.

---

## P5. Five facts maximum in a summary

**Rule.** In the default ruleset, a summary, status, or welcome-back panel carries at most five discrete facts, unless the design system under review defines another threshold.

Five is a design system policy, not a law of perception. It is here because a number you can count beats an adjective you cannot, and because in practice the panels that fail this are failing by a lot, not by one. If your system says seven, use seven and report against that.

**Detect.** Count discrete data points in the panel, not visual elements. A label and its value is one fact.

**Evidence.** List the facts you counted.

**Why it matters.** A summary that contains everything is not a summary. It is the source data moved higher up the page, and it makes the user do the summarising.

---

## P6. Contrast floors

**Rule.** Body text at 4.5:1 minimum against its actual background. Text at or above 18.66px bold, or 24px regular, at 3:1 minimum. Non-text interface elements and focus indicators at 3:1.

**Detect.** In `CODE` mode, compute the ratio from declared foreground and background values. In `SCREEN` mode, sample the pixels. If the background is a gradient, image, or semi-transparent overlay, measure the worst case region, and if you cannot sample reliably, report NOT EVALUABLE rather than estimating.

**Evidence.** The measured ratio, the two colours, and the element.

**Why it matters.** This is the most measurable rule in the set, which is exactly why it is the one an automated reviewer must never fudge.

---

## P7. Target size

**Rule.** Interactive targets at least 44 by 44 CSS pixels by default, including the tappable area, not just the visible glyph.

**Provenance, because this one is genuinely contested.** 44 by 44 is WCAG 2.1 SC 2.5.5 Target Size at level AAA, and matches the Apple Human Interface Guidelines. WCAG 2.2 SC 2.5.8 sets 24 by 24 at level AA. Android Material specifies 48dp. This ruleset defaults to 44 because it is the strictest widely adopted figure and the one most teams mean when they say "big enough to hit". If your team conforms to WCAG 2.2 AA, set the floor to 24 and say so in the report. Do not describe 44 as an AA requirement, because it is not.

**Detect.** Measure the hit area in CSS pixels, not device pixels. On a 2x render, halve your measurements and say that you did. A 20px icon with 12px of padding on every side reaches 44 and passes. A 20px icon with no padding does not.

**Evidence.** The measured dimensions, the unit, the render scale if you inferred one, and the element.

**Not a violation.** A target inside a dense data table row where the whole row is the target, provided the row itself meets the floor.

---

## P8. Icon-only controls need names

**Rule.** Any control whose visible content is an icon must have an accessible name.

**Detect.** In `CODE` mode, look for a `button` or link containing only an `svg` or icon component, with no `aria-label`, no `title`, no visually hidden text. In `SCREEN` mode, record `NEEDS VERIFICATION` and state how many icon-only controls are present. A screenshot cannot show you an accessible name. Do not report it as a confirmed failure from a screenshot alone, and do not deduct for it.

**Evidence.** The element and the missing attribute.

---

## P9. Colour alone is never the message

**Rule.** Status, validation, required fields, and category encoding must carry a second channel: text, icon, shape, or position.

**Detect.** Look for red and green status dots without labels, error states shown only by a red border, chart series distinguished only by hue, required fields marked only by colour.

**Evidence.** The element and what the colour is doing on its own.

---

## P10. Data-dependent components have three more states than they were designed with

**Rule.** A component that consumes data, or resolves asynchronously, must define empty, loading, and error.

**Scope.** This does not apply to every component. A static icon, a divider, a label, a layout primitive, or a purely presentational component has no data to be empty of. Applying it to those produces noise that buries the real cases. If you are unsure whether a component is data-dependent, ask rather than assert.

**Detect.** In `CODE` mode, look for a data-consuming component with a single render path. In `SCREEN` mode this is `NOT EVALUABLE` from one frame, unless you were given the full set. Record it in the prohibitions table as `NOT EVALUABLE`, deduct nothing, and put the specific question in `Not Evaluated`.

**Evidence.** The component and which of the three are missing.

**Why it matters.** The happy path is the one everybody designs and the one users spend the least time in when something goes wrong. Missing states do not fail quietly. They fail as a blank rectangle at the worst possible moment.
