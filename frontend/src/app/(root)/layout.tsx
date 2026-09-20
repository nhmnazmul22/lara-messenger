import type { ReactNode } from "react";

import { HomeShell } from "@/components/messenger/home-shell";

export default function RootLayout({
  panel,
}: LayoutProps<"/"> & { panel: ReactNode }) {
  return <HomeShell>{panel}</HomeShell>;
}