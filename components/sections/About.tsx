import { MapPin, Sparkles, Target } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const details = [
  {
    icon: Sparkles,
    label: "Currently learning",
    value: siteConfig.about.currentlyLearning,
  },
  {
    icon: Target,
    label: "Interested in",
    value: siteConfig.about.interestedIn,
  },
  {
    icon: MapPin,
    label: "Based in",
    value: siteConfig.location,
  },
];

export function About() {
  return (
    <section className="section-wrap content-section" id="about">
      <div className="section-heading">
        <p className="section-kicker">A bit of context</p>
        <h2>A little about me.</h2>
      </div>
      <div className="about-layout">
        <div className="about-copy">
          {siteConfig.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="about-facts">
          {details.map(({ icon: Icon, label, value }) => (
            <div className="fact-row" key={label}>
              <div className="fact-icon">
                <Icon size={17} strokeWidth={1.7} aria-hidden="true" />
              </div>
              <div>
                <p className="fact-label">{label}</p>
                <p className="fact-value">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
