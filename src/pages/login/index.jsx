import { Link } from "react-router-dom";
import "./style.css";

import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context";
import { toast } from "react-toastify";

export default function Login() {
  const { LogarUser,loading } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");



  function Hendle(e) {
    e.preventDefault();
    if ((email === "") | (senha === "")) {
      toast.error("O campo é obrigatório");
      return;
    }

    LogarUser(email, senha);
  }

  return (
    <div className="grupo">
      <form className="form">
        <h1 className="Title">Entrar</h1>
        <input
          placeholder="E-Mail"
          className="inputs"
          type="email"
         
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Senha"
          className="inputs"
          type="password"
          
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        
        { loading ? (
          <button className="bnt" onClick={(e) => Hendle(e)}>
          Carregando...
        </button>
        ): (
          <button className="bnt" onClick={(e) => Hendle(e)}>
          Entrar
        </button>
        )}


        <Link to="/Register" className="bntCriar">
          Criar conta!
        </Link>
      </form>
    </div>
  );
}
