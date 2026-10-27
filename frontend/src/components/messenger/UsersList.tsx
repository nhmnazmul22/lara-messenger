import { User } from "@/types/user";
import UserListCard from "@/components/sections/UserListCard";
import { ListCardSkeleton } from "@/components/skeleton/ListCardSkeleton";
import { NotFound } from "@/components/common/not-found";
import { Error } from "@/components/common/error";
import useUser from "@/store/useUser";
import { useEffect } from "react";
import { getUsers } from "@/services/users";
import { Users } from "lucide-react";

export function UsersList() {
  const users = useUser((state) => state.users);
  const loading = useUser((state) => state.loading);
  const error = useUser((state) => state.error);
  const setUsers = useUser((state) => state.setUsers);
  const setLoading = useUser((state) => state.setLoading);
  const setError = useUser((state) => state.setError);

  const fetchUsers = async () => {
    console.count("fetchUsers called");

    try {
      setLoading(true);
      setError(null);
      const result = (await getUsers()) as {
        success: boolean;
        message?: string;
        data?: User[];
      };
      if (!result.success) {
        setError(result.message ?? "Failed to load users");
        return;
      }
      setUsers(result.data ?? []);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!users.length) {
      void fetchUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users.length]);

  if (loading) {
    return (
      <section
        className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-2.5 scrollbar-thin scrollbar-thumb-border
        scrollbar-track-transparent scrollbar-gutter-stable"
        aria-label="Users"
      >
        <ListCardSkeleton />
      </section>
    );
  }

  if (error) {
    return (
      <section
        className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-2.5 scrollbar-thin scrollbar-thumb-border
        scrollbar-track-transparent scrollbar-gutter-stable"
        aria-label="Users"
      >
        <Error
          title="Failed to load users"
          description={error}
          onRetry={() => {
            void fetchUsers();
          }}
        />
      </section>
    );
  }

  return (
    <section
      className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-2.5 scrollbar-thin scrollbar-thumb-border
      scrollbar-track-transparent scrollbar-gutter-stable"
      aria-label="Users"
    >
      {users.length ? (
        users.map((user) => <UserListCard key={user.id} user={user} />)
      ) : (
        <NotFound
          title="No users found"
          description="There are no users available right now."
          icon={<Users className="w-4 h-4" />}
        />
      )}
    </section>
  );
}
