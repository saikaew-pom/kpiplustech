import { ButtonLink } from "@/components/button-link";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found">
      <div className="shell">
        <span>404</span>
        <h1>This page has moved—or never existed.</h1>
        <p>Let&apos;s get you back to the useful part.</p>
        <ButtonLink href="/" arrow>Return home</ButtonLink>
      </div>
    </main>
  );
}
