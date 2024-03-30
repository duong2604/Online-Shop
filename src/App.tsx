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
import StrapMaterialAdmin from "./pages/admin/strapMaterial/list";
import AddStrapMaterialAdmin from "./pages/admin/strapMaterial/add";
import EditStrapMaterial from "./pages/admin/strapMaterial/edit";
import ColorAdmin from "./pages/admin/color/list";
import AddColorAdmin from "./pages/admin/color/add";
import EditColor from "./pages/admin/color/edit";
import CompartmentAdmin from "./pages/admin/compartment/list";
import AddCompartmentAdmin from "./pages/admin/compartment/add";
import EditCompartment from "./pages/admin/compartment/edit";
import ProductTypeAdmin from "./pages/admin/productType/list";
import AddProductTypeAdmin from "./pages/admin/productType/add";
import EditProductType from "./pages/admin/productType/edit";
import LockTypeAdmin from "./pages/admin/lockType/list";
import AddLockTypeAdmin from "./pages/admin/lockType/add";
import EditLockType from "./pages/admin/lockType/edit";
import HangAdmin from "./pages/admin/hang/list";
import AddHangAdmin from "./pages/admin/hang/add";
import EditHang from "./pages/admin/hang/edit";

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

          <Route path="strapMaterial">
            <Route index element={<StrapMaterialAdmin />} />
            <Route path="add" element={<AddStrapMaterialAdmin />} />
            <Route path="edit/:id" element={<EditStrapMaterial />} />
          </Route>

          <Route path="color">
            <Route index element={<ColorAdmin />} />
            <Route path="add" element={<AddColorAdmin />} />
            <Route path="edit/:id" element={<EditColor />} />
          </Route>

          <Route path="compartment">
            <Route index element={<CompartmentAdmin />} />
            <Route path="add" element={<AddCompartmentAdmin />} />
            <Route path="edit/:id" element={<EditCompartment />} />
          </Route>

          <Route path="productType">
            <Route index element={<ProductTypeAdmin />} />
            <Route path="add" element={<AddProductTypeAdmin />} />
            <Route path="edit/:id" element={<EditProductType />} />
          </Route>

          <Route path="lockType">
            <Route index element={<LockTypeAdmin />} />
            <Route path="add" element={<AddLockTypeAdmin />} />
            <Route path="edit/:id" element={<EditLockType />} />
          </Route>

          <Route path="hang">
            <Route index element={<HangAdmin />} />
            <Route path="add" element={<AddHangAdmin />} />
            <Route path="edit/:id" element={<EditHang />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
