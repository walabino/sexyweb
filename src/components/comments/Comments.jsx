import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import "./comments.scss";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { makeRequestAuth } from "../../api/axios";
import moment from "moment";
const Comments = ({ postId }) => {
  const { currentUser } = useContext(AuthContext);
  const [desc, setDesc] = useState("");
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery(["comments", postId], () =>
    makeRequestAuth.get("/comments?postId=" + postId).then((res) => {
      return res.data;
    })
  );

  const mutation = useMutation(
    (newComments) => {
      return makeRequestAuth.post("/comments", newComments);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );
  const addComment = async (e) => {
    e.preventDefault();
    const payload = {
      desc: desc,
      postId,
    };
    mutation.mutate(payload);
    setDesc("");
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input
          type="text"
          placeholder="Añade un comentario..."
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
        />
        <button onClick={addComment}>Enviar</button>
      </div>
      {isLoading
        ? "Cargando"
        : data &&
          data.map((comment) => (
            <div className="comment" key={comment.id}>
              <img src={comment.profilePic} alt="" />
              <div className="info">
                <span>{comment.name}</span>
                <p>{comment.descripcion}</p>
              </div>
              <span className="date">
                {moment(comment.created_at).fromNow()}
              </span>
            </div>
          ))}
    </div>
  );
};
export default Comments;
