import { IconButton } from "@mui/material";
import { DrawerHeader } from ".";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export interface CloseDrawerProps {
  handleClose: () => void;
}

export const CloseDrawer: React.FC<CloseDrawerProps> = ({ handleClose }) => {
  return (
    <DrawerHeader>
      <IconButton onClick={handleClose}>
        <ChevronLeftIcon />
      </IconButton>
    </DrawerHeader>
  );
};
