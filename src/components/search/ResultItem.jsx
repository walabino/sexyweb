import "./resultitem.scss";
import { useNavigate } from "react-router-dom";
const ResultItem = ({ profile }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    const randomKey = Math.random().toString(36).substring(2, 9); // Genera una clave aleatoria
    navigate(`/profile/${id}?k=${randomKey}`);
  };
  return (
    <div className="result_item" onClick={() => handleClick(profile.id)}>
      <img src={profile.pic} alt="" />
      <div className="result_data">
        <p>{profile.name}</p>
        <span>{profile.desc}</span>
      </div>
    </div>
  );
};
export default ResultItem;
