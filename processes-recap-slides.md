# Processes Recap — Slide Summary

## Slide 1 — Processes Recap *(Title)*
How we ticket, branch, review, and ship.

---

## Slide 2 — Jira Spaces

| Key  | Space                          |
|------|--------------------------------|
| CH   | Car rental                     |
| PM   | Payment methods                |
| MAR  | Marketing                      |
| CA   | Customer account               |
| FLIG | Flight (results and checkout)  |
| LP   | Landing pages                  |
| TI   | Tech improvements              |

---

## Slide 3 — Branch Creation *(50/50)*

**Ticket branches** — Prefix, ticket number, kebab-case name.

- Prefixes: `bugfix/` `feature/` `hotfix/`

```
feature/CH-001-nice-name
bugfix/PM-042-fix-card-retry
hotfix/FLIG-118-checkout-crash
```

**Project branches** — Long-lived branches for big projects.

- Named `feature/` plus the project name.

```
feature/skyline
feature/car-rental
```

---

## Slide 4 — Commit Messages

Ticket key first, then describe what changed.

```
CH-001 Add weekend rate filter to search results
```

---

## Slide 5 — Bugs and Hotfixes

- Notice a bug? Raise it in the relevant Jira space.
- Hotfixes always get a ticket in that space **before** any changes.

---

## Slide 6 — Ticket Lifecycle *(Flowchart)*

**Start** → Refine and add details → Ready for Dev → Investigate → Make changes → PR → QA → Release → Check in production → **End**

---

## Slide 7 — Pull Requests *(50/50)*

**Left — Why we PR:**

- Catch bugs and share context before code reaches production.
- Spread ownership — everyone understands what's changing.
- A PR is a collaborative process.

Bar chart comparing ticket work vs PR time:

| Approach | Ticket work | PR | Outcome |
|---|---|---|---|
| PR at the end | ██████████ | ██ | Late feedback |
| Collaborative PR | ███████ | █████ | Earlier review |

**Right — Flowchart:** `PR` → `QA` → `Merge`

---

## Slide 8 — Releasing to Production

- `stable` is the production branch.
- When QA has passed, merge into `master`.
- Then merge `master` into `stable`.
