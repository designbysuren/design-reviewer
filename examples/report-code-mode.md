# Example output: CODE mode

This is the unedited shape of a report produced by the `design-reviewer` skill against
`examples/fixture-ProjectPanel.tsx`, a component written the way generated UI usually looks.

---

## Design Review

**Reviewed:** `examples/fixture-ProjectPanel.tsx`, a single React component, 130 lines
**Mode:** CODE
**Coverage:** 41 of 47 checks evaluated

### Scores

| Category | Score |
|---|---|
| Accessibility | 0 |
| Hierarchy and Attention | 19 |
| System Compliance | 36 |
| Completeness of States | 38 |
| **Overall** | **0** |

The overall score is the lowest category, not the average, so one disqualifying category is not rescued by three merely bad ones. This number is a triage signal for what to look at first. It is not a verdict on the design, and it says nothing about whether this screen should exist.

### Prohibitions

| # | Rule | Result |
|---|---|---|
| P1 | One primary action per screen | FAIL |
| P2 | Nothing fixed may cover scrollable content | FAIL |
| P3 | One fact, one place | FAIL |
| P4 | No decision, no metric | FAIL |
| P5 | Five facts maximum in a summary | FAIL |
| P6 | Contrast floors | FAIL |
| P7 | Target size | FAIL |
| P8 | Icon-only controls need names | FAIL |
| P9 | Colour alone is never the message | PASS |
| P10 | Empty, loading and error states | FAIL |

P9 passes. The status dot at line 56 uses colour, but `project.statusLabel` renders beside it, so the meaning is carried in text as well. This looked like a violation at first pass and is not one.

### Blockers

**B1. Focus indicator removed with no replacement**
Evidence: line 80, `focus:outline-none` on the filter input with no `focus:ring` or equivalent. A keyboard user cannot see where they are.
Fix: replace with `focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`, or delete the class.
Confidence: high

**B2. Click handler on a non-interactive element**
Evidence: line 90, a `div` with `onClick={() => openTask(t.id)}`, no `role`, no `tabIndex`, no key handler. The task list is unreachable by keyboard and invisible to assistive technology.
Fix: use a `button` with `text-align: left`, or add `role="button"`, `tabIndex={0}`, and an `onKeyDown` handler for Enter and Space.
Confidence: high

**B3. Body text at 2.56:1**
Evidence: `#94a3b8` on `#ffffff` measures 2.56:1 against a 4.5:1 requirement. Used 10 times, on every summary label and every stat card label.
Fix: `#64748b` on the same background measures 4.76:1 and passes. It is already used once at line 59, so the correct value is present in the file and was not used consistently.
Confidence: high

**B4. Icon-only controls with no accessible name**
Evidence: lines 97, 100 and 103. Three buttons containing only `Download`, `Trash2` and `MoreVertical` icons. No `aria-label`, no visually hidden text. A screen reader announces three unlabelled buttons per row.
Fix: `aria-label="Download"`, `aria-label="Delete task"`, `aria-label="More actions"`.
Confidence: high

**B5. Interactive targets at 28 by 28**
Evidence: `w-7 h-7` on three buttons, and `height: "28px"` on the filter input at line 81. The floor is 44 by 44.
Fix: `w-11 h-11` on the buttons, or keep the 14px glyph and add padding to reach 44.
Confidence: high

**B6. Fixed action bar covers the end of the list**
Evidence: lines 120 to 127, `fixed bottom-0` with no compensating padding on the scroll container. The last task in the list sits underneath it and cannot be reached at any viewport height.
Fix: add `pb-24` to the outer container.
Confidence: high

**B7. No empty, loading or error state**
Evidence: line 87, `tasks.items.map(...)` is the only render path. An empty array renders an empty `ul`. A failed fetch renders nothing. A pending fetch renders nothing.
Fix: add all three. The empty state needs copy that says what to do next, not just that there is nothing here.
Confidence: high

**B8. `openTask` is not defined in this scope**
Evidence: called at line 90, never imported or declared. This throws on first click.
Fix: import it, or pass it as a prop.
Confidence: high

### Major

**M1. Two primary actions competing**
Evidence: lines 121 and 124. "Publish project" and "Invite collaborators" are visually identical, both `bg-[#6366f1]` filled with `font-semibold`. A third indigo element, the floating "New" chip at line 113, adds a competing target.
Fix: keep "Publish project" as primary, demote "Invite collaborators" to an outline button.
Confidence: high

**M2. `tasks.pending` rendered in two places**
Evidence: line 31 in the summary panel and line 70 in the stat cards. Two locations for one number.
Fix: remove it from the summary panel. The stat cards are where a user will look for counts.
Confidence: high

