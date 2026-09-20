import { BellIcon, PaletteIcon, ShieldAlertIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

const notificationSettings = [
  {
    title: "Email notifications",
    description: "Receive a summary of unread messages.",
    defaultChecked: true,
  },
  {
    title: "Push notifications",
    description: "Get instant alerts on new messages.",
    defaultChecked: true,
  },
  {
    title: "Sound for new messages",
    description: "Play a sound when a message arrives.",
    defaultChecked: false,
  },
  {
    title: "Read receipts",
    description: "Let others know when you've read their messages.",
    defaultChecked: true,
  },
];

export function SettingsContent() {
  return (
    <div className="flex flex-col gap-10 px-4 py-6 sm:px-6">
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <BellIcon className="size-4.5 text-muted-foreground" />
          <h2 className="font-display text-base font-semibold tracking-tight">
            Notifications
          </h2>
        </div>
        <div className="divide-y divide-border rounded-3xl border border-border">
          {notificationSettings.map((setting) => (
            <div
              key={setting.title}
              className="flex items-center justify-between gap-6 px-4 py-3.5"
            >
              <div>
                <p className="text-sm font-medium">{setting.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {setting.description}
                </p>
              </div>
              <Switch
                aria-label={setting.title}
                defaultChecked={setting.defaultChecked}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <PaletteIcon className="size-4.5 text-muted-foreground" />
          <h2 className="font-display text-base font-semibold tracking-tight">
            Preferences
          </h2>
        </div>
        <div className="flex flex-col gap-5 rounded-3xl border border-border p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">Language</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Choose your interface language.
              </p>
            </div>
            <Select defaultValue="english">
              <SelectTrigger aria-label="Language" className="min-w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="french">French</SelectItem>
                <SelectItem value="german">German</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">Theme</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Adjust the appearance of the app.
              </p>
            </div>
            <Select defaultValue="system">
              <SelectTrigger aria-label="Theme" className="min-w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <Separator />

      <section className="flex flex-col gap-4 rounded-3xl border border-destructive/30 bg-destructive/5 p-5">
        <div className="flex items-center gap-2">
          <ShieldAlertIcon className="size-4.5 text-destructive" />
          <h2 className="font-display text-base font-semibold tracking-tight text-destructive">
            Danger zone
          </h2>
        </div>
        <p className="text-sm text-muted-foreground">
          These actions are permanent and cannot be undone.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            className="border-destructive/30 text-destructive hover:border-destructive/50 hover:bg-destructive/10 hover:text-destructive"
          >
            Deactivate account
          </Button>
          <Button type="button" variant="destructive">
            Delete account
          </Button>
        </div>
      </section>
    </div>
  );
}