import { Sidenav } from "@/components";
import { authProtected } from "@/guards";
import { Outlet } from "react-router-dom";

export const AdminLayout: React.FC = authProtected(() => {
  return (
    <>
      <Sidenav>
        <Outlet />
      </Sidenav>
    </>
  );
});
