import { useEffect, useState } from "react";
import { collection, getDocs, where, query, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { useContext } from "react";
import { AuthContext } from "../../context";
import Header from "../../components/header";
import { toast } from "react-toastify";
import { FiTrash2, FiCreditCard, FiCalendar, FiDollarSign, FiInbox } from "react-icons/fi";
import "./style.css";

export default function ViewAccountFixed() {
    const [contas, setContas] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        async function fetchContas() {
            const uid = user.user.uid;
            const ref = collection(db, "Account");
            const contaQuery = query(ref, where("uid", "==", uid));
            getDocs(contaQuery).then((snapshot) => {
                let lista = [];
                snapshot.forEach((d) => {
                    lista.push({
                        id: d.id,
                        nameAccount: d.data().nameAccount,
                        valor: d.data().valor,
                        vencimento: d.data().vencimento,
                    });
                });
                setContas(lista);
            });
        }
        fetchContas();
    }, [refresh]);

    async function Del(id) {
        const ref = doc(db, "Account", id);
        await deleteDoc(ref)
            .then(() => { toast.success("Excluído com sucesso!"); setRefresh((r) => r + 1); })
            .catch(() => toast.error("Algo deu errado!"));
    }

    return (
        <div className="AccountFixed">
            <Header />
            <div className="view-content">
                <div className="view-header">
                    <h1>Contas Fixas</h1>
                    <span className="view-count">{contas.length} conta{contas.length !== 1 ? "s" : ""}</span>
                </div>

                {contas.length > 0 ? (
                    <div className="renderAccount">
                        {contas.map((item) => (
                            <div className="areaRender" key={item.id}>
                                <div className="render-icon">
                                    <FiCreditCard size={22} color="#f472b6" />
                                </div>
                                <div className="render-info">
                                    <p className="render-name">{item.nameAccount}</p>
                                    <div className="render-details">
                                        <span><FiDollarSign size={13} /> {item.valor}</span>
                                        <span><FiCalendar size={13} /> {item.vencimento}</span>
                                    </div>
                                </div>
                                <button className="btn-delete" onClick={() => Del(item.id)}>
                                    <FiTrash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <FiInbox size={48} color="#334155" />
                        <p>Nenhuma conta cadastrada</p>
                    </div>
                )}
            </div>
        </div>
    );
}
