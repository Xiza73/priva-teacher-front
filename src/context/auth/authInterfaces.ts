import { User } from "@/interfaces";

export interface State {
  isInitialized: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
}

export interface AuthContextProps extends State {
  signIn: (username: string, password: string) => Promise<void>;
  refreshSession: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthActions = {
  INITIALIZE: "initialize",
  SIGN_IN: "signIn",
  SIGN_OUT: "signOut",
} as const;

export type ActionType = (typeof AuthActions)[keyof typeof AuthActions];

export interface InitializeAction {
  type: typeof AuthActions.INITIALIZE;
  payload: {
    isAuthenticated: boolean;
    user: User | null;
  };
}

export interface SignInAction {
  type: typeof AuthActions.SIGN_IN;
  payload: {
    user: User;
  };
}

export interface SignOutAction {
  type: typeof AuthActions.SIGN_OUT;
}

export type Action = InitializeAction | SignInAction | SignOutAction;

export type Handler = (state: State, action: Action) => State;
