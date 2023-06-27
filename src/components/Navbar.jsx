import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UseDarkMode from "./UseDarkMode";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import LogoLarge from "../assets/logoLarge";
import Logo from "../assets/logo";

const roots = [
  { Path: "/", title: "Home" },
  { Path: "/newProduct", title: "New Product" },
];

const Navbar = () => {
  const [colorTheme, setTheme] = UseDarkMode();
  const [darkMode, setDarkMode] = useState(
    colorTheme === "light" ? true : false
  );
  const navigate = useNavigate();
  const [toggle, setToggle] = useState({ menu: false, user: false });
  const simpleClass =
    "text-slate-900 dark:text-white block px-3 py-1 pb-2 rounded-md text-base font-medium";
  const activeClass = ({ isActive }) =>
    isActive
      ? `bg-gray-300 dark:bg-gray-600 ${simpleClass}`
      : `bg-gray-400 dark:bg-gray-900 ${simpleClass}`;

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkMode(checked);
  };

  const toggleMenu = () => {
    return (
      <div className="sm:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {roots.map((root) => (
            <NavLink
              key={root.title}
              to={root.Path}
              className={activeClass}
              onClick={() => setToggle({ menu: false, user: false })}
            >
              {root.title}
            </NavLink>
          ))}
        </div>
      </div>
    );
  };

  return (
    <header>
      <nav className="md:px-4 bg-gray-500 dark:bg-gray-900 z-10 relative">
        <div className="max-w-7xl mx-auto px-2">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() => setToggle({ menu: !toggle.menu })}
              >
                <span className="sr-only">Open main menu</span>

                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div
                className="flex-shrink-0 flex items-center cursor-pointer"
                onClick={() => navigate("/")}
              >
                <Logo />
                <LogoLarge />
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  {roots.map((root) => (
                    <NavLink
                      key={root.title}
                      to={root.Path}
                      className={activeClass}
                    >
                      {root.title}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <DarkModeSwitch
                checked={darkMode}
                onChange={toggleDarkMode}
                size={30}
              />
            </div>
          </div>
        </div>
        {toggle.menu && toggleMenu()}
      </nav>
      {(toggle.menu || toggle.user) && (
        <button
          className="inset-0 fixed bg-gray-400 dark:bg-gray-200 opacity-25"
          onClick={() => setToggle({ menu: false, user: false })}
        ></button>
      )}
    </header>
  );
};

export default Navbar;

// const toggleUser = () => {
//   return (
//     <div
//       className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
//       role="menu"
//       aria-orientation="vertical"
//       aria-labelledby="user-menu-button"
//       tabIndex="-1"
//     >
//       <a
//         href="#"
//         className="block px-4 py-2 text-sm text-gray-700"
//         role="menuitem"
//         tabIndex="-1"
//         id="user-menu-item-0"
//       >
//         Your Profile
//       </a>
//       <a
//         href="#"
//         className="block px-4 py-2 text-sm text-gray-700"
//         role="menuitem"
//         tabIndex="-1"
//         id="user-menu-item-1"
//       >
//         Settings
//       </a>
//       <a
//         href="#"
//         className="block px-4 py-2 text-sm text-gray-700"
//         role="menuitem"
//         tabIndex="-1"
//         id="user-menu-item-2"
//       >
//         Sign out
//       </a>
//     </div>
//   );
// };

// <div className="ml-3 relative">
//               <div>
//                 <button
//                   type="button"
//                   className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
//                   id="user-menu-button"
//                   aria-expanded="false"
//                   aria-haspopup="true"
//                   onClick={() => setToggle({ user: !toggle.user })}
//                 >
//                   <span className="sr-only">Open user menu</span>
//                   <img
//                     className="h-8 w-8 rounded-full"
//                     src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                     alt=""
//                   />
//                 </button>
//               </div>
//               {toggle.user && toggleUser()}
//             </div>
