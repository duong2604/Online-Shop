import BrandIcon from "../svg/brandIcon";
import ColorIcon from "../svg/colorIcon";
import compartmentIcon from "../svg/compartmentIcon";
import HomeIcon from "../svg/homeIcon";
import kich_co_icon from "../svg/kich_co_icon";
import kich_thuoc_icon from "../svg/kich_thuoc_icon";
import LockTypeIcon from "../svg/lockTypeIcon";
import OrderIcon from "../svg/orderIcon";
import PatternIcon from "../svg/patternIcon";
import ProductIcon from "../svg/productIcon";
import StrapMaterialIcon from "../svg/strapMaterialIcon";

export const navigationLinks = [
  { id: 1, title: "Thống kê", image: HomeIcon, link: "/admin" },
  { id: 2, title: "Đơn hàng", image: OrderIcon, link: "menu" },
  { id: 3, title: "Sản phẩm", image: ProductIcon, link: "product" },
  // { id: 21, title: "Chi tiết SP", image: ProductIcon, link: "product" },
  { id: 4, title: "Họa tiết", image: PatternIcon, link: "pattern" },
  { id: 5, title: "Thương hiệu", image: BrandIcon, link: "brand" },
  { id: 6, title: "Kích thước", image: kich_thuoc_icon, link: "sizee" },
  { id: 7, title: "Kích cỡ", image: kich_co_icon, link: "size" },
  { id: 9, title: "Chất liệu", image: ProductIcon, link: "material" },
  {
    id: 10,
    title: "CL dây đeo",
    image: StrapMaterialIcon,
    link: "strapMaterial",
  },
  { id: 17, title: "Màu sắc", image: ColorIcon, link: "color" },
  { id: 13, title: "Số Ngăn", image: compartmentIcon, link: "compartment" },
  { id: 8, title: "Loại SP", image: ProductIcon, link: "productType" },
  { id: 11, title: "Kiểu khóa", image: LockTypeIcon, link: "lockType" },
  { id: 12, title: "Hàng", image: ProductIcon, link: "hang" },
  { id: 14, title: "Người dùng", image: ProductIcon, link: "kich_co" },
  { id: 15, title: "Vai trò", image: ProductIcon, link: "kich_co" },
  { id: 16, title: "Khách hàng", image: ProductIcon, link: "kich_co" },
  { id: 18, title: "Danh mục", image: ProductIcon, link: "kich_co" },
  { id: 19, title: "Đợt giảm giá", image: ProductIcon, link: "kich_co" },
  { id: 20, title: "SP danh mục", image: ProductIcon, link: "kich_co" },
  { id: 22, title: "DM AD mã giảm giá", image: ProductIcon, link: "kich_co" },
  { id: 23, title: "SP danh mục", image: ProductIcon, link: "kich_co" },
  { id: 24, title: "SP danh mục", image: ProductIcon, link: "kich_co" },
];
