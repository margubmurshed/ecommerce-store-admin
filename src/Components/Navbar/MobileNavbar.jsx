import { useState } from "react";
import { Home, Menu } from "@material-ui/icons";
import { ExitToApp } from "@material-ui/icons";
import { NavbarMap } from "./NavbarMap";
import { IconButton } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const MobileNavbar = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Mobile Navbar Header Start */}
      <div className="flex justify-between items-center bg-gray-900 h-16 w-full p-3 text-white sticky">
        <IconButton className="icon-btn" onClick={() => setOpen(!open)}>
          <Menu />
        </IconButton>
        <div className="flex justify-center items-center">
          <a
            href="/"
            className="font-bold text-white text-2xl px-5 py-3 rounded-xl transition-all"
          >
            E-
            <span className="text-blue-600 font-semibold lowercase">
              Commerce
            </span>
          </a>
        </div>
        <NavLink to="/">
          <IconButton className="icon-btn">
            <Home />
          </IconButton>
        </NavLink>
      </div>
      {/* Mobile Navbar Header End */}
      {/* Slide Menu Start */}
      <div
        className={`bg-gray-900 h-screen w-full relative z-50 transition-all ${
          !open ? "hidden" : "block"
        }`}
      >
        <div className="flex flex-col gap-10 justify-between text-white navbar-menu">
          <div className="flex flex-col text-white">
            {NavbarMap.map((navitem) => (
              <NavLink
                exact
                key={navitem.path}
                activeClassName="bg-white text-gray-900"
                to={navitem.path}
                className="flex items-center gap-2 px-5 py-3 hover:bg-white hover:text-gray-900 w-full transition-all"
              >
                {navitem.icon}
                <span>{navitem.label}</span>
              </NavLink>
            ))}
            <button className="flex items-center gap-2 px-5 py-3 bg-red-600 text-white w-full transition-all">
              <ExitToApp /> <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavbar;
