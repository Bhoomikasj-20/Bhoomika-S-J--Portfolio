import { db } from "./db";
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
}

export class DatabaseStorage implements IStorage {
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db.insert(messages).values(insertMessage).returning();
    return message;
  }

  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(projects.order);
  }

  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills).orderBy(skills.id);
  }

  async getExperience(): Promise<Experience[]> {
    return await db.select().from(experience).orderBy(experience.order);
  }

  async getEducation(): Promise<Education[]> {
    return await db.select().from(education).orderBy(education.order);
  }

  async seedProjects(data: InsertProject[]): Promise<void> {
    if ((await this.getProjects()).length === 0) {
      await db.insert(projects).values(data);
    }
  }

  async seedSkills(data: InsertSkill[]): Promise<void> {
    if ((await this.getSkills()).length === 0) {
      await db.insert(skills).values(data);
    }
  }

  async seedExperience(data: InsertExperience[]): Promise<void> {
    if ((await this.getExperience()).length === 0) {
      await db.insert(experience).values(data);
    }
  }

  async seedEducation(data: InsertEducation[]): Promise<void> {
    if ((await this.getEducation()).length === 0) {
      await db.insert(education).values(data);
    }
  }
}

export const storage = new DatabaseStorage();
