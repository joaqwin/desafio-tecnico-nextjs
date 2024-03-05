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
    const [debounced] = useDebounce(val, 500)

    const { data, error, isValidating} = useSWR('/posts', () => fetcher(url), {
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
            // Never retry on 404.
            if (error.status === 404) return <div>Failed to load</div>
         
            // Never retry for a specific key.
            if (key === '/api/user') return
         
            // Only retry up to 10 times.
            if (retryCount >= 2) return  alert('We are having some problems... Please refresh')
         
            // Retry after 5 seconds.
            setTimeout(() => revalidate({ retryCount }), 5000)
          }
        })

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
    if(isValidating) return (
        <div className="flex justify-center items-center h-screen">
            <h1>Loading..........</h1>
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
