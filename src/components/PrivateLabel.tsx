import { privateLabel } from "../content/site";
import { asset } from "../lib/asset";
import { MarkRule } from "./MarkRule";
import { ScrollType } from "./motion/ScrollType";
import { Parallax } from "./motion/Parallax";
import { Marquee } from "./motion/Marquee";

export function PrivateLabel() {
  return (
    <section className="section section--alt scene" id="private-label">
      <div className="shell split split--media split--parallax">
        <div className="section-head">
          <p className="eyebrow">{privateLabel.eyebrow}</p>
          <ScrollType text={privateLabel.title} mode="rise" />
          <MarkRule className="mark-rule--left" />
          <p className="lead reveal reveal--up">{privateLabel.lead}</p>
          {privateLabel.body.map((paragraph) => (
            <p className="lead muted reveal reveal--up" key={paragraph.slice(0, 40)}>
              {paragraph}
            </p>
          ))}
          <p className="section-head__action reveal reveal--up">
            <a className="btn btn-primary" href="#contact">
              {privateLabel.cta}
            </a>
          </p>
        </div>

        <div className="private-label__media reveal reveal--right">
          <figure
            className="media-frame media-frame--parallax media-frame--fit"
            style={{ aspectRatio: "800 / 1328" }}
          >
            <Parallax speed="medium" scale={1} distance={0}>
              <img
                src={asset("/img/office.jpg")}
                alt="WAED Industrial meeting room"
                width={616}
                height={1024}
                loading="lazy"
              />
            </Parallax>
          </figure>
        </div>
      </div>

      <div className="shell private-label__services reveal reveal--up" id="our-services">
        <div className="section-head section-head--center">
          <p className="eyebrow">What we offer</p>
          <h3 className="private-label__services-title">{privateLabel.servicesTitle}</h3>
          <MarkRule />
        </div>
        <ul className="service-list" aria-label={privateLabel.servicesTitle}>
          {privateLabel.services.map((service, index) => (
            <li key={service}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{service}</strong>
            </li>
          ))}
        </ul>
      </div>

      <div className="private-label__marquee reveal reveal--up">
        <Marquee items={[...privateLabel.services]} />
        <Marquee items={[...privateLabel.services]} reverse />
      </div>
    </section>
  );
}
