import SignInButton from "@/components/SignInButton";
import SignOutButton from "@/components/SignOutButton";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/ui/button";
import { getServerSession } from "next-auth";
import Link from "next/link";

const Navbar = async () => {
  const session = await getServerSession();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center h-20 border-b shadow-sm backdrop-blur-sm bg-white/75 dark:bg-slate-900/75 border-slate-300 dark:border-slate-700">
      <div className="container flex items-center justify-between w-full mx-auto max-w-7xl">
        <Button variant="link" asChild>
          <Link href="/">Text Similarity 1.0</Link>
        </Button>

        <div className="md:hidden">
          <ThemeToggle />
        </div>

        <div className="hidden gap-4 md:flex">
          <ThemeToggle />

          <Button variant="ghost" asChild>
            <Link href="/documentation">Documentation</Link>
          </Button>

          {session ? (
            <>
              <Button variant="ghost" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <SignOutButton />
            </>
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
