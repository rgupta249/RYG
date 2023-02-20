import { FC } from "react";
import { Modal } from "@mui/material";
import QrReader from "react-qr-scanner";
import { StyledQRBox } from "../../common";

interface IProps {
  isOpen: boolean;
  handleOpen: (value: boolean) => void;
  qrCodeSuccessCallback: (result: string) => void;
}

// Component to show QR reader modal
export const QRReader: FC<IProps> = ({
  isOpen,
  handleOpen,
  qrCodeSuccessCallback,
}) => (
  <Modal open={isOpen} onClose={() => handleOpen(false)}>
    <StyledQRBox>
      <QrReader
        delay={500}
        style={{
          height: "100%",
          width: "100%",
        }}
        onError={(err: any) => console.log(err)}
        onScan={(result: any) => {
          if (!!result) {
            qrCodeSuccessCallback(result.text);
          }
        }}
        legacymode="true"
      />
    </StyledQRBox>
  </Modal>
);
