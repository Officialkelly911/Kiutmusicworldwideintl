# Kiut Studio Handbook — Table of Contents

This is the entry point for the Kiut Studio Handbook. It exists so that neither a human developer nor Replit Agent has to hunt through folders to figure out which document explains what.

The handbook is the single source of truth for the Kiut Music website. When in doubt, consult the relevant document below before writing code.

---

## How to Use This Page

- New to the project? Read the documents in **Recommended Reading Order** below, top to bottom.
- Looking for a specific rule (a color value, a spacing token, a checklist)? Jump straight to the matching document using the links in the tables.
- Introducing a new pattern, component, or system? Update the relevant document afterward — don't leave the handbook out of sync with the codebase.

---

## Recommended Reading Order

1. [Master Replit Agent Guide](00_Master_Replit_Agent_Guide.md)
2. [Project Vision](00_Project_Vision.md)
3. [Brand Identity](01_Brand_Identity.md)
4. [Design Philosophy](02_Design_Philosophy.md)
5. Design System (`03_Design_System/`) — read in numeric order, 00 through 12
6. Production Standards (`04_Production_Standards/`) — read in numeric order, 01 through 06

---

## Foundation

| Document | Description |
|---|---|
| [Master Replit Agent Guide](00_Master_Replit_Agent_Guide.md) | The operating manual for Replit Agent. Defines how the agent should read the handbook, plan work, reuse components, and verify quality before finishing any task. |
| [Project Vision](00_Project_Vision.md) | The high-level purpose and long-term direction of the Kiut Music website. |
| [Brand Identity](01_Brand_Identity.md) | Who Kiut is as a brand — tone, personality, and visual identity at a glance. |
| [Design Philosophy](02_Design_Philosophy.md) | The guiding design principles behind every visual and interaction decision on the site. |

---

## Design System (`03_Design_System/`)

Defines every reusable visual building block of the website — the "how it looks" layer.

| # | Document | Description |
|---|---|---|
| 00 | [Introduction](03_Design_System/00_Introduction.md) | Overview of the Design System and how its parts fit together. |
| 01 | [Color System](03_Design_System/01_Color_System.md) | The approved color palette and usage rules. |
| 02 | [Typography System](03_Design_System/02_Typography_System.md) | Font families, sizing scale, and text hierarchy. |
| 03 | [Spacing & Layout System](03_Design_System/03_Spacing_Layout_System.md) | Spacing scale, grid, and layout rules. |
| 04 | [Component Library](03_Design_System/04_Component_Library.md) | Catalog of reusable UI components. |
| 05 | [Button System](03_Design_System/05_Button_System.md) | Button variants, states, and usage rules. |
| 06 | [Card System](03_Design_System/06_Card_System.md) | Card variants and layout patterns. |
| 07 | [Animation & Motion System](03_Design_System/07_Animation_Motion_System.md) | Motion principles, timing, and easing rules. |
| 08 | [Shadow & Glow System](03_Design_System/08_Shadow_Glow_System.md) | Elevation, shadow, and glow effect standards. |
| 09 | [Iconography System](03_Design_System/09_Iconography_System.md) | Icon style, sizing, and usage rules. |
| 10 | [Responsive System](03_Design_System/10_Responsive_System.md) | Breakpoints and responsive behavior across devices. |
| 11 | [Design Tokens](03_Design_System/11_Design_Tokens.md) | The single source of truth for every reusable design value, defined as CSS custom properties. |
| 12 | [Accessibility Standards](03_Design_System/12_Accessibility_Standards.md) | WCAG 2.2 AA requirements for color contrast, keyboard navigation, focus states, and more. |

---

## Production Standards (`04_Production_Standards/`)

Defines how the Design System is applied when building real pages and shipping to production — the "how it's built and released" layer.

| # | Document | Description |
|---|---|---|
| 01 | [Page Templates](04_Production_Standards/01_Page_Templates.md) | Approved page structures for every page on the website (Home, Music, Videos, About, Store, Tour, Fan Card, Contact). |
| 02 | [UI Patterns](04_Production_Standards/02_UI_Patterns.md) | Reusable interface patterns (hero, gallery, modal, notification, etc.) built from Design System components. |
| 03 | [Implementation Standards](04_Production_Standards/03_Implementation_Standards.md) | Coding conventions, project structure, naming rules, and the code review checklist. |
| 04 | [Asset Guidelines](04_Production_Standards/04_Asset_Guidelines.md) | Standards for images, video, audio, logos, favicons, and merchandise assets. |
| 05 | [Performance Standards](04_Production_Standards/05_Performance_Standards.md) | Lighthouse targets, Core Web Vitals budgets, and optimization rules. |
| 06 | [Studio QA Checklist](04_Production_Standards/06_Studio_QA_Checklist.md) | The final verification checklist every deployment must pass before going live. |

---

## Handbook Structure

```
docs/
├── README.md
├── START_HERE.md
└── Studio_Handbook/
    ├── README.md                          (this file)
    ├── 00_Master_Replit_Agent_Guide.md
    ├── 00_Project_Vision.md
    ├── 01_Brand_Identity.md
    ├── 02_Design_Philosophy.md
    ├── 03_Design_System/
    │   ├── 00_Introduction.md
    │   ├── 01_Color_System.md
    │   ├── 02_Typography_System.md
    │   ├── 03_Spacing_Layout_System.md
    │   ├── 04_Component_Library.md
    │   ├── 05_Button_System.md
    │   ├── 06_Card_System.md
    │   ├── 07_Animation_Motion_System.md
    │   ├── 08_Shadow_Glow_System.md
    │   ├── 09_Iconography_System.md
    │   ├── 10_Responsive_System.md
    │   ├── 11_Design_Tokens.md
    │   └── 12_Accessibility_Standards.md
    └── 04_Production_Standards/
        ├── 01_Page_Templates.md
        ├── 02_UI_Patterns.md
        ├── 03_Implementation_Standards.md
        ├── 04_Asset_Guidelines.md
        ├── 05_Performance_Standards.md
        └── 06_Studio_QA_Checklist.md
```

---

## Maintenance

Whenever a significant new component, pattern, page, or system is introduced to the Kiut Music website, update the relevant document in this handbook — not just the code. A handbook that falls out of sync with the codebase is worse than no handbook at all.

---

## Version

Kiut Studio Handbook v1.0 (Foundation Release)
