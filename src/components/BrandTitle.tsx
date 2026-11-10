/** Renders brand names as normal text (same treatment as ENAYA). */
export function BrandTitle({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  return <span className={className.trim()}>{name}</span>;
}
