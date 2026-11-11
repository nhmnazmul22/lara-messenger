import ReusableImage from "@/components/common/ReusableImage";
import { Group } from "@/types/group";
import useGroup from "@/store/useGroup";

interface GroupListCardProps {
  group: Group;
}

export default function GroupListCard({ group }: GroupListCardProps) {
  const setActiveGroup = useGroup((state) => state.setActiveGroup);

  return (
    <div
      className="flex cursor-default items-center gap-3 rounded-2xl p-2.5 transition-colors hover:bg-muted/70 min-w-0"
      onClick={() => setActiveGroup(group)}
    >
      <div className="shrink-0">
        <ReusableImage
          avatar={group.logo ?? ""}
          alt={group.name}
          fallback={group.name[0]}
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{group.name}</p>
        <p className="mt-0.5 truncate text-sm text-muted-foreground">
          {group.description}
        </p>
      </div>
    </div>
  );
}
