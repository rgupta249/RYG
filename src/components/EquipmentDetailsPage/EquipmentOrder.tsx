import { FC } from "react";
import { TableRow, TableCell, Typography, Box } from "@mui/material";
import { dateTimeFromTimeStamp, BasicTable } from "../common";
import type { IOrderDetails } from "../../types";
import { headerArrOrders } from "../../consts/equipmentDetail";

interface IProps {
  orderDetails: IOrderDetails[];
}

// Component to show Order detail tab on equipment details page
const EquipmentOrder: FC<IProps> = ({ orderDetails }) => {
  const rows = orderDetails.map((row: IOrderDetails) => {
    const { date, time } = dateTimeFromTimeStamp(row?.started_at || "");
    return (
      <TableRow key={row.id}>
        <TableCell>
          <Typography sx={{ fontWeight: 700 }}>{row.order_desc}</Typography>
          {row.id}
        </TableCell>
        <TableCell>{row.order_state}</TableCell>
        <TableCell align="right">
          {row.started_at ? (
            <Box display="flex" flexDirection="column">
              <span>{date}</span>
              <span>{time}</span>
            </Box>
          ) : (
            "Not yet"
          )}
        </TableCell>
      </TableRow>
    );
  });

  return <BasicTable headerArr={headerArrOrders} rows={rows} />;
};

export default EquipmentOrder;
