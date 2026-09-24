import LoginForm from "@/components/forms/login-form";
import Link from "next/link";

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

      <LoginForm />

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
