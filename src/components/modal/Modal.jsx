import { useState } from "react";
import "./modal.scss";
import { Icon } from "@iconify/react";
import { makeRequestAuth } from "../../api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const Modal = ({ handleModal }) => {
  const [imagenPreview, setImagenPreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [fileUP, setFileUP] = useState(null);
  const [videoUP, setVideoUP] = useState(null);
  const [texto, setTexto] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newPost) => {
      return makeRequestAuth.post("posts", newPost);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
        handleModal();
      },
    }
  );

  const handleChange = (e) => {
    setTexto(e.target.value);
  };
  // Función para manejar la selección de archivos
  const handleVideoUpload = async () => {
    const formData = new FormData();
    formData.append("archivo", videoUP);

    try {
      const res = await makeRequestAuth.post("posts/upload-video", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (error) {
      console.error(error);
    }
  };
  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("imagen", fileUP);

    try {
      const res = await makeRequestAuth.post("posts/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (error) {
      console.error(error);
    }
  };
  const addPost = async () => {
    //handleFileUpload();
    let videoName = "";
    let imageName = "";
    if (videoUP) {
      videoName = await handleVideoUpload();
    }
    if (fileUP) {
      imageName = await handleFileUpload();
    }
    const payload = {
      desc: texto,
      video: videoName,
      img: imageName,
    };
    mutation.mutate(payload);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagenPreview(reader.result); // Establecer la vista previa de la imagen
      };

      reader.readAsDataURL(file);
      setFileUP(file);
    }
  };
  const handleFileVid = (event) => {
    const daVid = event.target.files[0];

    if (daVid) {
      // Verificar si el archivo es un video
      if (daVid.type.startsWith("video/")) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setVideoPreview(reader.result); // Establecer la vista previa del video
        };

        reader.readAsDataURL(daVid);
        setVideoUP(daVid);
      } else {
        alert("Por favor, selecciona un archivo de video válido.");
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Crear Publicación</h2>
          <button className="close-button" onClick={handleModal}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <textarea
            placeholder="¿En qué estás pensando?"
            onChange={handleChange}
          ></textarea>
          <div className="icon-buttons">
            <label htmlFor="imgbtn" className="file-input-label">
              <Icon icon="fa:image" className="icon" /> Foto
              <input
                type="file"
                accept="image/*"
                className="file-input"
                id="imgbtn"
                onChange={handleFileChange}
              />
            </label>
            <label htmlFor="imgvideo" className="file-input-label">
              <Icon icon="fa:video-camera" className="icon" />
              Video
              <input
                type="file"
                accept="video/*"
                className="file-input"
                id="imgvideo"
                onChange={handleFileVid}
              />
            </label>
          </div>
          {imagenPreview && (
            <div className="imagen-preview">
              <img src={imagenPreview} alt="Vista previa de la imagen" />
            </div>
          )}
          {videoPreview && (
            <div className="video-preview">
              <video controls width="320" height="240">
                <source src={videoPreview} type="video/mp4" />
                Tu navegador no admite el elemento de video.
              </video>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="post-button" onClick={addPost}>
            Publicar
          </button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
