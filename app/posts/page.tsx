import { Suspense } from "react"
import Cards from "../components/Cards"

export default async function Page(){
    console.log('hola')
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const json = await res.json()
    return (
    <section>
        {json.map((item, index) => (
            <Cards key={index} title={item.title} body={item.body}></Cards>
        ))
        }
    </section>    
        
    );
}