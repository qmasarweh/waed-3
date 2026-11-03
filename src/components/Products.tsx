import { Link } from "react-router-dom";
import { brands } from "../content/site";
import { asset } from "../lib/asset";
import { BrandTitle } from "./BrandTitle";
import { ScrollType } from "./motion/ScrollType";

export function Products() {
  return (
    <section className="section scene scene--cover" id="products">
      <div className="shell">
        <div className="section-head section-head--center">
          <p className="eyebrow">Our Brands & Products</p>
          <ScrollType text={brands.title} mode="rise" />
          <div className="brands-mark" aria-hidden="true">
            <span className="brands-mark__lines">
              <i />
              <i />
            </span>
            <img
              className="brands-mark__logo"
              src={asset("/img/waed-logo-horizontal-navy.svg")}
              alt=""
              width={220}
              height={56}
            />
          </div>
          <p className="lead reveal reveal--up">{brands.lead}</p>
          <p className="lead muted reveal reveal--up">
            WAED Industrial is the company behind our household brands. Select a brand to explore
            products made for everyday home cleaning.
          </p>
        </div>

        <ul className="brand-card-grid reveal reveal--up" aria-label="WAED brands">
          {brands.catalog.map((brand) => (
            <li key={brand.id}>
              <Link className="brand-card" to={`/brands/${brand.id}`}>
                <img
                  className="brand-card__logo"
                  src={asset(brand.logo)}
                  alt={`${brand.name} logo`}
                  width={160}
                  height={160}
                  loading="lazy"
                />
                <strong>
                  <BrandTitle name={brand.name} className={brand.titleClass} />
                </strong>
                <p>{brand.tagline}</p>
                <span className="brand-card__meta">
                  {brand.products.length} products
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="brands-launch reveal reveal--up">
          <p className="brands-launch__kicker">Brand House</p>
          <h3 className="brands-launch__title">Explore the full brand house</h3>
          <p className="brands-launch__copy">
            Discover each brand identity, range, and market focus — manufactured by WAED Industrial
            in Bahrain.
          </p>
          <Link className="brands-launch__btn" to="/brands">
            Explore Our Brands
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
