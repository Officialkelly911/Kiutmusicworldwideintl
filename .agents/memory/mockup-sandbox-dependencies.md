---
name: Mockup sandbox dependencies
description: Dependency-installation behavior for the isolated Mockup Sandbox artifact.
---

The Mockup Sandbox keeps an independent package manifest and lockfile. Its workflow can resolve Vite from the surrounding workspace while loading its own config, so dependencies declared only in the sandbox must still be installed into the sandbox’s local npm tree.

**Why:** A declared sandbox dependency can still produce a module-not-found startup failure when the artifact’s local `node_modules` tree has not been restored.

**How to apply:** When the sandbox workflow cannot resolve one of its direct dependencies, verify that dependency in the sandbox manifest and lockfile, restore the sandbox lockfile install from its own directory, then restart the sandbox workflow. Do not add the dependency to the main KIUT manifest solely to satisfy the sandbox.