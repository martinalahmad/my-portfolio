import Link from "next/link";
import Image from "next/image";
import { getAll } from "@/lib/content";

export default async function ProjektePage() {
  const projects = await getAll("projects");

  return (
    <main className="mx-auto max-w-7xl px-4 lg:px-6 py-14">
      <h1 className="text-3xl font-semibold text-white mb-8">Projekte</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <Link
            key={p.slug}
            href={`/projekte/${p.slug}`}
            className="group rounded-xl border border-white/10 overflow-hidden bg-white/5 hover:bg-white/10"
          >
            {p.cover && (
              <div className="relative h-48 w-full">
                <Image src={p.cover} alt={p.title} fill className="object-cover" />
              </div>
            )}
            <div className="p-4">
              <h2 className="text-lg font-medium text-white group-hover:opacity-90">{p.title}</h2>
              {p.summary && <p className="mt-2 text-sm text-white/60 line-clamp-2">{p.summary}</p>}
              {p.tags?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70">
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
