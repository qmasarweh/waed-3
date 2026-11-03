export function CtaBand() {
  return (
    <section className="cta-band" aria-label="Request a quote">
      <div className="shell cta-band__inner reveal reveal--up">
        <div>
          <p className="eyebrow">Next step</p>
          <h2>Ready for cleaner homes with WAED?</h2>
          <p className="lead">
            Tell us which household products you need — or ask about a custom home brand — and our
            team will respond with details.
          </p>
        </div>
        <div className="cta-band__actions">
          <a className="btn btn-primary" href="#contact">
            Get in Touch
          </a>
          <a className="btn btn-ghost" href="#private-label">
            Custom Home Brands
          </a>
        </div>
      </div>
    </section>
  );
}
