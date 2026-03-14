(() => {
  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const nav = document.getElementById("primary-nav");
  const navLinks = [...document.querySelectorAll(".site-nav__link")];
  const sections = [...document.querySelectorAll("[data-section]")];

  const setHeaderState = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 32);
  };

  const openMenu = () => {
    if (!header || !menuToggle || !nav) return;
    nav.setAttribute("aria-hidden", "false");
    header.classList.add("is-menu-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close menu");
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    if (!header || !menuToggle || !nav) return;
    header.classList.remove("is-menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    nav.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  const toggleMenu = () => {
    if (header && header.classList.contains("is-menu-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  if (menuToggle && nav) {
    if (window.matchMedia("(max-width: 900px)").matches) {
      nav.setAttribute("aria-hidden", "true");
    }
    menuToggle.addEventListener("click", toggleMenu);
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.matchMedia("(max-width: 900px)").matches) closeMenu();
      });
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && header && header.classList.contains("is-menu-open")) {
        closeMenu();
      }
    });
    window.addEventListener("resize", () => {
      if (window.matchMedia("(min-width: 901px)").matches) {
        if (header && header.classList.contains("is-menu-open")) closeMenu();
        nav.removeAttribute("aria-hidden");
      } else {
        if (!header || !header.classList.contains("is-menu-open")) nav.setAttribute("aria-hidden", "true");
      }
    });
  }

  const setActiveNav = (id) => {
    navLinks.forEach((link) => {
      const isMatch = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("is-active", isMatch);
      if (isMatch) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;
      setActiveNav(visible.target.id);
    },
    {
      rootMargin: "-35% 0px -45% 0px",
      threshold: [0.2, 0.4, 0.6]
    }
  );

  sections.forEach((section) => observer.observe(section));
  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });
})();
