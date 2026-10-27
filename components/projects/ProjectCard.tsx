import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectPreview } from "@/components/projects/ProjectPreview";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="project-card">
      <Link
        href={"/projects/" + project.slug + "/"}
        className="project-image-link"
        aria-label={"View " + project.name + " project details"}
      >
        <div className="project-image-frame">
          <ProjectPreview project={project} />
          <span className="project-index">0{index + 1}</span>
          <span className="image-open" aria-hidden="true">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </Link>
      <div className="project-card-copy">
        <div className="project-meta">
          <span>{project.category}</span>
          <span className="project-status">
            <span aria-hidden="true" /> {project.status}
          </span>
        </div>
        <h3>
          <Link href={"/projects/" + project.slug + "/"}>{project.name}</Link>
        </h3>
        <p>{project.summary}</p>
        {project.technologies.length > 0 ? (
          <div className="technology-list" aria-label="Technologies">
            {project.technologies.map((technology) => (
              <span className="technology-chip" key={technology}>
                {technology}
              </span>
            ))}
          </div>
        ) : (
          <p className="concept-note">Implementation details to be documented</p>
        )}
        <Link
          className="text-link project-link"
          href={"/projects/" + project.slug + "/"}
        >
          View case study <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
