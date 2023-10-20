import { Link } from "react-router-dom";
import "./post.scss";
import { Icon } from "@iconify/react";
import { useContext, useState } from "react";
import Comments from "../comments/Comments";
import moment from "moment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequestAuth } from "../../api/axios";
import { AuthContext } from "../../context/authContext";
const Post = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { isLoading, error, data } = useQuery([`likes`, post.id], () =>
    makeRequestAuth.get("/likes?postId=" + post.id).then((res) => {
      return res.data;
    })
  );
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (liked) => {
      if (liked) return makeRequestAuth.delete("/likes?postId=" + post.id);
      return makeRequestAuth.post("/likes", { postId: post.id });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );
  const toggleLike = () => {
    let hay = data?.includes(currentUser.user_id);

    mutation.mutate(hay);
  };

  return (
    <div className="feeds">
      <div className="feed">
        <div className="head">
          <div className="user">
            <div className="profile-photo">
              <img src={post.profilePic} alt="" />
            </div>
            <div className="info">
              <Link
                to={`/profile/${post.uId}?k=${Math.random()
                  .toString(36)
                  .substring(2, 9)}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <h3>{post.name}</h3>
              </Link>
              <small>{moment(post.created_at).fromNow()}</small>
            </div>
          </div>
          <div className="edit">
            <i className="uil uil-ellipsis-h"></i>
          </div>
        </div>
        <div className="content">
          <p>{post.descripcion}</p>
          {post.img ? (
            <div className="photo">
              <img src={post.img} alt="" />
            </div>
          ) : null}
          {post.video ? (
            <div className="video">
              <video controls width="100%">
                <source src={post.video} type="video/mp4" />
              </video>
            </div>
          ) : null}
        </div>
        <div className="action-button">
          <div className="interaction-buttons">
            <span onClick={toggleLike}>
              {isLoading ? (
                "Cargando"
              ) : data?.includes(currentUser.user_id) ? (
                <Icon icon="ion:heart" className="ic-action" color="red" />
              ) : (
                <Icon icon="uil:heart" className="ic-action" />
              )}
            </span>
            <span>
              <Icon icon="uil:comment-dots" className="ic-action" />
            </span>
            <span>
              <Icon icon="uil:share-alt" className="ic-action" />
            </span>
          </div>
          <div className="bookmark">
            <span>
              <Icon icon="uil:bookmark-full" />
            </span>
          </div>
        </div>

        <div className="liked-by">
          <p>
            <b>{data?.length} </b>likes
          </p>
        </div>

        <div className="caption">
          <p>{post.desc}</p>
        </div>
        <div
          className="text-muted"
          style={{ cursor: "pointer" }}
          onClick={() => setCommentOpen(!commentOpen)}
        >
          Ver todos los comentarios
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};
export default Post;
