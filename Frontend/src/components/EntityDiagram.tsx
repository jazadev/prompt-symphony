
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const EntityDiagram: React.FC = () => {
  // Definición de las entidades para el diagrama
  const entities = [
    {
      name: "Prompt",
      attributes: ["id", "text", "userId", "createdAt", "status"],
      relations: ["User", "Analysis"]
    },
    {
      name: "Analysis",
      attributes: ["id", "promptId", "grammarScore", "clarityScore", "ethicsScore", "overallScore", "createdAt"],
      relations: ["Prompt", "GrammarIssue", "ClarityIssue", "EthicalIssue", "Suggestion"]
    },
    {
      name: "GrammarIssue",
      attributes: ["id", "analysisId", "text", "suggestion", "severity", "type", "position"],
      relations: ["Analysis"]
    },
    {
      name: "ClarityIssue",
      attributes: ["id", "analysisId", "text", "suggestion", "reason", "severity", "type"],
      relations: ["Analysis"]
    },
    {
      name: "EthicalIssue",
      attributes: ["id", "analysisId", "text", "suggestion", "reason", "severity", "type"],
      relations: ["Analysis"]
    },
    {
      name: "Suggestion",
      attributes: ["id", "analysisId", "original", "improved", "explanation", "category"],
      relations: ["Analysis"]
    },
    {
      name: "User",
      attributes: ["id", "name", "email", "createdAt"],
      relations: ["Prompt"]
    }
  ];

  // Función para generar colores de entidad basados en el nombre
  const getEntityColor = (name: string) => {
    const colors = {
      "Prompt": "bg-blue-100 border-blue-200 dark:bg-blue-950 dark:border-blue-900",
      "Analysis": "bg-purple-100 border-purple-200 dark:bg-purple-950 dark:border-purple-900",
      "GrammarIssue": "bg-red-100 border-red-200 dark:bg-red-950 dark:border-red-900",
      "ClarityIssue": "bg-amber-100 border-amber-200 dark:bg-amber-950 dark:border-amber-900",
      "EthicalIssue": "bg-green-100 border-green-200 dark:bg-green-950 dark:border-green-900",
      "Suggestion": "bg-cyan-100 border-cyan-200 dark:bg-cyan-950 dark:border-cyan-900",
      "User": "bg-indigo-100 border-indigo-200 dark:bg-indigo-950 dark:border-indigo-900"
    };
    return colors[name as keyof typeof colors] || "bg-gray-100 border-gray-200 dark:bg-gray-800 dark:border-gray-700";
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full overflow-auto p-4"
    >
      <Card className="p-6 w-full min-w-[800px]">
        <h3 className="text-lg font-medium mb-6">Diagrama de Entidad-Relación</h3>
        <div className="relative w-full h-[600px] border rounded-md p-4 bg-grid-pattern">
          {entities.map((entity, index) => (
            <motion.div
              key={entity.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`absolute p-4 rounded-md border-2 shadow-sm ${getEntityColor(entity.name)}`}
              style={{
                top: `${70 + (index % 4) * 150}px`,
                left: `${50 + Math.floor(index / 2) * 220}px`,
                width: '200px',
              }}
            >
              <div className="font-bold border-b pb-2 mb-2">{entity.name}</div>
              <div className="text-xs space-y-1">
                {entity.attributes.map(attr => (
                  <div key={attr} className="flex">
                    <span className="opacity-70 mr-1">•</span>
                    <span>{attr}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-2 border-t text-xs">
                <div className="opacity-70 mb-1">Relaciones:</div>
                <div className="flex flex-wrap gap-1">
                  {entity.relations.map(rel => (
                    <span key={rel} className="bg-background px-2 py-0.5 rounded-full text-[10px] border">
                      {rel}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Líneas de relación */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="0"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" className="fill-muted-foreground" />
              </marker>
            </defs>
            
            {/* Estas líneas son simplificadas y no representan todas las relaciones exactas */}
            <line x1="150" y1="120" x2="270" y2="170" className="stroke-muted-foreground stroke-[1.5]" strokeDasharray="4" />
            <line x1="150" y1="220" x2="270" y2="270" className="stroke-muted-foreground stroke-[1.5]" strokeDasharray="4" />
            <line x1="370" y1="170" x2="490" y2="120" className="stroke-muted-foreground stroke-[1.5]" strokeDasharray="4" />
            <line x1="370" y1="220" x2="490" y2="270" className="stroke-muted-foreground stroke-[1.5]" strokeDasharray="4" />
            <line x1="370" y1="370" x2="490" y2="420" className="stroke-muted-foreground stroke-[1.5]" strokeDasharray="4" />
            <line x1="150" y1="420" x2="270" y2="370" className="stroke-muted-foreground stroke-[1.5]" strokeDasharray="4" />
          </svg>
        </div>
      </Card>
    </motion.div>
  );
};

export default EntityDiagram;
