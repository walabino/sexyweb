import { useState } from "react";
import "./update.scss";
import { makeRequestAuth } from "../../api/axios.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Icon } from "@iconify/react";

const Update = ({ setOpenUpdate, user }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    name: user?.name,
    description: user?.description,
  });
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (user) => {
      return makeRequestAuth.put("/users", user);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      },
    }
  );
  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("imagen", file);
      const res = await makeRequestAuth.post("/users/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error) {}
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let coverUrl;
    let profileUrl;

    coverUrl = cover ? await upload(cover) : user.coverPic;
    profileUrl = profile ? await upload(profile) : user.profilePic;

    mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
    setOpenUpdate(false);
  };
  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form>
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    cover
                      ? URL.createObjectURL(cover)
                      : "/upload/" + user.coverPic
                  }
                  alt=""
                />
                <Icon className="icon" icon="ep:upload-filled" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
              onChange={(e) => setCover(e.target.files[0])}
            />
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    profile
                      ? URL.createObjectURL(profile)
                      : "/upload/" + user.profilePic
                  }
                  alt=""
                />
                <Icon className="icon" icon="ep:upload-filled" />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: "none" }}
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>

          <label>Nombre</label>
          <input
            type="text"
            value={texts.name}
            placeholder="Nombre"
            onChange={(e) => setTexts({ ...texts, name: e.target.value })}
          />
          <label>Descripción</label>
          <input
            type="text"
            name="city"
            value={texts.description}
            placeholder="Descripción"
            onChange={(e) =>
              setTexts({ ...texts, description: e.target.value })
            }
          />

          <button onClick={handleSubmit}>Update</button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          close
        </button>
      </div>
    </div>
  );
};
export default Update;
