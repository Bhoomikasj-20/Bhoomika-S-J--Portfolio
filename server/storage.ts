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
  
  // Clear methods to allow re-seeding with correct data
  clearAll(): Promise<void>;
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
    await db.insert(projects).values(data);
  }

  async seedSkills(data: InsertSkill[]): Promise<void> {
    await db.insert(skills).values(data);
  }

  async seedExperience(data: InsertExperience[]): Promise<void> {
    await db.insert(experience).values(data);
  }

  async seedEducation(data: InsertEducation[]): Promise<void> {
    await db.insert(education).values(data);
  }

  async clearAll(): Promise<void> {
    await db.delete(projects);
    await db.delete(skills);
    await db.delete(experience);
    await db.delete(education);
  }
}

export const storage = new DatabaseStorage();
