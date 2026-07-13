import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Unified button/interaction system — KIUT Brand Integration Phase 4.
 *
 * Every CTA, nav pill, form submit, footer/newsletter button, and icon
 * control in the app should render through one of these three
 * components so radius, font, weight, padding, transition speed,
 * hover/focus/active/disabled behavior stay identical everywhere.
 *
 * Polymorphic via `as`: renders a <button> by default, or pass
 * `as="a"` (with `href`) to use it as a link-styled-as-button.
 */

type AsProp<E extends React.ElementType> = { as?: E };
type PolymorphicProps<E extends React.ElementType, P> = P &
  AsProp<E> &
  Omit<React.ComponentPropsWithoutRef<E>, keyof P | "as">;

interface ButtonOwnProps {
  className?: string;
  size?: "default" | "sm";
}

export function PrimaryButton<E extends React.ElementType = "button">({
  as,
  className,
  size = "default",
  ...props
}: PolymorphicProps<E, ButtonOwnProps>) {
  const Comp = (as || "button") as React.ElementType;
  return (
    <Comp
      className={cn("btn-base btn-primary", size === "sm" && "btn-sm", className)}
      {...props}
    />
  );
}

export function SecondaryButton<E extends React.ElementType = "button">({
  as,
  className,
  size = "default",
  ...props
}: PolymorphicProps<E, ButtonOwnProps>) {
  const Comp = (as || "button") as React.ElementType;
  return (
    <Comp
      className={cn("btn-base btn-secondary", size === "sm" && "btn-sm", className)}
      {...props}
    />
  );
}

interface IconButtonOwnProps {
  className?: string;
  size?: "default" | "sm";
  "aria-label": string;
}

export function IconButton<E extends React.ElementType = "button">({
  as,
  className,
  size = "default",
  ...props
}: PolymorphicProps<E, IconButtonOwnProps>) {
  const Comp = (as || "button") as React.ElementType;
  return (
    <Comp
      className={cn("btn-icon", size === "sm" && "btn-icon-sm", className)}
      {...props}
    />
  );
}
