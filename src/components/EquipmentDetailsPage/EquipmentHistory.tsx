import { FC } from "react";
import { Box, TableRow, TableCell } from "@mui/material";
import { BasicTable, dateTimeFromTimeStamp, StatusChip } from "../common";
import type { IHistoryLogs } from "../../types";
import { headerArrHistory } from "../../consts/equipmentDetail";

interface IProps {
  historyLogs: IHistoryLogs[];
}

// Component to show History log tab on equipment details page
const EquipmentHistory: FC<IProps> = ({ historyLogs }) => {
  const rows = historyLogs.map((row: IHistoryLogs) => {
    const { date, time } = dateTimeFromTimeStamp(row.timestamp);
    return (
      <TableRow key={row.timestamp}>
        <TableCell>{row.orderId || `-`}</TableCell>
        <TableCell align="center">
          <StatusChip state={row.status} />
        </TableCell>
        <TableCell align="center">{row.updated_by}</TableCell>
        <TableCell align="right">
          <Box display="flex" flexDirection="column">
            <span>{date}</span>
            <span>{time}</span>
          </Box>
        </TableCell>
      </TableRow>
    );
  });

  return <BasicTable headerArr={headerArrHistory} rows={rows} />;
};

export default EquipmentHistory;
