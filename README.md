# design-reviewer

**Evidence-bounded design review. The input limits the claim.**

A portable skill that reviews **a screen, a component's code, or a design system's own documentation** and returns ranked, evidence-backed findings with fixes.

It does the repeatable part of design review. It does not replace design judgement. It clears the floor so judgement has somewhere to stand.

```
Coverage: 41 of 47 checks evaluated

| Accessibility            |  0 |
| Hierarchy and Attention  | 19 |
| System Compliance        | 36 |
| Completeness of States   | 38 |
| Overall                  |  0 |
```

A category below 50% coverage is not scored at all, and the overall is then reported
as a ceiling ("at most 14") rather than a value. A tool built to say "I could not
check this" does not get an exemption when the output is a number.

That is real output, against [a component](examples/fixture-ProjectPanel.tsx) written the way generated UI usually looks. The [full report is here](examples/report-code-mode.md).

**Two experiments are in this repo, both reproducible:**

- [**A naive 40-rule reviewer against the evidence contract**](examples/experiment-naive-vs-evidence.md). Same screenshot, nothing else, to both. The naive one produced 60 findings, 23 of which assert properties a static image cannot carry, 2 of which are verifiably wrong. It scored the screen 40. This one scored it 14.
- [**The skill audited by itself**](examples/report-system-mode-selfaudit.md). It scored **0**, found the acceptance-test layer missing from the tool built to be the acceptance-test layer, and produced 14 internal contradictions. Everything in [v1.1.0](CHANGELOG.md) came from that report.

---

## Why this exists

Design systems document **principles**. Principles conflict, and a document that lists them without saying which one wins has decided nothing. Every contributor, human or model, resolves those conflicts differently and silently.

This skill is built on four layers instead of one:

| Layer | What it does | Where it lives |
|---|---|---|
| **Principles** | Describe what matters | Your design system |
| **Precedence** | Decide which principle wins in a conflict | [`precedence.md`](skills/design-reviewer/references/precedence.md) |
| **Prohibitions** | Outcomes never acceptable regardless of intent | [`prohibitions.md`](skills/design-reviewer/references/prohibitions.md) |
| **Acceptance tests** | Verify the rendered result, not the intention | [`report-format.md`](skills/design-reviewer/references/report-format.md) |

Most teams write only the first row. The other three are what make a review reproducible.

---

## The rule that matters most

**Never report a finding you cannot evidence.**

A screenshot cannot tell you focus order. Static CSS cannot tell you what an empty state looks like. So every report ends with a required `Not Evaluated` section listing what could not be checked and why.

An automated reviewer that invents plausible findings teaches you to stop trusting the whole report. Saying "I could not check this" is a correct answer.

The scoring follows the same logic. The overall is the **lowest scored** category, never the average, because an interface with excellent hierarchy and a keyboard trap is not a 75. Averaging is how dashboards stay green while defects ship.

And a category the input could not cover is not scored at all, rather than capped or quietly left near 100. Capping produces a different wrong number: it collapses how good the thing is with how much of it you could see.

---

## The ten prohibitions

Ten defaults, checked before anything else: outcomes this ruleset treats as unacceptable unless a documented exception applies. Each returns `PASS`, `FAIL`, `NOT EVALUABLE` or `NEEDS VERIFICATION`, with evidence.

1. More than one primary call to action competing on a screen
2. A fixed or sticky element covering scrollable content
3. The same fact presented in more than one place without a task or context reason
4. Activity metrics that support no decision the user must make now
5. A summary panel carrying more than five independent facts, unless the system defines another threshold
6. Body text below 4.5:1, large text below 3:1, non-text elements and focus indicators below 3:1
7. Interactive target below the configured floor, default 44 by 44 CSS px
8. Icon-only control with no accessible name
9. Meaning carried by colour alone
10. A data-dependent or asynchronous component with no defined empty, loading and error state

