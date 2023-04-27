import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/context"

export const Homepage = () => {

  const {user} = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-black text-white">
      {
        user.email ? <h1>Bienvenido {user.name}</h1>
        :
        <div className="d-flex">
          <button className="btn btn-success m-2" onClick={() => navigate("/login")}>Logearse</button>
          <button className="btn btn-primary m-2" onClick={() => navigate("/register")}>Registrarse</button>
        </div>
      }
    </div>
  )
}

