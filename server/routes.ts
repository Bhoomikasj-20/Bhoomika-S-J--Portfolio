import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post(api.messages.create.path, async (req, res) => {
    try {
      const input = api.messages.create.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.skills.list.path, async (req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  app.get(api.experience.list.path, async (req, res) => {
    const experience = await storage.getExperience();
    res.json(experience);
  });

  app.get(api.education.list.path, async (req, res) => {
    const education = await storage.getEducation();
    res.json(education);
  });

  // Seed Data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  await storage.seedProjects([
    {
      title: "Neon Nexus",
      description: "A cyberpunk-themed e-commerce platform with 3D product previews.",
      imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80",
      tags: ["React", "Three.js", "Node.js"],
      featured: true,
      order: 1,
      demoUrl: "#",
      repoUrl: "#"
    },
    {
      title: "Flow State",
      description: "Productivity app with ambient soundscapes and smooth animations.",
      imageUrl: "https://images.unsplash.com/photo-1519638399535-1b036603ac77?auto=format&fit=crop&q=80",
      tags: ["TypeScript", "Next.js", "Framer Motion"],
      featured: true,
      order: 2,
      demoUrl: "#",
      repoUrl: "#"
    },
    {
      title: "Data Viz Dashboard",
      description: "Interactive real-time data visualization for financial markets.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
      tags: ["D3.js", "React", "WebSocket"],
      featured: false,
      order: 3,
      demoUrl: "#",
      repoUrl: "#"
    }
  ]);

  await storage.seedSkills([
    { name: "React", category: "Frontend", proficiency: 95, icon: "SiReact" },
    { name: "TypeScript", category: "Languages", proficiency: 90, icon: "SiTypescript" },
    { name: "Node.js", category: "Backend", proficiency: 85, icon: "SiNodedotjs" },
    { name: "Three.js", category: "Creative", proficiency: 80, icon: "SiThree" },
    { name: "PostgreSQL", category: "Database", proficiency: 75, icon: "SiPostgresql" },
    { name: "Figma", category: "Design", proficiency: 85, icon: "SiFigma" }
  ]);

  await storage.seedExperience([
    {
      role: "Senior Frontend Developer",
      company: "TechNova",
      period: "2023 - Present",
      description: "Leading the frontend team in building immersive web experiences using React and WebGL.",
      order: 1
    },
    {
      role: "Full Stack Engineer",
      company: "Creative Solutions",
      period: "2021 - 2023",
      description: "Developed scalable web applications and integrated 3D visualizations for client projects.",
      order: 2
    },
    {
      role: "Junior Web Developer",
      company: "StartUp Inc.",
      period: "2019 - 2021",
      description: "Assisted in the development of responsive websites and implemented UI/UX best practices.",
      order: 3
    }
  ]);

  await storage.seedEducation([
    {
      degree: "B.S. Computer Science",
      institution: "University of Innovation",
      year: "2019",
      description: "Focus on Computer Graphics and Human-Computer Interaction.",
      order: 1
    }
  ]);
}
