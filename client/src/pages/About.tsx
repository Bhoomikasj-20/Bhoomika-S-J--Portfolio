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
            I am a Computer Science Engineering student specializing in Artificial Intelligence and Machine Learning at Maharaja Institute of Technology Mysore (GPA: 8.79). I have hands-on experience in Python, machine learning fundamentals, and frontend development. I enjoy building real-world projects that combine clean UI with intelligent data-driven systems.
          </p>
        </motion.div>

        {/* Photo/Stats Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-0 rounded-3xl flex flex-col justify-center items-center text-center relative overflow-hidden group"
        >
           <img 
             src="/profile.png"
             alt="Bhoomika S J"
             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
           />
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
            <h3 className="text-xl font-bold">Soft Skills</h3>
          </div>
          <p className="text-muted-foreground">Problem Solving, Team Collaboration, Adaptability, Quick Learner, Time Management</p>
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
            <h3 className="text-xl font-bold">Certifications</h3>
          </div>
          <p className="text-muted-foreground">IBM (Data Science), HP Life (Data Analytics), Microsoft Azure, Google (Network Security)</p>
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
            <h3 className="text-xl font-bold">Publication</h3>
          </div>
          <p className="text-muted-foreground">"AI-Powered Asset Tracking Agent Using Agentic Artificial Intelligence", IJCRT, Jan 2026</p>
        </motion.div>
      </div>
    </PageTransition>
  );
}
