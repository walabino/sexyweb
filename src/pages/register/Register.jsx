import { Link } from "react-router-dom";
import "./register.scss";
import { useState } from "react";
import { makeRequest } from "../../api/axios";
const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [err, setErr] = useState(null);
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await makeRequest.post("auth/register", inputs);
      console.log(res);
    } catch (error) {
      //console.log(error.response.data);
      setErr(error.response.data.errorMessage);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Bienvenido</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            {err && <span style={{ color: "red" }}>{err}</span>}
            <button onClick={handleClick}>Registrarse</button>
          </form>
        </div>
        <div className="right">
          <h1>Sexyfan</h1>
          <p>
            Para ser parte del grupo, solo debes ingresar la información
            solicitada.
          </p>
          <span>¿Ya tienes una cuenta?</span>
          <Link to="/login">
            <button>Ingresar</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Register;
