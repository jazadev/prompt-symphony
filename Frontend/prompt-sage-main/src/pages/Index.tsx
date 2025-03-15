
import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import PromptInput from "@/components/PromptInput";
import AnalysisResult from "@/components/AnalysisResult";
import { CircleHelp, Sparkles, Shield, Zap } from "lucide-react";
import type { AnalysisResult as AnalysisResultType } from "@/utils/promptAnalyzer";

const Index = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResultType | null>(null);

  const handleAnalysisComplete = (result: AnalysisResultType) => {
    setAnalysisResult(result);
    // Scroll to results
    setTimeout(() => {
      window.scrollTo({
        top: 250,
        behavior: "smooth",
      });
    }, 100);
  };

  const handleReset = () => {
    setAnalysisResult(null);
    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const features = [
    {
      icon: <Sparkles className="h-5 w-5 text-blue-500" />,
      title: "Corrección gramatical",
      description: "Detecta y corrige errores de gramática, puntuación y ortografía automáticamente."
    },
    {
      icon: <CircleHelp className="h-5 w-5 text-purple-500" />,
      title: "Mejora de claridad",
      description: "Identifica ambigüedades y sugiere modificaciones para hacer tus prompts más precisos."
    },
    {
      icon: <Shield className="h-5 w-5 text-emerald-500" />,
      title: "Evaluación ética",
      description: "Detecta lenguaje potencialmente problemático y ofrece alternativas respetuosas."
    },
    {
      icon: <Zap className="h-5 w-5 text-amber-500" />,
      title: "Optimización",
      description: "Mejora la estructura y especificidad para obtener mejores resultados de IA."
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 px-4 md:px-6 pb-12 pt-6">
        {!analysisResult ? (
          <>
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <div className="inline-block bg-primary/10 rounded-full px-3 py-1 text-xs font-medium text-primary mb-3">
                Preprocesamiento de prompts
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight">
                Mejora tus prompts para resultados excepcionales
              </h1>
              <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
                Optimiza tus prompts de IA para obtener respuestas más precisas, éticas y efectivas con nuestro sistema de preprocesamiento inteligente.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="glass-effect p-4 rounded-xl"
                  >
                    <div className="rounded-full bg-background w-10 h-10 flex items-center justify-center mx-auto mb-3">
                      {feature.icon}
                    </div>
                    <h3 className="font-medium text-sm mb-1">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <PromptInput onAnalysisComplete={handleAnalysisComplete} />
          </>
        ) : (
          <AnalysisResult result={analysisResult} onReset={handleReset} />
        )}
      </main>
      
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <p>Prompt Optimizer &copy; {new Date().getFullYear()} - Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default Index;
