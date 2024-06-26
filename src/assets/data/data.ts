import BrandIcon from "../svg/brandIcon";
import CategoryIcon from "../svg/categoryIcon";
import ColorIcon from "../svg/colorIcon";
import compartmentIcon from "../svg/compartmentIcon";
import ContactIcon from "../svg/contactIcon";
import HomeIcon from "../svg/homeIcon";
import kich_co_icon from "../svg/kich_co_icon";
import kich_thuoc_icon from "../svg/kich_thuoc_icon";
import LockTypeIcon from "../svg/lockTypeIcon";
import NewsIcon from "../svg/newsIcon";
import OrderIcon from "../svg/orderIcon";
import PatternIcon from "../svg/patternIcon";
import ProductIcon from "../svg/productIcon";
import StrapMaterialIcon from "../svg/strapMaterialIcon";
import TicketIcon from "../svg/ticketIcon";
import UsersIcon from "../svg/usersIcon";

export const navigationLinks = [
  { id: 1, title: "Thống kê", image: HomeIcon, link: "/admin" },
  { id: 2, title: "Đơn hàng", image: OrderIcon, link: "order" },
  { id: 26, title: "Hóa đơn", image: OrderIcon, link: "bill" },
  { id: 3, title: "Sản phẩm", image: ProductIcon, link: "product" },
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
  { id: 18, title: "Danh mục", image: CategoryIcon, link: "category" },
  { id: 14, title: "Người dùng", image: UsersIcon, link: "user" },
  { id: 15, title: "Vai trò", image: UsersIcon, link: "role" },
  { id: 16, title: "Khách hàng", image: UsersIcon, link: "client" },
  { id: 19, title: "Đợt giảm giá", image: TicketIcon, link: "discountCode" },
  { id: 22, title: "Mã giảm giá", image: TicketIcon, link: "sale" },
  { id: 20, title: "Tin tức", image: NewsIcon, link: "news" },
  { id: 23, title: "Liên hệ", image: ContactIcon, link: "contact" },
  { id: 21, title: "Bình luận", image: ProductIcon, link: "comment" },
  { id: 24, title: "TT bình luận", image: ProductIcon, link: "commentStatus" },
  { id: 25, title: "QL Nhân viên", image: ProductIcon, link: "staff" },
];
