import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { QRReader } from "./QRScanner/QRReader";
import { ScreenTemplate, StatusChip, BasicTable, SearchField } from "../common";
import { getEquipments } from "../../services/mockServices";
import type { IEquipment } from "../../types";
import { headerArrList } from "../../consts/equipmentDetail";

// Component to show list of equipment with there states
const EquipmentList = () => {
  const navigate = useNavigate();
  const [list, setList] = useState<IEquipment[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isOpen, setOpen] = useState<boolean>(false);

  useEffect(() => {
    getEquipments().then((response: IEquipment[]) => {
      setList(response);
    });
  }, []);

  const filterById = (item: IEquipment): boolean =>
    item.id.toString().includes(searchValue);

  const filteredList = list.filter(filterById);

  // QR Success callback to find an equipment with matching QR and navigate to detail page
  const onQRSuccess = (result: string) => {
    if (!result) return;
    
    const selectedList = list.find(
      (item: IEquipment) => item.id === Number(result)
    );

    if (selectedList?.id) {
      setOpen(false);
      navigate(`/equipment/${selectedList.id}`);
    }
  };

  const rows = filteredList.map((row: IEquipment) => (
    <TableRow
      onClick={() => navigate(`/equipment/${row.id}`)}
      key={row.id}
      sx={{ cursor: "pointer" }}
    >
      <TableCell component="th" scope="row">
        <Typography sx={{ fontWeight: 700 }}>{row.equipment_desc}</Typography>
        <Typography>{row.id}</Typography>
      </TableCell>
      <TableCell align="right">
        <StatusChip state={row.state} />
      </TableCell>
    </TableRow>
  ));

  return (
    <ScreenTemplate title="Manage Equipment State">
      <Box display="flex" justifyContent="end" mb={2}>
        <SearchField
          placeholder="Search by ID or scan QR Code"
          value={searchValue}
          handleChange={setSearchValue}
        />
        <IconButton onClick={() => setOpen(true)}>
          <PhotoCameraIcon />
        </IconButton>
      </Box>
      <BasicTable headerArr={headerArrList(filteredList?.length)} rows={rows} />
      {/* Scan QR code of the machine to jump to its details page */}

      {isOpen && (
        <QRReader
          isOpen={isOpen}
          handleOpen={(value) => setOpen(value)}
          qrCodeSuccessCallback={onQRSuccess}
        />
      )}
    </ScreenTemplate>
  );
};

export default EquipmentList;
