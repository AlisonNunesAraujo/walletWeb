import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext({});

import { auth } from "../services/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

import { useNavigate } from "react-router-dom";

export function Context({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
      async function VerUser(){
       const storage = localStorage.getItem('loadUser@')

        if(storage){
          setUser(JSON.parse(storage))
        }
      }

      VerUser();
  },[])


  async function RegisterUser(email, senha) {
    try {
      const data = await createUserWithEmailAndPassword(auth, email, senha);
      localStorage.setItem('loadUser@', JSON.stringify(data))
      navigate('/Home')
      alert("ok");
    } catch (err) {
      console;
      log(err);
    }
  }

  async function LogarUser(email, senha) {
    try {
      const data = await signInWithEmailAndPassword(auth, email, senha);
      alert("ok");
      setUser(data);
      localStorage.setItem('loadUser@', JSON.stringify(data))
      navigate('/Home')
    } catch (err) {
      alert(err);
    }
  }

 async function LogOut(){
  signOut(auth)
  .then(()=> {
    alert('sair')
    setUser(null)
    localStorage.removeItem('loadUser@')
  })
  .catch((e)=>{
    alert('deu algum erro', e)
  })
 }


  return (
    <AuthContext.Provider value={{ signed: !!user, user,RegisterUser, LogarUser, LogOut }}>
      {children}
    </AuthContext.Provider>
  );
}
