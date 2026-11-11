import { Link } from "react-router-dom";
import { nav, site } from "../content/site";
import { asset } from "../lib/asset";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <img
            src={asset("/img/waed-logo-horizontal-navy.svg")}
            alt={site.legalName}
            width={240}
            height={52}
          />
          <p>
            Bahrain-based manufacturer of soap, detergents, cleaning and polishing preparations —
            for homes, families, and everyday cleaning across the region.
          </p>
        </div>
        <div className="footer-cols">
          <div>
            <strong>Explore</strong>
            {nav.map((item) => (
              <Link key={item.href} to={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
          <div>
            <strong>Contact</strong>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={`tel:${site.phoneHref}`}>{site.phoneDisplay}</a>
            <a href={site.mapLink} target="_blank" rel="noreferrer">
              Al Hidd, Kingdom of Bahrain
            </a>
          </div>
        </div>
      </div>
      <div className="shell footer-copy">
        © {year} {site.legalName}. All rights reserved.
      </div>
    </footer>
  );
}
