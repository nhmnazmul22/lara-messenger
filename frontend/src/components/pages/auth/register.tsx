import Link from "next/link";
import RegisterForm from "@/components/forms/register-form";

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

      <RegisterForm />

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
