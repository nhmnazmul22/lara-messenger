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
import { Camera } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { toast } from "@/components/ui/toast";
import Image from "next/image";
import { FromDataType } from "@/types/auth";
import { registerUser } from "@/services/auth";

const initialFromData: FromDataType = {
  name: "",
  email: "",
  password: "",
  isPrivacyAgreed: false,
};

const handleValidation = (data: FromDataType) => {
  const errors: Partial<Record<keyof FromDataType, string>> = {};
  if (!data.name.trim()) {
    errors["name"] = "Name is required";
  }

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

  if (!data.isPrivacyAgreed) {
    errors["isPrivacyAgreed"] = "Please accept our terms and privacy";
  }

  return Object.keys(errors).length > 0 ? errors : null;
};

const RegisterForm = () => {
  const [formData, setFormData] = useState<FromDataType>(initialFromData);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleFromDataChange = (
    key: keyof FromDataType,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      setFormData((prev) => ({
        ...prev,
        avatar: file,
      }));
      setAvatarPreview(URL.createObjectURL(file));
    }
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

      // Generate formData
      const formDataPayload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataPayload.append(key, value);
      });

      const result = await registerUser(formDataPayload);

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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup className="gap-5">
        <Field>
          <FieldLabel>Profile picture</FieldLabel>{" "}
          <div className="flex items-center gap-4">
            <label
              htmlFor="avatar"
              className="group flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-dashed border-input bg-muted/30 transition-colors hover:bg-muted"
            >
              {avatarPreview ? (
                <Image
                  src={avatarPreview}
                  alt="Avatar preview"
                  className="h-20 w-20 object-cover"
                  width={1200}
                  height={1200}
                />
              ) : (
                <Camera className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-foreground" />
              )}

              <Input
                id="avatar"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
            <div>
              <p className="text-sm font-medium">Upload your photo</p>
              <FieldDescription>JPG, PNG or WebP. Max 2MB.</FieldDescription>
            </div>
          </div>
        </Field>

        <Field>
          <FieldLabel htmlFor="name">Full name</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="Ada Lovelace"
            autoComplete="name"
            value={formData.name}
            onChange={(e) => handleFromDataChange("name", e.target.value)}
          />
        </Field>

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
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            value={formData.password}
            onChange={(e) => handleFromDataChange("password", e.target.value)}
          />
          <FieldDescription>Use at least 8 characters.</FieldDescription>
        </Field>

        <Field orientation="horizontal">
          <Checkbox
            id="terms"
            value={formData.password}
            onCheckedChange={(checked) =>
              handleFromDataChange("isPrivacyAgreed", checked)
            }
          />
          <FieldLabel htmlFor="terms" className="font-normal">
            I agree to the Terms and Privacy Policy.
          </FieldLabel>
        </Field>
      </FieldGroup>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="mt-6 w-full"
      >
        {isSubmitting ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
};

export default RegisterForm;
