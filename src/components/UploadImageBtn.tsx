import React from 'react'
import { ImageIcon } from './Icons'

const UploadImageBtn = () => {
    return (
        <div className='w-full min-h-[150px] sm:min-h-[170px] md:min-h-[200px] flex flex-col justify-center items-center cursor-pointer bg-white border-dashed border-[1.5px] border-gray-400 rounded-xl'>
            <ImageIcon />
            <h1 className='text-xl font-semibold text-gray-600'>Add Image</h1>
        </div>
    )
}

export default UploadImageBtn