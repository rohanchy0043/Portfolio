import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <section className="section-wrap content-section" id="skills">
      <div className="section-heading">
        <p className="section-kicker">The tools I explore</p>
        <h2>Skills &amp; technologies.</h2>
        <p className="section-intro">
          A working toolkit that grows with each project.
        </p>
      </div>
      <div className="skills-grid">
        {skillGroups.map((group, index) => (
          <article className="skill-group" key={group.title}>
            <div className="skill-group-heading">
              <span>0{index + 1}</span>
              <h3>{group.title}</h3>
            </div>
            <ul className="skill-list">
              {group.skills.map((skill) => (
                <li key={skill}>
                  {skill}
                  <ArrowUpRight size={13} aria-hidden="true" />
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className="skills-footnote">
        This list is editable in <code>data/skills.ts</code>.
      </p>
    </section>
  );
}
