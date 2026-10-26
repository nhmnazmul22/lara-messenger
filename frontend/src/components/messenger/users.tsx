import {User} from "@/types/user";
import UserListCard from "@/components/sections/UserListCard";


export function UsersList({users}: {users: User[]}) {
  return (
    <section
      className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-2.5 scrollbar-thin scrollbar-thumb-border
      scrollbar-track-transparent scrollbar-gutter-stable"
      aria-label="Users"
    >
      {users?.map((user) => (
        <UserListCard key={user.id} user={user}/>
      ))}
    </section>
  );
}
