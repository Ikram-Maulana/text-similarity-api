import UserAuthForm from "@/components/UserAuthForm";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import Paragraphs from "@/components/ui/paragraphs";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Text Similarity API | Login",
  description:
    "Text Similarity API is a free and open source API for comparing text similarity.",
};

const page = () => {
  return (
    <div className="container absolute inset-0 flex flex-col items-center justify-center h-screen mx-auto">
      <div className="flex flex-col justify-center w-full max-w-lg mx-auto space-y-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <Button variant="ghost" className="w-fit" asChild>
            <Link href="/">
              <ChevronLeftIcon className="w-4 h-4 mr-2" />
              Back to home
            </Link>
          </Button>

          <Heading>Welcome back!</Heading>
          <Paragraphs>Please sign in using your google account.</Paragraphs>

          <UserAuthForm />
        </div>
      </div>
    </div>
  );
};

export default page;
