import type { ReactNode } from "react";
import { AppShell } from "@/src/shared/components/AppShell";

export default function AppPortalLayout({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
