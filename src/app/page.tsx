import Heading from "@/components/ui/heading";
import Paragragraphs from "@/components/ui/paragraphs";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Text Similarity API | Home",
  description:
    "Text Similarity API is a free and open source API for comparing text similarity.",
};

export default function Home() {
  return (
    <div className="relative flex items-center justify-center h-screen overflow-x-hidden">
      <div className="container w-full h-full pt-32 mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-start h-full gap-6 lg:justify-center lg:items-start">
          <Heading
            size="lg"
            className="text-black three-d dark:text-light-gold"
          >
            Easily to compare <br />
            text similarity
          </Heading>

          <Paragragraphs className="max-w-xl lg:text-left">
            With Text Similarity API, you can easily compare the similarity
            between two pieces of text with a free{" "}
            <Link
              href="/login"
              className="text-black underline underline-offset-2 dark:text-light-gold"
            >
              API key
            </Link>
            .
          </Paragragraphs>

          <div className="relative w-full max-w-lg lg:max-w-xl lg:left-[55%] aspect-square lg:absolute">
            <Image
              priority
              className="image-shadow"
              quality={100}
              style={{
                objectFit: "contain",
              }}
              fill
              src="/notebook.png"
              alt="notebook"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
