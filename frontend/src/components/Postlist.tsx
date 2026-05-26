import { useState } from "react"
import axios from "axios";

export default function Postlist({listopen, setlistopen}:any){
    const [list, setlist] = useState({
        name:"",
        description:"",
        time:""
    })

    const sub = async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try{
            await axios.post(`${import.meta.env.VITE_APP_URL}/post`, list);
            setlistopen(false);

            window.location.reload()

        }catch(err){
            console.log(err)
        }
    }
     

    const handler = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;
        setlist((prev)=>{
            return{...prev, [name] : value}
        })
    }

    
  

    return(

    listopen && <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
    <div className="relative flex bg-gray-200 w-[500px] justify-center p-8 rounded-4xl">
        <div className="absolute top-4 right-4">
            <button onClick={()=>setlistopen(false)}>X</button>
            
        </div>
        <form className="flex flex-col gap-1" onSubmit={sub}>
        <label className="font-bold text-4xl">Title:</label><input onChange={handler} type="text" name="name" placeholder="enter your task" className="border text-3xl border-black p-1 px-5 py-5 rounded-4xl"></input><br></br>
        <label className="font-bold text-4xl">Description:</label><input onChange={handler}  name="description" type="text" placeholder="enter descreiption" className=" text-3xl px-5 py-5 border border-black p-1 rounded-4xl"></input><br></br>
        <label className="font-bold text-4xl">Start Time:</label><input type="text" onChange={handler} name="time" placeholder="eg: 8:00 AM" className="border px-5 text-3xl py-5 border-black p-1 rounded-4xl"></input>
        <button className="bg-green-600 text-white py-5 rounded-4xl hover:bg-green-700">
                        Submit</button>
        </form>
        </div>
    </div>
    )
}