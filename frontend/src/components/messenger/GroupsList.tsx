"use client";

import { useEffect } from "react";
import GroupListCard from "@/components/sections/GroupListCard";
import { Group } from "@/types/group";
import useGroup from "@/store/useGroup";

export function GroupsList() {
  const groups = useGroup((state) => state.groups);
  const loading = useGroup((state) => state.groupsLoading);
  const error = useGroup((state) => state.error);
  const fetchGroups = useGroup((state) => state.fetchGroups);

  useEffect(() => {
    if (!groups.length && !loading) {
      void fetchGroups();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups.length, loading]);

  if (loading) {
    return (
      <section
        className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-2.5 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent scrollbar-gutter-stable"
        aria-label="Groups"
      >
        <div className="animate-pulse flex items-center gap-3 p-4">
          <span className="h-8 w-20 rounded-full bg-muted/50" />
          <span className="h-8 w-8 rounded-full bg-muted/50" />
        </div>
      </section>
    );
  }

  if (!loading && error) {
    return (
      <section
        className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-2.5 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent scrollbar-gutter-stable"
        aria-label="Groups"
      >
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-2.5 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent scrollbar-gutter-stable"
      aria-label="Groups"
    >
      {groups.length ? (
        groups.map((group: Group) => (
          <GroupListCard key={group.id} group={group} />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <p className="text-sm text-muted-foreground">No groups found</p>
        </div>
      )}
    </section>
  );
}
