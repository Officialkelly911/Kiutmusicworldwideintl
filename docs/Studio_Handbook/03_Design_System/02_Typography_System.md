# Kiut Studio Design Language (KSDL)

# 02 – Typography System

Version: 1.0

Status: Active

Last Updated: July 2026

---

# Purpose

Typography defines the visual voice of the Kiut Music website. It creates hierarchy, improves readability, and establishes a premium editorial aesthetic across every page.

All headings, body text, labels, captions, and interface elements must follow this system.

---

# Typography Philosophy

Typography should feel:

- Elegant

- Modern

- Cinematic

- Minimal

- Confident

- Readable

Luxury is communicated through spacing and restraint rather than excessive font variation.

---

# Font Stack

## Primary Display Font

Bebas Neue

Purpose

Hero titles

Section headers

Campaign banners

Concert announcements

Large promotional text

---

## Primary UI Font

Inter

Purpose

Navigation

Buttons

Body copy

Cards

Forms

Descriptions

Metadata

Footer

---

## Fallback Stack

font-family:

"Bebas Neue",
"Inter",
system-ui,
-apple-system,
BlinkMacSystemFont,
"Segoe UI",
Roboto,
sans-serif;

---

# Font Weight Scale

Light

300

Regular

400

Medium

500

SemiBold

600

Bold

700

ExtraBold

800

---

# Heading Scale

## Display XL

72px

Desktop Hero

56px Tablet

42px Mobile

---

## H1

56px

Desktop

48px Tablet

36px Mobile

---

## H2

44px

Desktop

38px Tablet

30px Mobile

---

## H3

34px

Desktop

30px Tablet

26px Mobile

---

## H4

28px

Desktop

24px Tablet

22px Mobile

---

## H5

22px

Desktop

20px Tablet

18px Mobile

---

## H6

18px

Desktop

18px Tablet

16px Mobile

---

# Body Text

Large

18px

Regular

16px

Small

14px

Caption

12px

---

# Letter Spacing

Display Titles

0.03em

Headings

0.02em

Body

Normal

Buttons

0.04em

Captions

0.05em

---

# Line Height

Hero Titles

1.05

Headings

1.2

Body Copy

1.6

Descriptions

1.7

Captions

1.4

---

# Text Hierarchy

Level 1

Hero

Level 2

Page Title

Level 3

Section Title

Level 4

Card Title

Level 5

Body Text

Level 6

Metadata

---

# Text Colors

Hero Titles

Pure White

---

Section Titles

Soft White

---

Body

Silver

---

Metadata

Muted Gray

---

Links

Royal Gold

---

Hover Links

Warm Gold

---

# Button Typography

Font

Inter

Weight

600

Uppercase

No

Minimum Size

16px

Letter Spacing

0.04em

---

# Navigation Typography

Font

Inter

Weight

500

Size

16px

Hover

Gold

Active

Gold + Underline

---

# Hero Typography

Display Font

Bebas Neue

Maximum Width

12 words

Avoid paragraphs.

The hero should communicate a single clear idea.

---

# Readability Rules

Maximum paragraph width

70 characters

Avoid large blocks of text.

Break content into digestible sections.

Use generous spacing.

---

# Accessibility

Minimum body font size

16px

Never use light gray on graphite without contrast verification.

Avoid using all uppercase for long paragraphs.

Maintain WCAG AA compliance.

---

# Typography Do's

✔ Maintain consistent hierarchy.

✔ Use heading levels correctly.

✔ Keep body text concise.

✔ Use whitespace generously.

✔ Emphasize with weight before color.

---

# Typography Don'ts

✘ Don't mix multiple display fonts.

✘ Don't use decorative fonts for UI.

✘ Don't reduce body text below 16px.

✘ Don't overuse bold text.

✘ Don't stretch or compress fonts.

---

# CSS Tokens

```css
:root{

--font-display:"Bebas Neue",sans-serif;
--font-ui:"Inter",sans-serif;

--font-size-display:72px;
--font-size-h1:56px;
--font-size-h2:44px;
--font-size-h3:34px;
--font-size-h4:28px;
--font-size-h5:22px;
--font-size-h6:18px;

--font-size-body:16px;
--font-size-small:14px;
--font-size-caption:12px;

--line-height-heading:1.2;
--line-height-body:1.6;

--letter-spacing-heading:0.02em;
--letter-spacing-button:0.04em;

}
```

---

# Typography Examples

Hero

"Experience the Sound"

Section

"Moments From The Journey"

Card

"Latest Release"

Body

Discover exclusive music, performances, behind-the-scenes moments, and official merchandise from Kiut.

---

# Related Documents

Color System

Spacing System

Component Library

Button System

Responsive System

Design Tokens

---

# Version History

Version 1.0
