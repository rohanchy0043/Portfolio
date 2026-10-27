import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function Services() {
  if (!siteConfig.services.show) return null;

  return (
    <section className="section-wrap content-section services-section" id="services">
      <div className="section-heading section-heading-row">
        <div>
          <p className="section-kicker">Freelance work</p>
          <h2>Digital work, thoughtfully delivered.</h2>
          <p className="section-intro">
            A few ways I can help shape a website or early product.
          </p>
        </div>
        <Link className="button button-secondary service-cta" href="/#contact">
          Discuss a project <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
      <div className="services-grid">
        {siteConfig.services.items.map((service, index) => (
          <article className="service-item" key={service.title}>
            <span className="service-number">0{index + 1}</span>
            <div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
            <ArrowUpRight className="service-arrow" size={16} aria-hidden="true" />
          </article>
        ))}
      </div>
    </section>
  );
}
