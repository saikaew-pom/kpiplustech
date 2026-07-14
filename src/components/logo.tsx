import Link from "next/link";

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link className="brand" href="/" aria-label="NAVA home">
      <svg
        className="brand-mark"
        aria-hidden="true"
        viewBox="0 0 40 40"
        fill="none"
      >
        <rect width="40" height="40" rx="12" fill="#071722" />
        <path d="M9 29V11l12 10V11l10 8v10L21 21v8L9 29Z" fill="#67D4FF" />
        <path d="M21 11v10l10-8v10l-10 6" fill="#FFFFFF" opacity="0.96" />
      </svg>
      <span className={inverse ? "brand-name brand-name-inverse" : "brand-name"}>
        NAVA
      </span>
    </Link>
  );
}
