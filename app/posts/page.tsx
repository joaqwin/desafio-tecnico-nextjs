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
    const [debounced] = useDebounce(val, 1000)

    const {data, error} = useSWR('/posts', () => fetcher(url))
    const { mutate } = useSWRConfig()
    
    const change = (event: any) => {
        setVal(event.target.value)
        
    }
    const handleKeyUp = (event: any) => {
        if(val != '') setUrl(`https://jsonplaceholder.typicode.com/posts?userId=${Number(val)}`)
        else setUrl('https://jsonplaceholder.typicode.com/posts')
    }

    useEffect(() => {
        mutate('/posts')
        console.log(url)    
    }, [debounced])

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
                    <input name='Filtro' value={val} onChange={change} onKeyUp={handleKeyUp} type='number' placeholder="type here your filter"/>
                </label>
                <p>Hola, {debounced}</p>
            </div>
        </section>
    )
}
