import { useState } from 'react';

const projects = [
  {
    title: 'Project 1',
    desc: 'Description of Project 1',
    tags: ['React', 'Next.js', 'Tailwind', 'TypeScript'],
    color: 'neon-green',
    link: '#',
    year: '2024',
  },
  {
    title: 'Project 2',
    desc: 'Description of Project 1',
    tags: ['React', 'Next.js', 'Tailwind', 'TypeScript'],
    color: 'neon-pink',
    link: '#',
    year: '2024',
  },
  {
    title: 'Project 3',
    desc: 'Description of Project 1',
    tags: ['React', 'Next.js', 'Tailwind', 'TypeScript'],
    color: 'neon-blue',
    link: '#',
    year: '2024',
  },
  {
    title: 'Project 4',
    desc: 'Description of Project 1',
    tags: ['React', 'Next.js', 'Tailwind', 'TypeScript'],
    color: 'neon-yellow',
    link: '#',
    year: '2024',
  },
];

const ProjectsSection = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="projects" className="py-20 md:py-32 relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-20 -right-20 w-64 h-64 brutal-border opacity-10"
          style={{ background: 'hsl(var(--neon-pink))', transform: 'rotate(15deg)' }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-48 h-48 brutal-border opacity-10"
          style={{ background: 'hsl(var(--neon-blue))', transform: 'rotate(-10deg)' }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Lable */}
        <div className="flex items-center gap-4 mb-16">
          <div className="sticker sticker-pink rotate-[2deg] text-lg">02</div>
          <h2 className="text-5xl md:text-7xl font-heading font-bold">WORK</h2>
          <div className="flex-1 h-[4px] bg-foreground hidden md:block" />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <a
              key={project.title}
              href={project.link}
              className="group block"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div
                className="brutal-border p-6 md:p-8 transition-all duration-200 relative overflow-hidden h-full"
                style={{
                  background:
                    hoveredIdx === i ? `hsl(var(--${project.color}))` : 'hsl(var(--card))',
                  boxShadow: hoveredIdx === i ? 'var(--brutal-shadow-xl)' : 'var(--brutal-shadow)',
                  transform: hoveredIdx === i ? 'translate(-4px, -4px) rotate(-1deg)' : 'none',
                }}
              >
                {/* Year badge */}
                <div className="absolute top-4 right-4 font-mono text-sm font-bold brutal-border px-2 py-1 bg-background">
                  {project.year}
                </div>

                {/* Project number */}
                <span className="font-heading text-[8rem] md:text-[10rem] font-bold leading-none opacity-10 absolute -top-8 -left-2 select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="relative z-10">
                  <h3 className="font-heading font-bold text-3xl md:text-5xl mb-4 tracking-tight">
                    {project.title}
                  </h3>
                  <p className="font-mono text-sm md:text-base mb-6 leading-relaxed max-w-md">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="brutal-border px-3 py-1 font-mono text-xs font-bold bg-background"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Arrow */}
                <div className="mt-6 font-heading font-bold text-xl flex items-center gap-2 transition-transform duration-200 group-hover:translate-x-2">
                  VIEW PROJECT
                  <span className="text-2xl">→</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
