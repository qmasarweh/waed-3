import { pillars } from "../content/site";
import { MarkRule } from "./MarkRule";
import { ScrollType } from "./motion/ScrollType";

export function Pillars() {
  return (
    <>
      {pillars.map((pillar, index) => (
        <section
          key={pillar.id}
          className={`section scene${index % 2 === 0 ? " section--alt" : ""}`}
          id={pillar.id}
        >
          <div className="shell">
            <div className="section-head section-head--center">
              <p className="eyebrow">{pillar.eyebrow}</p>
              <ScrollType text={pillar.title} mode={index % 2 === 0 ? "rise" : "drift"} />
              <MarkRule />
            </div>

            <div className="about-profile reveal reveal--up">
              {pillar.body.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
