"use client";

import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
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
import UserAvatar from "@/components/common/UserAvatar";
import useGroup from "@/store/useGroup";
import useUser from "@/store/useUser";
import { createNewGroup } from "@/services/gruop";
import { toast } from "@/components/ui/toast";

interface CreateGroupSheetProps {
  open: boolean;
  onClose: () => void;
}

export function CreateGroupSheet({ open, onClose }: CreateGroupSheetProps) {
  const setLoading = useGroup((state) => state.setGroupLoading);
  const users = useUser((state) => state.users);
  const [name, setName] = useState("New group");
  const [description, setDescription] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  const toggleUser = (id: number) => {
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);

      if (selectedUserIds.length) {
        selectedUserIds.forEach((id) => {
          formData.append("users_ids[]", String(id));
        });
      }

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
              <div className="relative inline-block">
                <input
                  id="group-logo-input"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleLogoChange}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const input = document.getElementById("group-logo-input");
                    if (input) input.click();
                  }}
                >
                  {logoUrl ? "Change logo" : "Upload logo"}
                </Button>
                {logoUrl && (
                  <div className="absolute top-0 right-0 mt-1 mr-1">
                    <button
                      type="button"
                      onClick={() => setLogoUrl(null)}
                      className="p-1 rounded-full hover:bg-muted text-foreground"
                    >
                      <ImageIcon className="size-3" />
                    </button>
                  </div>
                )}
                {logoUrl && (
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex shrink-0">
                      <UserAvatar
                        avatar={logoUrl}
                        alt={name}
                        fallback={name[0]}
                      />
                    </div>
                  </div>
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
              <Label className="block">Add members</Label>
              <div className="mt-2 space-y-1">
                {users.map((user) => (
                  <Label
                    key={user.id}
                    className="flex items-center gap-3 cursor-pointer select-none p-2 rounded-xl hover:bg-muted/50"
                  >
                    <Checkbox
                      checked={selectedUserIds.includes(user.id)}
                      onCheckedChange={() => toggleUser(user.id)}
                    />
                    <div className="min-w-0">
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
            </div>
          </div>
        </div>
        <div className="border-t border-border p-4 sm:px-6 flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button size="sm" disabled={!name.trim()} onClick={handleSubmit}>
            Create group
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
