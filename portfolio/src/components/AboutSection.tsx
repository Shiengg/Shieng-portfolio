const stats = [
  { number: '1', label: 'Years Experience' },
  { number: '5+', label: 'Projects Shipped' },
  { number: 'HCM', label: 'BASE IN VIETNAM' },
  { number: '∞', label: 'Coffee Consumed' },
];

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
        <div className="grid md:grid-cols-12 gap-8">
          {/* Left column - photo placeholder */}
          <div className="md:col-span-5">
            <div className="brutal-card p-0 aspect-[3/4] relative overflow-hidden group bg-neon-blue text-neon-blue-foreground">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-heading text-[200px] font-bold opacity-20 group-hover:opacity-40 transition-opacity select-none">
                  ???
                </span>
              </div>
              {/* Decorative sticker */}
              <div
                className="absolute top-4 right-4 brutal-border px-3 py-1 font-heading text-xs rotate-[12deg]"
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
              <p className="text-lg md:text-xl leading-relaxed">
                I'm a developer who believes the web should be{' '}
                <span
                  className="px-1 brutal-border inline-block font-bold"
                  style={{
                    background: 'hsl(var(--neon-green))',
                    color: 'hsl(var(--neon-green-foreground))',
                  }}
                >
                  weird
                </span>
                ,{' '}
                <span
                  className="px-1 inline-block font-bold"
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
                  className="px-1 brutal-border inline-block font-bold"
                  style={{
                    background: 'hsl(var(--neon-blue))',
                    color: 'hsl(var(--neon-blue-foreground))',
                  }}
                >
                  unforgettable
                </span>
                .
              </p>
              <p className="text-lg md:text-xl leading-relaxed mt-4">
                With 5+ years of experience, I turn complex problems into brutally simple solutions.
                I specialize in building performant web applications that push creative boundaries
                while maintaining accessibility and usability.
              </p>
            </div>

            <div className="brutal-card bg-lime-400 text-primary-foreground rotate-[1deg]">
              <p className="font-mono text-lg leading-relaxed">
                "Good design is obvious. Great design is transparent. <br />
                <span className="text-neon-green">My design? It punches you in the face.</span>"
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="brutal-card text-center distort-hover"
                  style={{ transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)` }}
                >
                  <div className="font-heading text-4xl md:text-5xl font-bold text-neon-blue">
                    {stat.number}
                  </div>
                  <div className="font-heading text-xs mt-2 tracking-wider">{stat.label}</div>
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
