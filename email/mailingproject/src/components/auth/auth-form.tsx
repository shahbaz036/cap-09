import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import { useAuth } from "@/providers/auth-provider";
import { useToast } from "@/hooks/use-toast";

interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "signin" | "signup";
}

const signInSchema = z.object({
  email: z.string()
    .email({ message: "Please enter a valid email address" })
    .min(1, { message: "Email is required" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(100, { message: "Password is too long" }),
});

const signUpSchema = z.object({
  name: z.string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name is too long" })
    .regex(/^[a-zA-Z\s]*$/, { message: "Name can only contain letters and spaces" }),
  email: z.string()
    .email({ message: "Please enter a valid email address" })
    .min(1, { message: "Email is required" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(100, { message: "Password is too long" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
      message: "Password must include uppercase, lowercase, number and special character",
    }),
});

type SignInFormValues = z.infer<typeof signInSchema>;
type SignUpFormValues = z.infer<typeof signUpSchema>;

export function AuthForm({ type, className, ...props }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  
  const schema = type === "signin" ? signInSchema : signUpSchema;
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInFormValues | SignUpFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      ...(type === "signup" && { name: "" }),
    },
  });

  async function onSubmit(data: SignInFormValues | SignUpFormValues) {
    setIsLoading(true);
    
    try {
      if (type === "signin") {
        const { email, password } = data as SignInFormValues;
        await signIn(email, password);
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
      } else {
        const { name, email, password } = data as SignUpFormValues;
        await signUp(name, email, password);
        toast({
          title: "Account created!",
          description: "You have successfully created your account.",
        });
      }
      reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: error instanceof Error ? error.message : "An error occurred during authentication",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4">
          {type === "signup" && (
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                type="text"
                autoCapitalize="none"
                autoComplete="name"
                autoCorrect="off"
                disabled={isLoading}
                {...register("name")}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p className="text-sm text-destructive" id="name-error" role="alert">
                  {errors.name.message}
                </p>
              )}
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete={type === "signin" ? "username" : "email"}
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p className="text-sm text-destructive" id="email-error" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {type === "signin" && (
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary"
                  onClick={(e) => e.preventDefault()}
                >
                  Forgot password?
                </a>
              )}
            </div>
            <Input
              id="password"
              placeholder={type === "signup" ? "Create a secure password" : "Enter your password"}
              type="password"
              autoCapitalize="none"
              autoComplete={type === "signin" ? "current-password" : "new-password"}
              disabled={isLoading}
              {...register("password")}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            {errors.password && (
              <p className="text-sm text-destructive" id="password-error" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button disabled={isLoading} type="submit" className="mt-2">
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            {type === "signin" ? "Sign In" : "Sign Up"}
          </Button>
        </div>
      </form>
    </div>
  );
}