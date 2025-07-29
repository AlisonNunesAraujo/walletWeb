import { Link } from "react-router-dom";
import "./style.css";
import { useContext } from "react";
import { AuthContext } from "../../context";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().nonempty("O campo é obrigatório"),
  senha: z
    .string()
    .nonempty("O campo é obrigatório")
    .min(3, "A senha deve ter ao menos 6 numeros ou 6 letras"),
});

export default function Login() {
  const { LogarUser, loading } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  function Hendle(data) {
    LogarUser(data);
  }

  return (
    <div className="global">
      <div className="login">
        <form className="formLogin" onSubmit={handleSubmit(Hendle)}>
          <h1 className="Title">Entre na sua conta!</h1>

          <input
            placeholder="E-Mail"
            className="inputs"
            type="email"
            {...register("email")}
            id="email"
          />
          <p>{errors.email?.message}</p>

          <input
            placeholder="Senha"
            className="inputs"
            type="password"
            {...register("senha")}
            id="senha"
          />
          <p>{errors.senha?.message}</p>

          {loading ? (
            <button type="submit" className="bntLogin">
              Carregando...
            </button>
          ) : (
            <button type="submit" className="bntLogin">
              Entrar
            </button>
          )}

          <Link to="/Register" className="bntCriar">
            Criar conta!
          </Link>
        </form>

        <div className="apresentacao">
          <img
            src="https://img.freepik.com/vetores-gratis/ilustracao-do-conceito-de-login-movel_114360-83.jpg?semt=ais_hybrid&w=740"
            className="img"
          />
        </div>
      </div>
    </div>
  );
}
