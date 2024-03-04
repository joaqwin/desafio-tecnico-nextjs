'use client'

import { useState } from "react"
import Cards from "../components/Cards"
import useSWR from "swr"

const fetcher = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await res.json()
    return data
}


export default function Page(){
    const [val, setVal] = useState("")

    const change = (event: any) => {
        
        event.preventDefault()
        setVal(event.target.value)
    }

    const {data, error} = useSWR('/posts', fetcher)

    if(error) return <div>Failed to load</div>
    if(!data) return (
        <div className="flex justify-center items-center h-screen">
            <div className="rounded-full h-20 w-20 bg-violet-800 animate-ping"></div>
        </div>
    )
    return (
        <section className='flex'>
            <div>
                {data.map((item: any, index:any) => (
                        <Cards key={index} title={item.title} body={item.body}></Cards>
                    )
                )}
            </div>
            <div>
                <label>
                    Filtra por userID
                    <input name='Filtro' value={val} onChange={change} placeholder="type here your filter"/>
                </label>
                <p>Hola, {val}</p>
            </div>
        </section>
    )
}

 /*return (
    <section>
        {json.map((item: any, index: any) => (
            <Cards key={index} title={item.title} body={item.body}></Cards>
        ))
        }
    </section>
        
    );*/

