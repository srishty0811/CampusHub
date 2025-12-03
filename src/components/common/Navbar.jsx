import React, { useState, useEffect, useRef } from "react";
import Button from "./Button";
import { Link, matchPath, useLocation } from "react-router-dom";
import { NavBarLinks } from "../../Data/navbar-links";
import { useSelector } from "react-redux";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const menuRef = useRef(null);

  const closeMenu = () => setShowMenu(false);

  const menu = [
    { title: "Home", path: "/" },
    { title: "Courses", path: "/courses" },
    { title: "Upload", path: "/upload" },
    { title: "Contact Us", path: "/contact" },
    { title: "Profile", path: "/dashboard/my-profile" },
    { title: "Dashboard", path: "/dashboard" },
    ...(!token
      ? [
          { title: "Login", path: "/login" },
          { title: "Sign Up", path: "/signup" },
        ]
      : []),
  ];

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div
      className={`flex md:h-16 h-14 items-center justify-center sticky top-0 z-50 transition-all duration-500 ${
        location.pathname === "/"
          ? "bg-gradient-to-r from-cyan-600 to-blue-700 shadow-lg"
          : "bg-white shadow-md"
      }`}
    >
      {/* Logo and Content */}
      <div className="flex w-11/12 max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
            CampusHub
          </h1>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-8 text-lg font-semibold">
            {NavBarLinks.map((link, index) => (
              <li key={index}>
                <Link to={link?.path}>
                  <p
                    className={`hover:text-cyan-400 transition-colors duration-200 transform ${
                      matchRoute(link?.path)
                        ? "text-cyan-300 scale-105"
                        : location.pathname === "/"
                        ? "text-white"
                        : "text-gray-800"
                    }`}
                  >
                    {link.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Buttons */}
        <div className="hidden md:flex gap-x-6 items-center">
          {token === null && (
            <>
              <Button
                active={true}
                linkto="/login"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-black py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Login
              </Button>
              <Button
                active={true}
                linkto="/signup"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-black py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Register
              </Button>
            </>
          )}
          {token !== null && <ProfileDropDown />}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden relative">
          <GiHamburgerMenu
            onClick={() => setShowMenu(!showMenu)}
            className={`text-3xl cursor-pointer transition-all duration-300 ${
              location.pathname === "/" ? "text-white" : "text-blue-600"
            }`}
          />
          {/* Dropdown Menu */}
          {showMenu && (
            <div
              ref={menuRef}
              className="absolute top-12 right-0 w-44 bg-white/90 backdrop-blur-md rounded-lg shadow-xl p-4 flex flex-col gap-3 z-50 transition-all duration-300"
            >
              {menu.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  onClick={closeMenu}
                  className="text-gray-700 hover:text-cyan-500 font-medium py-2 border-b last:border-none border-gray-300"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
