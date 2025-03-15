import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { analyzePrompt, AnalysisResult } from "@/utils/promptAnalyzer";

interface PromptInputProps {
  onAnalysisComplete: (results: AnalysisResult) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ onAnalysisComplete }) => {
  const [prompt, setPrompt] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [charCount, setCharCount] = useState(0);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setPrompt(newValue);
    setCharCount(newValue.length);
  };
  
  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const results = await analyzePrompt(prompt);
      onAnalysisComplete(results);
    } catch (error) {
      console.error("Error analyzing prompt:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-2xl mx-auto glass-effect rounded-xl p-6 md:p-8"
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-medium mb-1">Escribe tu prompt</h2>
          <p className="text-sm text-muted-foreground">
            Optimizaremos tu prompt para que sea claro, ético y efectivo
          </p>
        </div>
        
        <div className="space-y-3">
          <Textarea
            value={prompt}
            onChange={handleInputChange}
            placeholder="Escribe tu prompt aquí..."
            className="min-h-[120px] resize-y text-base border-input focus:ring-1 focus:ring-primary"
          />
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>{charCount} caracteres</span>
            <span>{prompt.split(/\s+/).filter(Boolean).length} palabras</span>
          </div>
        </div>
        
        <Button
          onClick={handleSubmit}
          disabled={!prompt.trim() || isAnalyzing}
          className="w-full py-6 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analizando...
            </>
          ) : (
            "Optimizar Prompt"
          )}
        </Button>
      </div>
    </motion.div>
  );
};

export default PromptInput;
