import "./style.css";
import { doc, getDocs, where, query, collection, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../services/firebase";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context";
import Header from "../../components/header";
import { FiTrash2, FiTrendingUp, FiTrendingDown, FiInbox } from "react-icons/fi";

export default function ViewRegister() {
    const { user } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [gastos, setGastos] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchReceita() {
            const uid = user.user.uid;
            const ref = collection(db, "receita");
            const receitaQuery = query(ref, where("uid", "==", uid));
            const snapshot = await getDocs(receitaQuery);
            let lista = [];
            snapshot.forEach((doc) => {
                lista.push({ id: doc.id, valor: doc.data().valor, date: doc.data().date });
            });
            return lista;
        }

        async function fetchGastos() {
            const uid = user.user.uid;
            const ref = collection(db, "gastos");
            const gastosQuery = query(ref, where("uid", "==", uid));
            const snapshot = await getDocs(gastosQuery);
            let lista = [];
            snapshot.forEach((doc) => {
                lista.push({ id: doc.id, valor: doc.data().valor, date: doc.data().date });
            });
            return lista;
        }

        setLoading(true);
        Promise.all([fetchReceita(), fetchGastos()]).then(([receitas, gastosList]) => {
            setData(receitas);
            setGastos(gastosList);
            setLoading(false);
        });
    }, [refresh]);

    async function Deletar(id) {
        const ref = doc(db, "receita", id);
        await deleteDoc(ref)
            .then(() => { toast.success("Excluído com sucesso!"); setRefresh((r) => r + 1); })
            .catch(() => toast.error("Algo deu errado!"));
    }

    async function DeletarGastos(id) {
        const ref = doc(db, "gastos", id);
        await deleteDoc(ref)
            .then(() => { toast.success("Excluído com sucesso!"); setRefresh((r) => r + 1); })
            .catch(() => toast.error("Algo deu errado!"));
    }

    return (
        <div className="viewRegister">
            <Header />
            <div className="view-content">
                <div className="view-header">
                    <h1>Meus Registros</h1>
                </div>

                {loading ? (
                    <div className="view-loading">
                        <p>Carregando registros...</p>
                    </div>
                ) : (
                    <div className="view-columns">
                        <div className="view-column">
                            <div className="column-title income">
                                <FiTrendingUp size={18} />
                                <span>Receitas</span>
                                <span className="column-count">{data.length}</span>
                            </div>
                            {data.length > 0 ? (
                                data.map((item) => (
                                    <div key={item.id} className="register-item income-item">
                                        <div className="item-info">
                                            <p className="item-valor">{item.valor}</p>
                                            <p className="item-date">{item.date}</p>
                                        </div>
                                        <button className="btn-del" onClick={() => Deletar(item.id)}>
                                            <FiTrash2 size={15} />
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="empty-col">
                                    <FiInbox size={32} color="#334155" />
                                    <p>Nenhuma receita</p>
                                </div>
                            )}
                        </div>

                        <div className="view-column">
                            <div className="column-title expense">
                                <FiTrendingDown size={18} />
                                <span>Gastos</span>
                                <span className="column-count">{gastos.length}</span>
                            </div>
                            {gastos.length > 0 ? (
                                gastos.map((item) => (
                                    <div key={item.id} className="register-item expense-item">
                                        <div className="item-info">
                                            <p className="item-valor">{item.valor}</p>
                                            <p className="item-date">{item.date}</p>
                                        </div>
                                        <button className="btn-del" onClick={() => DeletarGastos(item.id)}>
                                            <FiTrash2 size={15} />
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="empty-col">
                                    <FiInbox size={32} color="#334155" />
                                    <p>Nenhum gasto</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
