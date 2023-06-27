"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import { toast } from "@/ui/use-toast";
import { useClipboard } from "@mantine/hooks";
import { useComputed } from "@preact/signals-react";
import { CopyIcon } from "@radix-ui/react-icons";
import { ButtonHTMLAttributes, FC } from "react";

interface CopyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  valueToCopy: string;
}

const CopyButton: FC<CopyButtonProps> = ({
  valueToCopy,
  className,
  ...props
}) => {
  const clipboard = useClipboard();

  useComputed(() => {
    if (clipboard.copied) {
      toast({
        title: "Copied!",
        description: "API Key Copied to Clipboard",
      });
    }
  });

  return (
    <Button
      {...props}
      onClick={() => {
        clipboard.copy(valueToCopy);
      }}
      variant="ghost"
      className={cn(className)}
    >
      <CopyIcon className="w-5 h-5" />
    </Button>
  );
};

export default CopyButton;
