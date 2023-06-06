import { useAuth } from "@/context/auth";

export const Dashboard: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated ? (
        <div>
          <h1>Dashboard</h1>
        </div>
      ) : (
        <div>
          <h1>Not authenticated</h1>
        </div>
      )}
    </>
  );
};
