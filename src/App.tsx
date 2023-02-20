import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import { UserContext } from "./context";
import EquipmentDetails from "./components/EquipmentDetailsPage/EquipmentDetail";
import EquipmentList from "./components/EquipmentListPage/EquipmentList";

const App = () => {
  const [userRole, setUserRole] = useState("ROLE_WORKER");
  const muiTheme = useTheme();

  return (
    <>
      <ThemeProvider theme={muiTheme}>
        <UserContext.Provider value={{ userRole, setUserRole }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<EquipmentList />} />
              <Route path="equipment/:id" element={<EquipmentDetails />} />
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </ThemeProvider>
    </>
  );
};

export default App;