Rules 1 to 5 are the kind of constraint most teams meet as review feedback rather than as explicit, testable policy. Rules 6 to 9 derive from accessibility standards, with thresholds configurable: 44 by 44 is WCAG 2.1 AAA and Apple HIG, while WCAG 2.2 AA is 24 by 24 and Material is 48dp, so calling 44 an AA requirement would be wrong. Rule 10 is the most commonly skipped and the most expensive to skip.

**The verdict depends on what you hand it.** P8 returns `NEEDS VERIFICATION` from a screenshot, because an image cannot show an accessible name, and `FAIL` from code, where the name and its source are observable. P10 returns `NOT EVALUABLE` from one frame, because absence from the supplied evidence is not evidence of absence. Same requirement, different verdicts. That is the whole design.

---

## Install

**Claude Code**

```bash
git clone https://github.com/designbysuren/design-reviewer.git
cp -r design-reviewer/skills/design-reviewer ~/.claude/skills/
```

Or for a single project, copy it to `.claude/skills/` in the repo root.

**Claude desktop and Cowork**

Download [`design-reviewer.skill`](design-reviewer.skill) and add it through the skills interface.

**Anything else that reads a folder of markdown**

The skill is plain markdown with a YAML header. Point your tool at `skills/design-reviewer/` and it will work, or paste `SKILL.md` into a system prompt and get most of the value.

---

## Use

Share a screenshot, paste a component, or point it at your docs.

```
Review this screen.
Review this component against our design system.
Audit our DESIGN.md. Would a model following it exactly produce a good screen?
```

It picks the mode automatically:

| Input | Mode |
|---|---|
| Screenshot, Figma frame, mockup | `SCREEN` |
| JSX, HTML, CSS, Tailwind, tokens | `CODE` |
| Design system docs, README, DESIGN.md, CLAUDE.md | `SYSTEM` |

Give it a screen **and** its code together and it runs both, then uses the code to confirm or dismiss each screen finding. Findings confirmed in both are high confidence.

---

## SYSTEM mode is the interesting one

The other two modes review output. `SYSTEM` mode reviews the thing that produces the output, and asks what behaviour that document will produce when somebody follows it exactly. For a design system that output is a screen. For a review skill, as it turned out, it is a report.

It reads your design system documentation adversarially, as a diligent contributor who will do exactly what it says and nothing it does not say. Then it reports where that contributor goes wrong.

The most useful thing it produces is a single paragraph answering this:

> If a model applied every instruction in this document at full strength, what would the result look like?

If the answer is crowded, your document has a precedence problem, and no amount of additional principles will fix it. That is how this skill scored itself 0. See [the self-audit](examples/report-system-mode-selfaudit.md).

---

## What it will not do

It will not tell you whether the idea is good, whether users want the feature, or whether the visual direction is right for the audience. Those need a person.

It will also not give you a passing grade to forward to a stakeholder. If it gets used that way, it has made things worse.

---

## Contributing

The rules are opinionated on purpose. If you disagree with one, that is worth a discussion, and the discussion is more valuable than the rule.

Useful contributions, roughly in order:

- A false positive, with the input that caused it
- A defect it missed, with the input
- A prohibition you think is wrong, with your reasoning
- Framework-specific checks, for example Vue, Swift, Compose
- Your own precedence order, if it differs. There is more than one defensible answer

Open an issue with the actual input attached. A bug report without the input that produced it cannot be fixed.

---

## Changelog

[CHANGELOG.md](CHANGELOG.md). Current version 1.1.0, which exists entirely because the skill failed its own audit. That file also lists what the audit found and was *not* fixed, which is the more useful half.

## Prior work

This grew out of an experiment on why an AI agent given a complete set of design principles still produced an unusable screen: [I Asked Claude to Fix Its Own UX Using CLAUDE.md and DESIGN.md. It Failed.](https://www.designsystemscollective.com/i-asked-claude-to-fix-its-own-ux-using-claude-md-and-design-md-it-failed-d06ff6f3dae9)

That piece named the four layers. This repo is the acceptance test layer, made portable.

## License

MIT. Take it, fork it, change the rules, ship it inside your own system. No attribution required, though I would like to hear what you changed.
