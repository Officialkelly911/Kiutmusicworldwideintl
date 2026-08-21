---
name: Dependency lockfile policy
description: The project’s active dependency resolver is npm; stale alternate locks must not remain beside its package locks.
---

Use npm and its package-lock files for the root application and the standalone mockup artifact. Do not add or retain a root pnpm lockfile unless the whole project is deliberately migrated to pnpm.

**Why:** A stale pnpm lock preserved vulnerable resolutions that were no longer used by the application, and the security scanner reported them alongside npm’s active dependency tree.

**How to apply:** Make root dependency updates with the npm-aware package workflow, keep the artifact’s independent package-lock refreshed when its dependencies change, and remove conflicting inactive resolver locks instead of treating them as runtime dependencies.