import { FC, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode, SyntheticEvent } from "react";
import { useParams } from "react-router-dom";
import { Box, Tabs, Tab, Typography, Button } from "@mui/material";
import EquipmentHistory from "./EquipmentHistory";
import EquipmentOrder from "./EquipmentOrder";
import {
  ScreenTemplate,
  ConfirmationDialog,
  StatusChip,
  StyledStatusBox,
  StyledHeaderBox,
} from "../common";
import { UserContext } from "../../context";
import {
  getEquipment,
  updateEquipment,
  updateHistoryLogs,
  updateOrders,
} from "../../services/mockServices";
import { equipmentState } from "../../consts/state";
import type {
  IEquipment,
  IEquipmentDetail,
  IHistoryLogs,
  IOrderDetails,
  IState,
} from "../../types";

interface IProps {
  index: number;
  value: number;
  children: ReactNode;
  unmount?: boolean;
}

const TabPanel: FC<IProps> = ({
  index,
  value,
  unmount = true,
  children,
  ...other
}) => (
  <div hidden={value !== index} {...other}>
    {(!unmount || value === index) && children}
  </div>
);

const generateNumber = () => Math.floor(Math.random() * 90000) + 10000;

// Component to show equipment details page
const EquipmentDetails = () => {
  const { id } = useParams();
  const { userRole } = useContext(UserContext);
  const [tabValue, setTabValue] = useState<number>(0);
  const [equimentData, setEquipmentData] = useState<IEquipmentDetail>();
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const stateRef = useRef(""); // Reference to store clicked state pill value

  const isWorker = userRole === "ROLE_WORKER";

  const fetchEquipmentData = () => {
    if (!id) return;

    getEquipment(id).then((response: IEquipmentDetail) => {
      setEquipmentData(response);
    });
  };

  useEffect(() => {
    fetchEquipmentData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isWorker) {
      setTabValue(0); // Switch to order tab if worker is selected as user
    }
  }, [isWorker]);

  if (!equimentData) return <></>;

  const onConfirmChangeState = () => {
    const state = stateRef.current;
    const payload: IEquipment = {
      id: equimentData.id,
      equipment_desc: equimentData.equipment_desc,
      state,
    };

    // Generate dummy data for history tab. Otherwise should be implemented at back end
    const historyPayload: IHistoryLogs = {
      id: generateNumber(),
      equipmentId: equimentData.id,
      timestamp: new Date().toISOString(),
      status: state,
      orderId:
        equimentData.orders.find(
          (item: IOrderDetails) => item.order_state === "In Progress"
        )?.id || generateNumber(),
      updated_by: "U001",
    };

    Promise.all([
      updateEquipment(payload),
      updateHistoryLogs(historyPayload),
    ]).then(() => {
      stateRef.current = "";
      fetchEquipmentData(); // refresh
    });
  };

  // Functionality to generate dummy data for order scheduled for equipment tab
  const handleScheduleOrder = () => {
    const payload: IOrderDetails = {
      started_at: null,
      order_desc: `Produce ${generateNumber()} pieces of brick id BR${generateNumber()}`,
      id: generateNumber(),
      equipmentId: equimentData.id,
      order_state: "Scheduled",
    };
    updateOrders(payload).then(() => fetchEquipmentData());
  };

  const onStateSelect = (state: string) => {
    if (state === equimentData.state) return;
    stateRef.current = state;
    setDialogOpen(true);
  };

  return (
    <ScreenTemplate title={`Equipment: ${equimentData.id}`}>
      <StyledHeaderBox display="flex" justifyContent="space-between" px={2}>
        <Typography variant="h5">{equimentData.equipment_desc}</Typography>
        {!isWorker && tabValue === 0 && (
          <Button
            sx={{ px: 3 }}
            variant="outlined"
            onClick={handleScheduleOrder}
          >
            Schedule Order
          </Button>
        )}
        {isWorker ? (
          <StyledStatusBox>
            {equipmentState.map((state: IState) => (
              <Box m={1} key={state.key}>
                <StatusChip
                  state={state.key}
                  selected={state.key === equimentData.state}
                  handleClick={onStateSelect}
                  clickable
                  height="30px"
                  width="100%"
                />
              </Box>
            ))}
          </StyledStatusBox>
        ) : (
          <StatusChip state={equimentData.state} height="30px" width="150px" />
        )}
      </StyledHeaderBox>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          sx={{ mb: 1 }}
          onChange={(event: SyntheticEvent, value: number) =>
            setTabValue(value)
          }
        >
          <Tab label="Orders" />
          {!isWorker && <Tab label="History Logs" />}
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          <EquipmentOrder orderDetails={equimentData.orders} />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <EquipmentHistory historyLogs={equimentData.historyLogs} />
        </TabPanel>
      </Box>
      <ConfirmationDialog
        open={isDialogOpen}
        state={stateRef.current}
        handleDialogOpen={setDialogOpen}
        onYesCallback={onConfirmChangeState}
      />
    </ScreenTemplate>
  );
};

export default EquipmentDetails;
