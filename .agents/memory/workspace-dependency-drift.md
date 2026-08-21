---
name: Workspace dependency drift
description: Dependency and workflow validation across the main app and separately registered artifacts.
---

When a project has separately registered artifact workflows, restoring packages for the main app does not guarantee that an artifact preview can resolve its own dependency tree.

**Why:** The main app can build and serve while an artifact workflow still fails during Vite config loading because it resolves a missing package from the workspace root.

**How to apply:** After package changes, verify the main workflow first, then inspect and restart each registered artifact workflow independently. Treat unrelated artifact failures separately from app implementation failures.