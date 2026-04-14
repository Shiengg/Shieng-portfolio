import { useState, useEffect, type MouseEvent } from "react";

const navItems = [
  { label: "HOME", href: "#" },
  { label: "PROJECTS", href: "#projects" },
  { label: "ABOUT", href: "#about" },
  { label: "RESUME", href: "/resume" },
]

type NavbarProps = {
  onContactClick: () => void;
};

const Navbar = ({ onContactClick }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) {
      return;
    }

    event.preventDefault();
    if (href === "#") {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
      return;
    }

    const target = document.querySelector(href);
    if (!target) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
    window.history.replaceState(null, "", href);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  return (
    <>
      <div
        className="absolute left-4 top-4 z-50 border-[3px] border-foreground bg-background px-4 py-2 font-mono text-lg font-bold tracking-tighter"
        style={{ boxShadow: "var(--brutal-shadow)" }}
      >
        {"<SHIENG/>"}
      </div>

      <nav
        className={`nav-brutal transition-all duration-300 ${scrolled ? "top-2 py-2 px-4 bg-white" : "top-4 py-3 px-6 bg-white"
          }`}
      >
        <div className="hidden md:flex gap-1">
          {navItems.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className="relative px-4 py-2 font-mono text-sm font-bold uppercase tracking-wider transition-all duration-100"
              onClick={(event) => handleNavClick(event, item.href)}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                background: hoveredIdx === i ? "hsl(var(--neon-green))" : "transparent",
                transform: hoveredIdx === i ? "translate(-2px, -2px)" : "none",
                boxShadow: hoveredIdx === i ? "var(--brutal-shadow)" : "none",
                border: hoveredIdx === i ? "3px solid hsl(var(--foreground))" : "3px solid transparent",
              }}
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="ml-4 hidden lg:inline-flex items-center justify-center rounded-full border-[3px] border-black bg-[#E8D22C] px-7 py-2 font-mono text-sm font-extrabold uppercase tracking-[0.12em] text-black transition-transform duration-100"
          style={{ boxShadow: "5px 5px 0 #000" }}
          onClick={onContactClick}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translate(-1px, -1px)";
            e.currentTarget.style.boxShadow = "6px 6px 0 #000";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translate(0, 0)";
            e.currentTarget.style.boxShadow = "5px 5px 0 #000";
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "translate(2px, 2px)";
            e.currentTarget.style.boxShadow = "3px 3px 0 #000";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = "translate(-1px, -1px)";
            e.currentTarget.style.boxShadow = "6px 6px 0 #000";
          }}
        >
          CONTACT
        </button>
      </nav>
    </>
  )
}

export default Navbar;