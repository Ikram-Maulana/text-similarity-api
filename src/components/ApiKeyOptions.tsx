"use client";

import { createApiKey } from "@/helpers/create-api-key";
import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { toast } from "@/ui/use-toast";
import { useClipboard } from "@mantine/hooks";
import { useSignal } from "@preact/signals-react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface ApiKeyOptionsProps {
  apiKeyId: string;
  apiKeyKey: string;
}

const ApiKeyOptions: FC<ApiKeyOptionsProps> = ({ apiKeyId, apiKeyKey }) => {
  const isCreatingNew = useSignal(false);
  const isRevoking = useSignal(false);
  const clipboard = useClipboard();
  const router = useRouter();

  const createNewApiKey = async () => {
    try {
      isCreatingNew.value = true;
      await revokeApiKey({ keyId: apiKeyId });
      await createApiKey();
      router.reload();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error creating API key",
        description: "Please try again later.",
      });
    } finally {
      isCreatingNew.value = false;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={isCreatingNew.value || isRevoking.value}
        asChild
      >
        <Button variant="ghost" className="flex items-center gap-2">
          <p>
            {isCreatingNew.value
              ? "Creating new key"
              : isRevoking.value
              ? "Revoking key"
              : "Options"}
          </p>
          {isCreatingNew.value || isRevoking.value ? (
            <ReloadIcon className="w-4 h-4 animate-spin" />
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            clipboard.copy(apiKeyKey);
            toast({
              title: "Copied",
              description: "API key copied to clipboard",
            });
          }}
        >
          Copy
        </DropdownMenuItem>
        <DropdownMenuItem>Create new key</DropdownMenuItem>
        <DropdownMenuItem>Revoke key</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ApiKeyOptions;
