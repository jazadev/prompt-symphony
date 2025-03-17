
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, FileCode } from "lucide-react";
import EntityDiagram from "./EntityDiagram";
import EndpointsSwagger from "./EndpointsSwagger";

const SystemDocumentation: React.FC = () => {
  return (
    <div className="w-full max-w-screen-xl mx-auto">
      <Tabs defaultValue="entities" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="entities" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span>Entidades</span>
          </TabsTrigger>
          <TabsTrigger value="endpoints" className="flex items-center gap-2">
            <FileCode className="h-4 w-4" />
            <span>Endpoints</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="entities">
          <EntityDiagram />
        </TabsContent>
        <TabsContent value="endpoints">
          <EndpointsSwagger />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemDocumentation;
