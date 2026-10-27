import { ArrowUpRight, Code2, Link2, Mail } from "lucide-react";
import { ContactForm } from "@/components/sections/ContactForm";
import { siteConfig } from "@/lib/site-config";

export function Contact() {
  return (
    <section className="contact-section content-section" id="contact">
      <div className="section-wrap">
        <div className="contact-layout">
          <div className="contact-copy">
            <p className="section-kicker">Start a conversation</p>
            <h2>Have a project in mind?</h2>
            <p>
              I&apos;m interested in discussing web projects, internship
              opportunities, and collaborations.
            </p>
            <div className="contact-socials">
              <a href={siteConfig.githubUrl} target="_blank" rel="noreferrer">
                <Code2 size={17} aria-hidden="true" />
                GitHub <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <a href={siteConfig.linkedinUrl} target="_blank" rel="noreferrer">
                <Link2 size={17} aria-hidden="true" />
                LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              {siteConfig.email ? (
                <a href={"mailto:" + siteConfig.email}>
                  <Mail size={17} aria-hidden="true" />
                  Email <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              ) : (
                <a href="#contact-form">
                  <Mail size={17} aria-hidden="true" />
                  Contact form <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
