import { Button } from "@/ui/button";
import Heading from "@/ui/heading";
import Paragraphs from "@/ui/paragraphs";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Text Similarity API | Page Not Found",
  description:
    "Text Similarity API is a free and open source API for comparing text similarity.",
};

const pageNotFound = () => {
  return (
    <section className="container flex flex-col items-center gap-6 pt-32 mx-auto text-center max-w-7xl">
      <Heading>Page Not Found</Heading>
      <Paragraphs>The page you&apos;re looking for does not exist.</Paragraphs>
      <Button variant="ghost" asChild>
        <Link href="/">
          <ChevronLeftIcon className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
      </Button>
    </section>
  );
};

export default pageNotFound;
