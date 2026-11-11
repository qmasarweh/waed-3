import { factory, site } from "../content/site";
import { asset } from "../lib/asset";
import { MarkRule } from "./MarkRule";
import { ScrollType } from "./motion/ScrollType";
import { Parallax } from "./motion/Parallax";

export function Factory() {
  const phasedSteps = factory.journey.phases.reduce<
    { phaseId: string; label: string; title: string; steps: { no: number; label: string }[] }[]
  >((acc, phase) => {
    const start = acc.reduce((n, p) => n + p.steps.length, 0);
    acc.push({
      phaseId: phase.id,
      label: phase.label,
      title: phase.title,
      steps: phase.steps.map((step, i) => ({ no: start + i + 1, label: step })),
    });
    return acc;
  }, []);

  return (
    <section className="section section--alt scene" id="factory">
      <div className="shell">
        <div className="split split--media split--parallax">
          <div className="section-head">
            <p className="eyebrow">{factory.eyebrow}</p>
            <ScrollType text={factory.title} mode="rise" />
            <MarkRule className="mark-rule--left" />
            <p className="lead reveal reveal--up">{factory.lead}</p>
            {factory.body.map((paragraph) => (
              <p className="lead muted reveal reveal--up" key={paragraph.slice(0, 40)}>
                {paragraph}
              </p>
            ))}
            <p className="lead muted reveal reveal--up">{factory.location}</p>
            <p className="section-head__action reveal reveal--up">
              <a className="btn btn-primary" href={site.mapLink} target="_blank" rel="noreferrer">
                Open in Maps
              </a>
            </p>
          </div>
          <figure
            className="media-frame media-frame--parallax media-frame--fit reveal reveal--scale"
            style={{ aspectRatio: "686 / 1024" }}
          >
            <Parallax speed="fast" scale={1} distance={0}>
              <img
                src={asset("/img/factory-machines.jpg")}
                alt="Mixing tanks on the WAED Industrial production floor in Al Hidd"
                width={686}
                height={1024}
                loading="lazy"
              />
            </Parallax>
            <figcaption>Production floor · Al Hidd, Bahrain</figcaption>
          </figure>
        </div>

        <div className="factory-journey reveal reveal--up">
          <div className="factory-journey__head">
            <p className="factory-journey__kicker">{factory.journey.kicker}</p>
            <h3 className="factory-journey__title">{factory.journey.title}</h3>
          </div>

          <div className="factory-journey__phases" aria-label="WAED manufacturing journey">
            {phasedSteps.map((phase) => (
              <article className="factory-journey__phase" key={phase.phaseId}>
                <p className="factory-journey__phase-label">{phase.label}</p>
                <h4 className="factory-journey__phase-title">{phase.title}</h4>
                <ol className="factory-journey__steps">
                  {phase.steps.map((step) => (
                    <li key={step.label}>
                      <span>{String(step.no).padStart(2, "0")}</span>
                      <strong>{step.label}</strong>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
