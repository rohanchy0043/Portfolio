export type ProjectPreview = "menu" | "media" | "board";

export type Project = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  preview: ProjectPreview;
  status: string;
  technologies: string[];
  repositoryUrl?: string;
  liveUrl?: string;
  features?: string[];
  implementation?: string;
  audience?: string;
  motivation?: string;
  challenges?: string;
  lessons?: string;
};

// These concepts and summaries come from the portfolio brief. Add stack,
// screenshots, links, and implementation notes only when those details are ready.
export const projects: Project[] = [
  {
    slug: "menuqrpro",
    name: "MenuQRPro",
    category: "Restaurant technology / SaaS",
    summary:
      "A digital menu platform concept designed to help restaurants present their menus online and explore QR-based ordering workflows.",
    description:
      "MenuQRPro explores how restaurants could present a digital menu and guide guests into a QR-based ordering workflow.",
    preview: "menu",
    status: "Concept",
    technologies: [],
  },
  {
    slug: "sfera-x",
    name: "Sfera X",
    category: "AI detection / SaaS",
    summary:
      "An AI detection platform concept exploring workflows for analyzing potentially synthetic or manipulated media.",
    description:
      "Sfera X explores an interface for reviewing media that may be synthetic or manipulated. No detection accuracy or production capability is claimed.",
    preview: "media",
    status: "Concept",
    technologies: [],
  },
  {
    slug: "flowboard",
    name: "FlowBoard",
    category: "Productivity / web application",
    summary:
      "A productivity application concept focused on organizing tasks, monitoring progress, and creating a clear digital workspace.",
    description:
      "FlowBoard is a productivity application concept for organizing tasks, tracking progress, and keeping work in one clear workspace.",
    preview: "board",
    status: "Concept",
    technologies: [],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
