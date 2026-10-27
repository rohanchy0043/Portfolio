import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Code2, Link2, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { projects } from "@/data/projects";
import { ProjectPreview } from "@/components/projects/ProjectPreview";

const featuredProject = projects[0];

export function Hero() {
  return (
    <section className="hero section-wrap" aria-labelledby="hero-title">
      <div className="hero-copy">
        <div className="eyebrow">
          <span className="eyebrow-rule" />
          {siteConfig.headline}
        </div>
        <h1 id="hero-title">
          Building thoughtful
          <br className="desktop-break" /> digital experiences.
        </h1>
        <p className="hero-description">
          I&apos;m a Computer Science student and web developer focused on
          creating modern websites, useful web applications, and SaaS products
          with clean design and reliable functionality.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/#projects">
            Explore my work <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <Link className="button button-secondary" href="/#contact">
            Get in touch <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
        {siteConfig.availability.show ? (
          <p className="availability">
            <span aria-hidden="true" /> {siteConfig.availability.label}
          </p>
        ) : null}
        <div className="hero-location">
          <MapPin size={15} aria-hidden="true" />
          <span>Based in {siteConfig.location}</span>
        </div>
        <div className="hero-social-links" aria-label="Social profiles">
          <a href={siteConfig.githubUrl} target="_blank" rel="noreferrer">
            <Code2 size={15} aria-hidden="true" /> GitHub
            <ArrowUpRight size={12} aria-hidden="true" />
          </a>
          <a href={siteConfig.linkedinUrl} target="_blank" rel="noreferrer">
            <Link2 size={15} aria-hidden="true" /> LinkedIn
            <ArrowUpRight size={12} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="hero-art">
        <div className="hero-art-topline">
          <span>Selected work</span>
          <span>01 / 03</span>
        </div>
        <Link
          href={"/projects/" + featuredProject.slug + "/"}
          className="hero-preview"
          aria-label={"View " + featuredProject.name + " project"}
        >
          <ProjectPreview project={featuredProject} />
          <span className="hero-preview-arrow" aria-hidden="true">
            <ArrowUpRight size={17} />
          </span>
        </Link>
        <div className="hero-art-foot">
          <span>Independent projects</span>
          <span className="hero-art-index" aria-hidden="true">R / C</span>
        </div>
      </div>
      <a className="scroll-cue" href="#about">
        <span>Scroll to explore</span>
        <ArrowDown size={15} aria-hidden="true" />
      </a>
    </section>
  );
}
