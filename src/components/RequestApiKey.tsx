"use client";

import CopyButton from "@/components/CopyButton";
import { createApiKey } from "@/helpers/create-api-key";
import { Button } from "@/ui/button";
import Heading from "@/ui/heading";
import { Input } from "@/ui/input";
import Paragraphs from "@/ui/paragraphs";
import { toast } from "@/ui/use-toast";
import { useSignal } from "@preact/signals-react";
import { LockClosedIcon, ReloadIcon } from "@radix-ui/react-icons";
import { FormEvent } from "react";

const RequestApiKey = () => {
  const isCreating = useSignal(false);
  const apiKey = useSignal<string | null>(null);

  const createNewApiKey = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      isCreating.value = true;
      const generateApiKey = await createApiKey();
      apiKey.value = generateApiKey;
    } catch (err) {
      if (err instanceof Error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: err.message,
        });
        return;
      }

      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong.",
      });
    } finally {
      isCreating.value = false;
    }
  };

  return (
    <div className="container md:max-w-2xl">
      <div className="flex flex-col items-center gap-6">
        <LockClosedIcon className="w-12 h-12 mx-auto text-gray-400" />
        <Heading>Request Your API Key</Heading>
        <Paragraphs>You haven&apos;t requested an API key yet.</Paragraphs>
      </div>

      <form
        className="mt-6 sm:flex sm:items-center"
        onSubmit={createNewApiKey}
        action="#"
      >
        <div className="relative rounded-md shadow-sm sm:min-w-0 sm:flex-1">
          {apiKey.value ? (
            <CopyButton
              type="button"
              valueToCopy={apiKey.value}
              className="absolute inset-y-0 right-0 duration-300 animate-in fade-in"
            />
          ) : null}
          <Input
            readOnly
            value={apiKey.value ?? ""}
            placeholder="Request an API Key to Display it Here!"
          />
        </div>
        <div className="flex justify-center mt-3 sm:mt-0 sm:ml-4 sm:flex-shrink-0">
          <Button disabled={!!apiKey.value || isCreating.value}>
            {isCreating.value ? (
              <>
                <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
                Creating
              </>
            ) : (
              "Request API Key"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RequestApiKey;
