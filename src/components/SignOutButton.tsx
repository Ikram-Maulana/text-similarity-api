"use client";

import { Button } from "@/ui/button";
import { useToast } from "@/ui/use-toast";
import { useSignal } from "@preact/signals-react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  const isLoading = useSignal(false);
  const { toast } = useToast();

  const signUserOut = async () => {
    try {
      isLoading.value = true;
      await signOut();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: "Please try again later",
      });
    }
  };

  return (
    <Button onClick={signUserOut} disabled={isLoading.value}>
      {isLoading.value ? (
        <>
          <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
          Signing Out
        </>
      ) : (
        "Sign Out"
      )}
    </Button>
  );
};

export default SignOutButton;
