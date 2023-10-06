import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext.jsx";
import { Icon } from "@iconify/react";
import UserPosts from "../../components/userPost/UserPosts.jsx";
import Update from "../../components/update/Update.jsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequestAuth } from "../../api/axios.js";
import "./profile.scss";
import { useLocation } from "react-router-dom";
const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const userId = useLocation().pathname.split("/")[2];
  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequestAuth.get("/users/find/" + userId).then((res) => {
      return res.data;
    })
  );
  const { isLoading: rIsLoading, data: isFollowData } = useQuery(
    ["following"],
    () =>
      makeRequestAuth
        .get("/relationships/isFollowing?followedUserId=" + userId)
        .then((res) => {
          return res.data;
        })
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  useEffect(() => {
    scrollToTop();
  }, [data]);
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (siguiendo) => {
      if (siguiendo)
        return makeRequestAuth.delete("/relationships?userId=" + userId);
      return makeRequestAuth.post("/relationships", { userId: userId });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["following"]);
      },
    }
  );
  const handeFollow = () => {
    mutation.mutate(isFollowData);
  };
  return (
    <div className="profile">
      <div className="images">
        <img src={data?.coverPic} alt="" className="cover" />
        <img src={data?.profilePic} alt="" className="profilePic" />
      </div>
      <div className="profileContainer">
        <div className="action">
          {currentUser.user_id === data?.user_id ? (
            <Icon
              icon="uil:edit"
              className="ic-action"
              onClick={() => setOpenUpdate(true)}
            />
          ) : (
            <>
              {rIsLoading ? (
                "Loading"
              ) : isFollowData ? (
                <Icon
                  icon="ion:heart"
                  className="ic-action"
                  color="red"
                  onClick={handeFollow}
                />
              ) : (
                <Icon
                  icon="uil:heart"
                  className="ic-action"
                  onClick={handeFollow}
                />
              )}
            </>
          )}

          <Icon icon={"uil:comment"} className="ic-action" />
        </div>
        <div className="uInfo">
          <div className="left">
            <h2>{data?.name}</h2>
            <h3>@{data?.username}</h3>
            <p>{data?.description}</p>
          </div>
        </div>
      </div>
      <div>
        <UserPosts idUser={userId} />
      </div>
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
};
export default Profile;
