export const siteConfig = {
  name: "Rohan Chaudhary",
  initials: "RC",
  headline: "Computer Science student · Web developer",
  location: "Nepal",
  email: "",
  siteUrl: "https://www.rohanchaudhary.com.np",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  githubUrl: "https://github.com/rohanchy0043",
  linkedinUrl: "https://www.linkedin.com/in/rohan-chaudhary-29a79834b",
  availability: {
    show: false,
    label: "Open to internships and freelance projects",
  },
  about: {
    paragraphs: [
      "I'm studying Computer Science and developing my skills in modern web technologies. I enjoy transforming ideas into practical software, building clean interfaces, and learning how frontend and backend systems work together.",
      "My goal is to create useful digital products that combine good design, maintainable code, and a thoughtful user experience.",
    ],
    currentlyLearning: "Modern frontend and full-stack web development",
    interestedIn: "SaaS, web applications, developer tools, and product engineering",
  },
  education: {
    program: "Bachelor of Science in Computer Science",
    institution: "University of Northampton",
    status: "Currently studying",
    startYear: "2025",
    currentSemester: "",
    expectedGraduationYear: "",
    coursework: [] as string[],
  },
  services: {
    show: true,
    items: [
      {
        title: "Business websites",
        description:
          "Clear, responsive websites that introduce a business and make its next step easy to find.",
      },
      {
        title: "Landing pages",
        description:
          "Focused pages for a product, service, or campaign, built around useful content and a direct call to action.",
      },
      {
        title: "Website redesigns",
        description:
          "A thoughtful refresh of existing pages, with attention to layout, accessibility, and smaller screens.",
      },
      {
        title: "Web application interfaces",
        description:
          "Frontend interfaces for dashboards, tools, and product workflows.",
      },
      {
        title: "SaaS MVP interfaces",
        description:
          "A first set of product screens to help shape an early software idea.",
      },
    ],
  },
} as const;

export const siteDescription =
  "Rohan Chaudhary is a Computer Science student and web developer in Nepal, building thoughtful websites and digital experiences.";

export function assetPath(path: string) {
  return (siteConfig.basePath || "") + path;
}

export function siteRootUrl() {
  return siteConfig.siteUrl.replace(/\/$/, "") + siteConfig.basePath;
}
