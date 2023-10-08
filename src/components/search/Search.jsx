import { useEffect, useState } from "react";
import "./search.scss";
import { Icon } from "@iconify/react";
import { makeRequestAuth } from "../../api/axios";
const Search = () => {
  const [buscar, setBuscar] = useState("");
  const [resultados, setResultados] = useState([]);
  const handleBuscar = async (e) => {
    try {
      // Realiza la solicitud POST al endpoint del servidor
      let v = e.target.value;
      setBuscar(v);
      if (v.length === 0) {
        setResultados([]);
        return;
      } else if (v.length >= 3) {
        const response = await makeRequestAuth.post(
          "users/find/profile/" + e.target.value
        );
        const resultados = response.data;
        console.log(resultados);
        setResultados(resultados);
      }

      //const response = await axios.post("/buscar", { buscar: e.target.value });

      // Extrae los resultados de la respuesta

      // Actualiza el estado de resultados
    } catch (error) {
      console.error("Error al realizar la búsqueda:", error);
    }
  };

  //console.log("buscar", { buscar });
  return (
    <div className="search">
      <div className="search-bar">
        <input
          type="search"
          placeholder="Buscar creadores"
          onChange={handleBuscar}
          value={buscar}
        />
        <Icon icon="uil:search" />
      </div>
    </div>
  );
};
export default Search;
