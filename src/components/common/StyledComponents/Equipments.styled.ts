import { styled } from "@mui/system";
import { Box, TableCell, Typography } from "@mui/material";
import AdjustIcon from "@mui/icons-material/Adjust";

// This file contains styled components which is used for styling and adapting to the screen size

export const StyledTitle = styled(Typography)`
  ${(props) => props.theme.breakpoints.down("sm")} {
    font-size: 20px;
  }
`;

export const StyledUserBox = styled(Box)`
  display: flex;
  align-self: stretch;
  align-items: center;
  justify-content: space-between;
  ml: auto;
  pl: 2;
  border-left: 1;
  border-color: ;divider;,
  ${(props) => props.theme.breakpoints.down("sm")} {
    display: none;
  }
`;

export const StyledTableCell = styled(TableCell)`
  font-size: 20px;
  font-weight: 500;
`;

export const StyledStatusBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  ${(props) => props.theme.breakpoints.down("sm")} {
    flex-direction: column;
    width: 100%;
  }
`;

export const StyledAdjustIcon = styled(AdjustIcon)`
  color: white !important;
`;

export const StyledHeaderBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  ${(props) => props.theme.breakpoints.down("sm")} {
    justify-content: center;
  }
`;

export const StyledQRBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: white;
  border: 1px solid #000;
  box-shadow: 0 0px 20px black;
  padding: 16px;
`;
