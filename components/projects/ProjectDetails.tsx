import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ExternalLink,
  Code2,
} from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectPreview } from "@/components/projects/ProjectPreview";

export function ProjectDetails({ project }: { project: Project }) {
  return (
    <main className="project-detail-main">
      <div className="section-wrap">
        <Link className="back-link" href="/#projects">
          <ArrowLeft size={16} aria-hidden="true" />
          Back to projects
        </Link>

        <header className="project-detail-header">
          <p className="section-kicker">{project.category}</p>
          <h1>{project.name}</h1>
          <p className="project-detail-summary">{project.summary}</p>
          <div className="project-detail-actions">
            {project.liveUrl ? (
              <a
                className="button button-primary"
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
              >
                View live project <ExternalLink size={15} aria-hidden="true" />
              </a>
            ) : null}
            {project.repositoryUrl ? (
              <a
                className="button button-secondary"
                href={project.repositoryUrl}
                target="_blank"
                rel="noreferrer"
              >
                Source code <Code2 size={16} aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </header>

        <figure className="detail-image-frame">
          <ProjectPreview project={project} large />
          <figcaption>Illustration · not a deployed product screenshot</figcaption>
        </figure>

        <div className="detail-content-grid">
          <aside className="project-facts">
            <div className="fact-block">
              <span className="detail-label">Status</span>
              <span className="detail-value">{project.status}</span>
            </div>
            <div className="fact-block">
              <span className="detail-label">Category</span>
              <span className="detail-value">{project.category}</span>
            </div>
            <div className="fact-block">
              <span className="detail-label">Built with</span>
              {project.technologies.length > 0 ? (
                <div className="technology-list detail-technologies">
                  {project.technologies.map((technology) => (
                    <span className="technology-chip" key={technology}>
                      {technology}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="detail-value">To be documented</span>
              )}
            </div>
            {project.repositoryUrl ? (
              <a
                className="text-link detail-repo-link"
                href={project.repositoryUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open repository <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            ) : null}
          </aside>

          <div className="detail-main-copy">
            <section className="detail-section">
              <p className="section-kicker">Overview</p>
              <h2>About the project</h2>
              <p>{project.description}</p>
            </section>

            {project.motivation ? (
              <section className="detail-section">
                <p className="section-kicker">Motivation</p>
                <h2>Why I explored it</h2>
                <p>{project.motivation}</p>
              </section>
            ) : null}

            {project.audience ? (
              <section className="detail-section">
                <p className="section-kicker">Audience</p>
                <h2>Who it is for</h2>
                <p>{project.audience}</p>
              </section>
            ) : null}

            {project.features && project.features.length > 0 ? (
              <section className="detail-section">
                <p className="section-kicker">Project notes</p>
                <h2>Key features</h2>
                <ul className="feature-list">
                  {project.features.map((feature) => (
                    <li key={feature}>
                      <span className="feature-check">
                        <Check size={13} aria-hidden="true" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {project.implementation ? (
              <section className="detail-section implementation-section">
                <p className="section-kicker">Implementation</p>
                <h2>Technology</h2>
                <p>{project.implementation}</p>
              </section>
            ) : null}

            {project.challenges ? (
              <section className="detail-section">
                <p className="section-kicker">Challenges</p>
                <h2>What took thought</h2>
                <p>{project.challenges}</p>
              </section>
            ) : null}

            {project.lessons ? (
              <section className="detail-section">
                <p className="section-kicker">Takeaways</p>
                <h2>What I learned</h2>
                <p>{project.lessons}</p>
              </section>
            ) : null}
          </div>
        </div>

        <div className="detail-end-link">
          <Link className="text-link" href="/#projects">
            <ArrowLeft size={15} aria-hidden="true" />
            More selected projects
          </Link>
          <Link className="text-link" href="/#contact">
            Start a conversation <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </main>
  );
}
