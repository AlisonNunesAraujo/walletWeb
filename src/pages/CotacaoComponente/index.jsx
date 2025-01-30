import React from 'react'
import { useNavigate } from "react-router-dom";
import './style.css'

export function CotacaoComponente() {

    const navigation = useNavigate();
    return (
        <div className="areaDolar">
            <h2>Ver cotação em tempo real</h2>
            <button onClick={() => navigation("/Dolar")}>Ver Cotação</button>
        </div>
    );
}