import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { AuthProvider, initialState, reducer } from "./context/auth";

export const App: React.FC = () => {
  return (
    <AuthProvider reducer={reducer} initialState={initialState}>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};
