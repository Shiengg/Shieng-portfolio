import { useState, useEffect } from "react";

const navItems = [
    {label: "HOME", href: "/"},
    {label: "ABOUT", href: "/about"},
    {label: "PROJECTS", href: "/projects"},
    {label: "RESUME", href: "/resume"},
]

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [])

    return (
        <nav
            className={`nav-brutal transition-all duration-300 ${
                scrolled ? "top-2 py-2 px-4 bg-white" : "top-4 py-3 px-6 bg-white"
            }`}
        >
            <a href="#" className="font-mono font-bold text-lg tracking-tighter mr-4">
        {"<SHIENG/>"}
      </a>
      <div className="hidden md:flex gap-1">
        {navItems.map((item, i) => (
          <a
            key={item.href}
            href={item.href}
            className="relative px-4 py-2 font-mono text-sm font-bold uppercase tracking-wider transition-all duration-100"
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

      <a
        href="#contact"
        className="ml-4 hidden lg:inline-flex items-center justify-center rounded-full border-[3px] border-black bg-[#E8D22C] px-7 py-2 font-mono text-sm font-extrabold uppercase tracking-[0.12em] text-black transition-transform duration-100"
        style={{ boxShadow: "5px 5px 0 #000" }}
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
      </a>
        </nav>
    )
}

export default Navbar;