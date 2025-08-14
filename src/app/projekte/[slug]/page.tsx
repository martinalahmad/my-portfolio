import Image from "next/image";
import { getAll, getBySlug } from "@/lib/content";

export async function generateStaticParams() {
  const items = await getAll("projects");
  return items.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getBySlug("projects", params.slug);
  if (!project) return null;

  return (
    <main className="mx-auto max-w-3xl px-4 lg:px-6 py-14">
      {project.cover && (
        <div className="relative h-72 w-full mb-6 rounded-xl overflow-hidden">
          <Image src={project.cover} alt={project.title} fill className="object-cover" />
        </div>
      )}
      <h1 className="text-3xl font-semibold text-white mb-6">{project.title}</h1>
      <article
        className="prose prose-invert prose-headings:text-white max-w-none"
        dangerouslySetInnerHTML={{ __html: project.contentHtml }}
      />
    </main>
  );
}
