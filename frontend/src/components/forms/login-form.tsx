import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const LoginForm = () => {
  return (
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
  );
};

export default LoginForm;
