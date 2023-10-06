import { Link } from "react-router-dom";
import "./navbar.scss";
import { Icon } from "@iconify/react";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkMode";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="navbar">
      <nav>
        <div className="left">
          <Link to="/">
            <h2 className="log">SexyFan</h2>
          </Link>
        </div>
        <div className="middle">
          <div className="search-bar">
            <Icon icon="uil:search" />

            <input type="search" placeholder="Buscar creadores" />
          </div>
        </div>
        <div className="right">
          {darkMode ? (
            <Icon icon="uil:sun" className="daIcon" onClick={toggle} />
          ) : (
            <Icon icon="uil:moon" className="daIcon" onClick={toggle} />
          )}

          <div className="profile-photo">
            <img src={currentUser.profilePic} alt="" />
          </div>
          <span className="uname">{currentUser.name}</span>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
