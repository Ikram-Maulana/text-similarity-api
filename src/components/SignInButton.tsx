"use client";

import { Button } from "@/ui/button";
import { useToast } from "@/ui/use-toast";
import { useSignal } from "@preact/signals-react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { signIn } from "next-auth/react";

const SignInButton = () => {
  const isLoading = useSignal(false);
  const { toast } = useToast();

  const signInWithGoogle = async () => {
    try {
      isLoading.value = true;
      await signIn("google");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: "Please try again later",
      });
    }
  };

  return (
    <Button onClick={signInWithGoogle} disabled={isLoading.value}>
      {isLoading.value ? (
        <>
          <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
          Signing In
        </>
      ) : (
        "Sign In"
      )}
    </Button>
  );
};

export default SignInButton;
