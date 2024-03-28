import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutAdmin from "./layouts/admin";
import DashBoard from "./pages/admin/dashboard";
import PatternAdmin from "./pages/admin/pattern/list";
import AddPatternAdmin from "./pages/admin/pattern/add";
import EditPattern from "./pages/admin/pattern/edit";

function App() {
  const [dateTime] = useState(localStorage.getItem("DateTime"));
  useEffect(() => {
    const checkTokenExpiration = async () => {
      if (dateTime) {
        const currentTime = new Date().getTime();
        const loginTimestamp = parseInt(dateTime, 10);
        if (currentTime - loginTimestamp > 86400000) {
          await localStorage.removeItem("token");
          await localStorage.removeItem("DateTime");
        }
      }
    };
    checkTokenExpiration();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<DashBoard />} />

          <Route path="pattern">
            <Route index element={<PatternAdmin />} />
            <Route path="add" element={<AddPatternAdmin />} />
            <Route path="edit/:id" element={<EditPattern />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
