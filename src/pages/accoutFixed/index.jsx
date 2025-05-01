import { useState, useEffect } from "react";
import { addDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../services/firebase";
import { AuthContext } from "../../context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";
import InputMask from "react-input-mask";
import "./style.css";
export default function AccoutFixed() {
    const { user } = useContext(AuthContext);
    const [conta, setConta] = useState();
    const [valor, setValor] = useState();
    const [vencimento, setVencimento] = useState();
    const navigation = useNavigate();

    async function addAccount() {
        try {
            const response = await addDoc(collection(db, "Account"), {
                nameAccount: conta,
                valor: valor,
                vencimento: vencimento,
                uid: user.user.uid,
            }).then(() => {
                toast.success("Conta fixa adicionada com sucesso!");
                setConta("");
                setValor("");
                setVencimento("");
            });
            return;
        } catch (error) {
            toast.error("Algo deu errado!");
        }
    }

    return (
        <div className="accoutFixed">
            <Header />
            <div className="accoutFixedForm">
                <h1>Conta Fixa</h1>
                <input
                    placeholder="Nome da conta ex: Conta de luz"
                    value={conta}
                    onChange={(e) => setConta(e.target.value)}
                />
                <InputMask
                    id="valor"
                    mask="R$ 999999,99"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    maskChar=""
                    placeholder="Digite o valor"
                />
                <InputMask
                    id="date"
                    mask="99/99/9999"
                    value={vencimento}
                    onChange={(e) => setVencimento(e.target.value)}
                    maskChar=""
                    placeholder="Digite o vencimento"
                />
                <button onClick={addAccount}>Salvar</button>
                <button onClick={() => navigation("/ViewAccountFixed")}>
                    Ver minhas contas
                </button>
            </div>
        </div>
    );
}
