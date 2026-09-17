import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const LoginPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          Welcome back
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Sign in to pick up your conversations where you left them.
        </p>
      </header>

      <form>
        <FieldGroup className="gap-5">
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
            <div className="flex items-center justify-between gap-2">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Link
                href="#"
                className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </Field>

          <Field orientation="horizontal">
            <Checkbox id="remember" />
            <FieldLabel htmlFor="remember" className="font-normal">
              Keep me signed in
            </FieldLabel>
          </Field>
        </FieldGroup>

        <Button type="button" size="lg" className="mt-6 w-full">
          Sign in
        </Button>
      </form>

      <p className="text-sm text-muted-foreground">
        New to Lara Messenger?{" "}
        <Link
          href="/register"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
