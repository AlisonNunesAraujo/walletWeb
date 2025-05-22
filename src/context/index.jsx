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

export function Context({ children }) {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        localStorage.setItem("@user", JSON.stringify(user));
      } else {
        setUser(null);
        localStorage.removeItem("@user");
      }

    });
    return () => unsubscribe();



  }, []);

  async function RegisterUser(data) {
    setLoading(true);
    try {
      const { email, senha } = data;
      const response = await createUserWithEmailAndPassword(auth, email, senha);

      toast.success("Conta craida com sucesso!");
      navigate("/Home");
      localStorage.setItem("@user", JSON.stringify(response.user)); // Persiste o usuário
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error("Tente Novamente");
    }
  }

  async function LogarUser(data) {
    setLoading(true);
    try {
      const { email, senha } = data;
      const response = await signInWithEmailAndPassword(auth, email, senha);
      toast.success("Bem Vindo!");
      setUser(response);
      setLoading(false);
      navigate("/Home");
      localStorage.setItem("@user", JSON.stringify(response.user)); // Persiste o usuário
    } catch (err) {
      toast.error("Tente novamente!");
      setLoading(false);
    }
  }

  async function LogOut() {
    signOut(auth)
      .then(() => {
        toast.success("Você saiu da conta!");
        setUser(null);
        localStorage.removeItem("@user");
      })
      .catch((e) => {
        alert("deu algum erro", e);
      });
  }

  async function PostName() {
    try {
      const data = await addDoc(collection(db, 'users'), {
        name: 'Teste'
      })
      toast.success("Seu nome foi adicionado com sucesso!");
    }
    catch (err) {
      toast.error("Algo deu errado!");
    }
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, RegisterUser, LogarUser, LogOut, loading, PostName }}
    >
      {children}
    </AuthContext.Provider>
  );
}
