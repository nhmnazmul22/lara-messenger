import { User } from "@/types/user";
import UserListCard from "@/components/sections/UserListCard";
import { ListCardSkeleton } from "@/components/skeleton/ListCardSkeleton";
import useUser from "@/store/useUser";
import { useEffect } from "react";
import { getUsers } from "@/services/users";

export function UsersList() {
  const users = useUser((state) => state.users);
  const setUsers = useUser((state) => state.setUsers);
  const loading = useUser((state) => state.loading);
  const setLoading = useUser((state) => state.setLoading);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await getUsers();
        if (result.success) {
          setUsers(result.data as User[]);
        }
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-2.5 scrollbar-thin scrollbar-thumb-border
      scrollbar-track-transparent scrollbar-gutter-stable"
      aria-label="Users"
    >
      {!loading ? <ListCardSkeleton /> : (
        users?.map((user) => (
          <UserListCard key={user.id} user={user} />
        ))
      )}
    </section>
  );
}
