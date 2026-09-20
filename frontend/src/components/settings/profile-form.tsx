import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export function ProfileForm() {
  return (
    <div className="flex flex-col gap-10 px-4 py-6 sm:px-6">
      <section className="flex flex-col gap-6">
        <div>
          <h2 className="font-display text-base font-semibold tracking-tight">
            Basic information
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Update your personal details.
          </p>
        </div>
        <FieldGroup className="gap-4">
          <Field>
            <FieldLabel htmlFor="profile-name">Name</FieldLabel>
            <Input id="profile-name" placeholder="Nazmul Hasan" />
          </Field>
          <Field>
            <FieldLabel htmlFor="profile-email">Email</FieldLabel>
            <Input
              id="profile-email"
              type="email"
              placeholder="nazmul@example.com"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="profile-phone">Phone number</FieldLabel>
            <Input
              id="profile-phone"
              type="tel"
              placeholder="+1 555 000 1234"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="profile-bio">About</FieldLabel>
            <Textarea
              id="profile-bio"
              rows={3}
              placeholder="Full-stack developer. Coffee runs on WebSockets."
            />
          </Field>
        </FieldGroup>
        <Button type="button" size="lg" className="w-full sm:w-fit">
          Save changes
        </Button>
      </section>

      <Separator />

      <section className="flex flex-col gap-6">
        <div>
          <h2 className="font-display text-base font-semibold tracking-tight">
            Change password
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Use at least 8 characters with a mix of letters and numbers.
          </p>
        </div>
        <FieldGroup className="gap-4">
          <Field>
            <FieldLabel htmlFor="current-password">
              Current password
            </FieldLabel>
            <Input
              id="current-password"
              type="password"
              placeholder="••••••••"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="new-password">New password</FieldLabel>
            <Input id="new-password" type="password" placeholder="••••••••" />
            <FieldDescription>Minimum 8 characters.</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="confirm-password">
              Confirm new password
            </FieldLabel>
            <Input
              id="confirm-password"
              type="password"
              placeholder="••••••••"
            />
          </Field>
        </FieldGroup>
        <Button type="button" size="lg" className="w-full sm:w-fit">
          Update password
        </Button>
      </section>
    </div>
  );
}