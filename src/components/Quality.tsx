import { quality } from "../content/site";
import { MarkRule } from "./MarkRule";
import { ScrollType } from "./motion/ScrollType";

export function Quality() {
  return (
    <section className="section section--navy scene scene--cover" id="quality">
      <div className="shell">
        <div className="section-head section-head--center section-head--on-dark">
          <p className="eyebrow">{quality.eyebrow}</p>
          <ScrollType text={quality.title} mode="drift" />
          <MarkRule className="mark-rule--light" />
          <p className="lead reveal reveal--up">{quality.lead}</p>
          {quality.body.map((paragraph) => (
            <p className="lead reveal reveal--up" key={paragraph.slice(0, 40)}>
              {paragraph}
            </p>
          ))}
        </div>

        <p className="cert-heading reveal reveal--up">Our Certifications</p>
        <div className="cert-row">
          {quality.certifications.map((c) => (
            <article className="cert reveal reveal--up" key={c.code}>
              <div className="cert__mark" aria-hidden="true">
                <span>ISO</span>
                <strong>{c.mark}</strong>
              </div>
              <div className="cert__copy">
                <strong>{c.code}</strong>
                <span>{c.title}</span>
              </div>
            </article>
          ))}
        </div>
        <p className="cert-note reveal reveal--up">{quality.note}</p>
      </div>
    </section>
  );
}
