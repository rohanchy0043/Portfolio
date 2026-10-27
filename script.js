const siteConfig = {
  email: "rohanchaudhary0980@gmail.com",
};

document.documentElement.classList.add("js", "motion-ready");

const revealItems = [...document.querySelectorAll("[data-reveal]")];
revealItems.forEach((item, index) => {
  item.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 65}ms`);
});

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const menuButton = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");
if (menuButton && primaryNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    primaryNav.classList.toggle("is-open", !isOpen);
  });
  primaryNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      primaryNav.classList.remove("is-open");
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      primaryNav.classList.remove("is-open");
      menuButton.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!primaryNav.contains(event.target) && !menuButton.contains(event.target)) {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      primaryNav.classList.remove("is-open");
    }
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      primaryNav.classList.remove("is-open");
    }
  });
}

document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

const configuredEmail = siteConfig.email.trim();
if (configuredEmail) {
  document.querySelectorAll("[data-email-link]").forEach((link) => {
    link.href = `mailto:${configuredEmail}`;
    link.hidden = false;
  });
  document.querySelectorAll(".email-separator").forEach((separator) => { separator.hidden = false; });
} else {
  document.querySelectorAll("[data-email-link]").forEach((link) => { link.hidden = true; });
  document.querySelectorAll(".email-separator").forEach((separator) => { separator.hidden = true; });
}
