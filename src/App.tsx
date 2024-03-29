import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutAdmin from "./layouts/admin";
import DashBoard from "./pages/admin/dashboard";
import PatternAdmin from "./pages/admin/pattern/list";
import AddPatternAdmin from "./pages/admin/pattern/add";
import EditPattern from "./pages/admin/pattern/edit";
import SizeAdmin from "./pages/admin/kich_co/list";
import AddSizeAdmin from "./pages/admin/kich_co/add";
import EditSize from "./pages/admin/kich_co/edit";
import SizeeAdmin from "./pages/admin/kich_thuoc/list";
import AddSizeeAdmin from "./pages/admin/kich_thuoc/add";
import EditSizee from "./pages/admin/kich_thuoc/edit";
import BrandAdmin from "./pages/admin/brand/list";
import AddBrandAdmin from "./pages/admin/brand/add";
import EditBrand from "./pages/admin/brand/edit";
import MaterialAdmin from "./pages/admin/material/list";
import AddMaterialAdmin from "./pages/admin/material/add";
import EditMaterial from "./pages/admin/material/edit";

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

          <Route path="size">
            <Route index element={<SizeAdmin />} />
            <Route path="add" element={<AddSizeAdmin />} />
            <Route path="edit/:id" element={<EditSize />} />
          </Route>

          <Route path="brand">
            <Route index element={<BrandAdmin />} />
            <Route path="add" element={<AddBrandAdmin />} />
            <Route path="edit/:id" element={<EditBrand />} />
          </Route>

          <Route path="sizee">
            <Route index element={<SizeeAdmin />} />
            <Route path="add" element={<AddSizeeAdmin />} />
            <Route path="edit/:id" element={<EditSizee />} />
          </Route>

          <Route path="material">
            <Route index element={<MaterialAdmin />} />
            <Route path="add" element={<AddMaterialAdmin />} />
            <Route path="edit/:id" element={<EditMaterial />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
