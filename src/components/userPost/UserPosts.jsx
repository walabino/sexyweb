import "./userposts.scss";
import Post from "../post/Post";
import { useQuery } from "@tanstack/react-query";
import { makeRequestAuth } from "../../api/axios";
const UserPosts = ({ idUser }) => {
  const { isLoading, error, data } = useQuery(["userposts"], () =>
    makeRequestAuth.get("/posts/user/?userId=" + idUser).then((res) => {
      return res.data;
    })
  );

  return (
    <div className="posts">
      {error
        ? "Algo salio mal!"
        : isLoading
        ? "Cargando..."
        : data && data.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};
export default UserPosts;
