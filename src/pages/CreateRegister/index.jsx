import "./style.css";
import { addDoc, doc, getDocs, where, query } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../services/firebase";
import { useEffect, useState } from "react";
import { AuthContext } from "../../context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";
import { format } from "date-fns";
import InputMask from "react-input-mask";

export default function CreateRegister() {
    const { user } = useContext(AuthContext);
    const [dados, setDados] = useState();
    const navigation = useNavigate();
    async function AddReceita(e) {
        e.preventDefault();
        if (!dados) {
            toast.error("Digite algo!");
            return;
        }

        try {
            const response = await addDoc(collection(db, "receita"), {
                valor: dados,
                uid: user.user.uid,
                date: format(new Date(), "dd/MM/yyyy"),
            }).then(() => {
                toast.success("Receita adicionada com sucesso!");
                setDados("");
            });
            return;
        } catch (error) {
            console.error("Erro ao adicionar receita:", error);
        }
    }

    async function AddGastos(e) {
        e.preventDefault(e);
        if (!dados) {
            toast.error("Digite algo!");
            return;
        }

        try {
            const response = await addDoc(collection(db, "gastos"), {
                valor: dados,
                uid: user.user.uid,
                date: format(new Date(), "dd/MM/yyyy"),
            }).then(() => {
                toast.success("Gastos adicionada com sucesso!");
                setDados("");
            });
            return;
        } catch (error) {
            console.error("Erro ao adicionar Gastos:", error);
        }
    }

    return (
        <div className="addRegister">
            <Header />
            <div className="formRegister">
                <h1>Adicionar Receita/Gastos</h1>

                <InputMask
                    id="valor"
                    mask="R$ 999999,99"
                    value={dados}
                    onChange={(e) => setDados(e.target.value)}
                    maskChar=""
                    placeholder="Digite o valor"
                />

                <div>
                    <button onClick={(e) => AddReceita(e)}>Receita</button>
                    <button onClick={(e) => AddGastos(e)}>Gastos</button>
                </div>
            </div>
        </div>
    );
}
