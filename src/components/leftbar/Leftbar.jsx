import { Link } from "react-router-dom";
import "./leftbar.scss";
import { Icon } from "@iconify/react";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
const Leftbar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="leftbar">
      <div className="container">
        <Link to="/" className="profile">
          <div className="profile-photo">
            <img src={currentUser.profilePic} alt="" />
          </div>
          <div className="handle">
            <h4>{currentUser.name}</h4>
            <p>{currentUser.handlerAZ}</p>
          </div>
        </Link>

        <div className="sidebar">
          <Link to="/" className="menu-item active">
            <Icon className="daIcon" icon="uil:home" /> <h3>Home</h3>
          </Link>
          <Link to="/" className="menu-item">
            <Icon className="daIcon" icon="uil:envelope" /> <h3>Mensajes</h3>
          </Link>
          <Link to="/" className="menu-item">
            <Icon className="daIcon" icon="uil:bill" /> <h3>Suscripciones</h3>
          </Link>
          <Link to="/" className="menu-item">
            <Icon className="daIcon" icon="uil:bookmark" /> <h3>Favoritos</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Leftbar;
