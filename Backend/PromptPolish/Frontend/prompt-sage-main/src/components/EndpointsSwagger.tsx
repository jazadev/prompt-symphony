
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, ChevronRight } from "lucide-react";

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface Response {
  code: string;
  description: string;
}

interface Endpoint {
  path: string;
  method: Method;
  summary: string;
  description: string;
  parameters: Parameter[];
  requestBody?: {
    type: string;
    properties: Record<string, { type: string; description: string }>;
  };
  responses: Response[];
  tags: string[];
}

const EndpointsSwagger: React.FC = () => {
  const [expandedEndpoint, setExpandedEndpoint] = useState<string | null>(null);

  const toggleEndpoint = (path: string) => {
    if (expandedEndpoint === path) {
      setExpandedEndpoint(null);
    } else {
      setExpandedEndpoint(path);
    }
  };

  const getMethodColor = (method: Method) => {
    const colors = {
      GET: "bg-green-500",
      POST: "bg-blue-500",
      PUT: "bg-amber-500",
      DELETE: "bg-red-500",
      PATCH: "bg-purple-500"
    };
    return colors[method];
  };

  const endpoints: Endpoint[] = [
    {
      path: "/api/prompts",
      method: "GET",
      summary: "Listar prompts",
      description: "Retorna una lista de prompts del usuario actual",
      parameters: [
        { name: "page", type: "integer", required: false, description: "Número de página" },
        { name: "limit", type: "integer", required: false, description: "Elementos por página" }
      ],
      responses: [
        { code: "200", description: "Lista de prompts" },
        { code: "401", description: "No autorizado" }
      ],
      tags: ["Prompts"]
    },
    {
      path: "/api/prompts",
      method: "POST",
      summary: "Crear prompt",
      description: "Crea un nuevo prompt y realiza su análisis",
      parameters: [],
      requestBody: {
        type: "object",
        properties: {
          text: { type: "string", description: "Texto del prompt" }
        }
      },
      responses: [
        { code: "201", description: "Prompt creado" },
        { code: "400", description: "Datos inválidos" },
        { code: "401", description: "No autorizado" }
      ],
      tags: ["Prompts"]
    },
    {
      path: "/api/prompts/{id}",
      method: "GET",
      summary: "Obtener prompt",
      description: "Retorna un prompt específico con su análisis",
      parameters: [
        { name: "id", type: "string", required: true, description: "ID del prompt" }
      ],
      responses: [
        { code: "200", description: "Prompt con análisis" },
        { code: "404", description: "Prompt no encontrado" },
        { code: "401", description: "No autorizado" }
      ],
      tags: ["Prompts"]
    },
    {
      path: "/api/analysis/{id}",
      method: "GET",
      summary: "Obtener análisis",
      description: "Retorna un análisis detallado",
      parameters: [
        { name: "id", type: "string", required: true, description: "ID del análisis" }
      ],
      responses: [
        { code: "200", description: "Análisis detallado" },
        { code: "404", description: "Análisis no encontrado" },
        { code: "401", description: "No autorizado" }
      ],
      tags: ["Analysis"]
    },
    {
      path: "/api/analysis/optimize",
      method: "POST",
      summary: "Optimizar prompt",
      description: "Optimiza un prompt sin guardarlo",
      parameters: [],
      requestBody: {
        type: "object",
        properties: {
          text: { type: "string", description: "Texto del prompt a optimizar" }
        }
      },
      responses: [
        { code: "200", description: "Prompt optimizado" },
        { code: "400", description: "Datos inválidos" }
      ],
      tags: ["Analysis"]
    },
    {
      path: "/api/suggestions/{id}",
      method: "GET",
      summary: "Obtener sugerencias",
      description: "Retorna sugerencias para un análisis",
      parameters: [
        { name: "id", type: "string", required: true, description: "ID del análisis" },
        { name: "type", type: "string", required: false, description: "Tipo de sugerencia" }
      ],
      responses: [
        { code: "200", description: "Lista de sugerencias" },
        { code: "404", description: "Análisis no encontrado" }
      ],
      tags: ["Suggestions"]
    },
    {
      path: "/api/users/profile",
      method: "GET",
      summary: "Obtener perfil",
      description: "Retorna el perfil del usuario actual",
      parameters: [],
      responses: [
        { code: "200", description: "Perfil de usuario" },
        { code: "401", description: "No autorizado" }
      ],
      tags: ["Users"]
    },
    {
      path: "/api/users/history",
      method: "GET",
      summary: "Historial de usuario",
      description: "Retorna el historial de prompts del usuario",
      parameters: [
        { name: "page", type: "integer", required: false, description: "Número de página" },
        { name: "limit", type: "integer", required: false, description: "Elementos por página" }
      ],
      responses: [
        { code: "200", description: "Historial de usuario" },
        { code: "401", description: "No autorizado" }
      ],
      tags: ["Users"]
    }
  ];

  // Agrupar endpoints por tags
  const groupedEndpoints: Record<string, Endpoint[]> = {};
  endpoints.forEach(endpoint => {
    endpoint.tags.forEach(tag => {
      if (!groupedEndpoints[tag]) {
        groupedEndpoints[tag] = [];
      }
      groupedEndpoints[tag].push(endpoint);
    });
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full p-4"
    >
      <Card className="p-6">
        <div className="flex items-center mb-6">
          <h3 className="text-lg font-medium">API Endpoints</h3>
          <Badge variant="outline" className="ml-2">v1.0</Badge>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            {Object.keys(groupedEndpoints).map(tag => (
              <TabsTrigger key={tag} value={tag}>{tag}</TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            {endpoints.map((endpoint, index) => (
              <EndpointItem 
                key={`${endpoint.path}-${endpoint.method}-${index}`}
                endpoint={endpoint}
                isExpanded={expandedEndpoint === `${endpoint.path}-${endpoint.method}-${index}`}
                toggleEndpoint={() => toggleEndpoint(`${endpoint.path}-${endpoint.method}-${index}`)}
                getMethodColor={getMethodColor}
              />
            ))}
          </TabsContent>
          
          {Object.entries(groupedEndpoints).map(([tag, tagEndpoints]) => (
            <TabsContent key={tag} value={tag} className="mt-4">
              {tagEndpoints.map((endpoint, index) => (
                <EndpointItem 
                  key={`${endpoint.path}-${endpoint.method}-${index}`}
                  endpoint={endpoint}
                  isExpanded={expandedEndpoint === `${endpoint.path}-${endpoint.method}-${index}`}
                  toggleEndpoint={() => toggleEndpoint(`${endpoint.path}-${endpoint.method}-${index}`)}
                  getMethodColor={getMethodColor}
                />
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </Card>
    </motion.div>
  );
};

interface EndpointItemProps {
  endpoint: Endpoint;
  isExpanded: boolean;
  toggleEndpoint: () => void;
  getMethodColor: (method: Method) => string;
}

const EndpointItem: React.FC<EndpointItemProps> = ({ 
  endpoint, 
  isExpanded, 
  toggleEndpoint,
  getMethodColor
}) => {
  return (
    <div className="mb-2">
      <div 
        className="flex items-center p-3 hover:bg-secondary rounded-md cursor-pointer"
        onClick={toggleEndpoint}
      >
        <div className={`${isExpanded ? 'rotate-90' : ''} mr-2 transition-transform`}>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className={`${getMethodColor(endpoint.method)} px-2 py-1 rounded text-white text-xs font-medium w-16 text-center mr-3`}>
          {endpoint.method}
        </div>
        <div className="font-mono text-sm">{endpoint.path}</div>
        <div className="ml-auto text-xs text-muted-foreground">{endpoint.summary}</div>
      </div>
      
      {isExpanded && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="ml-8 pl-4 border-l mt-1 mb-4"
        >
          <div className="text-sm mb-3">{endpoint.description}</div>
          
          {endpoint.parameters.length > 0 && (
            <div className="mb-3">
              <div className="text-xs font-medium mb-2 text-muted-foreground">Parámetros</div>
              <div className="bg-secondary/50 rounded-md p-3 text-xs">
                <table className="w-full">
                  <thead>
                    <tr className="text-left">
                      <th className="pb-2">Nombre</th>
                      <th className="pb-2">Tipo</th>
                      <th className="pb-2">Requerido</th>
                      <th className="pb-2">Descripción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {endpoint.parameters.map((param, idx) => (
                      <tr key={idx} className="border-t border-border/30">
                        <td className="py-2 font-mono">{param.name}</td>
                        <td className="py-2">
                          <Badge variant="secondary" className="font-normal">
                            {param.type}
                          </Badge>
                        </td>
                        <td className="py-2">{param.required ? 'Sí' : 'No'}</td>
                        <td className="py-2">{param.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {endpoint.requestBody && (
            <div className="mb-3">
              <div className="text-xs font-medium mb-2 text-muted-foreground">Body de la petición</div>
              <div className="bg-secondary/50 rounded-md p-3 text-xs">
                <div className="mb-1">
                  <Badge variant="secondary" className="font-normal">
                    {endpoint.requestBody.type}
                  </Badge>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="text-left">
                      <th className="pb-2">Propiedad</th>
                      <th className="pb-2">Tipo</th>
                      <th className="pb-2">Descripción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(endpoint.requestBody.properties).map(([name, prop], idx) => (
                      <tr key={idx} className="border-t border-border/30">
                        <td className="py-2 font-mono">{name}</td>
                        <td className="py-2">
                          <Badge variant="secondary" className="font-normal">
                            {prop.type}
                          </Badge>
                        </td>
                        <td className="py-2">{prop.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          <div>
            <div className="text-xs font-medium mb-2 text-muted-foreground">Respuestas</div>
            <div className="bg-secondary/50 rounded-md p-3 text-xs">
              {endpoint.responses.map((response, idx) => (
                <div key={idx} className={idx > 0 ? "mt-2 pt-2 border-t border-border/30" : ""}>
                  <Badge className={response.code.startsWith("2") ? "bg-green-500" : 
                                   response.code.startsWith("4") ? "bg-red-500" : "bg-amber-500"}>
                    {response.code}
                  </Badge>
                  <span className="ml-2">{response.description}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default EndpointsSwagger;
