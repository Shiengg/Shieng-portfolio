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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <div
        className="absolute left-2 top-2 z-50 border-[3px] border-foreground bg-background px-3 py-2 font-mono text-base font-bold tracking-tighter sm:left-4 sm:top-4 sm:px-4 sm:text-lg"
        style={{ boxShadow: "var(--brutal-shadow)" }}
      >
        {"<SHIENG/>"}
      </div>

      <nav
        className={`nav-brutal left-auto right-2 -translate-x-0 sm:right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 transition-all duration-300 ${scrolled ? "top-2 py-2 px-3 sm:px-4 bg-white" : "top-2 sm:top-4 py-2 sm:py-3 px-3 sm:px-6 bg-white"
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
          className="md:hidden inline-flex h-12 w-12 items-center justify-center border-[3px] border-foreground bg-background transition-transform duration-100"
          style={{
            boxShadow: isMobileMenuOpen ? "2px 2px 0 hsl(var(--foreground))" : "var(--brutal-shadow)",
            transform: isMobileMenuOpen ? "translate(2px, 2px)" : "translate(0, 0)",
          }}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          <span className="sr-only">Open menu</span>
          <div className="relative flex h-7 w-7 items-center justify-center">
            <span
              className="absolute block h-1 w-6 bg-black transition-transform duration-150"
              style={{ transform: isMobileMenuOpen ? "translateY(0) rotate(45deg)" : "translateY(-8px) rotate(0deg)" }}
            />
            <span
              className="absolute block h-1 w-6 bg-black transition-opacity duration-150"
              style={{ opacity: isMobileMenuOpen ? 0 : 1 }}
            />
            <span
              className="absolute block h-1 w-6 bg-black transition-transform duration-150"
              style={{ transform: isMobileMenuOpen ? "translateY(0) rotate(-45deg)" : "translateY(8px) rotate(0deg)" }}
            />
          </div>
        </button>

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

        {isMobileMenuOpen ? (
          <div className="absolute right-0 top-[calc(100%+10px)] w-56 md:hidden border-[3px] border-foreground bg-white p-3" style={{ boxShadow: "var(--brutal-shadow-lg)" }}>
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={`mobile-${item.href}`}
                  href={item.href}
                  className="border-[3px] border-transparent px-3 py-2 font-mono text-sm font-bold uppercase tracking-wider transition-colors duration-100 hover:border-foreground hover:bg-[hsl(var(--neon-green))]"
                  onClick={(event) => {
                    handleNavClick(event, item.href);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </a>
              ))}
              <button
                type="button"
                className="mt-1 border-[3px] border-black bg-[#E8D22C] px-4 py-2 font-mono text-sm font-extrabold uppercase tracking-[0.12em] text-black"
                style={{ boxShadow: "5px 5px 0 #000" }}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onContactClick();
                }}
              >
                CONTACT
              </button>
            </div>
          </div>
        ) : null}
      </nav>
    </>
  )
}

export default Navbar;