import { useAuth } from "@/context/auth";
import { useRouter } from "@/hooks";
import { Props } from "@/interfaces";
import { useCallback, useEffect, useState } from "react";

interface AuthGuardProps extends Props {}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [checked, setChecked] = useState<boolean>(false);

  const check = useCallback(() => {
    if (!isAuthenticated && !isLoading) {
      router.replace("/");
    } else {
      setChecked(true);
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    check();
  }, []);

  if (!checked) return null;

  return <>{children}</>;
};
