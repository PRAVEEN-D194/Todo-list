import Getlsit from "./Getlist";
import axios from "axios";
import { useState, useEffect } from "react";
import Postlist from "./Postlist";
export default function Home(){
    const [list, setlist] = useState([]);
    const [listopen, setlistopen] = useState(false);

    const fletchdata = async ()=>{
            try{
                const res = await axios.get(`${import.meta.env.VITE_APP_URL}/get`);
                setlist(res.data.list);
            }catch(err){
                console.log(err);
            }
        }

    useEffect(()=>{
        fletchdata();
    },[])

    return(
        <>
        <div className=" flex flex-col items-center  mt-10">
            <h1 className="font-bold text-3xl sm:text-5xl text-red-500 text-center">To Do List</h1>

            <button  className="font-bold text-xl sm:text-3xl px-6 py-3 sm:px-16 sm:py-6 bg-violet-200 rounded-3xl mt-6 mb-6 hover:bg-violet-300 active:bg-violet-400 transition" onClick={()=>{setlistopen(true)}}>Add list</button>
            <Postlist listopen={listopen} setlistopen={setlistopen}></Postlist>
            <div className="flex flex-col sm:flex-row bg-blue-300 sm:w-[65%] w-[95%] max-w-[1200px] mx-auto p-2 sm:p-2 rounded-lg gap-4">
            {list.map((list, index)=>(
                <Getlsit
                    key={index}
                    item={list}
                    index={index}
                />
            ))
            }
            </div>
        </div>
        </>
    )
}