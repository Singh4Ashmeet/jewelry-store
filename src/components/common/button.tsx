import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type BaseProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const styles = {
  primary: "border-[#1C1C1A] bg-[#1C1C1A] text-white hover:bg-[#B58E62] hover:border-[#B58E62]",
  secondary: "border-[#B58E62] bg-transparent text-[#1C1C1A] hover:bg-[#B58E62] hover:text-white",
  ghost: "border-transparent bg-transparent text-[#1C1C1A] hover:bg-[#F5F1EB]",
};

export function Button({ children, variant = "primary", className, ...props }: BaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn("inline-flex h-11 items-center justify-center rounded-sm border px-5 text-xs font-medium uppercase tracking-[0.18em] transition", styles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({ children, variant = "primary", className, href, ...props }: BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <Link
      href={href}
      className={cn("inline-flex h-11 items-center justify-center rounded-sm border px-5 text-xs font-medium uppercase tracking-[0.18em] transition", styles[variant], className)}
      {...props}
    >
      {children}
    </Link>
  );
}
