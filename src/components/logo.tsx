import Link from "next/link";

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link className="brand" href="/" aria-label="KPI Plus Tech home">
      <svg
        className="brand-mark"
        aria-hidden="true"
        viewBox="0 0 40 40"
        fill="none"
      >
        <rect width="40" height="40" rx="12" fill="#071722" />
        <path
          d="M10.5 11.5v17M11 20h6.5m0 0 7-8.5M17.5 20l7 8.5"
          stroke="#67D4FF"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M29.5 13v8m-4-4h8"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      <span className={inverse ? "brand-name brand-name-inverse" : "brand-name"}>
        KPI Plus Tech
      </span>
    </Link>
  );
}
