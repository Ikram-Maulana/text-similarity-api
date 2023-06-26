import DocumentationTabs from "@/components/DocumentationTabs";
import Heading from "@/components/ui/heading";
import Paragraphs from "@/components/ui/paragraphs";
import { Metadata } from "next";
import "simplebar-react/dist/simplebar.min.css";

export const metadata: Metadata = {
  title: "Text Similarity API | Documentation",
  description:
    "Text Similarity API is a free and open source API for comparing text similarity.",
};

const page = () => {
  return (
    <div className="container mx-auto mt-12 max-w-7xl">
      <div className="flex flex-col items-center gap-6">
        <Heading>Making a Request</Heading>
        <Paragraphs>api/v1/similarity</Paragraphs>

        <DocumentationTabs />
      </div>
    </div>
  );
};

export default page;
