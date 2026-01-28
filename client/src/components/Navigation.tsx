import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { clsx } from "clsx";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Exp." },
  { href: "/projects", label: "Work" },
  { href: "/skills", label: "Skills" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const [location] = useLocation();

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-1 p-2 rounded-full glass-panel shadow-2xl shadow-primary/10">
        {links.map((link) => {
          const isActive = location === link.href;
          return (
            <Link key={link.href} href={link.href} className="relative px-4 py-2 rounded-full transition-colors">
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className={clsx(
                "relative text-sm font-medium z-10 transition-colors duration-200",
                isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}>
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
