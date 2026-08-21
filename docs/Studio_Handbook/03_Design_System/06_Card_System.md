# Kiut Studio Design Language (KSDL)

# 06 – Card System

Version: 1.0

Status: Active

Last Updated: July 2026

---

# Purpose

The Card System establishes a consistent structure, appearance, and behavior for every card across the Kiut Music website.

Cards present content in a modular, visually engaging, and responsive format while maintaining a unified premium aesthetic.

Every card must follow this system.

---

# Design Philosophy

Cards should feel:

- Elegant

- Premium

- Spacious

- Interactive

- Consistent

Cards should never feel crowded or overloaded with information.

---

# Universal Card Anatomy

Every card should follow this structure:

Media

↓

Status Badge (Optional)

↓

Title

↓

Description

↓

Supporting Metadata

↓

Primary CTA

↓

Secondary Actions (Optional)

---

# Card Types

## Music Card

Purpose

Display singles, EPs, and albums.

Contents

Artwork

Title

Release Year

Streaming Platforms

Primary CTA

---

## Video Card

Purpose

Highlight official videos.

Contents

Thumbnail

Play Icon

Title

Duration

Platform Links

Watch CTA

---

## Store Card

Purpose

Display official merchandise.

Contents

Product Image

Category Badge

Product Name

Price

Availability

Visit Store CTA

External Link Indicator

---

## Journey Gallery Card

Purpose

Display memories and moments.

Contents

Image

Caption

Location (Optional)

Date (Optional)

Fullscreen Lightbox

---

## Concert Card

Purpose

Display upcoming events.

Contents

City

Country

Venue

Date

Availability

Ticket CTA

VIP Badge (Optional)

---

## Fan Card

Purpose

Promote membership.

Contents

Membership Type

Benefits

Pricing

Validity

Apply CTA

Premium Highlight

---

## Statistics Card

Purpose

Display achievements.

Examples

Concerts

Countries

Streams

Awards

Years Active

---

## Quote Card

Purpose

Display artist messages or testimonials.

Contents

Quote

Author

Portrait (Optional)

---

## Feature Card

Purpose

Promote key content.

Examples

New Album

Exclusive Video

Merch Drop

Special Announcement

---

# Card Sizes

Small

320px

Medium

380px

Large

480px

Feature

Full Width

---

# Image Rules

Product Images

Fill approximately 70% of the card.

Album Covers

1:1 Ratio

Video Thumbnails

16:9 Ratio

Gallery Images

Consistent within each row.

No stretched images.

---

# Card Spacing

Internal Padding

24px

Premium Cards

32px

Gap Between Elements

16px

Section Gap

32px

---

# Border Radius

Standard

24px

Premium

32px

Glass Cards

24px

---

# Background Styles

Primary

Graphite

Secondary

Charcoal

Glass

Transparent White Overlay

Premium

Graphite with Gold Border

---

# Shadows

Default

Soft Shadow

Hover

Elevated Shadow

Premium

Gold Glow

Glass

Soft Blur

---

# Hover Effects

Lift

6px

Scale

1.02

Shadow

Increase

Image Zoom

1.05

Transition

250ms

Hover should feel smooth and deliberate.

---

# Card States

Default

Hover

Focused

Loading

Disabled

Selected

Sold Out (Concert)

Out of Stock (Store)

Featured

Premium

---

# Premium Card Rules

Reserved For

VIP

Featured Album

Limited Merchandise

Exclusive Experiences

Characteristics

Gold Border

Champagne Accent

Soft Glow

Premium Badge

---

# Badges

New

Featured

Limited

VIP

Sold Out

Exclusive

Official

Bestseller

Badges should remain small and unobtrusive.

---

# Responsive Behavior

Desktop

4 Cards

Tablet

2 Cards

Mobile

1 Card

Featured cards may span multiple columns on larger screens.

---

# Accessibility

Keyboard Accessible

Required

Focus Ring

Required

Minimum Touch Target

48px

Readable Text

Required

Alt Text

Required for media

---

# Performance

Lazy-load images.

Optimize thumbnails.

Use responsive image sizes.

Avoid layout shifts.

---

# Animation Standards

Fade

300ms

Lift

250ms

Scale

200ms

Image Zoom

250ms

Glow

300ms

---

# Card Do's

✔ Maintain equal heights within grids.

✔ Keep text concise.

✔ Use approved spacing.

✔ Follow typography hierarchy.

✔ Use consistent image ratios.

---

# Card Don'ts

✘ Mix border radius values.

✘ Stretch product images.

✘ Use inconsistent hover animations.

✘ Add multiple accent colors.

✘ Overcrowd content.

---

# CSS Design Tokens

```css
:root{

--card-radius:24px;
--card-radius-premium:32px;

--card-padding:24px;
--card-padding-premium:32px;

--card-gap:16px;

--card-shadow:var(--shadow-soft);
--card-shadow-hover:var(--shadow-medium);
--card-shadow-premium:var(--shadow-gold);

--card-transition:250ms;

}
```

---

# Implementation Checklist

□ Uses approved colors

□ Uses approved typography

□ Uses approved spacing

□ Matches border radius standards

□ Supports keyboard navigation

□ Uses responsive images

□ Includes hover state

□ Includes focus state

□ Includes loading state where required

---

# Related Documents

Color System

Typography System

Spacing & Layout System

Button System

Motion System

Shadow & Glow System

Responsive System

Design Tokens

---

# Version History

Version 1.0
