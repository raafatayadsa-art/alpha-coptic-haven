import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Alpha global screen layout.
 *
 * Every screen renders inside this (applied automatically by the root shell),
 * so iPhone safe areas are handled once:
 *  - horizontal insets (landscape / rounded corners) via `safe-x`
 *  - bottom Home Indicator + fixed bottom nav clearance via `safe-nav-gap`
 * Top inset (notch / Dynamic Island) is handled by sticky headers with
 * `safe-top` + `safe-sticky-top`, or by adding `safe-top` here when a screen
 * has no header.
 *
 * Never hardcode `env(safe-area-inset-*)` in a screen — use these utilities.
 */
export function Screen({
  children,
  className,
  withTopInset = false,
  withBottomNav = true,
}: {
  children: ReactNode;
  className?: string;
  withTopInset?: boolean;
  withBottomNav?: boolean;
}) {
  return (
    <div
      className={cn(
        "safe-x min-h-screen w-full",
        withTopInset && "safe-top",
        withBottomNav ? "safe-nav-gap" : "safe-bottom",
        className,
      )}
    >
      {children}
    </div>
  );
}
