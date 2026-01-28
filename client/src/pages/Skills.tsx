import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { useSkills } from "@/hooks/use-portfolio";
import { clsx } from "clsx";

export default function Skills() {
  const { data: skills, isLoading } = useSkills();

  // Group skills by category
  const categories = skills ? Array.from(new Set(skills.map(s => s.category))) : [];

  return (
    <PageTransition className="min-h-screen py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">Skills & Tech</h1>
        <p className="text-muted-foreground">My technical toolkit and capabilities.</p>
      </motion.div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
           <div className="h-64 bg-secondary/30 rounded-3xl" />
           <div className="h-64 bg-secondary/30 rounded-3xl" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, catIdx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: catIdx * 0.1 }}
              className="glass-panel p-8 rounded-3xl border border-border/50"
            >
              <h3 className="text-2xl font-bold font-display capitalize mb-6 text-primary">{category}</h3>
              
              <div className="space-y-6">
                {skills?.filter(s => s.category === category).map((skill, idx) => (
                  <div key={skill.id} className="group">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium group-hover:text-accent transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-xs text-muted-foreground font-mono">
                        {skill.proficiency}%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-secondary/50 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + (idx * 0.05), ease: "easeOut" }}
                        className={clsx(
                          "h-full rounded-full",
                          skill.proficiency && skill.proficiency > 85 ? "bg-accent" : "bg-primary"
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </PageTransition>
  );
}
