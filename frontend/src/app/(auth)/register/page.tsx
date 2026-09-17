import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const RegisterPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          Create your account
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          A name, an email, and you&rsquo;re in the conversation.
        </p>
      </header>

      <form>
        <FieldGroup className="gap-5">
          <Field>
            <FieldLabel htmlFor="name">Full name</FieldLabel>
            <Input
              id="name"
              type="text"
              placeholder="Ada Lovelace"
              autoComplete="name"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
            />
            <FieldDescription>Use at least 8 characters.</FieldDescription>
          </Field>

          <Field orientation="horizontal">
            <Checkbox id="terms" />
            <FieldLabel htmlFor="terms" className="font-normal">
              I agree to the Terms and Privacy Policy.
            </FieldLabel>
          </Field>
        </FieldGroup>

        <Button type="button" size="lg" className="mt-6 w-full">
          Create account
        </Button>
      </form>

      <p className="text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
