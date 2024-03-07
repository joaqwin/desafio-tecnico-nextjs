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
            if (error.status === 404) return <div>Failed to load</div>
         
            if (key === '/api/user') return
         
            if (retryCount >= 2) return  alert('We are having some problems... Please refresh')
         
            setTimeout(() => revalidate({ retryCount }), 5000)
          }
        })

    const { mutate } = useSWRConfig()
    
    const handleChange = (event: any) => {
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
        <section className='grid place-content-center'>
            <div className="object-left flex justify-center mx-auto max-w-sm">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray">
                    Filtra por userID
                    <input name='Filtro' value={val} onChange={handleChange} onKeyUp={handleKeyUp} type='number' placeholder="Escribe aquí la ID que deseas buscar" className="w-full sw-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"/>
                </label>
            </div>
            <div className="flex pt-3 md:p-6 lg:mb-0 lg:min-h-0 lg:min-w-0 max-h-screen max-w-screen-md">
                <div className="h-full w-full lg:flex-1 px-3 min-h-0 min-w-0">

                    <div className="w-full h-full min-h-0 min-w-0 overflow-auto">
                {  
                    data.map((item: any, index: any) => (
                    <Cards key={index} title={item.title} body={item.body}></Cards>
                 ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
