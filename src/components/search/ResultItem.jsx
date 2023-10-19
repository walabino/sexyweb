import "./resultitem.scss";
const ResultItem = ({ profile }) => {
  return (
    <div className="result_item">
      <img src={profile.pic} alt="" />
      <div className="result_data">
        <p>{profile.name}</p>
        <span>{profile.desc}</span>
      </div>
    </div>
  );
};
export default ResultItem;
