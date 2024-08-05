'use client'
import Link from 'next/link'
export default function error({ error }: { error: any }) {
    console.log(error)
    return (
        <div className='m-10'>
            <p className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider text-gray-400">OOPS!</p>
            <p className="text-4xl md:text-lg lg:text-4xl font-bold tracking-wider text-gray-400 mt-2">Something Went Wrong</p>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-500 my-12">
                We Will fix this later!
            </p>
            <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded transition duration-150" title="Return Home">
                <span>Return Home</span>
            </Link>
        </div >
    )
}
