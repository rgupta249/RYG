import { FC } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Divider, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { UserMenu } from "./UserMenu";
import { StyledTitle } from "../index";

interface IProps {
  title: string;
  children: ReactNode;
}

// Component which act as template for all the pages in application
export const ScreenTemplate: FC<IProps> = ({ title, children }) => {
  const navigate = useNavigate();

  return (
    <Box mt={3} px={2}>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <IconButton onClick={() => navigate("/")}>
            <HomeIcon fontSize="large" />
          </IconButton>
          <StyledTitle variant="h4">
            {title}
          </StyledTitle>
        </Box>
        <UserMenu />
      </Box>

      <Divider component="div" sx={{ mx: 2 }} />

      <Box mt={3}>{children}</Box>
    </Box>
  );
};
