import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type Doc = {
  title: string;
  slug: string;
  date?: string;
  cover?: string;
  tags?: string[];
  summary?: string;
  contentHtml: string;
};

type Collection = "blog" | "projects" | "showcase";

function collectionDir(collection: Collection) {
  return path.join(process.cwd(), "content", collection);
}

function readMarkdownFile(fullPath: string) {
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  return { data, content };
}

function resolveFilePath(dir: string, slug: string): string | null {
  const candidates = [".md", ".mdx"].map(ext => path.join(dir, slug + ext));
  for (const file of candidates) {
    if (fs.existsSync(file)) return file;
  }
  return null;
}

export function getSlugs(collection: Collection): string[] {
  const dir = collectionDir(collection);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter(f => f.endsWith(".md") || f.endsWith(".mdx"))
    .map(f => f.replace(/\.mdx?$/, ""));
}

export async function getBySlug(collection: Collection, slug: string): Promise<Doc | null> {
  const dir = collectionDir(collection);
  const filePath = resolveFilePath(dir, slug);
  if (!filePath) return null;

  const { data, content } = readMarkdownFile(filePath);
  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  return {
    title: (data.title as string) ?? slug,
    slug,
    date: data.date as string | undefined,
    cover: data.cover as string | undefined,
    tags: (data.tags as string[] | undefined) ?? [],
    summary: data.summary as string | undefined,
    contentHtml,
  };
}

export async function getAll(collection: Collection): Promise<Doc[]> {
  const dir = collectionDir(collection);
  if (!fs.existsSync(dir)) return [];

  const files = fs
    .readdirSync(dir)
    .filter(f => f.endsWith(".md") || f.endsWith(".mdx"));

  const docs = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const fullPath = path.join(dir, file);
      const { data, content } = readMarkdownFile(fullPath);
      const processed = await remark().use(html).process(content);
      const contentHtml = processed.toString();

      return {
        title: (data.title as string) ?? slug,
        slug: (data.slug as string) ?? slug,
        date: data.date as string | undefined,
        cover: data.cover as string | undefined,
        tags: (data.tags as string[] | undefined) ?? [],
        summary: data.summary as string | undefined,
        contentHtml,
      } as Doc;
    })
  );

  return docs.sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return a.date < b.date ? 1 : -1;
  });
}
