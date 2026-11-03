import { asset } from "../lib/asset";

/** Thin section divider with the vertical WAED logo. */
export function MarkRule({ className = "" }: { className?: string }) {
  return (
    <div className={`mark-rule ${className}`.trim()} aria-hidden="true">
      <span />
      <img
        className="mark-rule__icon"
        src={asset("/img/waed-logo-vertical-white.svg")}
        alt=""
        width={22}
        height={22}
      />
      <span />
    </div>
  );
}
