# SYSTEM mode

Input: design system documentation, a README, DESIGN.md, CLAUDE.md, token definitions, contribution guides, component docs.

This mode asks a different question from the other two. Not "is this screen good" but "will this document produce good screens when a human or a model follows it exactly?"

The test is adversarial. Read the document as a diligent, literal, fast contributor who will do exactly what it says and nothing it does not say. Then find where that contributor goes wrong.

## 1. The four layers

Most design systems document one layer and assume the other three. Check for each, by name.

**Layer 1: Principles.** What matters. Almost every system has these. Note them, but note also that their presence proves nothing on its own.

**Layer 2: Precedence.** Which principle wins when two collide. This is the layer that is almost always missing. Find at least two principles in the document that can conflict, for example "surface all relevant information" against "minimise cognitive load", and check whether the document says who wins. If it does not, that is a finding, and usually the most important one in the report.

**Layer 3: Prohibitions.** Outcomes that are never acceptable regardless of intent. Prohibitions are testable in a way principles are not. Check whether the document contains any statement of the form "never" or "at most" that could actually fail a build. Aspirational language is not a prohibition.

**Layer 4: Acceptance tests.** How a contributor verifies they complied, using the rendered result rather than their intentions. Check whether the document tells anyone to look at the output before declaring the work done.

Report which layers are present, which are missing, and give one concrete example of a failure the missing layer would allow.

## 2. Ambiguity audit

For each rule in the document, ask: could two competent people implement this differently and both be right?

- **Unquantified adjectives.** "Generous spacing", "clear hierarchy", "appropriate contrast", "sensible defaults". Every one of these is a decision the document declined to make. List them.
- **Undefined terms.** Words used as though they have a shared meaning that the document never defines: primary, prominent, secondary, compact, dense, subtle.
- **Rules with no failure condition.** If nothing could violate the rule, the rule is decoration.
- **Contradictions.** Two statements that cannot both be satisfied. These are the most valuable finding in this mode, because contributors resolve them silently and inconsistently.

## 3. Coverage gaps

Check whether the document addresses:

- Empty, loading, error, and partial states as a system-level requirement, not per component
- Content limits. What is the longest string each component tolerates?
- Accessibility as an architectural requirement with specific thresholds, not a closing paragraph
- Responsive behaviour and breakpoint definitions
- What to do when the system does not have what you need. This is the single most important missing section in most design systems, because in its absence everyone forks quietly
- Deprecation and migration. What happens to consumers when something changes?
- Who decides, and how a decision gets recorded

## 4. Machine readability

Increasingly the consumer of this document is a model, not a person. A model does not ask clarifying questions, does not read the room, and will comply with the letter of every instruction simultaneously.

- **Instruction density.** Is guidance stated once and clearly, or spread across prose that requires inference to assemble?
- **Examples.** Are there correct and incorrect examples, or only correct ones? A rule with no counterexample is much harder to apply.
- **Saturation risk.** If a model applied every principle in this document at full strength on one screen, what would the screen look like? Describe it. If the answer is a crowded screen, the document has a precedence problem, and this is the most useful single paragraph you can write in a `SYSTEM` review.
- **Token resolvability.** Can a value be looked up unambiguously from a name, or does it require a judgement call?

## 5. Drift signals

- Components documented but absent from the codebase, or present but undocumented
- Version numbers, screenshots, or code samples that reference something that has changed
- Multiple documents describing the same thing, which is P3 at the documentation layer
- A changelog that stops

## 6. What to lead with

Lead the report with the missing layer, not the ambiguity list. A document missing precedence will keep generating new ambiguities faster than anyone can fix the ones you found today.
