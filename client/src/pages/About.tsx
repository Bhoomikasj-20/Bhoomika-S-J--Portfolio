import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { User, Heart, Coffee, Code2 } from "lucide-react";

export default function About() {
  return (
    <PageTransition className="min-h-screen py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">About Me</h1>
        <div className="h-1 w-20 bg-accent rounded-full" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bio Card - Large */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-2 glass-panel p-8 rounded-3xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <User size={24} />
            </div>
            <h2 className="text-2xl font-bold font-display">Who I Am</h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            I'm a passionate developer with a keen eye for design. I bridge the gap between 
            engineering and aesthetics, creating software that not only functions flawlessly 
            but also looks beautiful. My journey started with simple static sites and evolved 
            into building complex, interactive 3D web applications. When I'm not coding, 
            I'm exploring new design trends or contributing to open source.
          </p>
        </motion.div>

        {/* Photo/Stats Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-8 rounded-3xl flex flex-col justify-center items-center text-center relative overflow-hidden group"
        >
           {/* Placeholder for avatar - using descriptive comment */}
           {/* Unsplash abstract tech image */}
           <img 
             src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&h=500&fit=crop"
             alt="Abstract design"
             className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity"
           />
           <div className="relative z-10">
             <h3 className="text-5xl font-display font-bold mb-2">3+</h3>
             <p className="text-muted-foreground">Years of Experience</p>
           </div>
        </motion.div>

        {/* Interests - Stacked */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-panel p-8 rounded-3xl bg-secondary/20"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-full bg-accent/10 text-accent">
              <Code2 size={24} />
            </div>
            <h3 className="text-xl font-bold">Tech Stack</h3>
          </div>
          <p className="text-muted-foreground">React, TypeScript, Node.js, WebGL, PostgreSQL</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-panel p-8 rounded-3xl bg-primary/5"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-full bg-pink-500/10 text-pink-500">
              <Heart size={24} />
            </div>
            <h3 className="text-xl font-bold">Passions</h3>
          </div>
          <p className="text-muted-foreground">UI/UX Design, 3D Modeling, Mechanical Keyboards</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="glass-panel p-8 rounded-3xl bg-orange-500/5"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-full bg-orange-500/10 text-orange-500">
              <Coffee size={24} />
            </div>
            <h3 className="text-xl font-bold">Fuel</h3>
          </div>
          <p className="text-muted-foreground">Espresso, Lofi Hip Hop, Late Night Coding</p>
        </motion.div>
      </div>
    </PageTransition>
  );
}
