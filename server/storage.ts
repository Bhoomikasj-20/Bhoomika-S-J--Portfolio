import {
  messages, projects, skills, experience, education,
  type InsertMessage, type Message,
  type InsertProject, type Project,
  type InsertSkill, type Skill,
  type InsertExperience, type Experience,
  type InsertEducation, type Education
} from "@shared/schema";

export interface IStorage {
  createMessage(message: InsertMessage): Promise<Message>;
  getProjects(): Promise<Project[]>;
  getSkills(): Promise<Skill[]>;
  getExperience(): Promise<Experience[]>;
  getEducation(): Promise<Education[]>;

  // Seeding methods
  seedProjects(projects: InsertProject[]): Promise<void>;
  seedSkills(skills: InsertSkill[]): Promise<void>;
  seedExperience(experience: InsertExperience[]): Promise<void>;
  seedEducation(education: InsertEducation[]): Promise<void>;

  // Clear methods to allow re-seeding with correct data
  clearAll(): Promise<void>;
}

export class MemStorage implements IStorage {
  private messages: Message[] = [];
  private projects: Project[] = [];
  private skills: Skill[] = [];
  private experience: Experience[] = [];
  private education: Education[] = [];

  private messageId = 1;

  constructor() {
    this.projects = [
      {
        id: 1,
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
        id: 2,
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
        id: 3,
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
        id: 4,
        title: "Theft Alert Notification System",
        description: "IoT-based theft detection system with real-time alerts using ESP8266 and Blynk.",
        imageUrl: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80",
        tags: ["IoT", "ESP8266", "Blynk"],
        featured: false,
        order: 4,
        demoUrl: "#",
        repoUrl: "#"
      },
      {
        id: 5,
        title: "Todo Timer – Study Productivity Web App",
        description: "Designed and developed a web-based productivity application to help students manage tasks and track focused study sessions using a task-based todo system.",
        imageUrl: "/todo-timer.png",
        tags: ["HTML", "CSS", "JavaScript", "Web Development", "Productivity"],
        featured: false,
        order: 5,
        demoUrl: "",
        repoUrl: ""
      },
      {
        id: 6,
        title: "Workout Tracker – Android Application",
        description: "Developed a native Android application to track daily workout routines with a user-friendly interface for logging and managing fitness activities.",
        imageUrl: "/workout-tracker.png",
        tags: ["Android Studio", "Java", "Mobile App Development", "OOP"],
        featured: false,
        order: 6,
        demoUrl: "",
        repoUrl: ""
      }
    ];

    this.skills = [
      { id: 1, name: "HTML", category: "Frontend", proficiency: 95, icon: "SiHtml5" },
      { id: 2, name: "CSS", category: "Frontend", proficiency: 90, icon: "SiCss3" },
      { id: 3, name: "React (Basics)", category: "Frontend", proficiency: 70, icon: "SiReact" },
      { id: 4, name: "Tailwind CSS", category: "Frontend", proficiency: 85, icon: "SiTailwindcss" },
      { id: 5, name: "Python", category: "Programming & CS", proficiency: 95, icon: "SiPython" },
      { id: 6, name: "C", category: "Programming & CS", proficiency: 80, icon: "SiC" },
      { id: 7, name: "Java (Basics)", category: "Programming & CS", proficiency: 70, icon: "SiOpenjdk" },
      { id: 8, name: "DSA", category: "Programming & CS", proficiency: 85, icon: "SiCodestats" },
      { id: 9, name: "OOP", category: "Programming & CS", proficiency: 90, icon: "SiObjectiv-c" },
      { id: 10, name: "Machine Learning", category: "AI / Data", proficiency: 85, icon: "SiScikitlearn" },
      { id: 11, name: "Data Science", category: "AI / Data", proficiency: 80, icon: "SiPandas" },
      { id: 12, name: "Data Visualization", category: "AI / Data", proficiency: 85, icon: "SiTableau" },
      { id: 13, name: "VS Code", category: "Tools", proficiency: 95, icon: "SiVisualstudiocode" },
      { id: 14, name: "GitHub", category: "Tools", proficiency: 90, icon: "SiGithub" },
      { id: 15, name: "Android Studio", category: "Tools", proficiency: 80, icon: "SiAndroidstudio" }
    ];

    this.experience = [
      {
        id: 1,
        role: "Mobile App Development Intern",
        company: "Runshaw Technologies Pvt. Ltd.",
        period: "Jul – Aug 2025",
        description: "Worked on real-world Android applications using Flutter and Dart. Gained hands-on experience in mobile UI development and app logic.",
        order: 1
      }
    ];

    this.education = [
      {
        id: 1,
        degree: "BE CSE (AI & ML)",
        institution: "Maharaja Institute of Technology Mysore",
        year: "2023 – 2027",
        description: "GPA: 8.79",
        order: 1
      },
      {
        id: 2,
        degree: "PCMB",
        institution: "Sri Jayachamarajendra PU College, Mysuru",
        year: "2021 - 2023",
        description: "Score: 89%",
        order: 2
      }
    ];
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const message: Message = {
      ...insertMessage,
      id: this.messageId++,
      createdAt: new Date()
    };
    this.messages.push(message);
    return message;
  }

  async getProjects(): Promise<Project[]> {
    return this.projects.sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  async getSkills(): Promise<Skill[]> {
    return this.skills;
  }

  async getExperience(): Promise<Experience[]> {
    return this.experience.sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  async getEducation(): Promise<Education[]> {
    return this.education.sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  async seedProjects(data: InsertProject[]): Promise<void> {
    const currentId = this.projects.length + 1;
    const newProjects = data.map((d, i) => ({
      ...d,
      id: currentId + i,
      demoUrl: d.demoUrl || null,
      repoUrl: d.repoUrl || null,
      featured: d.featured || false,
      order: d.order || null
    }));
    this.projects.push(...newProjects);
  }

  async seedSkills(data: InsertSkill[]): Promise<void> {
    const currentId = this.skills.length + 1;
    const newSkills = data.map((d, i) => ({
      ...d,
      id: currentId + i,
      proficiency: d.proficiency || null,
      icon: d.icon || null
    }));
    this.skills.push(...newSkills);
  }

  async seedExperience(data: InsertExperience[]): Promise<void> {
    const currentId = this.experience.length + 1;
    const newExperience = data.map((d, i) => ({
      ...d,
      id: currentId + i,
      order: d.order || null
    }));
    this.experience.push(...newExperience);
  }

  async seedEducation(data: InsertEducation[]): Promise<void> {
    const currentId = this.education.length + 1;
    const newEducation = data.map((d, i) => ({
      ...d,
      id: currentId + i,
      description: d.description || null,
      order: d.order || null
    }));
    this.education.push(...newEducation);
  }

  async clearAll(): Promise<void> {
    this.projects = [];
    this.skills = [];
    this.experience = [];
    this.education = [];
  }
}

export const storage = new MemStorage();
