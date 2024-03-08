import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="grid place-content-center space-y-32">
      
      <div className="my-32">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-8xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Desafío</span> Técnico</h1>
        <p className="text-lg font-normal text-gray-500 lg:text-2xl dark:text-gray-400">Para ir al repositorio de github has click <a className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400" href='https://github.com/joaqwin/desafio-tecnico-nextjs'>aquí</a></p>
      </div>
      <div className="flex justify-center">
        <Link href="/posts">
          <button type="button" className="text-white bg-gradient-to-r md:text-2xl lg:text-4xl from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Posts</button>
        </Link>
      </div>

    </main>
  );
}
