import React from "react";
import MobileNavbar from "./MobileNavbar";
import { ExitToApp } from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import { NavbarMap } from "./NavbarMap";
import './Navbar.css';
import { FirebaseAuth } from "../../storeFirebase";

const Navbar = () => {

  const signOut = () => {
    FirebaseAuth.signOut();
  }

  return (
    <div className="navbar">
      <div className="big-navbar">
        <div className="bg-gray-900 h-screen w-full relative navbar-main">
          {/* Logo Part Start */}
          <div className="flex justify-center items-center h-20">
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
          {/* Logo Part End */}
          {/* Menu Part Start */}
          <div className="flex flex-col gap-10 justify-between text-white navbar-menu px-3">
            {/* Main Navigation Start */}
            <div className="flex flex-col gap-y-2 text-white">
              {NavbarMap.map((navitem) => (
                <NavLink
                  key={navitem.path}
                  exact
                  activeClassName="bg-white text-gray-900"
                  to={navitem.path}
                  className="flex items-center gap-2 px-5 py-3 hover:bg-white hover:text-gray-900 w-full rounded-md transition-all"
                >
                  {navitem.icon}
                  <span>{navitem.label}</span>
                </NavLink>
              ))}
            </div>
            {/* Main Navigation End */}
            {/* Logout Button Start */}
            <div className="absolute bottom-0 left-0 right-0" onClick={signOut}>
              <button className="flex items-center gap-2 px-5 py-3 bg-red-600 text-white w-full transition-all">
                <ExitToApp /> <span>Logout</span>
              </button>
            </div>
            {/* Logout Button End */}
          </div>
          {/* Menu Part End */}
        </div>
      </div>
      <div className="small-navbar">
        <MobileNavbar />
      </div>
    </div>
  );
};

export default Navbar;
