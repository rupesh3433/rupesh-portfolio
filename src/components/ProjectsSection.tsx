import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Nebula Analytics",
    description:
      "Real-time data pipeline processing 2M+ events/day. Built a distributed streaming architecture with sub-100ms latency dashboards.",
    stack: ["React", "Go", "Kafka", "ClickHouse", "K8s"],
    color: "from-primary/20 to-primary/5",
  },
  {
    title: "Vault Protocol",
    description:
      "End-to-end encrypted document management for enterprise. Zero-knowledge architecture with granular access control and audit trails.",
    stack: ["TypeScript", "Rust", "PostgreSQL", "AWS", "WebCrypto"],
    color: "from-cyan-500/15 to-primary/5",
  },
  {
    title: "Synth Interface",
    description:
      "Design system powering 40+ micro-frontends across three product lines. Achieved 98% component reuse and cut onboarding time in half.",
    stack: ["React", "Storybook", "Figma API", "Tailwind", "Turborepo"],
    color: "from-primary/15 to-cyan-400/5",
  },
];

const ProjectRow = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  const isEven = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      {/* Hover ambient */}
      <div className="absolute inset-0 rounded-2xl bg-surface-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

      <div
        className={`flex flex-col ${
          isEven ? "lg:flex-row-reverse" : "lg:flex-row"
        } gap-8 lg:gap-16 items-center py-12 lg:py-20 px-6 lg:px-12`}
      >
        {/* Visual */}
        <div className="flex-1 w-full">
          <div
            className={`w-full aspect-[16/10] rounded-xl bg-gradient-to-br ${project.color} border border-border/50 flex items-center justify-center overflow-hidden`}
          >
            <div className="w-3/4 h-3/4 rounded-lg bg-background/40 backdrop-blur-sm border border-border/30 p-4 font-mono text-xs text-muted-foreground leading-relaxed opacity-60">
              <div className="flex gap-1.5 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <div className="space-y-1">
                <span className="text-primary/70">const</span> {project.title.toLowerCase().replace(" ", "_")} = {"{"}<br />
                &nbsp;&nbsp;status: <span className="text-green-400/70">"production"</span>,<br />
                &nbsp;&nbsp;uptime: <span className="text-primary/70">99.97</span>,<br />
                &nbsp;&nbsp;scale: <span className="text-primary/70">"enterprise"</span><br />
                {"}"};
              </div>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="flex-1 space-y-5">
          <h3 className="text-3xl lg:text-4xl font-display font-bold group-hover:gradient-text transition-all duration-300">
            {project.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed text-lg">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-3">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="text-sm font-display text-primary/80 glow-text"
              >
                {tech}
              </span>
            ))}
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 mt-2"
          >
            View Project <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Light beam divider */}
      <div className="light-beam w-full" />
    </motion.div>
  );
};

const ProjectsSection = () => {
  return (
    <section className="relative py-24 lg:py-32" id="projects">
      <div className="container mx-auto px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-4">
            Selected Work
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg">
            A curated collection of systems I've designed, built, and shipped
            to production.
          </p>
        </motion.div>

        <div className="space-y-2">
          {projects.map((project, i) => (
            <ProjectRow key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
