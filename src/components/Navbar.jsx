import React, {  useState } from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./Sidebar";
import { IconContext } from "react-icons";
import { useStateValue } from "./ContextAPI/StateProvider";
import { useHistory } from "react-router-dom";

import "./navbar.css";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const [burger, setBurger] = useState(false);
  const [{ user }, dispatch] = useStateValue();
  const [{ Admin }] = useStateValue();

  const history = useHistory();

  const showSidebar = () => setSidebar(!sidebar);

  const showBurger = () => {
    if (window.innerWidth <= 640) {
      setBurger(true);
    } else {
      setBurger(false);
    }
  };

  window.addEventListener("resize", showBurger);

  const changeBackground = () => {
    if (window.scrollY >= 50) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changeBackground);

  function signOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    // localStorage.removeItem("Admin");

    dispatch({
      type:'SET_USER',
      user:null
    })
    history.push("/");
  }

  return (
    <>
      <IconContext.Provider value={{ size: "1.5rem" }}>
        <div className={navbar ? "navbar active" : "navbar"}>
          {burger ? (
            <Link to="#" className="menu-bars">
              <FaBars onClick={showSidebar} />
            </Link>
          ) : (
            <Link to="/" className="logo">
              <h3>Safe Courier</h3>
            </Link>
          )}

          {burger ? (
            ""
          ) : (
            <div className="nav-menu">
              {Admin ? (
                <Link to="/allorders"> All Orders</Link>
              ) : (
                <>
                  <Link to="/">Home</Link>
                  <Link to="/postorder">Post-Orders</Link>
                  <Link to="/UserOrders"> View-Orders</Link>
                </>
              )}

              <Link to="/login">{user?.email}</Link>
            </div>
          )}
          {burger ? (
            <Link to="/" className="logo">
              <h3>Safe Courier</h3>
            </Link>
          ) : (
            ""
          )}

          {!user ? (
            <Link to="/" onClick={signOut}>
              Login
            </Link>
          ) : (
            <>
              <Link to="/" style={{ color: "black" }} onClick={signOut}>
                <span>{user}</span>
                <span>Sign Out</span>
              </Link>
            </>
          )}
        </div>
        <div className={sidebar ? "sidebar-menu active" : "sidebar-menu"}>
          <ul className="sidebar-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiOutlineClose
                  style={{ color: "black" }}
                  onClick={showSidebar}
                />
              </Link>
            </li>
            <h2 style={{ color: "white" }}>{user}</h2>

            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  {!Admin &&
                   <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>}
                  
                </li>
              );
            })}
          </ul>
        </div>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
