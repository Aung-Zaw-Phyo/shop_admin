import React from 'react'
import Link from 'next/link';
import { Divider } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type Data = {
    count: number,
    title: string,
    route: string
}

const DataCard = (data: Data) => {
    return (
        <div className="bg-white rounded p-3 shadow-sm">
            <div className="text-xl mb-3">{data.title}</div>
            <div className='text-2xl'>{data.count}</div>
            <Divider className='!my-2' />
            <Link href={`/${data.route}`}>
                <div className='flex justify-between items-center'>
                    <span>View</span>
                    <ArrowForwardIosIcon fontSize='small' className='text-[#333333cb]' />
                </div>
            </Link>
        </div>
    )
}

export default DataCard