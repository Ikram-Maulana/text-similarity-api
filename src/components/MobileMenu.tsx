"use client";

import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { useToast } from "@/ui/use-toast";
import { useViewportSize } from "@mantine/hooks";
import { useSignal } from "@preact/signals-react";
import {
  DashboardIcon,
  InfoCircledIcon,
  PersonIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const MobileMenu = () => {
  const { data: session } = useSession();
  const isLoading = useSignal(false);
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();
  const { width } = useViewportSize();

  useEffect(() => {
    if (width >= 768) setOpen(false);
  }, [width]);

  const signUserOut = async () => {
    try {
      isLoading.value = true;
      await signOut();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: "Please try again later.",
      });
    }
  };

  return (
    <nav className="fixed left-0 right-0 z-50 flex justify-center md:hidden bottom-20">
      <div className="rounded-md shadow-2xl outline outline-2 outline-white dark:outline-slate-900">
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild onClick={() => setOpen((prev) => !prev)}>
            <Button variant="outline" size="lg">
              Menu
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup onClick={() => setOpen(false)}>
              <DropdownMenuItem asChild>
                {session ? (
                  <Link
                    href="/dashboard"
                    className="w-full flex items-center gap-1.5"
                  >
                    <DashboardIcon className="w-5 h-5 mr-2" />
                    <span>Dashboard</span>
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="flex w-full items-center gap-1.5"
                  >
                    <DashboardIcon className="w-5 h-5 mr-2" />
                    <span>Sign in</span>
                  </Link>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href="/documentation"
                  className="w-full flex items-center gap-1.5"
                >
                  <InfoCircledIcon className="w-5 h-5 mr-2" />
                  <span>Docs</span>
                </Link>
              </DropdownMenuItem>
              {session ? (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signUserOut} className="gap-1.5">
                    <PersonIcon className="w-5 h-5 mr-2" />
                    <span>{isLoading.value ? "Signing out" : "Sign out"}</span>
                    {isLoading.value ? (
                      <ReloadIcon className="w-4 h-4 animate-spin" />
                    ) : null}
                  </DropdownMenuItem>
                </>
              ) : null}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default MobileMenu;
