import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../services/firebase";
import { AuthContext } from "../../context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";
import InputMask from "react-input-mask";
import { FiSave, FiList, FiFileText, FiDollarSign, FiCalendar } from "react-icons/fi";
import "./style.css";

export default function AccoutFixed() {
    const { user } = useContext(AuthContext);
    const [conta, setConta] = useState("");
    const [valor, setValor] = useState("");
    const [vencimento, setVencimento] = useState("");
    const [loading, setLoading] = useState(false);
    const navigation = useNavigate();

    const valorLimpo = valor.replace("R$ ", "").replace(/\s/g, "").trim();
    const vencimentoLimpo = vencimento.replace(/\//g, "").trim();

    function isDataPassada(dateStr) {
        // dateStr = "DD/MM/AAAA"
        const [dia, mes, ano] = dateStr.split("/").map(Number);
        if (!dia || !mes || !ano || ano < 1000) return true;
        const dataVencimento = new Date(ano, mes - 1, dia);
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        return dataVencimento < hoje;
    }

    async function addAccount() {
        if (!conta.trim()) {
            toast.error("Digite o nome da conta!");
            return;
        }
        if (!valorLimpo) {
            toast.error("Digite o valor da conta!");
            return;
        }
        if (vencimentoLimpo.length < 8) {
            toast.error("Digite uma data de vencimento válida!");
            return;
        }
        if (isDataPassada(vencimento)) {
            toast.error("A data de vencimento não pode ser no passado!");
            return;
        }
        setLoading(true);
        try {
            await addDoc(collection(db, "Account"), {
                nameAccount: conta.trim(),
                valor: valor,
                vencimento: vencimento,
                uid: user.user.uid,
            });
            toast.success("Conta fixa cadastrada com sucesso!");
            setConta("");
            setValor("");
            setVencimento("");
        } catch (error) {
            toast.error("Erro ao salvar. Tente novamente!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="accoutFixed">
            <Header />
            <div className="account-wrapper">
                <div className="accoutFixedForm">
                    <div className="form-header">
                        <h1>Nova Conta Fixa</h1>
                    </div>

                    <div className="input-group">
                        <label><FiFileText size={13} /> Nome da conta</label>
                        <input
                            placeholder="Ex: Conta de luz, Netflix..."
                            value={conta}
                            onChange={(e) => setConta(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label><FiDollarSign size={13} /> Valor</label>
                        <InputMask
                            id="valor"
                            mask="R$ 999999,99"
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                            maskChar=""
                            placeholder="R$ 0,00"
                        />
                    </div>

                    <div className="input-group">
                        <label><FiCalendar size={13} /> Vencimento</label>
                        <InputMask
                            id="date"
                            mask="99/99/9999"
                            value={vencimento}
                            onChange={(e) => setVencimento(e.target.value)}
                            maskChar=""
                            placeholder="DD/MM/AAAA"
                        />
                    </div>

                    <div className="btn-group">
                        <button className="btn-save" onClick={addAccount} disabled={loading}>
                            <FiSave size={17} />
                            {loading ? "Salvando..." : "Salvar"}
                        </button>
                        <button className="btn-view" onClick={() => navigation("/ViewAccountFixed")} disabled={loading}>
                            <FiList size={17} />
                            Ver contas
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
