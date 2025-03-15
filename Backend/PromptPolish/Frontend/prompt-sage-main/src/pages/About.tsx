
import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  Code,
  Database,
  Eye,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 px-4 md:px-6 pb-12 pt-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-block bg-primary/10 rounded-full px-3 py-1 text-xs font-medium text-primary mb-3">
            Acerca del Proyecto
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Preprocesamiento inteligente de prompts
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-3xl">
            Un sistema diseñado para mejorar la calidad, seguridad y efectividad
            de las interacciones con inteligencia artificial.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-semibold">El Problema</h2>
              <p className="text-muted-foreground">
                Los sistemas de IA son poderosos pero también vulnerables a
                entradas de baja calidad. Los prompts mal formulados pueden
                llevar a:
              </p>
              <ul className="space-y-3">
                {[
                  "Respuestas imprecisas o irrelevantes",
                  "Posible generación de contenido no ético o sesgado",
                  "Malinterpretación de las necesidades del usuario",
                  "Riesgos de seguridad y privacidad",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-muted-foreground"
                  >
                    <CheckCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-semibold">Nuestra Solución</h2>
              <p className="text-muted-foreground">
                El Prompt Optimizer actúa como una capa intermedia que analiza,
                corrige y mejora los prompts antes de enviarlos a sistemas de IA:
              </p>
              <ul className="space-y-3">
                {[
                  "Corrección automática de errores gramaticales y ortográficos",
                  "Detección y sugerencias para consultas ambiguas o incompletas",
                  "Identificación y mitigación de lenguaje potencialmente dañino",
                  "Optimización estructural para mejorar la calidad de respuestas",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-muted-foreground"
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-semibold mb-6">Cómo Funciona</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: <MessageSquare className="h-6 w-6 text-blue-500" />,
                  title: "Análisis del Prompt",
                  description:
                    "Procesamiento lingüístico para identificar problemas de gramática, claridad y contenido ético.",
                },
                {
                  icon: <Sparkles className="h-6 w-6 text-purple-500" />,
                  title: "Corrección y Mejora",
                  description:
                    "Aplicación de reglas lingüísticas y modelos de IA para corregir y optimizar el prompt.",
                },
                {
                  icon: <Zap className="h-6 w-6 text-amber-500" />,
                  title: "Resultados Mejorados",
                  description:
                    "Prompts refinados que generan respuestas más precisas, relevantes y éticas.",
                },
              ].map((step, index) => (
                <Card key={index} className="p-6">
                  <div className="rounded-full bg-background w-12 h-12 flex items-center justify-center mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-6">Tecnologías</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  icon: <Code className="h-5 w-5 text-blue-500" />,
                  name: "React",
                },
                {
                  icon: <Sparkles className="h-5 w-5 text-purple-500" />,
                  name: "Tailwind CSS",
                },
                {
                  icon: <Zap className="h-5 w-5 text-amber-500" />,
                  name: "TypeScript",
                },
                {
                  icon: <Database className="h-5 w-5 text-green-500" />,
                  name: "NLP Models",
                },
                {
                  icon: <ShieldCheck className="h-5 w-5 text-red-500" />,
                  name: "Ethics Framework",
                },
                {
                  icon: <Eye className="h-5 w-5 text-cyan-500" />,
                  name: "Framer Motion",
                },
              ].map((tech, index) => (
                <Card
                  key={index}
                  className="p-4 flex items-center gap-3 hover:bg-secondary/50 transition-colors"
                >
                  <div className="rounded-full bg-background w-8 h-8 flex items-center justify-center">
                    {tech.icon}
                  </div>
                  <span className="font-medium text-sm">{tech.name}</span>
                </Card>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </main>

      <Separator />
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>Prompt Optimizer &copy; {new Date().getFullYear()} - Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default About;
