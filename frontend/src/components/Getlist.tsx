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
export default function Getlsit({item, index}:any) {
    const [upopen, setupdate] = useState(false);
    const [completed, setcompleted] = useState(false);
    const ondelete = async()=>{

        try{
            await axios.delete(`${import.meta.env.VITE_APP_URL}/delete/${item._id}`);
            window.location.reload()
        }catch(err){
            console.log(err);
        }
    }

    return (<>
     <div className="flex bg-blue-300 w-full max-w-[1200px] mx-auto py-6 sm:py-10 rounded-lg justify-around items-center px-4">

    {/* LEFT */}
    <div className="flex flex-col gap-2">
    <div className="w-6 sm:w-10 text-center font-bold text-sm sm:text-base">
        {index + 1}
    </div>
    
    <input type="checkbox"  onChange={()=>{setcompleted(!completed)}}></input>


    <div className={completed? "line-through text-gray-500  w-6 sm:w-10 text-center  text-sm sm:text-base" :"w-6 sm:w-10 text-center font-bold text-sm sm:text-base"} >
        {item.time}
    </div>
    </div>

    {/* MIDDLE */}
    <div className="flex-1 px-2 sm:px-4">
        <h1 className={completed ? "line-through text-gray-500 text-base sm:text-2xl " : "font-bold text-base sm:text-2xl text-green-700"}>
            {item.name}
        </h1>
        <h1 className={completed? " line-through text-gray-500 text-sm sm:text-2xl" : "text-sm sm:text-2xl text-gray-800"}>
            {item.description}
        </h1>
    </div>

    {/* RIGHT */}
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-[140px] sm:w-[200px] justify-end mr-5 sm:mr-5">

        <button onClick={ondelete} className="bg-red-700 text-white text-xs sm:text-sm px-3 sm:px-5 py-2 sm:py-4 rounded-4xl hover:bg-red-400 active:bg-red-900">
            delete
        </button>

        <button onClick={()=>{setupdate(true)} } className="bg-blue-700 text-white text-xs sm:text-sm px-3 sm:px-5 py-2 sm:py-4 rounded-4xl hover:bg-blue-400 active:bg-blue-900">
            update
        </button>
        <Updatelist upopen={upopen} setupdate={setupdate} item={item}></Updatelist>

    </div>

</div>


    </>)
}