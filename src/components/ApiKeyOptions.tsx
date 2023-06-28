"use client";

import { createApiKey } from "@/helpers/create-api-key";
import { revokeApiKey } from "@/helpers/revoke-api-key";
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
      await revokeApiKey();
      await createApiKey();
      router.refresh();
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

  const revokeCurrentApiKey = async () => {
    try {
      isRevoking.value = true;
      await revokeApiKey();
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error revoking API key",
        description: "Please try again later.",
      });
    } finally {
      isRevoking.value = false;
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
        <DropdownMenuItem onClick={createNewApiKey}>
          Create new key
        </DropdownMenuItem>
        <DropdownMenuItem onClick={revokeCurrentApiKey}>
          Revoke key
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ApiKeyOptions;
