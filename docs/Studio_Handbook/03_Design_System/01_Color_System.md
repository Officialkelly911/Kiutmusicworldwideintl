# Kiut Studio Design Language (KSDL)

# 01 – Color System

Version: 1.0

Status: Active

Last Updated: July 2026

---

# Purpose

The Color System defines every approved color, gradient, overlay, and visual accent used throughout the Kiut Music website.

It establishes a cohesive visual identity while ensuring accessibility, consistency, and scalability.

No page or component should introduce new colors outside this document unless the Design System is updated first.

---

# Design Philosophy

The Kiut Music visual identity is built around three principles:

- Darkness creates focus.

- Gold represents excellence.

- Purple represents creativity and artistry.

Every color choice should reinforce one or more of these principles.

---

# Primary Brand Palette

## Midnight Black

HEX

#080808

Purpose

Primary website background.

Usage

Hero sections

About page

Video page

Music page

Footer

Large background areas

---

## Charcoal

HEX

#121212

Purpose

Secondary background.

Usage

Cards

Navigation

Content sections

Store containers

---

## Graphite

HEX

#1E1E1E

Purpose

Elevated surfaces.

Usage

Feature cards

Gallery cards

Premium content blocks

Modals

---

# Typography Colors

## Pure White

HEX

#FFFFFF

Purpose

Primary headings.

---

## Soft White

HEX

#F5F5F5

Purpose

Secondary headings.

---

## Silver

HEX

#D6D6D6

Purpose

Body text.

---

## Muted Gray

HEX

#9B9B9B

Purpose

Descriptions

Captions

Metadata

Dates

---

# Brand Accent Colors

## Royal Gold

HEX

#D4AF37

Purpose

Primary accent.

Used for:

Buttons

Highlights

Icons

Premium labels

Links

Logo accents

---

## Warm Gold

HEX

#F4C542

Purpose

Hover states.

Glows.

Interactive elements.

---

## Champagne Gold

HEX

#F7E7A1

Purpose

Luxury highlights.

Soft lighting.

Premium borders.

---

## Royal Purple

HEX

#6D3EFF

Purpose

Creative identity.

Music highlights.

Featured content.

Interactive effects.

---

# Functional Colors

## Success

#34D399

Used for

Successful actions

Confirmations

Completed purchases

---

## Warning

#FBBF24

Used for

Notifications

Limited stock

Ticket availability

---

## Error

#EF4444

Used for

Validation errors

Failed actions

Unavailable content

---

## Information

#3B82F6

Used for

Announcements

Tips

General notices

---

# Background Layers

Layer 1

Midnight Black

Layer 2

Charcoal

Layer 3

Graphite

Layer 4

Glass Surface

Layer 5

Overlay Gradient

Each layer should create depth without overwhelming the content.

---

# Approved Gradients

## Hero Gradient

Midnight Black → Charcoal

Used for:

Hero backgrounds

Page transitions

---

## Gold Gradient

Royal Gold → Warm Gold

Used for:

Premium buttons

Featured badges

CTA elements

---

## Purple Gradient

Royal Purple → Deep Violet

Used sparingly for:

Music highlights

Creative portfolio

Featured releases

---

## Glass Gradient

Transparent White (5%)

↓

Transparent White (12%)

Used for:

Glass cards

Floating navigation

Modals

---

# Glow System

## Gold Glow

Blur

24px

Opacity

35%

Purpose

Premium buttons

Hover effects

Logo highlights

---

## Purple Glow

Blur

32px

Opacity

28%

Purpose

Creative highlights

Interactive music sections

---

# Overlay System

Dark Overlay

rgba(0,0,0,0.65)

Used over videos.

---

Light Overlay

rgba(255,255,255,0.05)

Used for glass effects.

---

Gradient Overlay

Black

↓

Transparent

Used for hero images.

---

# Accessibility Rules

Minimum text contrast

WCAG AA compliant.

Never place muted gray text over graphite without increasing opacity.

Primary CTA buttons must maintain a minimum 4.5:1 contrast ratio.

Never rely on color alone to communicate meaning.

Interactive states must include visual feedback beyond color changes.

---

# Page Color Mapping

Home

Background

Midnight Black

Primary Accent

Gold

Secondary Accent

Purple

---

Music

Background

Charcoal

Accent

Gold

---

Videos

Background

Midnight Black

Accent

Purple

---

About

Background

Midnight Black

Accent

Champagne Gold

---

Store

Background

Graphite

Accent

Royal Gold

---

Newsletter

Background

Charcoal

Accent

Warm Gold

---

# Do Not

❌ Introduce random colors.

❌ Use bright neon colors.

❌ Use saturated reds except for errors.

❌ Use more than two accent colors in a single section.

❌ Apply gradients to body text.

❌ Mix multiple glow styles on one component.

---

# CSS Design Tokens

```css
:root{

--color-background-primary:#080808;
--color-background-secondary:#121212;
--color-background-elevated:#1E1E1E;

--color-heading:#FFFFFF;
--color-body:#D6D6D6;
--color-muted:#9B9B9B;

--color-gold:#D4AF37;
--color-gold-hover:#F4C542;
--color-champagne:#F7E7A1;

--color-purple:#6D3EFF;

--color-success:#34D399;
--color-warning:#FBBF24;
--color-error:#EF4444;
--color-info:#3B82F6;

}
```

---

# Future Expansion

Version 2 may include:

Dynamic themes

Concert mode

Holiday themes

Album-specific color palettes

Accessibility high-contrast mode

---

# Related Documents

Typography System

Spacing System

Button System

Card System

Motion System

Shadow & Glow System

Implementation Guidelines

---

# Version History

Version 1.0
