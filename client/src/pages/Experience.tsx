import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { useExperience } from "@/hooks/use-portfolio";
import { Briefcase } from "lucide-react";
import { format } from "date-fns";

export default function Experience() {
  const { data: experiences, isLoading } = useExperience();

  return (
    <PageTransition className="min-h-screen py-24 px-6 md:px-12 max-w-5xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">Experience</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          My professional journey through the tech industry.
        </p>
      </motion.div>

      {isLoading ? (
        <div className="space-y-8 animate-pulse">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-40 rounded-3xl bg-secondary/30 w-full" />
          ))}
        </div>
      ) : (
        <div className="relative border-l-2 border-border ml-4 md:ml-8 space-y-12">
          {experiences?.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary ring-4 ring-background" />
              
              <div className="glass-panel p-8 rounded-3xl transition-all duration-300 hover:bg-secondary/30 hover:shadow-lg hover:shadow-primary/5 group">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
                  <div>
                    <h3 className="text-2xl font-bold font-display text-foreground group-hover:text-primary transition-colors">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-accent font-medium mt-1">
                      <Briefcase size={16} />
                      <span>{exp.company}</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-secondary/50 text-xs font-mono border border-border">
                    {exp.period}
                  </span>
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </PageTransition>
  );
}
