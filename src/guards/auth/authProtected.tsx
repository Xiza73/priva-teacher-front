import { AuthGuard } from ".";

export const authProtected = <P extends object>(
  Component: React.FC<P>
): React.FC<P> => {
  return function AuthProtected(props: P) {
    return (
      <AuthGuard>
        <Component {...props} />
      </AuthGuard>
    );
  };
};
