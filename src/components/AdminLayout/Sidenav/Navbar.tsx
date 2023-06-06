import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Toolbar, Typography } from "@mui/material";
import { AppBar } from "./styles";
import { Avatar } from ".";

export interface NavbarProps {
  handleOpen: () => void;
  isOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ handleOpen, isOpen }) => {
  return (
    <AppBar open={isOpen} className="fixed">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(isOpen && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <div className="flex items-center justify-between w-full h-auto">
          <Typography variant="h6" noWrap component="div">
            PrivaTeacher
          </Typography>
          <Avatar />
        </div>
      </Toolbar>
    </AppBar>
  );
};
