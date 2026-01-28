import { useQuery, useMutation } from "@tanstack/react-query";
import { api, type MessageInput } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

// GET /api/messages - Not public usually, but defined in schema. Assuming admin usage or strictly create for public.

// POST /api/messages
export function useCreateMessage() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: MessageInput) => {
      // Validate with shared schema input
      const validated = api.messages.create.input.parse(data);
      const res = await fetch(api.messages.create.path, {
        method: api.messages.create.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validated),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to send message');
      }
      return api.messages.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// GET /api/projects
export function useProjects() {
  return useQuery({
    queryKey: [api.projects.list.path],
    queryFn: async () => {
      const res = await fetch(api.projects.list.path);
      if (!res.ok) throw new Error('Failed to fetch projects');
      return api.projects.list.responses[200].parse(await res.json());
    },
  });
}

// GET /api/skills
export function useSkills() {
  return useQuery({
    queryKey: [api.skills.list.path],
    queryFn: async () => {
      const res = await fetch(api.skills.list.path);
      if (!res.ok) throw new Error('Failed to fetch skills');
      return api.skills.list.responses[200].parse(await res.json());
    },
  });
}

// GET /api/experience
export function useExperience() {
  return useQuery({
    queryKey: [api.experience.list.path],
    queryFn: async () => {
      const res = await fetch(api.experience.list.path);
      if (!res.ok) throw new Error('Failed to fetch experience');
      return api.experience.list.responses[200].parse(await res.json());
    },
  });
}

// GET /api/education
export function useEducation() {
  return useQuery({
    queryKey: [api.education.list.path],
    queryFn: async () => {
      const res = await fetch(api.education.list.path);
      if (!res.ok) throw new Error('Failed to fetch education');
      return api.education.list.responses[200].parse(await res.json());
    },
  });
}
