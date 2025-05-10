import { Link } from "react-router-dom";
import { AuthForm } from "@/components/auth/auth-form";
import { Icons } from "@/components/ui/icons";

export function SignIn() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="flex justify-center mb-2">
            <Icons.mail className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and password to sign in to your account
          </p>
        </div>
        <AuthForm type="signin" />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            to="/signup"
            className="hover:text-primary underline underline-offset-4"
          >
            Don't have an account? Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}