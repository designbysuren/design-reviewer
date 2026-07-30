# CODE mode

Input: component source, JSX or TSX, HTML, CSS, Tailwind classes, styled components, token files.

Code review finds different failures than screen review. Screen review finds what looks wrong. Code review finds what will go wrong later, on somebody else's data, in somebody else's browser.

State up front what you cannot see: rendered output, computed values from cascading styles you were not given, runtime data shapes, and anything depending on a component you were not shown.

## 1. Token adherence

This is the highest value check in this mode, because every violation here is a future inconsistency that no design review will catch once it has been copied twice.

- **Hardcoded colour.** Any hex, `rgb()`, `hsl()`, or named colour appearing outside a token definition file. Report every instance with its line. Do not summarise as "several".
- **Hardcoded spacing.** Pixel or rem values that do not land on the system step. Flag anything off-grid.
- **Hardcoded type.** Font sizes, line heights, weights, and families set outside the scale.
- **Magic numbers.** Values like `top: 37px` or `width: 253px` that exist to make one case line up. These are the load-bearing hacks that break on the next content change.
- **Near-miss tokens.** A value one or two steps off an existing token is worse than a value far from one, because it looks intentional. Call these out specifically.

For each, name the token that should have been used. A finding that says "hardcoded colour" without naming the replacement makes the reader do the work twice.

## 2. Semantics and accessibility

- **Element choice.** A `div` or `span` with a click handler and no role, no `tabIndex`, no keyboard handler. This is the single most common accessibility defect in generated UI.
- **Heading order.** Levels that skip, for example h2 to h4. Multiple h1s in one view.
- **Labels.** Every input associated with a label via `htmlFor` and `id`, `aria-label`, or `aria-labelledby`. Placeholder is not a label.
- **Accessible names.** Run P8 on every icon-only control.
- **Landmarks.** Is there a `main`? Are navigation regions marked?
- **Focus.** Any `outline: none` or `focus:outline-none` without a replacement focus style. This is a blocker, not a minor.
- **Focus trapping.** Modals, drawers, and popovers that do not manage focus on open and restore it on close.
- **Live regions.** Content that updates asynchronously with no announcement, for example a results count after filtering.
- **Images.** `alt` present on every image. Decorative images with `alt=""` rather than a missing attribute or a filename.
- **Dynamic state.** `aria-expanded`, `aria-selected`, `aria-current`, `aria-invalid` on controls that have those states.

## 3. States and resilience

Run P10, then:

- **Empty.** What renders when the array is empty? A blank region is a defect, not a state.
- **Loading.** Is there a skeleton or indicator, and does it match the shape of the loaded content?
- **Error.** Is failure handled, and does the message say what to do next?
- **Long content.** Does any container assume short text? Look for fixed heights, `nowrap` without `ellipsis`, and single-line assumptions on user-supplied strings.
- **Zero and boundary values.** Does a count of zero render as `0` where it should render as an empty state? Does a value of exactly zero get treated as falsy and hidden?
- **Overflow.** Does the layout survive content that exceeds its container?

## 4. Structure and reuse

- **Uncomponentised repetition.** The same markup and class list appearing three or more times. Name every location and propose the component.
- **Variant explosion.** A component with more than roughly five boolean props controlling appearance. This usually means two or three components are wearing one costume.
- **Prop drilling of style.** Style values passed down as props instead of resolved by the component. This is how a design system stops being enforceable.
- **Inline style overrides.** `style={{}}` on a design system component. Every one of these is a place the system was insufficient. Report them, because they are the best available list of what the system is missing.
- **Local re-implementation.** A hand-rolled dropdown, tooltip, modal, or tabs where the system already ships one.

## 5. Responsive and layout

- **Fixed dimensions** on containers that hold variable content
- **Viewport assumptions**, for example `100vh` on mobile, or breakpoints that leave a gap
- **Missing padding reservation** for fixed elements, which is the code-side signature of P2
- **Horizontal overflow** from fixed widths inside constrained parents

## 6. Report format for this mode

Every finding must carry the file and line, the exact snippet, and the replacement. A code finding without a line number is not actionable, and an unactionable finding is noise that makes the actionable ones harder to find.
