import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import { ThreeBackground } from "@/components/ThreeBackground";
import { AnimatePresence } from "framer-motion";

// Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import Experience from "@/pages/Experience";
import Projects from "@/pages/Projects";
import Skills from "@/pages/Skills";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Switch location={location} key={location}>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/experience" component={Experience} />
        <Route path="/projects" component={Projects} />
        <Route path="/skills" component={Skills} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Background Layer */}
        <ThreeBackground />
        
        {/* UI Layer */}
        <div className="relative z-10">
          <Navigation />
          <Router />
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
