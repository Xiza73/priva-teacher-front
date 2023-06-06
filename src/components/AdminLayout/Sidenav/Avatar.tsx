import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Logout from "@mui/icons-material/Logout";
import { useState } from "react";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import { useAuth } from "@/context/auth";
import { useRouter } from "@/hooks";

export const Avatar = () => {
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const { signOut } = useAuth();
  const router = useRouter();

  const open = Boolean(anchorElement);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  const handleLogout = () => {
    signOut();
    router.push("/login");
  };

  return (
    <>
      <Box className="flex items-center text-center">
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <AccountCircleIcon className="text-white w-8 h-8" />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorElement}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
