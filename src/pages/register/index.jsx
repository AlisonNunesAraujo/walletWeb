import "./style.css";
import { Link } from "react-router-dom";



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
    .min(3, "A senha deve ter ao menos 3 numeros ou 3 letras"),
});

export default function Register() {
  const { RegisterUser, loading } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  function Register(data) {
    RegisterUser(data);
  }

  return (
    <div className="cont">
      <form className="form" onClick={handleSubmit(Register)}>
        <h1 className="Title">Faça seu registro</h1>

        <input
          placeholder="E-Mail"
          className="inputs"
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
          <button className="bnt" type="submit">
            Criando...
          </button>
        ) : (
          <button className="bnt" type="submit">
            Criar
          </button>
        )}

        <Link to="/Login" className="bntVoltar">
          Voltar
        </Link>
      </form>
    </div>
  );
}
