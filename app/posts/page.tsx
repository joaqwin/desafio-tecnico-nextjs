'use client'

import Cards from "../components/Cards"
import useSWR from "swr"

const fetcher = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await res.json()
    return data
}

export default async function Page(){
    const {data, error} = useSWR('/posts', fetcher)

    if(error) return <div>Failed to load</div>
    if(!data) return (
        <div className="flex justify-center items-center h-screen">
            <div className="rounded-full h-20 w-20 bg-violet-800 animate-ping"></div>
        </div>
    )
    return (
        <section>
            {data.map((item: any, index:any) => (
                    <Cards key={index} title={item.title} body={item.body}></Cards>
                )
            )}
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