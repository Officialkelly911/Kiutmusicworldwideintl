# Kiut Studio Design Language (KSDL)

# 08 – Shadow & Glow System

Version: 1.0

Status: Active

Last Updated: July 2026

---

# Purpose

The Shadow & Glow System establishes a consistent lighting language across the Kiut Music website.

Shadows create depth.

Glows create emotion.

Together they reinforce the premium, cinematic identity of Kiut.

Lighting should always feel intentional rather than decorative.

---

# Design Philosophy

Light directs attention.

Darkness creates contrast.

Glow indicates importance.

Shadows establish hierarchy.

Lighting should enhance content, never overpower it.

---

# Lighting Hierarchy

Level 1

Flat Surface

No Shadow

---

Level 2

Soft Elevation

Small Shadow

---

Level 3

Interactive

Medium Shadow

---

Level 4

Premium

Gold Glow

---

Level 5

Hero

Ambient Lighting

---

# Shadow Scale

## Shadow XS

Purpose

Buttons

Small Badges

Tiny UI Elements

```css
box-shadow:
0 2px 6px rgba(0,0,0,.12);
```

---

## Shadow Small

Purpose

Cards

Inputs

Navigation

```css
box-shadow:
0 8px 20px rgba(0,0,0,.20);
```

---

## Shadow Medium

Purpose

Hover Cards

Store Cards

Gallery Cards

```css
box-shadow:
0 14px 32px rgba(0,0,0,.28);
```

---

## Shadow Large

Purpose

Modals

Featured Sections

Premium Cards

```css
box-shadow:
0 24px 60px rgba(0,0,0,.35);
```

---

## Shadow Hero

Purpose

Hero Sections

Large Floating Elements

```css
box-shadow:
0 40px 120px rgba(0,0,0,.40);
```

---

# Gold Glow

Primary Brand Glow

```css
box-shadow:
0 0 24px rgba(212,175,55,.28);
```

Used For

Primary Buttons

Featured Products

Premium CTAs

Hero Highlights

---

Hover Gold Glow

```css
box-shadow:
0 0 42px rgba(244,197,66,.38);
```

Used Only During Hover.

---

# Champagne Glow

Purpose

Luxury Elements

VIP Sections

Premium Membership

```css
box-shadow:
0 0 28px rgba(247,231,161,.25);
```

---

# Purple Glow

Purpose

Music

Creative Portfolio

Featured Videos

```css
box-shadow:
0 0 30px rgba(109,62,255,.22);
```

Should be used sparingly.

---

# Glass Effect

Background

rgba(255,255,255,.05)

Backdrop Blur

18px

Border

1px rgba(255,255,255,.08)

Shadow

Small

Used For

Navigation

Floating Player

Dialogs

Premium Cards

---

# Hero Lighting

Hero backgrounds should include:

Dark Gradient

↓

Soft Gold Ambient Glow

↓

Video Overlay

↓

Content

Lighting should guide the eye toward the hero heading.

---

# Image Lighting

Gallery

Soft Shadow

Hover Glow

Store

Medium Shadow

Gold Glow on Hover

Album Artwork

Soft Shadow

Premium Releases

Champagne Border

---

# Button Lighting

Primary

Gold Glow

Secondary

Soft Shadow

Ghost

No Shadow

Hover

Increase Glow

Click

Reduce Shadow

---

# Card Lighting

Default

Soft Shadow

Hover

Medium Shadow

Premium

Gold Glow

Featured

Light Sweep Animation

---

# Navigation

Transparent

↓

Glass

↓

Shadow Appears After Scroll

Avoid heavy shadows on page load.

---

# Modal Lighting

Background Overlay

rgba(0,0,0,.72)

Modal Shadow

Hero Shadow

Blur

18px

---

# Floating Elements

Music Dock

Soft Shadow

Glow During Playback

Scroll To Top

Medium Shadow

Hover Glow

---

# Layer Order

Background

↓

Ambient Glow

↓

Sections

↓

Cards

↓

Buttons

↓

Floating Elements

↓

Modal

↓

Notifications

---

# Glow Rules

✔ One glow color per component.

✔ Gold indicates interaction.

✔ Purple indicates creativity.

✔ Champagne indicates exclusivity.

✔ Never stack glow colors.

---

# Performance

Use box-shadow sparingly.

Avoid animating blur radius.

Animate opacity instead.

Prefer transform for movement.

Keep GPU usage low.

---

# Accessibility

Lighting must never reduce readability.

Glow should never replace focus states.

Ensure contrast remains WCAG AA compliant.

---

# Do's

✔ Use subtle shadows.

✔ Keep lighting consistent.

✔ Let content remain the focus.

✔ Reserve premium glows for premium actions.

---

# Don'ts

✘ Neon effects.

✘ Multiple glow colors.

✘ Heavy shadows everywhere.

✘ Inconsistent blur values.

✘ Decorative lighting without purpose.

---

# CSS Tokens

```css
:root{

--shadow-xs:0 2px 6px rgba(0,0,0,.12);
--shadow-sm:0 8px 20px rgba(0,0,0,.20);
--shadow-md:0 14px 32px rgba(0,0,0,.28);
--shadow-lg:0 24px 60px rgba(0,0,0,.35);
--shadow-hero:0 40px 120px rgba(0,0,0,.40);

--glow-gold:0 0 24px rgba(212,175,55,.28);
--glow-gold-hover:0 0 42px rgba(244,197,66,.38);
--glow-champagne:0 0 28px rgba(247,231,161,.25);
--glow-purple:0 0 30px rgba(109,62,255,.22);

}
```

---

# Implementation Checklist

□ Uses approved shadows

□ Uses approved glow colors

□ Uses approved blur values

□ Maintains accessibility

□ Matches Design System

□ Optimized for performance

---

# Related Documents

Color System

Typography System

Button System

Card System

Animation & Motion System

Responsive System

Design Tokens

---

# Version History

Version 1.0
