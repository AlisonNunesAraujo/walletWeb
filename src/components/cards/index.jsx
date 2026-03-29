import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { AuthContext } from "../../context";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebase";
import {
    FiPlusCircle,
    FiList,
    FiCreditCard,
    FiEye,
    FiTrendingUp,
    FiTrendingDown,
    FiDollarSign,
} from "react-icons/fi";

export default function Cards({ data = [], gastos = [], loadingData = false }) {
    const { user } = useContext(AuthContext);
    const [names, setName] = useState([]);
    const navigation = useNavigate();

    useEffect(() => {
        async function getName() {
            try {
                const colRef = collection(db, "users");
                const ref = query(colRef, where("uid", "==", user.user.uid));
                getDocs(ref).then((snapshot) => {
                    let list = [];
                    snapshot.forEach((doc) => {
                        list.push({ id: doc.id, name: doc.data().name });
                        setName(list);
                    });
                });
            } catch {
                console.log("Erro ao buscar nome do usuário");
            }
        }
        getName();
    }, []);

    const parseValue = (val) => {
        if (!val) return 0;
        const cleaned = String(val)
            .replace("R$ ", "")
            .replace(/\./g, "")
            .replace(",", ".");
        return parseFloat(cleaned) || 0;
    };

    const totalReceita = data.reduce((acc, item) => acc + parseValue(item.valor), 0);
    const totalGastos = gastos.reduce((acc, item) => acc + parseValue(item.valor), 0);
    const saldo = totalReceita - totalGastos;

    const formatCurrency = (val) =>
        val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    const actions = [
        {
            label: "Novo Registro",
            desc: "Adicionar receita ou gasto",
            icon: <FiPlusCircle size={26} />,
            route: "/CreateRegister",
            color: "#4ade80",
        },
        {
            label: "Ver Registros",
            desc: "Visualize seu histórico",
            icon: <FiList size={26} />,
            route: "/ViewRegister",
            color: "#60a5fa",
        },
        {
            label: "Conta Fixa",
            desc: "Adicionar conta fixa",
            icon: <FiCreditCard size={26} />,
            route: "/AccountFixed",
            color: "#f472b6",
        },
        {
            label: "Ver Contas Fixas",
            desc: "Visualize suas contas fixas",
            icon: <FiEye size={26} />,
            route: "/ViewAccountFixed",
            color: "#fb923c",
        },
    ];

    return (
        <div className="dashboard">
            <div className="dash-header">
                <div>
                    <h2 className="dash-title">Dashboard</h2>
                    {names.map((item, index) => (
                        <p key={index} className="dash-welcome">
                            Olá, <strong>{item.name}</strong>!
                        </p>
                    ))}
                </div>
                <p className="dash-email">{user.user.email}</p>
            </div>

            <div className="summary-cards">
                <div className="summary-card summary-income">
                    <FiTrendingUp size={22} className="summary-icon" />
                    <div>
                        <p className="summary-label">Receitas</p>
                        <p className="summary-value">{loadingData ? <span className="skeleton">...</span> : formatCurrency(totalReceita)}</p>
                    </div>
                </div>
                <div className="summary-card summary-expense">
                    <FiTrendingDown size={22} className="summary-icon" />
                    <div>
                        <p className="summary-label">Gastos</p>
                        <p className="summary-value">{loadingData ? <span className="skeleton">...</span> : formatCurrency(totalGastos)}</p>
                    </div>
                </div>
                <div className={`summary-card ${saldo >= 0 ? "summary-balance-pos" : "summary-balance-neg"}`}>
                    <FiDollarSign size={22} className="summary-icon" />
                    <div>
                        <p className="summary-label">Saldo</p>
                        <p className="summary-value">{loadingData ? <span className="skeleton">...</span> : formatCurrency(saldo)}</p>
                    </div>
                </div>
            </div>

            <div className="actions-grid">
                {actions.map((action, index) => (
                    <button
                        key={index}
                        className="action-card"
                        onClick={() => navigation(action.route)}
                    >
                        <span className="action-icon" style={{ color: action.color }}>
                            {action.icon}
                        </span>
                        <p className="action-label">{action.label}</p>
                        <p className="action-desc">{action.desc}</p>
                    </button>
                ))}
            </div>
        </div>
    );
}