**M3. Activity metric supporting no decision**
Evidence: line 48, "Processed {itemsProcessed} items in {elapsed}". The user cannot act on either number and cannot influence the work they describe.
Fix: remove it. If elapsed time matters because something is stuck, show that instead, as a state rather than a statistic.
Confidence: high

**M4. Summary panel carries seven facts**
Evidence: Owner, Created, Pending, Completed, Region, Tier, Activity. The limit is five.
Fix: removing Pending and Activity, per M2 and M3, brings it to five without any further decision.
Confidence: high

**M5. Four column grid holding seven children**
Evidence: line 20, `grid-cols-4` with seven items. The second row holds three items and a gap, which reads as a missing element rather than an intentional layout.
Fix: resolves itself once the panel is down to five facts, at `grid-cols-5` or a single row.
Confidence: medium

**M6. 32 hardcoded colour values across 8 distinct colours**
Evidence: every colour in this file is a literal. `#0f172a` appears 11 times, `#94a3b8` 10 times, `#e2e8f0` 5 times.
Fix: map each to its token. This is mechanical and worth doing before the component is copied, because it will be copied.
Confidence: high

**M7. Near-miss token**
Evidence: line 113 uses `#6365f1`. Line 121 uses `#6366f1`. One digit apart, visually identical, semantically two different colours forever.
Fix: `#6366f1`. This class of defect is the strongest argument in this report for tokens, because no design review will ever catch it by eye.
Confidence: high

**M8. Off-grid spacing and a magic number**
Evidence: `padding: "13px"` at line 14, `gap: "7px"` at line 20, `top: "37px"` at line 114. None land on a 4 or 8 step.
Fix: 12 or 16, 8, and a value derived from the layout rather than measured off a screenshot.
Confidence: high

**M9. Fixed dimensions on user-supplied content**
Evidence: line 92, `height: "20px"`, `width: "260px"`, `whitespace-nowrap`, `overflow-hidden`, wrapping `t.title`. Any title longer than roughly 32 characters is truncated with no ellipsis and no tooltip.
Fix: remove the fixed width, add `truncate` with a `title` attribute, or allow two lines.
Confidence: high

**M10. Three stat cards, one component**
Evidence: lines 64 to 74 repeat identical markup three times, and lines 21 to 50 repeat a label and value pair seven times.
Fix: `StatCard` and `SummaryField`. Ten call sites become two components.
Confidence: high

**M11. Absolutely positioned child with no positioned ancestor**
Evidence: line 113, `absolute` inside a container with no `relative`. This will position against the nearest positioned ancestor, which is probably not the one intended.
Fix: add `relative` to the outer container, or reconsider whether this element needs to float at all.
Confidence: medium

**M12. Heading level skipped**
Evidence: `h1` at line 15, `h3` at line 17, no `h2`.
Fix: `h2`.
Confidence: high

**M13. Input labelled only by placeholder**
Evidence: line 82, placeholder "Filter tasks", no `label`, no `id`, no `aria-label`. The label disappears the moment the user types.
Fix: a visible label, or `aria-label="Filter tasks"` at minimum.
Confidence: high

### Minor

**m1.** Inline `style` objects used in six places where a class would do. Each is a place the system was bypassed.
**m2.** `text-[#0f172a]` repeated on eleven elements that could inherit from a parent.
**m3.** No `key` stability concern, but `t.id` assumes uniqueness that is not enforced here.

### Conflicts

M4 says remove facts from the summary. A reviewer could reasonably argue the opposite, that Region and Tier are important context and Activity proves the system is working.

Under precedence, attention beats completeness. The summary is where a returning user orients, and seven facts means they have to read seven things to find the one that matters. Region and Tier belong in a details view. Nothing is lost that a click cannot recover.

### Not Evaluated

Six checks could not be run from this file alone:

- Rendered contrast where text sits over imagery. No imagery in this file, but `project` fields are unknown.
- Focus order and focus restoration. Requires the rendered DOM.
- Hover, active and disabled states. Not defined in this file.
- Responsive behaviour. No breakpoints present, which is itself worth a question below.
- Motion and transitions. None declared.
- Whether the tokens named in the fixes above actually exist in this system. The token file was not provided.

Questions, each answerable in a sentence:

> What is the longest project name and task title this can receive?
> Does the system already define a `StatCard`, and if so why was this one written by hand?
> Is there a breakpoint story for the four column grid, or is this desktop only?
> What should the empty state say?

### The one thing

Fix B2. The task list is the only thing on this screen a user came here to do, and right now it can only be reached with a mouse.
