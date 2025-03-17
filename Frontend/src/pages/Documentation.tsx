
import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";
import SystemDocumentation from "@/components/SystemDocumentation";

const Documentation: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 px-4 md:px-6 pb-12 pt-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-screen-xl mx-auto"
        >
          <div className="inline-block bg-primary/10 rounded-full px-3 py-1 text-xs font-medium text-primary mb-3">
            Documentación Técnica
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Arquitectura del Sistema
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-3xl">
            Explora la estructura de entidades y endpoints que conforman nuestro sistema de optimización de prompts.
          </p>

          <SystemDocumentation />
        </motion.div>
      </main>
      
      <Separator />
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>Prompt Optimizer &copy; {new Date().getFullYear()} - Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default Documentation;
