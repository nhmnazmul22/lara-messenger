import { cn } from "@/lib/utils";
import { SidebarLists } from "../messenger/SidebarList";

const Sidebar = () => {
  return (
    <aside
      id="conversations-drawer"
      role="dialog"
      aria-modal="true"
      aria-label="Conversations"
      className={cn(
        "absolute top-16 bottom-0 left-0 z-40 w-1/2 min-w-64 max-w-full border-r border-border bg-background shadow-2xl shadow-black/10 transition-transform duration-300 ease-out lg:hidden",
      )}
    >
      <SidebarLists />
    </aside>
  );
};

export default Sidebar;
