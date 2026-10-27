import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Skills } from "@/components/sections/Skills";

export default function HomePage() {
  return (
    <main id="main-content">
      <div id="top">
        <Hero />
      </div>
      <About />
      <Projects />
      <Services />
      <Skills />
      <Education />
      <Contact />
    </main>
  );
}
