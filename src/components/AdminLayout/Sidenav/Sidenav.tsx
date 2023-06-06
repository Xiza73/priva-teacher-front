import { useState } from "react";
import { Props } from "@/interfaces";
import { CloseDrawer, Drawer, DrawerHeader, Navbar, Routes } from ".";
import { CssBaseline, Divider, Box } from "@mui/material";

export interface SidenavProps extends Props {}

export const Sidenav: React.FC<SidenavProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDrawerOpen = () => {
    setIsOpen(true);
  };

  const handleDrawerClose = () => {
    setIsOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar handleOpen={handleDrawerOpen} isOpen={isOpen} />
      <Drawer variant="permanent" open={isOpen}>
        <CloseDrawer handleClose={handleDrawerClose} />
        <Divider />
        <Routes isOpen={isOpen} />
      </Drawer>
      <Box component="main" className="flex-grow">
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};
