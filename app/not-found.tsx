import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="not-found section-wrap" id="main-content">
      <p className="section-kicker">404 · Page not found</p>
      <h1>This page isn&apos;t here.</h1>
      <p>The link may be out of date, or the page may have moved.</p>
      <Link className="button button-primary" href="/#projects">
        <ArrowLeft size={16} aria-hidden="true" />
        Back to projects
      </Link>
    </main>
  );
}
