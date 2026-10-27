import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetails } from "@/components/projects/ProjectDetails";
import { getProjectBySlug, projects } from "@/data/projects";
import { siteConfig, siteRootUrl } from "@/lib/site-config";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  const title = project.name + " — Project";
  return {
    title,
    description: project.summary,
    alternates: {
      canonical: siteRootUrl() + "/projects/" + project.slug + "/",
    },
    openGraph: {
      type: "article",
      url: siteRootUrl() + "/projects/" + project.slug + "/",
      title: title + " | " + siteConfig.name,
      description: project.summary,
      images: [siteRootUrl() + "/opengraph-image.svg"],
    },
    twitter: {
      card: "summary_large_image",
      title: title + " | " + siteConfig.name,
      description: project.summary,
      images: [siteRootUrl() + "/opengraph-image.svg"],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div id="main-content">
      <ProjectDetails project={project} />
    </div>
  );
}
