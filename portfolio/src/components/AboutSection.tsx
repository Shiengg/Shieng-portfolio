const stats = [
  { number: '1', label: 'Years Experience', color: 'neon-green' },
  { number: '5+', label: 'Projects Shipped', color: 'neon-yellow' },
  { number: 'HCM', label: 'BASE IN VIETNAM', color: 'neon-blue' },
  { number: '∞', label: 'Coffee Consumed', color: 'neon-pink' },
];

const statColorStyles = {
  "neon-green": {
    background: "hsl(var(--neon-green))",
    foreground: "hsl(var(--neon-green-foreground))",
  },
  "neon-pink": {
    background: "hsl(var(--neon-pink))",
    foreground: "text-black",
  },
  "neon-blue": {
    background: "hsl(var(--neon-blue))",
    foreground: "hsl(var(--neon-blue-foreground))",
  },
  "neon-yellow": {
    background: "hsl(var(--neon-yellow))",
    foreground: "hsl(var(--neon-yellow-foreground))",
  },
} as const;

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <h2 className="font-heading text-5xl md:text-7xl font-bold tracking-tighter">ABOUT</h2>
          <div className="flex-1 h-[3px] bg-black" />
        </div>

        {/* About content */}
        <div className="grid md:grid-cols-12 gap-8 items-start">
          {/* Left column - photo placeholder */}
          <div className="md:col-span-5">
            <div className="brutal-card p-0 aspect-[4/5] relative overflow-hidden group bg-neon-blue text-neon-blue-foreground max-w-[460px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-heading text-[160px] md:text-[180px] font-bold opacity-20 group-hover:opacity-40 transition-opacity select-none">
                  ???
                </span>
              </div>
              {/* Decorative sticker */}
              <div
                className="absolute top-4 right-4 brutal-border px-3 py-1 font-heading text-xs rotate-[12deg] font-mono"
                style={{
                  background: 'hsl(var(--neon-yellow))',
                  color: 'hsl(var(--neon-yellow-foreground))',
                }}
              >
                HELLO WORLD
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="md:col-span-7 flex flex-col gap-8">
            <div className="brutal-card">
              <p className="text-lg md:text-xl leading-relaxed font-mono">
                I'm a developer who believes the web should be{' '}
                <span
                  className="px-1 brutal-border inline-block font-bold rotate-[3deg]"
                  style={{
                    background: 'hsl(var(--neon-green))',
                    color: 'hsl(var(--neon-green-foreground))',
                  }}
                >
                  weird
                </span>
                ,{' '}
                <span
                  className="px-1 inline-block font-bold rotate-[-2deg]"
                  style={{
                    background: 'hsl(var(--neon-pink))',
                    color: 'hsl(var(--neon-pink-foreground))',
                    border: '3px solid hsl(var(--foreground))',
                  }}
                >
                  bold
                </span>
                , and{' '}
                <span
                  className="px-1 brutal-border inline-block font-bold rotate-[5deg]"
                  style={{
                    background: 'hsl(var(--neon-blue))',
                    color: 'hsl(var(--neon-blue-foreground))',
                  }}
                >
                  unforgettable
                </span>
                .
              </p>
              <p className="text-lg md:text-xl leading-relaxed mt-4 font-mono">
                I turn complex problems into brutally simple solutions.
                I'm focused on building performant web applications that push creative boundaries
                while staying grounded in accessibility and usability.
              </p>
            </div>

            <div className="brutal-card bg-black text-primary-foreground rotate-[2deg]">
              <p className="font-mono text-lg leading-relaxed text-white">
                "Good design is obvious. Great design is transparent. <br />
                <span className="text-lime-400">My design? It punches you in the face.</span>"
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="brutal-card text-center distort-hover"
                  style={{ transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)` }}
                  onMouseEnter={(event) => {
                    const palette = statColorStyles[stat.color];
                    event.currentTarget.style.background = palette.background;
                    event.currentTarget.style.color = palette.foreground;
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.background = "";
                    event.currentTarget.style.color = "";
                  }}
                >
                  <div className="font-heading text-4xl md:text-5xl font-bold text-neon-blue">
                    {stat.number}
                  </div>
                  <div className="font-bold text-xs mt-2 tracking-wider font-mono">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
