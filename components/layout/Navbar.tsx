"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#education", label: "Education" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="nav-shell mx-auto flex items-center justify-between">
        <Link
          className="brand"
          href="/"
          aria-label={siteConfig.name + ", home"}
          onClick={closeMenu}
        >
          <span className="brand-mark" aria-hidden="true">
            {siteConfig.initials}
          </span>
          <span>{siteConfig.name}</span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <Link className="nav-link" href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
          <Link className="nav-cta" href="/#contact">
            Let&apos;s talk <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </nav>

        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      <nav
        className={"mobile-nav" + (menuOpen ? " is-open" : "")}
        id="mobile-navigation"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        {links.map((link) => (
          <Link
            className="mobile-nav-link"
            href={link.href}
            key={link.href}
            tabIndex={menuOpen ? 0 : -1}
            onClick={closeMenu}
          >
            {link.label}
          </Link>
        ))}
        <Link
          className="nav-cta mobile-cta"
          href="/#contact"
          tabIndex={menuOpen ? 0 : -1}
          onClick={closeMenu}
        >
          Let&apos;s talk <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </nav>
    </header>
  );
}
