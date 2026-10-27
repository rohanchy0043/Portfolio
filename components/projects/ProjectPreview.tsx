import { ArrowUpRight, AudioLines, CircleCheck, FileImage, ListTodo } from "lucide-react";
import type { Project } from "@/data/projects";

export function ProjectPreview({
  project,
  large = false,
}: {
  project: Project;
  large?: boolean;
}) {
  return (
    <div
      className={
        "product-preview preview-" +
        project.preview +
        (large ? " product-preview-large" : "")
      }
      role="img"
      aria-label={
        "Illustration for " +
        project.name +
        ", not a screenshot of a deployed product"
      }
    >
      <div className="preview-window-bar">
        <span className="preview-window-brand">{project.name}</span>
        <span className="preview-window-label">Concept illustration</span>
      </div>

      {project.preview === "menu" ? (
        <div className="menu-preview-content">
          <div className="menu-preview-copy">
            <span className="mock-overline">A MENU FOR EVERY TABLE</span>
            <strong>Good food.<br />One quick scan.</strong>
            <span className="mock-description">
              Explore the menu from your phone.
            </span>
            <span className="mock-action">
              Browse menu <ArrowUpRight size={13} aria-hidden="true" />
            </span>
          </div>
          <div className="menu-preview-art" aria-hidden="true">
            <span className="plate-ring plate-ring-outer" />
            <span className="plate-ring plate-ring-inner" />
            <span className="plate-garnish garnish-one" />
            <span className="plate-garnish garnish-two" />
            <span className="plate-center" />
          </div>
        </div>
      ) : null}

      {project.preview === "media" ? (
        <div className="media-preview-content">
          <div className="media-preview-heading">
            <span className="mock-overline">MEDIA REVIEW</span>
            <strong>Review a media file</strong>
            <span className="mock-description">
              An early interface concept for a careful review workflow.
            </span>
          </div>
          <div className="media-file-card">
            <span className="media-file-icon"><FileImage size={19} aria-hidden="true" /></span>
            <span className="media-file-copy">
              <strong>Image or recording</strong>
              <small>Choose a file to explore the concept</small>
            </span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </div>
          <div className="media-preview-state">
            <span><AudioLines size={16} aria-hidden="true" /></span>
            <div>
              <strong>Analysis workflow</strong>
              <small>Concept only · no result is shown</small>
            </div>
            <CircleCheck size={16} aria-hidden="true" />
          </div>
        </div>
      ) : null}

      {project.preview === "board" ? (
        <div className="board-preview-content">
          <div className="board-preview-heading">
            <span>
              <span className="board-heading-icon"><ListTodo size={15} aria-hidden="true" /></span>
              My workspace
            </span>
            <span className="board-menu-dots" aria-hidden="true">•••</span>
          </div>
          <div className="board-columns">
            <div className="board-column">
              <span className="board-column-title"><i />To do</span>
              <div className="board-task"><b>Review project notes</b><span>Personal</span></div>
              <div className="board-task"><b>Plan the next step</b><span>Study</span></div>
            </div>
            <div className="board-column">
              <span className="board-column-title"><i />In progress</span>
              <div className="board-task"><b>Organize a workspace</b><span>Web</span></div>
            </div>
            <div className="board-column board-column-done">
              <span className="board-column-title"><i />Done</span>
              <div className="board-task"><b>Set up a board</b><span>Today</span></div>
            </div>
          </div>
        </div>
      ) : null}

      <span className="preview-illustration-note">ILLUSTRATION · NOT A SCREENSHOT</span>
    </div>
  );
}
