import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api, type MessageInput } from "@shared/routes";
import { useCreateMessage } from "@/hooks/use-portfolio";
import { Send, Mail, MapPin } from "lucide-react";

export default function Contact() {
  const { mutate: sendMessage, isPending } = useCreateMessage();

  const form = useForm<MessageInput>({
    resolver: zodResolver(api.messages.create.input),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = (data: MessageInput) => {
    sendMessage(data, {
      onSuccess: () => form.reset()
    });
  };

  return (
    <PageTransition className="min-h-screen py-24 px-6 md:px-12 max-w-6xl mx-auto flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 w-full">
        
        {/* Contact Info */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-8">
            Let's work <br/> <span className="text-accent">together.</span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-12 max-w-md">
            Interested in collaboration or have a project in mind? 
            Send me a message and I'll get back to you as soon as possible.
          </p>

          <div className="space-y-6">
            <a href="mailto:hello@portfolio.com" className="flex items-center gap-4 text-xl hover:text-primary transition-colors group">
              <div className="p-4 rounded-full bg-secondary/30 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Mail size={24} />
              </div>
              <span>hello@portfolio.com</span>
            </a>
            
            <div className="flex items-center gap-4 text-xl text-muted-foreground">
              <div className="p-4 rounded-full bg-secondary/30">
                <MapPin size={24} />
              </div>
              <span>San Francisco, CA</span>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-8 md:p-10 rounded-3xl"
        >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium ml-1">Name</label>
              <input
                {...form.register("name")}
                className="w-full px-6 py-4 rounded-xl bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/50"
                placeholder="John Doe"
              />
              {form.formState.errors.name && (
                <p className="text-destructive text-sm ml-1">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium ml-1">Email</label>
              <input
                {...form.register("email")}
                className="w-full px-6 py-4 rounded-xl bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/50"
                placeholder="john@example.com"
              />
              {form.formState.errors.email && (
                <p className="text-destructive text-sm ml-1">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium ml-1">Message</label>
              <textarea
                {...form.register("message")}
                rows={5}
                className="w-full px-6 py-4 rounded-xl bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/50 resize-none"
                placeholder="Tell me about your project..."
              />
              {form.formState.errors.message && (
                <p className="text-destructive text-sm ml-1">{form.formState.errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-4 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Sending..." : "Send Message"}
              {!isPending && <Send size={18} />}
            </button>
          </form>
        </motion.div>
      </div>
    </PageTransition>
  );
}
