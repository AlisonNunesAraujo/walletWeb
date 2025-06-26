import React from "react";
import { useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import "./styles.css";

export default function Menu() {
    const navigation = useNavigate();

    return (
        <div className="menu">
            <h2 className="title">Finanças</h2>



            <button className="bntOptions">
                <p onClick={() => navigation("/ViewRegister")}>Registros</p>
            </button>
            <button className="bntOptions">
                <p onClick={() => navigation("/CreateRegister")}>Novo Registro</p>
            </button>




            <button onClick={() => navigation("/Perfil")} className="bntPerfil">
                <FiUser size={25} color="black" />
            </button>
        </div>
    )
}