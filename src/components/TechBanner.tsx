const icons = [
  { name: "React", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "TypeScript", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Node.js", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Python", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Docker", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Kubernetes", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
  { name: "GraphQL", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
  { name: "PostgreSQL", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "AWS", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { name: "Figma", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "TailwindCSS", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "MongoDB", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Redis", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
  { name: "Git", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Next.js", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Go", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
];

const row1 = icons.slice(0, 8);
const row2 = icons.slice(8);

const IconRow = ({ items, direction }: { items: typeof icons; direction: "left" | "right" }) => {
  const animClass = direction === "left" ? "animate-scroll-left" : "animate-scroll-right";
  const doubled = [...items, ...items, ...items];

  return (
    <div className="flex gap-16 py-4">
      <div className={`flex gap-16 items-center ${animClass}`}>
        {doubled.map((icon, i) => (
          <div
            key={`${icon.name}-${i}`}
            className="flex-shrink-0 group flex items-center gap-3 opacity-90 hover:opacity-100 transition-all duration-300"
          >
            <img
              src={icon.svg}
              alt={icon.name}
              className="w-10 h-10 transition-all duration-300 group-hover:drop-shadow-[0_0_12px_hsl(199_89%_56%_/_0.5)]"
            />
            <span className="text-sm font-display text-muted-foreground group-hover:text-foreground transition-colors duration-300 hidden md:inline">
              {icon.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const TechBanner = () => {
  return (
    <section className="relative -mt-16 z-20">
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="bg-surface py-10 overflow-hidden fade-mask-x">
        <IconRow items={row1} direction="left" />
        <IconRow items={row2} direction="right" />
      </div>

      {/* Bottom shadow */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
};

export default TechBanner;
