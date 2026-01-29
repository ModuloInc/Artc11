"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] active:scale-[0.98]",
  secondary:
    "bg-[var(--color-primary-muted)] text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10",
  ghost:
    "bg-transparent text-[var(--color-foreground)] hover:bg-[var(--color-border)]/50",
  danger:
    "bg-[var(--color-error)] text-white hover:opacity-90 active:scale-[0.98]",
};

export default forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", children, className = "", disabled, ...props },
  ref
) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-[var(--radius-full)] px-6 py-3 font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";
  return (
    <button
      ref={ref}
      type="button"
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});
