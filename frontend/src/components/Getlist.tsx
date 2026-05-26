import axios from "axios";

import { useState } from "react";
import Updatelist from "./Updatelist";
// interface item {
//     _id:String,
//     name:String,
//     description:String,
// }
// interface prop{
//     item:item,
//     index:number
// }
export default function Getlsit({item, index, reload}:any) {
    const [upopen, setupdate] = useState(false);
    const [completed, setcompleted] = useState({
        completed:item.completed,
    });
    const ondelete = async()=>{

        try{
            await axios.delete(`${import.meta.env.VITE_APP_URL}/delete/${item._id}`);
            reload();
        }catch(err){
            console.log(err);
        }
    }

    const oncheck = async()=>{
        console.log("jello")
        console.log(completed)
        const updatevalue = !completed.completed
        setcompleted({
            completed:updatevalue
        })
        console.log(completed)
        try{
            await axios.put(`${import.meta.env.VITE_APP_URL}/updatecompleted/${item._id}`, {completed : updatevalue})
        }catch(err){
            console.log(err);    
        }
    }

    return (<>
    <div className="flex flex-col sm:flex-row justify-between bg-blue-200 w-full rounded-2xl p-4 sm:p-6 gap-5 shadow-md overflow-hidden">

    {/* LEFT */}
    <div className="flex items-start gap-3 sm:gap-5 shrink-0">

        <div className="font-bold text-base sm:text-xl min-w-[30px] text-center">
            {index + 1}
        </div>

        <button
            className="text-xl"
            onClick={oncheck}
        >
            {completed.completed ? "✅" : "🔲"}
        </button>

        <div
            className={
                completed.completed
                    ? "line-through text-gray-500 text-sm sm:text-lg"
                    : "text-sm sm:text-lg font-semibold"
            }
        >
            {item.time}
        </div>
    </div>

    {/* MIDDLE */}
    <div className="flex-1 min-w-0 break-words">

        <h1
            className={
                completed.completed
                    ? "line-through text-gray-500 text-lg sm:text-2xl break-words"
                    : "font-bold text-green-700 text-lg sm:text-2xl break-words"
            }
        >
            {item.name}
        </h1>

        <p
            className={
                completed.completed
                    ? "line-through text-gray-500 text-sm sm:text-lg mt-1 break-words"
                    : "text-gray-800 text-sm sm:text-lg mt-1 break-words"
            }
        >
            {item.description}
        </p>
    </div>
{/* RIGHT */}
<div className="w-full sm:w-[220px] shrink-0">

    <div className="grid grid-cols-2 gap-3 sm:flex">

        <button
            onClick={ondelete}
            className="w-full bg-red-700 text-white text-sm sm:text-base px-4 py-2 sm:px-5 sm:py-3 rounded-xl hover:bg-red-500 active:bg-red-900 transition"
        >
            Delete
        </button>

        <button
            onClick={() => {
                setupdate(true);
            }}
            className="w-full bg-blue-700 text-white text-sm sm:text-base px-4 py-2 sm:px-5 sm:py-3 rounded-xl hover:bg-blue-500 active:bg-blue-900 transition"
        >
            Update
        </button>

    </div>

    <Updatelist
        upopen={upopen}
        setupdate={setupdate}
        item={item}
        reload={reload}
    />

</div>

</div>


    </>)
}