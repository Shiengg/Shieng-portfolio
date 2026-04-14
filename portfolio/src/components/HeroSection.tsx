import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
          transform: `translate(${offsetX * 2}px, ${offsetY * 2}px) rotate(12deg)`,
        }}
      />
      <div
        className="absolute bottom-32 left-10 w-24 h-24 brutal-border animate-float hidden lg:block"
        style={{
          background: 'hsl(var(--neon-pink))',
          animationDelay: '1s',
          transform: `translate(${-offsetX}px, ${-offsetY}px) rotate(-8deg)`,
        }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-16 h-16 brutal-border hidden lg:block"
        style={{
          background: 'hsl(var(--neon-blue))',
          transform: `translate(${offsetX * 3}px, ${offsetY * 3}px) rotate(45deg)`,
        }}
      />

      {/* Main content section */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl">
          {/* Status badge */}
          <div className="flex items-center gap-3 mb-8">
            <div className="sticker sticker-green rotate-[-1deg]">● AVAILABLE FOR WORK</div>
            <div className="sticker sticker-blue rotate-[2deg]">FULL-STACK DEV</div>
          </div>

          {/* Main heading with glitch */}
          <h1 className="font-heading font-bold leading-[0.9] mb-6">
            <span
              className="block text-7xl md:text-[9rem] lg:text-[12rem] glitch-text"
              data-text="SHIENG"
              style={{ transform: `translate(${offsetX * 0.5}px, ${offsetY * 0.5}px)` }}
            >
              SHIENG
            </span>
            <span
              className="block text-5xl md:text-7xl lg:text-[8rem] -mt-2 md:-mt-6"
              style={{
                WebkitTextStroke: '3px hsl(var(--foreground))',
                color: 'transparent',
                transform: `translate(${-offsetX * 0.3}px, ${-offsetY * 0.3}px)`,
              }}
            >
              MORGAN
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
