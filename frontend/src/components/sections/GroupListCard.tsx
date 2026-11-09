import UserAvatar from "@/components/common/UserAvatar";
import { Group } from "@/types/group";

interface GroupListCardProps {
  group: Group;
}
export default function GroupListCard({ group }: GroupListCardProps) {
  return (
    <div
      className="flex cursor-default items-center gap-3 rounded-2xl p-2.5 transition-colors hover:bg-muted/70"
    >
      <div className="flex items-center gap-2">
        <UserAvatar
          avatar={group.logo ?? ""}
          alt={group.name}
          fallback={group.name[0]}
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{group.name}</p>
          <p className="mt-0.5 truncate text-sm text-muted-foreground">
            {group.description}
          </p>
        </div>
      </div>
    </div>
  );
}
