"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const RegisterForm = () => {
  return (
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
  );
};

export default RegisterForm;
