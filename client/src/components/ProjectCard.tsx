import { motion } from "framer-motion";
import { ExternalLink, Github, Star } from "lucide-react";
import type { Project } from "@shared/schema";
import { clsx } from "clsx";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="group relative h-full"
    >
      <div className="h-full rounded-2xl overflow-hidden glass-panel flex flex-col transition-colors hover:border-primary/50">
        <div className="relative aspect-video overflow-hidden bg-black/50">
          {project.imageUrl ? (
            <img 
              src={project.imageUrl} 
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
             <div className="w-full h-full flex items-center justify-center bg-secondary/50">
               <span className="text-4xl">🎨</span>
             </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
            <div className="flex gap-4">
              {project.demoUrl && (
                <a 
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-primary text-primary-foreground hover:bg-white hover:scale-110 transition-all"
                  title="View Demo"
                >
                  <ExternalLink size={20} />
                </a>
              )}
              {project.repoUrl && (
                <a 
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-secondary text-secondary-foreground hover:bg-white hover:text-black hover:scale-110 transition-all"
                  title="View Code"
                >
                  <Github size={20} />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold font-display">{project.title}</h3>
            {project.featured && <Star className="text-accent fill-accent" size={16} />}
          </div>
          
          <p className="text-muted-foreground mb-6 line-clamp-3 flex-grow">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span 
                key={tag} 
                className="px-3 py-1 rounded-full text-xs font-medium border border-border bg-secondary/20 text-foreground/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
