import "./style.css";
import { addDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../services/firebase";
import { useState, useContext } from "react";
import { AuthContext } from "../../context";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";
import { format } from "date-fns";
import InputMask from "react-input-mask";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

export default function CreateRegister() {
    const { user } = useContext(AuthContext);
    const [dados, setDados] = useState("");
    const [loading, setLoading] = useState(null);
    const navigation = useNavigate();

    async function AddReceita(e) {
        e.preventDefault();
        if (!dados) { toast.error("Digite um valor!"); return; }
        setLoading("receita");
        try {
            await addDoc(collection(db, "receita"), {
                valor: dados,
                uid: user.user.uid,
                date: format(new Date(), "dd/MM/yyyy"),
            });
            toast.success("Receita adicionada com sucesso!");
            setDados("");
        } catch (error) {
            toast.error("Erro ao adicionar receita!");
        } finally {
            setLoading(null);
        }
    }

    async function AddGastos(e) {
        e.preventDefault();
        if (!dados) { toast.error("Digite um valor!"); return; }
        setLoading("gastos");
        try {
            await addDoc(collection(db, "gastos"), {
                valor: dados,
                uid: user.user.uid,
                date: format(new Date(), "dd/MM/yyyy"),
            });
            toast.success("Gasto adicionado com sucesso!");
            setDados("");
        } catch (error) {
            toast.error("Erro ao adicionar gasto!");
        } finally {
            setLoading(null);
        }
    }

    return (
        <div className="addRegister">
            <Header />
            <div className="register-wrapper">
                <div className="formRegister">
                    <div className="form-header">
                        <h1>Novo Registro</h1>
                        <p className="form-date">{format(new Date(), "dd/MM/yyyy")}</p>
                    </div>

                    <div className="input-group">
                        <label htmlFor="valor">Valor</label>
                        <InputMask
                            id="valor"
                            mask="R$ 999999,99"
                            value={dados}
                            onChange={(e) => setDados(e.target.value)}
                            maskChar=""
                            placeholder="R$ 0,00"
                        />
                    </div>

                    <div className="btn-group">
                        <button
                            className="btn-receita"
                            onClick={AddReceita}
                            disabled={loading !== null}
                        >
                            <FiTrendingUp size={18} />
                            {loading === "receita" ? "Salvando..." : "Receita"}
                        </button>
                        <button
                            className="btn-gastos"
                            onClick={AddGastos}
                            disabled={loading !== null}
                        >
                            <FiTrendingDown size={18} />
                            {loading === "gastos" ? "Salvando..." : "Gasto"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

