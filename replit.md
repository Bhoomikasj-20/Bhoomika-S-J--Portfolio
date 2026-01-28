# replit.md

## Overview

This is a personal portfolio web application for Bhoomika S J, an AI & ML Engineering student. The application showcases projects, skills, experience, and education with a modern, animated interface featuring 3D backgrounds and smooth page transitions. Built as a full-stack TypeScript application with a React frontend and Express backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, bundled using Vite
- **Routing**: Wouter for client-side routing with 6 main pages (Home, About, Experience, Projects, Skills, Contact)
- **State Management**: TanStack React Query for server state and data fetching
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming (dark charcoal/lavender color scheme)
- **Animations**: Framer Motion for page transitions and element animations
- **3D Graphics**: React Three Fiber with Three.js for animated background elements (geometric shapes, stars)
- **Typography**: Clash Display (headings) and Space Grotesk (body) fonts

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript compiled with tsx
- **API Pattern**: RESTful endpoints defined in shared route definitions with Zod validation
- **Database ORM**: Drizzle ORM for type-safe database operations

### Data Layer
- **Database**: PostgreSQL (configured via DATABASE_URL environment variable)
- **Schema**: Defined in `shared/schema.ts` with tables for messages, projects, skills, experience, and education
- **Migrations**: Managed via Drizzle Kit with output to `./migrations` folder

### Shared Code
- **Location**: `shared/` directory contains schema definitions and API route contracts
- **Validation**: Zod schemas for both frontend form validation and backend input validation
- **Type Safety**: Drizzle-zod integration for automatic schema-to-type generation

### Build System
- **Development**: Vite dev server with HMR, proxied through Express
- **Production**: Vite builds static assets to `dist/public`, esbuild bundles server to `dist/index.cjs`
- **Path Aliases**: `@/` maps to client source, `@shared/` maps to shared code

## External Dependencies

### Database
- **PostgreSQL**: Primary data store, connection via `DATABASE_URL` environment variable
- **connect-pg-simple**: Session storage for Express sessions

### Third-Party Libraries
- **Radix UI**: Headless component primitives for accessible UI components
- **React Three Fiber / Three.js**: 3D rendering engine for animated backgrounds
- **Framer Motion**: Animation library for page transitions and micro-interactions
- **TanStack React Query**: Server state management and data fetching
- **React Hook Form**: Form state management with Zod resolver for validation
- **date-fns**: Date formatting utilities

### Development Tools
- **Replit Plugins**: Runtime error overlay, cartographer, and dev banner for Replit environment
- **Drizzle Kit**: Database migration and schema push tooling