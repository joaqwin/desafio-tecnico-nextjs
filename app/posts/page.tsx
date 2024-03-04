'use client'

import { useState } from "react"
import Cards from "../components/Cards"
import useSWR from "swr"

const fetcher = async (url: string) => {
    const res = await fetch(url)
    const data = await res.json()
    return data
}


export default function Page(){
    let urlFija = 'https://jsonplaceholder.typicode.com/posts'
    let url = 'https://jsonplaceholder.typicode.com/posts'
    let url2 = ''
    const [val, setVal] = useState("")
    const [url1, setUrl1] = useState('');

    const change = (event: any) => {
        

        setVal(event.target.value)
        url2 = `https://jsonplaceholder.typicode.com/posts?userId=${val}`
        setUrl1(url2)
    }
    if (url1.length > 0) url = url1
    else url = urlFija
    console.log(url)
    const {data, error} = useSWR('/posts', () => fetcher(url), { refreshInterval: 10 } )

    if(error) return <div>Failed to load</div>
    if(!data) return (
        <div className="flex justify-center items-center h-screen">
            <div className="rounded-full h-20 w-20 bg-violet-800 animate-ping"></div>
        </div>
    )

    return (
        <section className='flex'>
            <div>
            {  
                data.map((item: any, index: any) => (
                <Cards key={index} title={item.title} body={item.body}></Cards>
            ))}
            </div>
            <div>
                <label>
                    Filtra por userID
                    <input name='Filtro' value={val} onChange={change} type='number' placeholder="type here your filter"/>
                </label>
                <p>Hola, {val}</p>
            </div>
        </section>
    )
}
