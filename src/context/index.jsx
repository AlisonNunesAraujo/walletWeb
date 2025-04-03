import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext({});

import { auth } from "../services/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function Context({ children }) {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function VerUser() {
      try {
        const user = localStorage.getItem("@user");
        if (user) {
          setUser(JSON.parse("@user"));
        }
        return;
      } catch {
        setUser(null);
      }
    }
    VerUser();
  }, []);

  async function RegisterUser(data) {
    setLoading(true);
    try {
      const { email, senha } = data;
      const response = await createUserWithEmailAndPassword(auth, email, senha);

      toast.success("Conta craida com sucesso!");
      navigate("/Home");

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
      localStorage.setItem("@user", JSON.stringify(response.user));
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
      })
      .catch((e) => {
        alert("deu algum erro", e);
      });
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, RegisterUser, LogarUser, LogOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
