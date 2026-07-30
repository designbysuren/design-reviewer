# Precedence

A rule list cannot resolve its own conflicts. Two valid rules will collide, and without a stated order the reviewer either picks arbitrarily or reports both, which pushes the decision back onto the reader.

This file states the order. Apply it whenever two findings suggest opposite fixes.

## The order

**1. Blocking beats everything.**
If the user cannot complete the task, or cannot perceive or operate the interface, nothing else in the report matters yet. Lead with it. Do not bury a keyboard trap under six spacing observations.

**2. Attention beats completeness.**
When "show the user more" collides with "reduce what the user must process", reduction wins. A calm screen missing a secondary detail beats a complete screen that has to be decoded. The detail can be one click away. Attention cannot.

This is the rule that resolves the most common failure in generated interfaces, where every principle has been applied independently and simultaneously, so nothing has priority and the screen shows everything.

**3. Consistency beats local optimisation.**
A slightly worse component that matches the system beats a slightly better one that forks it. The forked component is better once and worse forever, because it is now a second thing to maintain and a precedent for a third.

Exception: when the system's version fails a prohibition, consistency loses. Do not defend an inaccessible pattern on the grounds that it is the standard one. Report it as a system-level finding instead.

**4. Clarity beats cleverness.**
Novel interaction patterns, unlabelled icons, hidden gestures, and clever density all trade user certainty for designer satisfaction. When a finding is "this is more elegant" against "this is more obvious", obvious wins.

## How to use it in a report

When two findings conflict, do not report both neutrally. Write it explicitly:

> These two findings pull in opposite directions. Adding the source count would make the panel more complete, and the panel already carries five facts. Under precedence, attention beats completeness, so the count belongs in the expanded view rather than the summary.

That sentence is the part a rule list cannot produce. It is also the part that makes the report feel like it was written by someone with a point of view, which is what makes it worth reading.

## Why precedence is uncomfortable to write

Because it forces a commitment. "Surface relevant information" and "reduce cognitive load" are both easy to agree with, and a document containing both has decided nothing. Saying attention wins means accepting that some genuinely relevant information will not be on the screen, and owning that trade rather than distributing it to whoever implements next.

That discomfort is the design judgement. A document that avoids it has outsourced the judgement to every future contributor, and they will each resolve it differently.
