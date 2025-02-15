import React, { useEffect } from "react";
import { useState } from "react";
import { api } from "../../api";
import { useNavigate } from "react-router-dom";
import './style.css'
export default function Dolar() {

    const [dadosApi, setDadosApi] = useState<any[]>([])
    const navigation = useNavigate();

    useEffect(() => {
        async function GetDolar() {
            const response = await api.get("USD-BRL,BTC-BRL");
            console.log(response.data);
            setDadosApi(Object.values(response.data))
        }

        GetDolar();
    }, [])


    return (
        <div className="areaRenderDolar">
            <h2>Informaçoes da cotação em tempo real!</h2>

            {dadosApi.map((item) => {
                return (
                    <div>
                        <h3>{item.code} - {item.codein}</h3>
                        <h4>R$ {item.ask}</h4>
                    </div>
                )
            })}

            <button onClick={() => navigation("/Home")}>Voltar</button>
        </div>
    );
}