import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext({});
import { auth } from "../services/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../services/firebase";

export function Context({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({ user: firebaseUser });
      } else {
        setUser(null);
      }
      setLoadingUser(false);
    });
    return () => unsubscribe();
  }, []);

  async function RegisterUser(data) {
    setLoading(true);
    try {
      const { email, senha, name } = data;
      const response = await createUserWithEmailAndPassword(auth, email, senha);
      toast.success("Conta criada com sucesso!");
      navigate("/Home");
    } catch (err) {
      toast.error("Tente Novamente");
    } finally {
      setLoading(false);
    }
  }

  async function LogarUser(data) {
    setLoading(true);
    try {
      const { email, senha } = data;
      await signInWithEmailAndPassword(auth, email, senha);
      toast.success("Bem Vindo!");
      navigate("/Home");
    } catch (err) {
      toast.error("Email ou senha incorretos!");
    } finally {
      setLoading(false);
    }
  }

  async function LogOut() {
    signOut(auth)
      .then(() => {
        toast.success("Você saiu da conta!");
        setUser(null);
        navigate("/");
      })
      .catch(() => {
        toast.error("Erro ao sair da conta!");
      });
  }

  if (loadingUser) {
    return (
      <div style={{
        width: "100%",
        height: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0c0f17",
        color: "#64748b",
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: "16px",
        gap: "12px",
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 1s linear infinite" }}>
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        Carregando...
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, RegisterUser, LogarUser, LogOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
