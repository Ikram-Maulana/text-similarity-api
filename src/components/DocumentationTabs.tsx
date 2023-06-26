"use client";

import Code from "@/components/Code";
import { nodejs, python } from "@/helpers/documentation-code";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import SimpleBar from "simplebar-react";

const DocumentationTabs = () => {
  return (
    <Tabs defaultValue="nodejs" className="w-full max-w-2xl mb-0 md:mb-40">
      <TabsList>
        <TabsTrigger value="nodejs">NodeJS</TabsTrigger>
        <TabsTrigger value="python">Python</TabsTrigger>
      </TabsList>
      <TabsContent value="nodejs">
        <SimpleBar forceVisible="y">
          <Code animated language="javascript" code={nodejs} show />
        </SimpleBar>
      </TabsContent>
      <TabsContent value="python">
        <SimpleBar forceVisible="y">
          <Code animated language="python" code={python} show />
        </SimpleBar>
      </TabsContent>
    </Tabs>
  );
};

export default DocumentationTabs;
