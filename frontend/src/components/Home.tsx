import Getlsit from "./Getlist";
import axios from "axios";
import { useState, useEffect } from "react";
import Postlist from "./Postlist";
import { HashLoader} from "react-spinners";
export default function Home(){
    const [list, setlist] = useState([]);
    const [listopen, setlistopen] = useState(false);
    const[loading, setloading] = useState(false);
    const fletchdata = async ()=>{
        setloading(true);
            try{
                const res = await axios.get(`${import.meta.env.VITE_APP_URL}/get`);
                setlist(res.data.list);
            }catch(err){
                console.log(err);
            }finally{
                setloading(false);
            }
        }

    useEffect(()=>{
        fletchdata();
    },[])

    return(
        <>
        {
        loading && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
            <HashLoader color="white" size={40} />
        </div>
        )}
        <div className=" flex flex-col items-center  mt-10">
            <h1 className="font-bold text-3xl sm:text-5xl text-red-500 text-center">To Do List</h1>

            <button  className="font-bold text-xl sm:text-3xl px-6 py-3 sm:px-16 sm:py-6 bg-violet-200 rounded-3xl mt-6 mb-6 hover:bg-violet-300 active:bg-violet-400 transition" onClick={()=>{setlistopen(true)}}>Add list</button>
            <Postlist listopen={listopen} setlistopen={setlistopen} reload={fletchdata} ></Postlist>
            <div className="flex flex-col gap-4 w-full sm:w-[85%] max-w-[1100px]">
            {list.map((list, index)=>(
                <Getlsit
                    key={index}
                    item={list}
                    index={index}
                    reload={fletchdata}
                />
            ))
            }
            </div>
        </div>
        </>
    )
}