import Image from "next/image";
import { getAll, getBySlug } from "@/lib/content";

export async function generateStaticParams() {
  const items = await getAll("showcase");
  return items.map((p) => ({ slug: p.slug }));
}

export default async function ShowcaseItem({ params }: { params: { slug: string } }) {
  const item = await getBySlug("showcase", params.slug);
  if (!item) return null;

  return (
    <main className="mx-auto max-w-3xl px-4 lg:px-6 py-14">
      {item.cover && (
        <div className="relative h-72 w-full mb-6 rounded-xl overflow-hidden">
          <Image src={item.cover} alt={item.title} fill className="object-cover" />
        </div>
      )}
      <h1 className="text-3xl font-semibold text-white mb-6">{item.title}</h1>
      <article
        className="prose prose-invert prose-headings:text-white max-w-none"
        dangerouslySetInnerHTML={{ __html: item.contentHtml }}
      />
    </main>
  );
}
