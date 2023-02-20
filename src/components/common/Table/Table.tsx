import { FC, ReactNode } from "react";
import {
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableBody,
  Table,
} from "@mui/material";
import { StyledTableCell } from "../index";

interface IProps {
    headerArr: any[];
    rows: ReactNode;
}

export const BasicTable: FC<IProps> = ({ headerArr, rows }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
            {headerArr.map((item) => <StyledTableCell key={item.key} align={item.align}>{item.value}</StyledTableCell>)}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows}
      </TableBody>
    </Table>
  </TableContainer>
);
