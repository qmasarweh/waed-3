import { about } from "../content/site";
import { MarkRule } from "./MarkRule";
import { ScrollType } from "./motion/ScrollType";

export function About() {
  return (
    <section className="section scene scene--cover" id="about">
      <div className="shell">
        <div className="section-head section-head--center">
          <p className="eyebrow">{about.eyebrow}</p>
          <ScrollType text={about.title} mode="drift" />
          <MarkRule />
          {about.shortIntro.map((paragraph) => (
            <p className="lead muted reveal reveal--up" key={paragraph.slice(0, 32)}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
