import GroupListCard from "@/components/sections/GroupListCard";

interface GroupOwner {
  id: number;
  name: string;
  email: string;
  avatar: string;
  email_verified_at: string | null;
  is_admin: boolean;
  blocked_at: string | null;
  created_at: string;
  updated_at: string;
}

interface Group {
  id: number;
  name: string;
  description: string;
  owner: GroupOwner;
  created_at: string;
  updated_at: string;
}

const GROUPS: Group[] = [
  {
    id: 1,
    name: "Development Team",
    description: "A group for developers to discuss projects and share updates.",
    owner: {
      id: 1,
      name: "Nazmul Hasan",
      email: "nhmnazmul87@gmail.com",
      avatar: "avatars/yuyl3nurTPvUcKa4tFSOjug03AMgABt4Vencf1jY.png",
      email_verified_at: null,
      is_admin: false,
      blocked_at: null,
      created_at: "2026-09-24T13:45:16.000000Z",
      updated_at: "2026-09-24T13:45:16.000000Z",
    },
    created_at: "2026-11-09T16:30:00.000000Z",
    updated_at: "2026-11-09T16:30:00.000000Z",
  },
  {
    id: 2,
    name: "Design Collective",
    description: "UI/UX designers sharing mockups and feedback.",
    owner: {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      avatar: "",
      email_verified_at: null,
      is_admin: false,
      blocked_at: null,
      created_at: "2026-11-08T10:15:00.000000Z",
      updated_at: "2026-11-08T10:15:00.000000Z",
    },
    created_at: "2026-11-08T10:15:00.000000Z",
    updated_at: "2026-11-08T10:15:00.000000Z",
  },
  {
    id: 3,
    name: "Product Circle",
    description: "Roadmap discussions and feature planning for upcoming releases.",
    owner: {
      id: 3,
      name: "Mike Chen",
      email: "mike.chen@example.com",
      avatar: "",
      email_verified_at: null,
      is_admin: false,
      blocked_at: null,
      created_at: "2026-11-07T14:20:00.000000Z",
      updated_at: "2026-11-07T14:20:00.000000Z",
    },
    created_at: "2026-11-07T14:20:00.000000Z",
    updated_at: "2026-11-07T14:20:00.000000Z",
  },
];

export function GroupsList() {
  return (
    <section
      className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-2.5 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent scrollbar-gutter-stable"
      aria-label="Groups"
    >
      {GROUPS.map((group) => (
        <GroupListCard key={group.id} group={group} />
      ))}
    </section>
  );
}
