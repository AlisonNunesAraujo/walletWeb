import { Link } from "react-router-dom";
import "./style.css";

import { useContext, useState } from "react";
import { AuthContext } from "../../context";

export default function Login() {
  const {LogarUser} = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [ senha,setSenha] = useState('')


  function Hendle(e) {
    e.preventDefault();
    if(email === '' | senha === ''){
      alert('campo vazio')
      return;
    }

    LogarUser(email,senha)
    
  }

  return (
    <div className="conteiner">
      <form className="form">
        <h1 className="Title">Entrar</h1>
        <input placeholder="E-Mail" className="inputs" type="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
        <input placeholder="Senha" className="inputs" type="password"  value={senha} onChange={(e)=> setSenha(e.target.value)}/>
        <button className="bnt" onClick={(e) => Hendle(e)}>
          Entrar
        </button>
        <Link to="/Register" className="bntCriar">
          Criar conta!
        </Link>
      </form>
    </div>
  );
}
