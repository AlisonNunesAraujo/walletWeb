import React from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiPlusSquare, FiList } from "react-icons/fi";
import "./styles.css";

export default function Menu() {
    const navigation = useNavigate();

    return (
        <div className="menu">
            <h2 className="title">Finanças</h2>

            <nav className="menu-nav">
                <button className="bntOptions" onClick={() => navigation("/ViewRegister")}>
                    <FiList size={16} />
                    <span>Registros</span>
                </button>
                <button className="bntOptions" onClick={() => navigation("/CreateRegister")}>
                    <FiPlusSquare size={16} />
                    <span>Novo Registro</span>
                </button>
            </nav>

            <button onClick={() => navigation("/Perfil")} className="bntPerfil">
                <FiUser size={20} color="#0c0f17" />
            </button>
        </div>
    );
}