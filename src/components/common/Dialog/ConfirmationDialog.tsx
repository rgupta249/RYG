import { FC, useEffect, useState } from "react";
import {
  Button,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  Dialog,
} from "@mui/material";
import { equipmentState } from "../../../consts/state";

interface IProps {
  open: boolean;
  state: string;
  handleDialogOpen: (isOpen: boolean) => void;
  onYesCallback: () => void;
}

// Component for confirmation when state is changing
export const ConfirmationDialog: FC<IProps> = ({
  open = false,
  state,
  handleDialogOpen,
  onYesCallback,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const noClickHandler = () => {
    handleDialogOpen(false);
  };

  const yesClickHandler = () => {
    handleDialogOpen(false);
    onYesCallback();
  };

  const selectedState = equipmentState.find(item => item.key === state);

  return (
    <Dialog onClose={noClickHandler} open={isOpen}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>Change equipment state to {selectedState?.value} ?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={noClickHandler}>Cancel</Button>
        <Button variant="contained"  onClick={yesClickHandler} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
