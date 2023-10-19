import { useLocation } from "react-router-dom";
import ResultItem from "./ResultItem.jsx";
import { useEffect, useState } from "react";
import { makeRequestAuth } from "../../api/axios";

const ResultSearch = () => {
  const buscar = useLocation().pathname.split("/")[2];
  const [resultados, setResultados] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await makeRequestAuth.post("users/search/" + buscar);
        const data = response.data;
        setResultados(data);
        console.log({ data });
      } catch (error) {
        console.error("Error: ", error);
      }
    }

    fetchData();
  }, []);
  return (
    <div className="result_search">
      {resultados.map((result) => (
        <ResultItem key={result.id} profile={result} />
      ))}
    </div>
  );
};
export default ResultSearch;
