# Kiut Studio Design Language (KSDL)

# 07 – Animation & Motion System

Version: 1.0

Status: Active

Last Updated: July 2026

---

# Purpose

The Motion System defines every animation, transition, interaction, and movement used throughout the Kiut Music website.

Motion should enhance storytelling, improve usability, and create a cinematic browsing experience without distracting from the content.

Animations should always have purpose.

---

# Motion Philosophy

Every animation should:

- Guide attention

- Reinforce hierarchy

- Provide feedback

- Feel elegant

- Respect performance

- Never become distracting

Motion is storytelling.

---

# Signature Motion Style

The Kiut website should feel:

- Cinematic

- Smooth

- Refined

- Organic

- Premium

Animations should resemble camera movements rather than flashy effects.

---

# Global Timing Scale

Instant

100ms

Fast

180ms

Normal

250ms

Medium

350ms

Slow

500ms

Cinematic

800ms

Maximum

1000ms

Avoid animations longer than one second except for intro experiences.

---

# Easing Curves

Default

ease-out

Entrance

cubic-bezier(0.22,1,0.36,1)

Exit

ease-in

Hover

ease

Page Transition

ease-in-out

---

# Page Load Animation

Sequence

Fade In

↓

Logo Reveal

↓

Hero Background

↓

Hero Content

↓

Primary CTA

↓

Scroll Indicator

Total duration should not exceed 1.5 seconds.

---

# Scroll Reveal

Elements appear only once.

Direction options

Fade Up

Fade Left

Fade Right

Fade Scale

Fade Blur

Delay between grouped items

60ms

---

# Hero Animation

Background Video

Gentle fade

Heading

Fade + Up

Subheading

Fade + Up

CTA

Scale + Fade

Scroll Indicator

Floating loop

---

# Navigation

Initial

Transparent

↓

Scroll

Glass effect

↓

Further Scroll

Solid background

Transitions should remain subtle.

---

# Button Animations

Hover

Lift 4px

Glow

Gold pulse

Click

Scale 0.98

Focus

Gold outline

Loading

Spinner

---

# Card Animations

Hover

Lift

↓

Shadow Increase

↓

Image Zoom

↓

CTA Highlight

Duration

250ms

---

# Gallery Motion

Images

Fade Up

Hover

Zoom 1.05

Lightbox

Scale + Fade

Navigation

Slide

---

# Video Components

Thumbnail Hover

Scale

Play Icon

Fade In

Video Modal

Fade + Blur

Close

Fade Out

---

# Store Components

Product Hover

Lift

↓

Soft Glow

↓

Image Scale

↓

Button Reveal

Featured Products

Light Sweep every 12 seconds

---

# Music Components

Album Hover

Rotate 1°

↓

Scale

↓

Glow

Streaming Buttons

Underline Animation

Platform Icons

Fade

---

# Counters

Statistics should animate once when visible.

Duration

1200ms

Ease

ease-out

---

# Progress Indicators

Loading Bar

Smooth

Circular Progress

Continuous

Music Playback

Linear

---

# Floating Elements

Music Dock

Float 6px

Duration

4 seconds

Repeat

Infinite

Scroll Indicator

Bounce

Every 2.5 seconds

---

# Modal Animation

Open

Fade + Scale

Close

Fade

Background

Blur

Duration

300ms

---

# Toast Notifications

Slide Up

Fade

Dismiss

Fade

Duration

250ms

---

# Micro Interactions

Icons

Rotate 5°

Links

Underline Grow

Buttons

Glow

Cards

Lift

Images

Zoom

Navigation

Glass Transition

These should remain subtle.

---

# Signature Animations

Golden Pulse

Reserved for premium actions.

Light Sweep

Premium cards and buttons.

Reveal Line

Section headings.

Floating Glow

Hero background.

Gradient Shift

Hero overlays only.

---

# Performance Rules

Use GPU-friendly transforms.

Animate transform and opacity.

Avoid animating width and height.

Respect prefers-reduced-motion.

Lazy-load heavy animations.

Keep frame rate near 60fps.

---

# Accessibility

Support reduced motion.

Provide alternatives.

Avoid flashing elements.

No autoplay animations requiring user attention.

Animations must never block interaction.

---

# Motion Do's

✔ Keep animations meaningful.

✔ Use consistent timing.

✔ Keep movement smooth.

✔ Respect accessibility.

✔ Maintain visual rhythm.

---

# Motion Don'ts

✘ Use random animation styles.

✘ Overuse parallax.

✘ Stack multiple animations unnecessarily.

✘ Animate every element.

✘ Use excessive bounce effects.

---

# CSS Motion Tokens

```css
:root{

--motion-fast:180ms;
--motion-normal:250ms;
--motion-medium:350ms;
--motion-slow:500ms;
--motion-cinematic:800ms;

--ease-default:ease-out;
--ease-entrance:cubic-bezier(0.22,1,0.36,1);
--ease-exit:ease-in;
--ease-page:ease-in-out;

}
```

---

# Implementation Checklist

□ Uses approved timing values

□ Uses approved easing curves

□ Supports reduced motion

□ Uses transform instead of layout animation

□ Maintains 60fps where possible

□ Avoids unnecessary motion

□ Matches Design System standards

---

# Related Documents

Color System

Typography System

Spacing & Layout System

Button System

Card System

Shadow & Glow System

Responsive System

Design Tokens

Implementation Guidelines

---

# Version History

Version 1.0
