import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const marqueeItems = ['REACT', 'TYPESCRIPT', 'NODE.JS', 'NEXT.JS', 'TAILWIND', 'POSTGRESQL'];
  const marqueeSequence = [...marqueeItems, ...marqueeItems];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const offsetX = mousePos.x / window.innerWidth;
  const offsetY = mousePos.y / window.innerHeight;

  return (
    <section className="min-h-screen relative overflow-hidden flex items-center pt-24 pb-16">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--foreground)) 2px, hsl(var(--foreground)) 3px)',
        }}
      />
      {/* Floating decorative elements */}
      <div
        className="absolute top-20 right-10 w-32 h-32 brutal-border animate-float hidden lg:block"
        style={{
          background: 'hsl(var(--neon-yellow))',
          transform: `translate(${offsetX * 20}px, ${offsetY * 20}px) rotate(12deg)`,
        }}
      />
      <div
        className="absolute bottom-32 left-10 w-24 h-24 brutal-border animate-float hidden lg:block"
        style={{
          background: 'hsl(var(--neon-pink))',
          animationDelay: '1s',
          transform: `translate(${-offsetX * 10}px, ${-offsetY * 10}px) rotate(-8deg)`,
        }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-16 h-16 brutal-border hidden lg:block"
        style={{
          background: 'hsl(var(--neon-blue))',
          transform: `translate(${offsetX * 30}px, ${offsetY * 30}px) rotate(45deg)`,
        }}
      />

      {/* Main content section */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl">
          {/* Status badge */}
          <div className="flex items-center gap-3 mb-8">
            <div className="sticker sticker-green rotate-[1deg]">● AVAILABLE FOR WORK</div>
            <div className="sticker sticker-blue rotate-[-6deg]">FULL-STACK DEV</div>
          </div>

          {/* Main heading with intro + title */}
          <h1 className="font-heading font-bold leading-[0.9] mb-6">
            <span
              className="inline-block font-mono text-4xl md:text-6xl lg:text-[8rem] uppercase tracking-[0.12em] brutal-border px-4 py-2 mb-3 md:mb-4"
              style={{
                background: 'hsl(var(--background))',
                transform: `translate(${-offsetX * 0.2}px, ${-offsetY * 0.2}px) rotate(-1deg)`,
              }}
            >
              HELLO I AM
            </span>
            <span
              className="block text-7xl md:text-[9rem] lg:text-[12rem] glitch-text"
              data-text="SHIENG"
              style={{ transform: `translate(${offsetX * 0.5}px, ${offsetY * 0.5}px)` }}
            >
              SHIENG
            </span>
            <span className="block text-3xl md:text-5xl lg:text-6xl -mt-1 md:-mt-3 uppercase tracking-tight">
              SOFTWARE
              <span
                className="inline-block brutal-border px-3 md:px-4 py-1 ml-2 md:ml-3 rotate-[-6deg] translate-y-[-2px]"
                style={{
                  background: 'hsl(var(--neon-pink))',
                  color: 'hsl(var(--neon-pink-foreground))',
                }}
              >
                ENGINEER
              </span>
            </span>
          </h1>

          {/* Tagline */}
          <div
            className="brutal-border brutal-shadow-lg inline-block p-4 md:p-6 mb-8 max-w-xl"
            style={{ background: 'hsl(var(--neon-green))' }}
          >
            <p className="font-mono text-lg md:text-xl font-bold text-foreground leading-tight">
              I BUILD THINGS THAT LIVE ON THE INTERNET.
              <br />
              FULL-STACK. PIXEL-PERFECT. NO COMPROMISES.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="brutal-btn text-lg">
              VIEW MY WORK →
            </a>
            <a href="/resume" className="brutal-btn-yellow text-lg brutal-border">
              VIEW RESUME
            </a>
          </div>
        </div>
      </div>

      {/* Marquee banner */}
      <div
        className="absolute bottom-0 left-0 right-0 brutal-border-thick border-l-0 border-r-0 py-3 overflow-hidden"
        style={{ background: 'hsl(var(--foreground))', color: 'hsl(var(--primary-foreground))' }}
      >
        <div className="marquee font-mono text-xl font-bold tracking-widest">
          {[0, 1].map((copy) => (
            <div key={copy} className="marquee-content" aria-hidden={copy === 1}>
              {marqueeSequence.map((item, index) => (
                <span key={`${copy}-${item}-${index}`} className="marquee-item">
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
