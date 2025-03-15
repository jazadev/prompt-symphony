
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { 
  CheckCircle, AlertCircle, XCircle, ArrowRight, Copy, 
  Zap, AlertTriangle, Info, RefreshCw 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import SuggestionCard from "./SuggestionCard";
import type { AnalysisResult as AnalysisResultType } from "@/utils/promptAnalyzer";

interface AnalysisResultProps {
  result: AnalysisResultType;
  onReset: () => void;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result, onReset }) => {
  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado al portapapeles",
      description: message,
      duration: 3000,
    });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const renderScoreLabel = (score: number) => {
    if (score >= 0.8) return { label: "Excelente", color: "text-green-500" };
    if (score >= 0.6) return { label: "Bueno", color: "text-blue-500" };
    if (score >= 0.4) return { label: "Regular", color: "text-yellow-500" };
    return { label: "Necesita mejoras", color: "text-red-500" };
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="w-full max-w-4xl mx-auto"
    >
      <motion.div variants={item} className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-medium">Resultados del análisis</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onReset}
          className="flex items-center gap-1"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Nuevo análisis
        </Button>
      </motion.div>

      <motion.div variants={item} className="mb-8 glass-effect rounded-xl p-6 overflow-hidden">
        <div className="flex flex-col sm:flex-row gap-6 mb-4">
          <div className="flex-1">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Prompt Original</h3>
            <div className="relative p-4 bg-secondary/50 rounded-lg">
              <p className="text-sm">{result.originalPrompt}</p>
              <button 
                className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
                onClick={() => copyToClipboard(result.originalPrompt, "Prompt original copiado")}
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
          <ArrowRight className="hidden sm:block h-6 w-6 self-center text-muted-foreground" />
          <div className="flex-1">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Prompt Mejorado</h3>
            <div className="relative p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm">{result.improvedPrompt}</p>
              <button 
                className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
                onClick={() => copyToClipboard(result.improvedPrompt, "Prompt mejorado copiado")}
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Object.entries(result.analysisScore).map(([key, value]) => {
            const { label, color } = renderScoreLabel(value);
            return (
              <div key={key} className="flex flex-col">
                <span className="text-xs text-muted-foreground capitalize mb-1">
                  {key === "overall" ? "Puntuación general" : key}
                </span>
                <Progress 
                  value={value * 100} 
                  className="h-2 mb-1" 
                />
                <span className={`text-xs font-medium ${color}`}>
                  {label} ({Math.round(value * 100)}%)
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>

      <motion.div variants={item}>
        <Tabs defaultValue="optimization" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="optimization" className="flex items-center gap-1">
              <Zap className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Optimización</span>
            </TabsTrigger>
            <TabsTrigger value="clarity" className="flex items-center gap-1">
              <Info className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Claridad</span>
            </TabsTrigger>
            <TabsTrigger value="ethical" className="flex items-center gap-1">
              <AlertTriangle className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Ética</span>
            </TabsTrigger>
            <TabsTrigger value="grammar" className="flex items-center gap-1">
              <CheckCircle className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Gramática</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="optimization" className="space-y-4">
            <h3 className="text-lg font-medium">Sugerencias de optimización</h3>
            
            {result.optimizationSuggestions.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {result.optimizationSuggestions.map((suggestion, index) => (
                  <SuggestionCard 
                    key={index}
                    title={`Mejora de ${suggestion.category === 'specificity' ? 'especificidad' : 
                            suggestion.category === 'structure' ? 'estructura' : 
                            suggestion.category === 'context' ? 'contexto' : 'tono'}`}
                    before={suggestion.original}
                    after={suggestion.improved}
                    explanation={suggestion.explanation}
                    icon={<Zap className="h-4 w-4 text-amber-500" />}
                  />
                ))}
              </div>
            ) : (
              <Card className="p-6 text-center">
                <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-500" />
                <h3 className="text-lg font-medium mb-1">¡Excelente trabajo!</h3>
                <p className="text-muted-foreground">
                  Tu prompt ya está bien estructurado y no necesita optimizaciones adicionales.
                </p>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="clarity" className="space-y-4">
            <h3 className="text-lg font-medium">Problemas de claridad</h3>
            
            {result.clarityIssues.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {result.clarityIssues.map((issue, index) => (
                  <Card key={index} className="p-4 overflow-hidden">
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "p-2 rounded-full",
                        issue.severity === 'high' ? "bg-red-100 text-red-600" :
                        issue.severity === 'medium' ? "bg-amber-100 text-amber-600" :
                        "bg-blue-100 text-blue-600"
                      )}>
                        <AlertCircle className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <h4 className="text-sm font-medium">
                            {issue.type === 'ambiguity' ? "Ambigüedad" : 
                             issue.type === 'vagueness' ? "Vaguedad" : "Incompleto"}
                          </h4>
                          <Badge variant={
                            issue.severity === 'high' ? "destructive" :
                            issue.severity === 'medium' ? "default" : "outline"
                          }>
                            {issue.severity === 'high' ? "Alta" : 
                             issue.severity === 'medium' ? "Media" : "Baja"}
                          </Badge>
                        </div>
                        <p className="text-sm mb-2">Problema con: <span className="font-medium">"{issue.text}"</span></p>
                        <p className="text-xs text-muted-foreground mb-2">{issue.reason}</p>
                        <div className="text-xs bg-secondary/50 p-2 rounded">
                          <span className="block font-medium mb-1">Sugerencia:</span>
                          {issue.suggestion}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-6 text-center">
                <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-500" />
                <h3 className="text-lg font-medium mb-1">¡Sin problemas de claridad!</h3>
                <p className="text-muted-foreground">
                  Tu prompt es claro y específico. Bien hecho.
                </p>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="ethical" className="space-y-4">
            <h3 className="text-lg font-medium">Consideraciones éticas</h3>
            
            {result.ethicalIssues.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {result.ethicalIssues.map((issue, index) => (
                  <Card key={index} className="p-4 overflow-hidden">
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "p-2 rounded-full",
                        issue.severity === 'high' ? "bg-red-100 text-red-600" :
                        issue.severity === 'medium' ? "bg-amber-100 text-amber-600" :
                        "bg-blue-100 text-blue-600"
                      )}>
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <h4 className="text-sm font-medium">
                            {issue.type === 'bias' ? "Sesgo potencial" : 
                             issue.type === 'harmful' ? "Contenido dañino" : 
                             issue.type === 'sensitive' ? "Tema sensible" : "Privacidad"}
                          </h4>
                          <Badge variant={
                            issue.severity === 'high' ? "destructive" :
                            issue.severity === 'medium' ? "default" : "outline"
                          }>
                            {issue.severity === 'high' ? "Alta" : 
                             issue.severity === 'medium' ? "Media" : "Baja"}
                          </Badge>
                        </div>
                        <p className="text-sm mb-2">Término: <span className="font-medium">"{issue.text}"</span></p>
                        <p className="text-xs text-muted-foreground mb-2">{issue.reason}</p>
                        <div className="text-xs bg-secondary/50 p-2 rounded">
                          <span className="block font-medium mb-1">Sugerencia:</span>
                          {issue.suggestion}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-6 text-center">
                <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-500" />
                <h3 className="text-lg font-medium mb-1">Prompt éticamente adecuado</h3>
                <p className="text-muted-foreground">
                  No se detectaron problemas éticos en tu prompt. Tu consulta es respetuosa e inclusiva.
                </p>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="grammar" className="space-y-4">
            <h3 className="text-lg font-medium">Correcciones gramaticales</h3>
            
            {result.grammarIssues.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {result.grammarIssues.map((issue, index) => (
                  <Card key={index} className="p-4 overflow-hidden">
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "p-2 rounded-full",
                        issue.severity === 'high' ? "bg-red-100 text-red-600" :
                        issue.severity === 'medium' ? "bg-amber-100 text-amber-600" :
                        "bg-blue-100 text-blue-600"
                      )}>
                        <XCircle className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <h4 className="text-sm font-medium">
                            {issue.type === 'grammar' ? "Error gramatical" : 
                             issue.type === 'spelling' ? "Error ortográfico" : "Error de puntuación"}
                          </h4>
                          <Badge variant={
                            issue.severity === 'high' ? "destructive" :
                            issue.severity === 'medium' ? "default" : "outline"
                          }>
                            {issue.severity === 'high' ? "Alta" : 
                             issue.severity === 'medium' ? "Media" : "Baja"}
                          </Badge>
                        </div>
                        <p className="text-sm mb-2">Encontrado: <span className="font-medium">"{issue.text}"</span></p>
                        <div className="text-xs bg-secondary/50 p-2 rounded">
                          <span className="block font-medium mb-1">Corrección:</span>
                          {issue.suggestion}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-6 text-center">
                <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-500" />
                <h3 className="text-lg font-medium mb-1">¡Sin errores gramaticales!</h3>
                <p className="text-muted-foreground">
                  Tu prompt está gramaticalmente correcto.
                </p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default AnalysisResult;
