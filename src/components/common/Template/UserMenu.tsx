import { useContext, useRef, useState } from "react";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import {
  ArrowDropDown as ArrowDropDownIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { StyledUserBox } from "../StyledComponents/Equipments.styled";
import { UserContext } from "../../../context/userContext";
import type { IUser } from "../../../types";
import { users } from "../../../consts/user";

// Component to show user menu on top right corner
export const UserMenu = () => {
  const userBoxRef = useRef(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { userRole, setUserRole } = useContext(UserContext);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleMenuItemClick = (user: IUser) => {
    handleClose();
    setUserRole(user.role);
  };

  return (
    <StyledUserBox>
      <PersonIcon />
      <IconButton size="large" ref={userBoxRef} onClick={handleOpen}>
        <ArrowDropDownIcon />
      </IconButton>
      <Menu
        open={isOpen}
        anchorEl={userBoxRef.current}
        elevation={2}
        onClose={handleClose}
      >
        {users.map((user) => (
          <MenuItem
            key={user.id}
            onClick={() => handleMenuItemClick(user)}
            selected={user.role === userRole}
          >
            <Avatar sx={{ mr: 1 }} />
            {user.name}
          </MenuItem>
        ))}
      </Menu>
    </StyledUserBox>
  );
};
