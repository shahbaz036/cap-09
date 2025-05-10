import { User } from "@/providers/auth-provider";
import * as jose from "jose";

// In a real app, this would interact with a backend API
// Here we're simulating a backend with localStorage and JWT

// Mock users database
const USERS_STORAGE_KEY = 'mail-app-users';

interface StoredUser extends User {
  password: string;
}

// Sample user for demo purposes
const defaultUser: StoredUser = {
  id: "1",
  email: "demo@example.com",
  name: "Demo User",
  password: "password123",
  avatarUrl: "https://ui.shadcn.com/avatars/01.png",
};

// Initialize users in storage if they don't exist
const initializeUsers = () => {
  const users = localStorage.getItem(USERS_STORAGE_KEY);
  if (!users) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([defaultUser]));
  }
};

// Get users from storage
const getUsers = (): StoredUser[] => {
  initializeUsers();
  const users = localStorage.getItem(USERS_STORAGE_KEY);
  return JSON.parse(users || '[]');
};

// Save users to storage
const saveUsers = (users: StoredUser[]) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

// Create a JWT token
const createToken = async (user: User): Promise<string> => {
  const secret = new TextEncoder().encode('my-secret-key');
  
  return await new jose.SignJWT({ 
    sub: user.id, 
    email: user.email, 
    name: user.name,
    avatarUrl: user.avatarUrl 
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(secret);
};

// Validate a JWT token
const validateToken = async (token: string): Promise<User | null> => {
  try {
    const secret = new TextEncoder().encode('my-secret-key');
    await jose.jwtVerify(token, secret);
    const payload = jose.decodeJwt(token);
    
    if (!payload.sub || !payload.email || !payload.name) {
      return null;
    }
    
    return {
      id: payload.sub,
      email: payload.email as string,
      name: payload.name as string,
      avatarUrl: payload.avatarUrl as string,
    };
  } catch (error) {
    return null;
  }
};

// Sign in with email and password
const signIn = async (email: string, password: string) => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  const { password: _, ...userWithoutPassword } = user;
  const token = await createToken(userWithoutPassword);
  
  return { user: userWithoutPassword, token };
};

// Sign up with name, email and password
const signUp = async (name: string, email: string, password: string) => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const users = getUsers();
  
  if (users.some(u => u.email === email)) {
    throw new Error('Email already exists');
  }
  
  const newUser: StoredUser = {
    id: Date.now().toString(),
    name,
    email,
    password,
    avatarUrl: `https://ui.shadcn.com/avatars/0${Math.floor(Math.random() * 7) + 1}.png`,
  };
  
  users.push(newUser);
  saveUsers(users);
  
  const { password: _, ...userWithoutPassword } = newUser;
  const token = await createToken(userWithoutPassword);
  
  return { user: userWithoutPassword, token };
};

export const authService = {
  signIn,
  signUp,
  validateToken,
};