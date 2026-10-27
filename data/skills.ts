export type SkillGroup = {
  title: string;
  skills: string[];
};

// Edit these examples to match the technologies you can confidently discuss.
export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
    ],
  },
  {
    title: "Backend & data",
    skills: [
      "Node.js",
      "REST APIs",
      "PostgreSQL",
      "Supabase",
      "Authentication fundamentals",
    ],
  },
  {
    title: "Development tools",
    skills: ["Git", "GitHub", "VS Code", "Vercel", "Figma"],
  },
];
