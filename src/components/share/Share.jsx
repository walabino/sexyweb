import "./share.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { Icon } from "@iconify/react";
import Modal from "../modal/Modal";
const Share = () => {
  const { currentUser } = useContext(AuthContext);
  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(!modal);
  };
  return (
    <>
      <div className="create">
        <div className="create-post">
          <div className="profile-photo">
            <img src={currentUser.profilePic} alt="" />
          </div>
          <span onClick={handleModal}>Nueva Publicacioń</span>
          <button onClick={handleModal}>Publicar</button>
        </div>
      </div>
      {modal && <Modal handleModal={handleModal} />}
    </>
  );
};
export default Share;
