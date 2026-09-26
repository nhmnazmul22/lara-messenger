"use client";

import { Loader2, LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

export function UserMenu({
  onOpenPanel,
}: {
  onOpenPanel: (panel: "profile" | "settings") => void;
}) {
  const { profile, logoutUser, isLoggingOut } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full p-0"
            aria-label="Open account menu"
          />
        }
      >
        <Avatar className="size-8">
          <AvatarFallback>NH</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex flex-col gap-0.5 px-3.5 py-3">
            <span className="text-sm font-semibold text-foreground">
              {profile?.name ?? "Loading..."}
            </span>
            <span className="text-xs font-normal text-muted-foreground">
              {profile?.email ?? "Loading..."}
            </span>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onOpenPanel("profile")}>
          <UserIcon />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onOpenPanel("settings")}>
          <SettingsIcon />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={logoutUser}>
          {isLoggingOut ? (
            <Loader2 className="animate-spin " />
          ) : (
            <LogOutIcon />
          )}
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
