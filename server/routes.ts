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

  // Seed Data with fresh content
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingProjects = await storage.getProjects();
  if (existingProjects.length > 0) {
    // Only re-seed if we have the old demo data
    const isOldData = existingProjects.some(p => p.title === "Neon Nexus" || p.title === "Asset Tracking Agent");
    if (isOldData) {
      await storage.clearAll();
    } else {
      return; // Already seeded with correct data
    }
  }

  await storage.seedProjects([
    {
      title: "Asset Tracking Agent",
      description: "Agentic AI-based system for intelligent asset tracking and monitoring. Improved asset visibility and tracking efficiency.",
      imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80",
      tags: ["AI", "Python", "Agentic AI"],
      featured: true,
      order: 1,
      demoUrl: "#",
      repoUrl: "#"
    },
    {
      title: "E-commerce Sentiment Analysis",
      description: "Built an SVM-based model to classify customer reviews. Used Python, scikit-learn, pandas, and matplotlib.",
      imageUrl: "https://images.unsplash.com/photo-1519638399535-1b036603ac77?auto=format&fit=crop&q=80",
      tags: ["Machine Learning", "Python", "SVM"],
      featured: true,
      order: 2,
      demoUrl: "#",
      repoUrl: "#"
    },
    {
      title: "SerenityAI – Mental Health Companion",
      description: "AI-based mental health assistant using Python and LLMs. Enabled early detection of emotional stress indicators.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
      tags: ["LLM", "Python", "AI"],
      featured: true,
      order: 3,
      demoUrl: "#",
      repoUrl: "#"
    },
    {
      title: "Theft Alert Notification System",
      description: "IoT-based theft detection system with real-time alerts using ESP8266 and Blynk.",
      imageUrl: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80",
      tags: ["IoT", "ESP8266", "Blynk"],
      featured: false,
      order: 4,
      demoUrl: "#",
      repoUrl: "#"
    }
  ]);

  await storage.seedSkills([
    { name: "HTML", category: "Frontend", proficiency: 95, icon: "SiHtml5" },
    { name: "CSS", category: "Frontend", proficiency: 90, icon: "SiCss3" },
    { name: "React (Basics)", category: "Frontend", proficiency: 70, icon: "SiReact" },
    { name: "Tailwind CSS", category: "Frontend", proficiency: 85, icon: "SiTailwindcss" },
    { name: "Python", category: "Programming & CS", proficiency: 95, icon: "SiPython" },
    { name: "C", category: "Programming & CS", proficiency: 80, icon: "SiC" },
    { name: "Java (Basics)", category: "Programming & CS", proficiency: 70, icon: "SiOpenjdk" },
    { name: "DSA", category: "Programming & CS", proficiency: 85, icon: "SiCodestats" },
    { name: "OOP", category: "Programming & CS", proficiency: 90, icon: "SiObjectiv-c" },
    { name: "Machine Learning", category: "AI / Data", proficiency: 85, icon: "SiScikitlearn" },
    { name: "Data Science", category: "AI / Data", proficiency: 80, icon: "SiPandas" },
    { name: "Data Visualization", category: "AI / Data", proficiency: 85, icon: "SiTableau" },
    { name: "VS Code", category: "Tools", proficiency: 95, icon: "SiVisualstudiocode" },
    { name: "GitHub", category: "Tools", proficiency: 90, icon: "SiGithub" },
    { name: "Android Studio", category: "Tools", proficiency: 80, icon: "SiAndroidstudio" }
  ]);

  await storage.seedExperience([
    {
      role: "Mobile App Development Intern",
      company: "Runshaw Technologies Pvt. Ltd.",
      period: "Jul – Aug 2025",
      description: "Worked on real-world Android applications using Flutter and Dart. Gained hands-on experience in mobile UI development and app logic.",
      order: 1
    }
  ]);

  await storage.seedEducation([
    {
      degree: "BE CSE (AI & ML)",
      institution: "Maharaja Institute of Technology Mysore",
      year: "2023 – 2027",
      description: "GPA: 8.79",
      order: 1
    },
    {
      degree: "PCMB",
      institution: "Sri Jayachamarajendra PU College, Mysuru",
      year: "2021 - 2023",
      description: "Score: 89%",
      order: 2
    }
  ]);
}
