import { useEffect } from "react";
import { Link } from "react-router-dom";
import { brands } from "../content/site";
import { asset } from "../lib/asset";
import { BrandTitle } from "../components/BrandTitle";
import { MarkRule } from "../components/MarkRule";
import { RevealObserver } from "../components/RevealObserver";
import { ScrollType } from "../components/motion/ScrollType";

export function BrandsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const page = brands.page;
  return (
    <>
      <main className="page-parallax is-ready brands-page">
        <section className="brands-hero" aria-label="Our Brands">
          <div className="brands-hero__media" aria-hidden="true">
            <picture>
              <source media="(max-width: 759px)" srcSet={asset("/img/hero-facility-mobile.jpg")} />
              <img
                src={asset("/img/hero-facility.jpg")}
                alt=""
                width={2048}
                height={1152}
                fetchPriority="high"
              />
            </picture>
            <div className="brands-hero__veil" />
          </div>
          <div className="shell brands-hero__content">
            <div className="brands-hero__panel">
              <p className="brands-hero__eyebrow">{page.eyebrow}</p>
              <h1 className="brands-hero__title">{page.title}</h1>
              <div className="brands-hero__rule" aria-hidden="true">
                <span className="brands-hero__rule-lines">
                  <i />
                  <i />
                </span>
                <img
                  className="brands-hero__rule-logo"
                  src={asset("/img/waed-logo-horizontal-white.svg")}
                  alt=""
                  width={220}
                  height={56}
                />
              </div>
              <p className="brands-hero__line">{page.heroLine}</p>
            </div>
          </div>
        </section>

        <section className="section brands-intro">
          <div className="shell brands-intro__grid">
            <ScrollType text="A house of brands, manufactured with precision." mode="rise" />
            <p className="lead reveal reveal--up">{page.intro}</p>
          </div>
        </section>

        <section className="section section--alt">
          <div className="shell">
            <ul className="brand-card-grid brand-card-grid--page reveal reveal--up" aria-label="WAED brands">
              {brands.catalog.map((brand) => (
                <li key={brand.id}>
                  <Link className="brand-card" to={`/brands/${brand.id}`}>
                    <img
                      className="brand-card__logo"
                      src={asset(brand.logo)}
                      alt={`${brand.name} logo`}
                      width={180}
                      height={180}
                      loading="lazy"
                    />
                    <strong>
                      <BrandTitle name={brand.name} className={brand.titleClass} />
                    </strong>
                    <p>{brand.tagline}</p>
                    <span className="brand-card__meta">
                      Explore {brand.products.length} products
                      <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section brands-cta">
          <div className="shell brands-cta__inner reveal reveal--up">
            <MarkRule />
            <h2>Discover household cleaning made in Bahrain.</h2>
            <p className="lead">
              Looking for home cleaning brands or a custom household product — talk to the team that
              makes them.
            </p>
            <div className="brands-cta__actions">
              <Link className="btn btn-primary" to={{ pathname: "/", hash: "contact" }}>
                Get in Touch
              </Link>
              <Link className="btn btn-ghost" to={{ pathname: "/", hash: "private-label" }}>
                Custom Home Brands
              </Link>
            </div>
          </div>
        </section>
      </main>
      <RevealObserver />
    </>
  );
}
