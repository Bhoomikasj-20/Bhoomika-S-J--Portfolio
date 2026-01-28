import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import { PageTransition } from "@/components/PageTransition";

export default function Home() {
  return (
    <PageTransition className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden p-6">
      <div className="max-w-4xl w-full z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center md:text-left"
        >
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-accent text-lg md:text-xl font-mono mb-4"
          >
            Hello, I am
          </motion.h2>
          
          <h1 className="text-5xl md:text-8xl font-display font-bold mb-6 tracking-tight leading-tight">
            <span className="block text-foreground drop-shadow-lg">Bhoomika S J</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient bg-300% text-4xl md:text-6xl mt-4">
              AI & ML Engineering Student | Frontend & Data Science Enthusiast
            </span>
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-xl md:ml-2 mb-10 leading-relaxed"
          >
            Building intelligent, user-centric digital experiences using AI and modern web technologies.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 md:ml-2"
          >
            <Link 
              href="/projects" 
              className="group relative px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl overflow-hidden hover:shadow-lg hover:shadow-primary/25 transition-all"
            >
              <span className="relative z-10 flex items-center gap-2">
                View Work <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </Link>
            
            <Link 
              href="/contact" 
              className="px-8 py-4 border border-border text-foreground font-medium rounded-xl hover:bg-secondary/50 transition-colors text-center"
            >
              Contact Me
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 animate-bounce"
      >
        <ChevronDown className="text-muted-foreground w-6 h-6" />
      </motion.div>
    </PageTransition>
  );
}
