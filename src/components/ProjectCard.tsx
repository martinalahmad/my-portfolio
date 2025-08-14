type Props = { title: string; tag: string; href?: string };
export default function ProjectCard({ title, tag, href = "#" }: Props) {
  return (
    <a href={href} className="group block overflow-hidden rounded-xl border border-gray-200 hover:shadow-md transition">
      <div className="aspect-[4/3] w-full bg-gradient-to-br from-gray-50 to-gray-100" />
      <div className="p-4">
        <div className="text-xs text-gray-500">{tag}</div>
        <div className="mt-1 font-semibold group-hover:text-gray-700">{title}</div>
      </div>
    </a>
  );
}
