import { Avatar, AvatarBadge, AvatarFallback } from "@/components/ui/avatar";
import type { User } from "@/lib/mock-data";

export function UsersList({ users }: { users: User[] }) {
  return (
    <nav
      className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-2.5 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent scrollbar-gutter-stable"
      aria-label="Users"
    >
      {users.map((user) => (
        <div
          key={user.id}
          className="flex cursor-default items-center gap-3 rounded-2xl p-2.5 transition-colors hover:bg-muted/70"
        >
          <Avatar size="lg" className="shrink-0">
            <AvatarFallback>{user.initials}</AvatarFallback>
            {user.online ? <AvatarBadge /> : null}
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{user.name}</p>
            <p className="mt-0.5 truncate text-sm text-muted-foreground">
              {user.about}
            </p>
          </div>
        </div>
      ))}
    </nav>
  );
}
