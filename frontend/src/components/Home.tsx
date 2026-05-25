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
            <h1 className="font-bold text-5xl text-red-500 ">To Do List</h1>

            <button  className=" font-bold text-5xl  text-gree-500 px-20 py-10 bg-violet-200 rounded-4xl mt-10 mb-10 sm:px10 sm:py-5" onClick={()=>{setlistopen(true)}}>Add list</button>
            <Postlist listopen={listopen} setlistopen={setlistopen}></Postlist>
            <div className="flex flex-col gap-4 place-items-center ">
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