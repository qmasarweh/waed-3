import { markets } from "../content/site";
import { MarkRule } from "./MarkRule";
import { ScrollType } from "./motion/ScrollType";

export function Markets() {
  return (
    <section className="section scene" id="markets">
      <div className="shell">
        <div className="section-head section-head--center">
          <p className="eyebrow">{markets.eyebrow}</p>
          <ScrollType text={markets.title} mode="drift" />
          <MarkRule />
          <p className="lead reveal reveal--up">{markets.lead}</p>
          <p className="lead muted reveal reveal--up">{markets.body}</p>
        </div>

        <ul className="market-chips reveal reveal--up">
          {markets.targets.map((t) => (
            <li key={t}>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
