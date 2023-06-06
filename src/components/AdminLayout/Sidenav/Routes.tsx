import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { AdminRoutes } from "@/router";
import { useRouter } from "@/hooks";

export interface RoutesProps {
  isOpen: boolean;
}

export const Routes: React.FC<RoutesProps> = ({ isOpen }) => {
  const router = useRouter();

  const routes = Object.values(AdminRoutes).map(({ path, label, icon }) => ({
    path,
    label,
    icon,
    onClick: () => router.push(path),
  }));

  return (
    <List>
      {routes.map(({ path, label, icon, onClick }) => (
        <ListItem
          key={path}
          disablePadding
          sx={{ display: "block" }}
          onClick={onClick}
        >
          <ListItemButton
            className={`min-h-[48px] ${
              isOpen ? "justify-start" : "justify-center"
            } px-6`}
          >
            <ListItemIcon
              className={`min-w-[0px] ${
                isOpen ? "mr-3" : "mr-auto"
              } justify-center`}
            >
              {icon}
            </ListItemIcon>
            <ListItemText
              primary={label}
              className={`${isOpen ? "opacity-100" : "opacity-0"}`}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
