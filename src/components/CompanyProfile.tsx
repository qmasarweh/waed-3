import { about } from "../content/site";
import { MarkRule } from "./MarkRule";
import { ScrollType } from "./motion/ScrollType";

export function CompanyProfile() {
  return (
    <section className="section section--alt scene" id="about-us">
      <div className="shell">
        <div className="section-head section-head--center">
          <p className="eyebrow">{about.profileEyebrow}</p>
          <ScrollType text={about.profileTitle} mode="rise" />
          <MarkRule />
        </div>

        <div className="about-profile reveal reveal--up">
          {about.fullProfile.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
