
import { useState } from "react"
import axios from "axios";



export default function Updatelist({ upopen, setupdate, item, reload}: any) {

    const [list, setlist] = useState({
        name: item.name,
        description: item.description,
        time:item.time,
    })

    const handler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setlist((prev) => {
            return { ...prev, [name]: value }
        })
    }

    const sub = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await axios.put(`${import.meta.env.VITE_APP_URL}/update/${item._id}`, list);
            setupdate(false);
            reload();
        } catch (err) {
            console.log(err)
        }
    }




    return (<>
       { upopen && <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="relative flex bg-gray-200 w-[500px] justify-center p-8 rounded-4xl">
                <div className="absolute top-4 right-4 ">
                    <button onClick={() => { setupdate(false) }} className="text-3xl text-gray-400">X</button>

                </div>
                <form className="flex flex-col gap-1" onSubmit={sub}>
                    <label className="font-bold  text-4xl">Title:</label><input onChange={handler} value={list.name} type="text" name="name" placeholder="enter your task" className="text-3xl px-5 py-5 border border-black p-1 rounded-4xl"></input><br></br>
                    <label className="font-bold  text-4xl">Description:</label><input onChange={handler} value={list.description} name="description" type="text" placeholder="enter descreiption" className="text-3xl px-5 py-5 border border-black p-1 rounded-4xl"></input><br></br>
                    <label className="font-bold  text-4xl">Start Time:</label><input type="text" onChange={handler} name="time" value={list.time} placeholder="eg: 8:00 AM" className="border border-black p-1 rounded-4xl text-3xl px-5 py-5"></input>
                   
                    <button type="submit" className="bg-green-600 text-white py-5 rounded-4xl hover:bg-green-700">
                        Update</button>
                </form>
            </div>
        </div>}
    </>)
}