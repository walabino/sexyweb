import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";
const Login = () => {
  const navigate = useNavigate();
  const { login, currentUser } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(inputs);
      navigate("/");
    } catch (error) {
      setErr(error.response.data.errorMessage);
    }
  };
  //console.log(err);
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Sexyfan</h1>
          <p>Ingresa tus datos, para acceder a tu cuenta.</p>
          <Link to="/register">
            <button>Registrarse</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              placeholder="Usuario"
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Contraseña"
              name="password"
              onChange={handleChange}
            />
            {err && <span style={{ color: "red" }}>{err}</span>}
            <button onClick={handleLogin}>Ingresar</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
