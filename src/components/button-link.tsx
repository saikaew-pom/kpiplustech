import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light" | "text";
  arrow?: boolean;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = false,
  className = "",
}: ButtonLinkProps) {
  return (
    <Link className={`button button-${variant} ${className}`.trim()} href={href}>
      <span>{children}</span>
      {arrow ? <ArrowRight aria-hidden="true" size={18} /> : null}
    </Link>
  );
}
