import { useEffect, useState } from "react";
import "./search.scss";
import { Icon } from "@iconify/react";
import { makeRequestAuth } from "../../api/axios";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const navigate = useNavigate();
  const [buscar, setBuscar] = useState("");
  const [ver, setVer] = useState(false);
  const [resultados, setResultados] = useState([]);
  const handleBuscar = async (e) => {
    try {
      // Realiza la solicitud POST al endpoint del servidor
      let v = e.target.value;
      setBuscar(v);
      if (v.length === 0) {
        setResultados([]);
        setVer(false);
        return;
      } else if (v.length >= 3) {
        const response = await makeRequestAuth.post(
          "users/find/profile/" + e.target.value
        );
        const resultados = response.data;
        if (resultados.length > 0) {
          setResultados(resultados);
          console.log(resultados);
          setVer(true);
        } else {
          setVer(false);
        }
      }

      //const response = await axios.post("/buscar", { buscar: e.target.value });

      // Extrae los resultados de la respuesta

      // Actualiza el estado de resultados
    } catch (error) {
      console.error("Error al realizar la búsqueda:", error);
    }
  };
  const handleClick = (id) => {
    setBuscar("");
    setVer(false);
    const randomKey = Math.random().toString(36).substr(2, 9); // Genera una clave aleatoria
    navigate(`/profile/${id}?random=${randomKey}`);
  };

  //console.log("buscar", { buscar });
  return (
    <div className="search">
      <div className="search-bar">
        <Icon icon="uil:search" />
        <input
          type="search"
          placeholder="Buscar creadores"
          onChange={handleBuscar}
          value={buscar}
        />
      </div>
      {ver === true && resultados && (
        <div class="search-results">
          {resultados.map((res) => (
            <div
              className="search-result"
              key={res.id}
              onClick={() => handleClick(res.id)}
            >
              <img src={res.pic} alt="" className="user-avatar" />
              <p className="user-name">{res.name}</p>
            </div>
          ))}
          <div className="search-result">
            <button>Ver Mas</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Search;
