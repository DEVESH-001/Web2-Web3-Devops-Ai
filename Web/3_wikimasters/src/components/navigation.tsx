import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export function Navbar() {
  return (
    <nav className="w-full border-b bg-white/80 backdrop-blue supports-backdrop-filter:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="font-bold text-xl tracking-tight text-gray-900"
        >
          WikiMasters
        </Link>
        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-2">
            <NavigationMenuItem>
              <Button asChild variant={"outline"}>
                <Link href="/singin">Sign In</Link>
              </Button>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Button asChild variant={"default"}>
                {/* asChild ensures the button adopts the link's semantics means it will be treated as a link by screen readers and search engines */}
                <Link href="/signup">Sign Up</Link>
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
