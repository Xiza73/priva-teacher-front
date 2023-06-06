import { useCallback, useEffect, useReducer, useState } from "react";
import {
  Action,
  ActionType,
  AuthActions,
  AuthContext,
  Handler,
  InitializeAction,
  SignInAction,
  State,
} from ".";
import {
  getItemStorage,
  getStorage,
  removeStorage,
  setItemStorage,
  setStorage,
} from "@/utils";
import * as authService from "@/api/auth";
import { User } from "@/interfaces";
import { getUser } from "@/config";

const authReducerHandlers: Record<ActionType, Handler> = {
  initialize: (state: State, action): State => {
    const { isAuthenticated, user } = (action as InitializeAction).payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  signIn: (state: State, action): State => {
    const { user } = (action as SignInAction).payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  signOut: (state: State): State => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};

export const reducer = (state: State, action: Action): State =>
  authReducerHandlers[action.type]
    ? authReducerHandlers[action.type](state, action)
    : state;

interface AuthProviderProps {
  reducer: (state: State, action: Action) => State;
  children: React.ReactNode;
  initialState: State;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  reducer,
  children,
  initialState,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const reject = useCallback((): void => {
    dispatch({
      type: AuthActions.INITIALIZE,
      payload: {
        isAuthenticated: false,
        user: null,
      },
    });
    setIsLoading(false);
  }, [dispatch]);

  const initialize = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      const token = getItemStorage("token");
      if (!token) return reject();

      const { token: refreshedToken } = await authService.refreshToken();
      if (!refreshedToken) return reject();

      setItemStorage("token", refreshedToken);

      const user = getUser();
      if (!user) return reject();

      dispatch({
        type: AuthActions.INITIALIZE,
        payload: {
          isAuthenticated: true,
          user,
        },
      });
    } catch (err) {
      console.error(err);
      reject();
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  const signIn = useCallback(
    async (username: string, password: string): Promise<void> => {
      setIsLoading(true);
      const { token, user } = await authService.signIn({ username, password });
      if (!token || !user) return reject();

      setItemStorage("token", token);
      setStorage("user", user);

      dispatch({
        type: AuthActions.SIGN_IN,
        payload: {
          user,
        },
      });
      setIsLoading(false);
    },
    [dispatch]
  );

  const refreshSession = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      const token = getItemStorage("token");
      if (!token) return reject();

      const { token: refreshedToken } = await authService.refreshToken();
      if (!refreshedToken) return reject();

      setItemStorage("token", refreshedToken);

      const user = getStorage<User>("user");
      if (!user) return reject();

      dispatch({
        type: AuthActions.INITIALIZE,
        payload: {
          isAuthenticated: true,
          user,
        },
      });
    } catch (err) {
      console.error(err);
      reject();
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  const signOut = useCallback(async (): Promise<void> => {
    removeStorage("token");
    removeStorage("user");

    dispatch({ type: AuthActions.SIGN_OUT });
  }, [dispatch]);

  useEffect(() => {
    initialize();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        isLoading,
        signIn,
        refreshSession,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
