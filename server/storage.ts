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

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const message: Message = { ...insertMessage, id: this.messageId++ };
    this.messages.push(message);
    return message;
  }

  async getProjects(): Promise<Project[]> {
    return this.projects.sort((a, b) => a.order - b.order);
  }

  async getSkills(): Promise<Skill[]> {
    return this.skills;
  }

  async getExperience(): Promise<Experience[]> {
    return this.experience.sort((a, b) => a.order - b.order);
  }

  async getEducation(): Promise<Education[]> {
    return this.education.sort((a, b) => a.order - b.order);
  }

  async seedProjects(data: InsertProject[]): Promise<void> {
    const currentId = this.projects.length + 1;
    const newProjects = data.map((d, i) => ({ ...d, id: currentId + i }));
    this.projects.push(...newProjects);
  }

  async seedSkills(data: InsertSkill[]): Promise<void> {
    const currentId = this.skills.length + 1;
    const newSkills = data.map((d, i) => ({ ...d, id: currentId + i }));
    this.skills.push(...newSkills);
  }

  async seedExperience(data: InsertExperience[]): Promise<void> {
    const currentId = this.experience.length + 1;
    const newExperience = data.map((d, i) => ({ ...d, id: currentId + i }));
    this.experience.push(...newExperience);
  }

  async seedEducation(data: InsertEducation[]): Promise<void> {
    const currentId = this.education.length + 1;
    const newEducation = data.map((d, i) => ({ ...d, id: currentId + i }));
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
