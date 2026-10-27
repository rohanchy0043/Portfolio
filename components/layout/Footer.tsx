import Link from "next/link";
import { ArrowUp, Code2, Link2, Mail } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner mx-auto">
        <div>
          <Link className="footer-name" href="/">
            {siteConfig.name}
          </Link>
          <p className="footer-note">
            Thoughtful web experiences, made in {siteConfig.location}.
          </p>
        </div>
        <div className="footer-actions">
          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
          >
            <Code2 size={17} aria-hidden="true" />
          </a>
          <a
            href={siteConfig.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
          >
            <Link2 size={17} aria-hidden="true" />
          </a>
          {siteConfig.email ? (
            <a
              href={"mailto:" + siteConfig.email}
              aria-label="Send an email"
            >
              <Mail size={17} aria-hidden="true" />
            </a>
          ) : null}
          <Link className="back-to-top" href="/#top">
            Back to top <ArrowUp size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className="footer-bottom mx-auto">
        <span>© {new Date().getFullYear()} {siteConfig.name}</span>
        <span>Designed and built with care.</span>
      </div>
    </footer>
  );
}
