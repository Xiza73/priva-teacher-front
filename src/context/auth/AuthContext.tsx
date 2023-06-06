import { createContext } from "@/utils";
import { AuthContextProps, State } from ".";

export const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  isLoading: false,
  user: null,
};

export const [AuthContext, useAuth] = createContext<AuthContextProps>({
  ...initialState,
  signIn: () => Promise.resolve(),
  refreshSession: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
});
