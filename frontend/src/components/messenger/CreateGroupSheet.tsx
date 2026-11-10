"use client";

import { useEffect, useState } from "react";
import {
  Plus as PlusIcon,
  Loader2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import ReusableImage from "@/components/common/ReusableImage";
import useGroup from "@/store/useGroup";
import useUser from "@/store/useUser";
import { createNewGroup } from "@/services/gruop";
import { getUsers } from "@/services/users";
import { toast } from "@/components/ui/toast";
import Image from "next/image";

interface CreateGroupSheetProps {
  open: boolean;
  onClose: () => void;
}

export function CreateGroupSheet({ open, onClose }: CreateGroupSheetProps) {
  const groupsLoading = useGroup((state) => state.groupsLoading);
  const setLoading = useGroup((state) => state.setGroupLoading);
  const fetchGroups = useGroup((state) => state.fetchGroups);
  const users = useUser((state) => state.users);
  const [name, setName] = useState("New group");
  const [description, setDescription] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!users.length) {
      void getUsers().then((res: any) => {
        if (res?.data) {
          useUser.getState().setUsers(res.data);
        }
      });
    }
  }, [users.length]);

  const toggleUser = (id: number) => {
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      console.log(URL.createObjectURL(file));
      setLogoUrl(URL.createObjectURL(file));
    }
  };

  const removeLogo = () => {
    if (logoUrl) URL.revokeObjectURL(logoUrl);
    setLogoFile(null);
    setLogoUrl(null);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    if (logoFile) {
      formData.append("logo", logoFile);
    }

    selectedUserIds.forEach((id) => {
      formData.append("users_ids[]", String(id));
    });

    setLoading(true);
    try {
      const result = await createNewGroup(formData);
      if (!result.success) {
        toast.add({ type: "error", description: result.message });
        return;
      }
      toast.add({
        type: "success",
        description: result.message,
      });
      await fetchGroups();
      onClose();
    } catch (err) {
      toast.add({
        type: "error",
        description:
          err instanceof Error ? err.message : "Failed to create group",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      <SheetContent
        side="right"
        className="w-full sm:w-110 sm:max-w-none"
        showCloseButton
      >
        <SheetHeader className="border-b border-border p-4 sm:px-6">
          <SheetTitle className="font-display text-lg font-semibold tracking-tight">
            Create Group
          </SheetTitle>
        </SheetHeader>
        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:px-6 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent scrollbar-gutter-stable">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="block">Group logo</Label>
              <div className="relative flex flex-col items-center gap-2 p-3 rounded-2xl border border-dashed border-border bg-muted/50 hover:bg-muted/80 transition-colors cursor-pointer group">
                <input
                  id="group-logo-input"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleLogoChange}
                />
                <label
                  htmlFor="group-logo-input"
                  className="flex flex-col items-center gap-1 cursor-pointer"
                >
                  <PlusIcon className="size-4 text-muted-foreground group-hover:text-primary" />
                  <span className="text-xs text-muted-foreground group-hover:text-primary">
                    {logoUrl ? "Change logo" : "Upload group logo"}
                  </span>
                </label>
                {logoUrl && (
                  <div className="relative shrink-0 w-20 h-20 rounded-full overflow-hidden border border-border">
                    <Image
                      src={logoUrl}
                      alt={name}
                      width={600}
                      height={600}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {logoUrl && (
                  <button
                    type="button"
                    onClick={removeLogo}
                    className="absolute -top-1 -right-1 p-1.5 rounded-full bg-background hover:bg-red-50 text-red-600 hover:text-red-800 transition-colors"
                    aria-label="Remove logo"
                  >
                    <X className="size-3" />
                  </button>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-group-name">Group name</Label>
              <Input
                id="create-group-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-group-description">Description</Label>
              <Textarea
                id="create-group-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="block">Add members</Label>
                <span className="text-xs text-muted-foreground">
                  {selectedUserIds.length} selected
                </span>
              </div>
              {users.length ? (
                <div className="mt-2 space-y-1 max-h-64 overflow-y-auto">
                  {users.map((user) => (
                    <Label
                      key={user.id}
                      className="flex items-center gap-3 cursor-pointer select-none p-2 rounded-xl hover:bg-muted/50"
                    >
                      <Checkbox
                        checked={selectedUserIds.includes(user.id)}
                        onCheckedChange={() => toggleUser(user.id)}
                      />
                      <ReusableImage
                        avatar={user.avatar}
                        alt={user.name}
                        fallback={user.name[0]}
                        className="size-8 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user.email}
                        </p>
                      </div>
                    </Label>
                  ))}
                </div>
              ) : (
                <div className="mt-2 p-3 rounded-xl bg-muted/50 text-center text-sm text-muted-foreground">
                  No users available to add
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="border-t border-border p-4 sm:px-6 flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            size="sm"
            disabled={!name.trim() || groupsLoading}
            onClick={handleSubmit}
          >
            {groupsLoading ? (
              <Loader2 className="animate-spin size-4" />
            ) : (
              "Create group"
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
