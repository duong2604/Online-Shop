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
import CategoryAdmin from "./pages/admin/category/list";
import AddCategoryAdmin from "./pages/admin/category/add";
import EditCategory from "./pages/admin/category/edit";
import NewsAdmin from "./pages/admin/news/list";
import AddNewsAdmin from "./pages/admin/news/add";
import EditNews from "./pages/admin/news/edit";
import DiscountCodeAdmin from "./pages/admin/discountCode/list";
import AddDiscountCodeAdmin from "./pages/admin/discountCode/add";
import EditDiscountCode from "./pages/admin/discountCode/edit";
import EditRole from "./pages/admin/role/edit";
import RoleAdmin from "./pages/admin/role/list";
import AddRoleAdmin from "./pages/admin/role/add";
import UserAdmin from "./pages/admin/user/list";
import EditUser from "./pages/admin/user/edit";
import ClientAdmin from "./pages/admin/client/list";
import AddClientAdmin from "./pages/admin/client/add";
import EditClient from "./pages/admin/client/edit";
import ContactAdmin from "./pages/admin/contact/list";
import EditContact from "./pages/admin/contact/edit";
import EditCommentStatus from "./pages/admin/commentStatus/edit";
import AddCommentStatusAdmin from "./pages/admin/commentStatus/add";
import CommentStatusAdmin from "./pages/admin/commentStatus/list";
import CommentAdmin from "./pages/admin/comment/list";
import EditComment from "./pages/admin/comment/edit";
import StaffAdmin from "./pages/admin/staff/list";
import AddStaffAdmin from "./pages/admin/staff/add";
import EditStaff from "./pages/admin/staff/edit";
import ProductAdmin from "./pages/admin/product/list";
import AddProductAdmin from "./pages/admin/product/add";
import EditProduct from "./pages/admin/product/edit";
import BillAdmin from "./pages/admin/bill/list";
import SaleAdmin from "./pages/admin/sale/list";
import AddSaleAdmin from "./pages/admin/sale/add";
import EditSale from "./pages/admin/sale/edit";

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

          <Route path="sale">
            <Route index element={<SaleAdmin />} />
            <Route path="add" element={<AddSaleAdmin />} />
            <Route path="edit/:id" element={<EditSale />} />
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

          <Route path="product">
            <Route index element={<ProductAdmin />} />
            <Route path="add" element={<AddProductAdmin />} />
            <Route path="edit/:id" element={<EditProduct />} />
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

          <Route path="staff">
            <Route index element={<StaffAdmin />} />
            <Route path="add" element={<AddStaffAdmin />} />
            <Route path="edit/:id" element={<EditStaff />} />
          </Route>

          <Route path="category">
            <Route index element={<CategoryAdmin />} />
            <Route path="add" element={<AddCategoryAdmin />} />
            <Route path="edit/:id" element={<EditCategory />} />
          </Route>

          <Route path="news">
            <Route index element={<NewsAdmin />} />
            <Route path="add" element={<AddNewsAdmin />} />
            <Route path="edit/:id" element={<EditNews />} />
          </Route>

          <Route path="discountCode">
            <Route index element={<DiscountCodeAdmin />} />
            <Route path="add" element={<AddDiscountCodeAdmin />} />
            <Route path="edit/:id" element={<EditDiscountCode />} />
          </Route>

          <Route path="commentStatus">
            <Route index element={<CommentStatusAdmin />} />
            <Route path="add" element={<AddCommentStatusAdmin />} />
            <Route path="edit/:id" element={<EditCommentStatus />} />
          </Route>

          <Route path="role">
            <Route index element={<RoleAdmin />} />
            <Route path="add" element={<AddRoleAdmin />} />
            <Route path="edit/:id" element={<EditRole />} />
          </Route>

          <Route path="client">
            <Route index element={<ClientAdmin />} />
            <Route path="add" element={<AddClientAdmin />} />
            <Route path="edit/:id" element={<EditClient />} />
          </Route>

          <Route path="contact">
            <Route index element={<ContactAdmin />} />
            <Route path="edit/:id" element={<EditContact />} />
          </Route>

          <Route path="user">
            <Route index element={<UserAdmin />} />
            <Route path="edit/:id" element={<EditUser />} />
          </Route>

          <Route path="comment">
            <Route index element={<CommentAdmin />} />
            <Route path="edit/:id" element={<EditComment />} />
          </Route>

          <Route path="bill">
            <Route index element={<BillAdmin />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
