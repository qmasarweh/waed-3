import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getBrand } from "../content/site";
import { asset } from "../lib/asset";
import { BrandTitle } from "../components/BrandTitle";
import { MarkRule } from "../components/MarkRule";
import { ProductVariants } from "../components/ProductVariants";
import { RevealObserver } from "../components/RevealObserver";

export function BrandPage() {
  const { brandId = "" } = useParams();
  if (brandId === "lean-x") {
    return <Navigate to="/brands/leen-x" replace />;
  }
  const brand = getBrand(brandId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [brandId]);

  if (!brand) {
    return <Navigate to="/brands" replace />;
  }

  return (
    <>
      <main className="page-parallax is-ready brand-page">
        <section className="brand-page__hero" aria-label={brand.name}>
          <div className="shell brand-page__hero-inner">
            <p className="brand-page__crumb">
              <Link to="/brands">Our Brands</Link>
              <span aria-hidden="true">/</span>
              <span>{brand.name}</span>
            </p>

            <div className="brand-page__identity reveal reveal--up">
              <img
                className="brand-page__logo"
                src={asset(brand.logo)}
                alt={`${brand.name} logo`}
                width={200}
                height={200}
              />
              <div className="brand-page__intro">
                <p className="eyebrow">Brand by WAED Industrial</p>
                <h1>
                  <BrandTitle name={brand.name} className={brand.titleClass} />
                </h1>
                <p className="brand-page__tagline">{brand.tagline}</p>
                <MarkRule />
                <p className="brand-page__story">{brand.story}</p>
                <ul className="brand-page__focus" aria-label={`${brand.name} focus markets`}>
                  {brand.focus.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section brand-page__products" aria-labelledby="brand-products-title">
          <div className="shell">
            <div className="section-head section-head--center">
              <p className="eyebrow">Products</p>
              <h2 id="brand-products-title" className="brand-page__products-title">
                {brand.name} Product Range
              </h2>
              <MarkRule />
              <p className="lead reveal reveal--up">
                Explore the {brand.name} range — manufactured by WAED Industrial in Bahrain.
              </p>
            </div>

            <ul className="brand-product-grid reveal reveal--up" aria-label={`${brand.name} products`}>
              {brand.products.map((product, i) => {
                const variants = ("variants" in product ? product.variants : undefined) ?? [];
                return (
                <li key={product.name} className="brand-product">
                  <div className="brand-product__media">
                    {variants.length > 1 ? (
                      <ProductVariants name={product.name} variants={variants} />
                    ) : product.image ? (
                      <img src={asset(product.image)} alt={product.name} loading="lazy" />
                    ) : (
                      <div className="brand-product__placeholder" aria-hidden="true">
                        <span>{String(i + 1).padStart(2, "0")}</span>
                      </div>
                    )}
                  </div>
                  <div className="brand-product__copy">
                    <span className="brand-product__cat">{product.category}</span>
                    <strong>{product.name}</strong>
                    <p>{product.body}</p>
                  </div>
                </li>
                );
              })}
            </ul>

            <div className="brand-page__actions reveal reveal--up">
              <Link className="btn btn-ghost" to="/brands">
                Back to Our Brands
              </Link>
              <Link className="btn btn-primary" to={{ pathname: "/", hash: "contact" }}>
                Request a Quote
              </Link>
            </div>
          </div>
        </section>
      </main>
      <RevealObserver />
    </>
  );
}
