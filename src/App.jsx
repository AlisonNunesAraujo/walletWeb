
import { BrowserRouter } from "react-router-dom"
import { Routs } from "./routs/routs"
import { Context } from "./context"

import  'react-toastify/dist/ReactToastify.css' ;

import {  ToastContainer }  from  'react-toastify' ; 

function App() {
  return (
    <BrowserRouter>
      <Context>
        <ToastContainer autoClose={1000}/>
        <Routs/>
      </Context>
    </BrowserRouter>
  )
}

export default App
