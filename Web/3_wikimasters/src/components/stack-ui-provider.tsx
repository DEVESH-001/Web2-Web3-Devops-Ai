"use client";

import { TooltipProvider } from "@stackframe/stack-ui";

export function StackUiProvider({ children }: { children: React.ReactNode }) {
  return <TooltipProvider>{children}</TooltipProvider>;
}
