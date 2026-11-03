/** Renders brand names; leenX keeps soft lowercase leen beside a large X. */
export function BrandTitle({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  if (className.includes("leenx-title")) {
    return (
      <span className={className.trim()}>
        <span className="leenx-title__soft">leen</span>
        <span className="leenx-title__x">X</span>
      </span>
    );
  }

  return <span className={className.trim()}>{name}</span>;
}
