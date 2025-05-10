import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { authService } from "@/lib/auth-service";

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
}

type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize auth state from storage
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem("auth-token");
      if (storedToken) {
        try {
          const userData = await authService.validateToken(storedToken);
          if (userData) {
            setUser(userData);
            setToken(storedToken);
          } else {
            localStorage.removeItem("auth-token");
          }
        } catch (error) {
          localStorage.removeItem("auth-token");
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  // Handle sign in
  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { user: userData, token: authToken } = await authService.signIn(email, password);
      setUser(userData);
      setToken(authToken);
      localStorage.setItem("auth-token", authToken);

      // Redirect to intended page or dashboard
      const origin = location.state?.from?.pathname || "/";
      navigate(origin);
      toast.success("Successfully signed in");
    } catch (error) {
      toast.error("Invalid email or password");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sign up
  const signUp = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      const { user: userData, token: authToken } = await authService.signUp(name, email, password);
      setUser(userData);
      setToken(authToken);
      localStorage.setItem("auth-token", authToken);
      navigate("/");
      toast.success("Account created successfully");
    } catch (error) {
      toast.error("Failed to create account");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sign out
  const signOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth-token");
    navigate("/signin");
    toast.success("Signed out successfully");
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    isLoading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};