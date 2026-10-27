import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { projects } from "@/data/projects";
import { siteConfig } from "@/lib/site-config";

export function Education() {
  return (
    <section className="education-section content-section" id="education">
      <div className="section-wrap education-layout">
        <div>
          <p className="section-kicker">Learning in progress</p>
          <h2>Education &amp; learning.</h2>
          <p className="education-intro">
            Building a foundation in computer science and putting it to work
            through independent projects.
          </p>
        </div>
        <div className="education-timeline">
          <article className="education-item">
            <div className="timeline-marker" aria-hidden="true" />
            <p className="education-period">
              {siteConfig.education.startYear} — Present
            </p>
            <h3>{siteConfig.education.program}</h3>
            <p className="education-school">{siteConfig.education.institution}</p>
            <p className="education-status">{siteConfig.education.status}</p>
            {siteConfig.education.currentSemester ? (
              <p className="education-extra">
                Current semester: {siteConfig.education.currentSemester}
              </p>
            ) : null}
            {siteConfig.education.expectedGraduationYear ? (
              <p className="education-extra">
                Expected graduation: {siteConfig.education.expectedGraduationYear}
              </p>
            ) : null}
            {siteConfig.education.coursework.length > 0 ? (
              <div className="education-coursework">
                <span className="detail-label">Relevant coursework</span>
                <span className="detail-value">
                  {siteConfig.education.coursework.join(" · ")}
                </span>
              </div>
            ) : null}
          </article>
          <article className="education-item projects-learning">
            <div className="timeline-marker" aria-hidden="true" />
            <p className="education-period">Practice beyond the classroom</p>
            <h3>Learning Through Projects</h3>
            <p className="education-school">
              Exploring interface design and frontend development in personal
              projects.
            </p>
            <Link className="text-link" href="/#projects">
              See selected work <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
