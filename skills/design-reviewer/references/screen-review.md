# SCREEN mode

Input: a screenshot, a Figma frame, a mockup, a rendered page.

Before you start, state what you can and cannot see. A static image gives you layout, colour, size, and copy. It does not give you focus order, hover and focus states, accessible names, keyboard behaviour, motion, responsive behaviour, or any state other than the one captured. Everything in that second list goes in `Not Evaluated` unless you were given more.

## 1. The five second test

Look at the image once and write down, before analysing anything:

- What is this screen for, in one sentence
- What is the one action it wants me to take
- What did my eye land on first

If you cannot answer the first two from the image alone, that is the headline finding, and it outranks every spacing issue on the screen.

If what your eye landed on is not the one action the screen wants, the visual hierarchy is inverted. Say so plainly and name both elements.

## 2. Hierarchy and attention

- **Competing actions.** Count primary-weight elements. See P1.
- **Entry point.** Is there a clear first thing to read? A screen where four regions have equal visual weight has no entry point.
- **Type scale.** Count distinct font sizes. More than six on one screen usually means the scale is decorative rather than structural. Count distinct weights separately.
- **Density.** Is any region carrying more than roughly nine discrete elements with no grouping? Grouping means whitespace, a container, or a divider, not just proximity.
- **Whitespace rhythm.** Are gaps between unrelated groups larger than gaps within groups? When inner and outer spacing are equal, grouping reads as accidental.
- **Content ratio.** Estimate the share of the screen given to chrome, navigation, and decoration versus the actual content. If chrome wins, say so.

## 3. Accessibility

Run P6 through P9. Then:

- **Text over imagery.** Sample the worst case region, not the average.
- **Placeholder as label.** A field whose only label is placeholder text loses its label the moment the user types.
- **Link identification.** Are links distinguishable from body text without relying on colour alone?
- **Text in images.** Flag any meaningful text baked into a raster image.
- **Motion and autoplay.** If visible, flag anything that moves without a control to stop it.

Mark anything you inferred rather than measured as `medium` confidence. Contrast you actually sampled is `high`.

## 4. Consistency

- **Spacing grid.** Measure gaps. Do they land on a consistent step, usually 4 or 8? List the values that do not.
- **Corner radii, borders, shadows.** Count distinct values. Three shadow styles on one screen is a system problem, not a taste problem.
- **Colour count.** Count distinct colours excluding imagery. Report any that look one or two steps off a neighbouring value, which usually means a hardcoded value rather than a token.
- **Component drift.** Are there two elements doing the same job that look different? Name both.
- **Alignment.** Look for elements off a shared edge by a small amount. Small misalignment reads as sloppiness even when the viewer cannot name what is wrong.

## 5. Copy and labels

- Are button labels verbs describing the outcome, or vague ones like Submit, OK, Continue?
- Do error messages say what happened and what to do next, or only that something failed?
- Is any label longer than it needs to be, or written from the system's point of view rather than the user's?

## 6. What is missing

Ask what a real user brings that this frame does not account for:

- The longest realistic name, title, or value. What breaks?
- Zero items. One item. Two hundred items.
- A user arriving here interrupted, with no memory of what they were doing
- A slow connection, so the content arrives in pieces
- A failure in the primary action

You cannot verify these from one frame. Report them as questions in `Not Evaluated`, phrased so the designer can answer them in a sentence. Do not report them as failures.
