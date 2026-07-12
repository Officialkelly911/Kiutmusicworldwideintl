---
name: Phase 9 Part 3 — Tour & Music completion pass
description: What was actually wrong when resuming Tour/Music page work from a spec checklist, and the scope-honesty calls made while completing it.
---

Resuming "continue from the checklist" work should never start from the checklist or the audit report alone — both can describe an *intended* state, not the *actual* runtime state. `Tour.tsx` referenced two components (`FeaturedEventCountdown`, `TourFAQAccordion`) in JSX that were never defined anywhere in the codebase, silently crashing the entire `/tour` route. Nothing in the spec, the stale audit report, or a `tsc`/build pass caught this — only an actual browser screenshot + console log check surfaced the `ReferenceError`.

**Why:** Docs/specs/audit reports drift from code quickly in this kind of iterative, checklist-driven build; treating them as ground truth without a live render check risks building more features on top of a broken page.

**How to apply:** Before resuming or extending any page from a spec/checklist, screenshot the actual route and check browser console logs first — don't just grep the spec against the source. If a referenced component/hook can't be found with a repo-wide grep, that's a hard blocker, not a stylistic gap.

Separately, when a spec asks for content that would require inventing facts about real-world things (event posters for unconfirmed shows, testimonials attributed to specific promoters/venues, streaming-platform links Kiut isn't confirmed to have), the right call is to add the structural/visual completion (badges, card slots, sections) without fabricating the underlying real-world claim, and file a follow-up task for when real data exists.
