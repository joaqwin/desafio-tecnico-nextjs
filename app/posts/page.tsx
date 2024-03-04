'use client'

import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import useSWR, { useSWRConfig } from "swr";
import { useDebounce } from 'use-debounce';

const fetcher = async (url: string) => {
    const res = await fetch(url)
    const data = await res.json()
    return data
}


export default function Page(){
    const [val, setVal] = useState("")
    const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts');

    const {data, error} = useSWR('/posts', () => fetcher(url))
    const { mutate } = useSWRConfig()

    const change = (event: any) => {
        setVal(event.target.value)
    }

    useEffect(() => {
        if(val != '') setUrl(`https://jsonplaceholder.typicode.com/posts?userId=${val}`)
        else setUrl('https://jsonplaceholder.typicode.com/posts')
        mutate('/posts')
        console.log(url)      
    })
    console.log('esta render')


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
