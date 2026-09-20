import { HomeShell } from "@/components/messenger/home-shell";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <HomeShell>{children}</HomeShell>;
}