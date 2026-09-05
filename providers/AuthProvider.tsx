'use client';

import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';

import { auth } from '@/lib/firebase';
import type { AppUser } from '@/types/user';

interface AuthContextValue {
  user: AppUser | null;
  isLoading: boolean;
  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<void>;
  login: (
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext =
  createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        if (!firebaseUser) {
          setUser(null);
          setIsLoading(false);
          return;
        }

        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
        });

        setIsLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  const register = async (
    name: string,
    email: string,
    password: string,
  ) => {
    const credential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

    await updateProfile(credential.user, {
      displayName: name,
    });

    setUser({
      uid: credential.user.uid,
      email: credential.user.email,
      displayName: name,
    });
  };

  const login = async (
    email: string,
    password: string,
  ) => {
    await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}