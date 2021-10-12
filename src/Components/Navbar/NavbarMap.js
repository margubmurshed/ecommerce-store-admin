import {
    Assessment,
    ViewAgenda,
    AddCircleRounded
} from "@material-ui/icons";
import { Icon } from "@material-ui/core";


export const NavbarMap = [
    { label: "Reports", path: "/", icon: <Assessment />, submenu: [] },
    { label: "Products", path: "/products", icon: <ViewAgenda />, submenu: [] },
    { label: "Add Products", path: "/add-product", icon: <AddCircleRounded />, submenu: [] },
    { label: "Catagories", path: "/catagories", icon: <Icon className="fa fa-grip-horizontal" fontSize="small" />, submenu: [] },
    { label: "Orders", path: "/orders", icon: <i className="fas fa-shopping-cart"></i>, submenu: [] },
]