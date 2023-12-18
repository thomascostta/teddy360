import { createContext, useContext, ReactNode, useState } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  signInEmail: (email: string) => Promise<{ email: string }>;
  signInPassword: (password: string) => Promise<{ password: string }>;
  toggleUserVisibility: (
    type: "newLogin" | "anotherUser" | "forgotPassword"
  ) => void;
  isUserVisible: "newLogin" | "anotherUser" | "forgotPassword";
  codeSending: (code: number) => Promise<{ code: number }>;
  toggleStepsForgotPassword: (step: "first" | "second" | "third") => void;
  isStepsForgotPassword: "first" | "second" | "third";
  createNewPassword: (newPassword: string) => Promise<{ newPassword: string }>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [isUserVisible, setIsUserVisible] = useState<
    "newLogin" | "anotherUser" | "forgotPassword"
  >("newLogin");
  const [isStepsForgotPassword, setIsStepsForgotPassword] = useState<
    "first" | "second" | "third"
  >("first");

  async function signInEmail(email: string): Promise<{ email: string }> {
    if (email === "teste@teddydigital.io") {
      return {
        email: email,
      };
    } else {
      throw new Error("Credenciais inválidas");
    }
  }

  async function signInPassword(
    password: string
  ): Promise<{ password: string }> {
    if (password === "TesteTeddy") {
      return {
        password: password,
      };
    } else {
      throw new Error("Credenciais inválidas");
    }
  }

  async function createNewPassword(
    newPassword: string
  ): Promise<{ newPassword: string }> {
    return {
      newPassword: newPassword,
    };
  }

  async function codeSending(code: number): Promise<{ code: number }> {
    if (code === 789415) {
      return {
        code: code,
      };
    } else {
      throw new Error("Credenciais inválidas");
    }
  }

  function toggleUserVisibility(
    type: "newLogin" | "anotherUser" | "forgotPassword"
  ) {
    setIsUserVisible(type);
  }

  function toggleStepsForgotPassword(steps: "first" | "second" | "third") {
    setIsStepsForgotPassword(steps);
  }

  return (
    <AuthContext.Provider
      value={{
        signInEmail,
        signInPassword,
        toggleUserVisibility,
        isUserVisible,
        codeSending,
        toggleStepsForgotPassword,
        isStepsForgotPassword,
        createNewPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
