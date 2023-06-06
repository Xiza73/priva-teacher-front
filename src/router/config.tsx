import { matchRoutes, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Dashboard, Schedule } from "@/pages";

export const AdminRoutes: {
  [key: string]: {
    path: string;
    element: JSX.Element;
    icon: JSX.Element;
    label: string;
  };
} = {
  DASHBOARD: {
    path: "/admin",
    element: <Dashboard />,
    icon: <DashboardIcon />,
    label: "Dashboard",
  },
  SCHEDULE: {
    path: "/admin/schedule",
    element: <Schedule />,
    icon: <CalendarMonthIcon />,
    label: "Schedule",
  },
} as const;

export type AdminRoute = {
  [key in keyof typeof AdminRoutes]: (typeof AdminRoutes)[key]["path"];
}[keyof typeof AdminRoutes];

const routes = Object.values(AdminRoutes).map(({ path }) => ({
  path,
}));

export const useCurrentPath = () => {
  const location = useLocation();
  const [{ route }] = matchRoutes(routes, location) || [
    {
      route: { path: AdminRoutes.USE_STATE.path },
    },
  ];

  return route.path;
};
