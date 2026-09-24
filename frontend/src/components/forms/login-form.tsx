"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { LoginDataType } from "@/types/auth";
import { toast } from "@/components/ui/toast";
import { loginUser } from "@/services/auth";
import { useRouter } from "next/navigation";

const initialFromData: LoginDataType = {
  email: "",
  password: "",
};

const handleValidation = (data: LoginDataType) => {
  const errors: Partial<Record<keyof LoginDataType, string>> = {};
  if (!data.email) {
    errors["email"] = "Email is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.email && !emailRegex.test(data.email)) {
    errors["email"] = "Email is invalid";
  }

  if (!data.password || data.password.length < 8) {
    errors["password"] = "A valid password is required";
  }

  return Object.keys(errors).length > 0 ? errors : null;
};

const LoginForm = () => {
  const [formData, setFormData] = useState<LoginDataType>(initialFromData);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const handleFromDataChange = (
    key: keyof LoginDataType,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    e.preventDefault();
    try {
      const errors = handleValidation(formData);

      if (errors) {
        const message = Object.values(errors)
          .map((error) => `• ${error}`)
          .join("\n");

        toast.add({
          type: "error",
          description: message,
        });

        return;
      }

      const result = await loginUser(formData);

      if (!result.success) {
        toast.add({
          type: "error",
          description: result.message,
        });
        return;
      }

      toast.add({
        type: "success",
        description: result.message,
      });
      router.push("/");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup className="gap-5">
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={formData.email}
            onChange={(e) => handleFromDataChange("email", e.target.value)}
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
            value={formData.password}
            onChange={(e) => handleFromDataChange("password", e.target.value)}
          />
        </Field>
      </FieldGroup>

      <Button
        disabled={isSubmitting}
        type="submit"
        size="lg"
        className="mt-6 w-full"
      >
        {isSubmitting ? "Sign in..." : "Sign in"}
      </Button>
    </form>
  );
};

export default LoginForm;
