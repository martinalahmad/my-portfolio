// src/components/ServiceCard.tsx
type Props = { title: string; desc: string };
export default function ServiceCard({ title, desc }: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 hover:shadow-md transition">
      <div className="font-semibold">{title}</div>
      <p className="mt-2 text-sm text-gray-600">{desc}</p>
    </div>
  );
}
