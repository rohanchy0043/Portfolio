import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { siteConfig } from "@/lib/site-config";

export function Projects() {
  return (
    <section className="content-section projects-section" id="projects">
      <div className="section-wrap">
        <div className="section-heading section-heading-row">
          <div>
            <p className="section-kicker">A selection of work</p>
            <h2>Projects with purpose.</h2>
          </div>
          <a
            className="text-link github-all"
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            More on GitHub <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <ProjectCard
              index={index}
              key={project.slug}
              project={project}
            />
          ))}
        </div>
        <div className="projects-mobile-link">
          <Link className="text-link" href={siteConfig.githubUrl}>
            Browse GitHub <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
