import { useNavigate } from "react-router-dom";
import './style.css'
export default function Cards() {

    const navigation = useNavigate();

    return (
        <div className="dashboard">
            <div className="textTitle">
                <h2>Dasboard</h2>
            </div>
            <div className="areaBnts">
                <button onClick={() => navigation("/CreateRegister")}>
                    <p>Adicionar Receita/Gastos</p>
                </button>
                <button onClick={() => navigation("/ViewRegister")}>
                    <p>Ver registros</p>
                </button>
                <button onClick={() => navigation("/AccountFixed")}>
                    <p>Adicionar Conta Fixa!</p>
                </button>
                <button onClick={() => navigation("/ViewAccountFixed")}>
                    <p>Ver suas conta fixas</p>
                </button>
            </div>
        </div>
    );
}