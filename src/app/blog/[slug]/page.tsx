import Image from "next/image";
import { getAll, getBySlug } from "@/lib/content";

export async function generateStaticParams() {
  const items = await getAll("blog");
  return items.map((p) => ({ slug: p.slug }));
}

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBySlug("blog", params.slug);
  if (!post) return null;

  return (
    <main className="mx-auto max-w-3xl px-4 lg:px-6 py-14">
      {post.cover && (
        <div className="relative h-72 w-full mb-6 rounded-xl overflow-hidden">
          <Image src={post.cover} alt={post.title} fill className="object-cover" />
        </div>
      )}
      <h1 className="text-3xl font-semibold text-white mb-6">{post.title}</h1>
      <article
        className="prose prose-invert prose-headings:text-white max-w-none"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </main>
  );
}
