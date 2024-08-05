import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='m-10'>
            <p className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider text-gray-400">Not Found!</p>
            <p className="text-4xl md:text-lg lg:text-4xl font-bold tracking-wider text-gray-400 mt-3 mb-12">Could not find requested resource</p>
            <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded transition duration-150" title="Return Home">
                <span>Return Home</span>
            </Link>
        </div >
    )
}