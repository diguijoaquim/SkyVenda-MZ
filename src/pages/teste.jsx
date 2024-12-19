import { useState } from "react";
import AlertDialog from "../components/Dialogs/AlertDialog";
export default function Teste() {
    const [alert,setAlert]=useState(false)
 return (
   <div className="flex justify-center items-center h-[100vh]">
    <AlertDialog title={"Meu Dialog"} content={(<div>
        <h1>oi tudo bem aqui</h1>
        <h1>oi tudo bem aqui</h1>
        <h1>oi tudo bem aqui</h1>
        <h1>oi tudo bem aqui</h1>
    </div>)} actions={(<button>enviar</button>)} open={alert}/>

        <button className="bg-indigo-400 rounded-md py-2 px-3 border
         hover:bg-indigo-600 text-black hover:text-white" onClick={()=>setAlert(true)}>OpenDialog</button>
         
   </div>
   
 );
}