import React from 'react';
import CheckBox from './CheckBox'

interface ImageBoxType {
    index: number;
    path: string;
    id: number;
    isChecked: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void;
    onDragStart: () => void;
    onDragEnter: () => void;
    onDragEnd: () => void;
}
const ImageBox = ({ index, path, id, isChecked, handleChange, onDragStart, onDragEnter, onDragEnd }: ImageBoxType) => {
    return (
        <div
            draggable
            onDragStart={onDragStart}
            onDragEnter={onDragEnter}
            onDragEnd={onDragEnd}
            onDragOver={(e) => e.preventDefault()}
            className={`${index === 0 ? 'col-span-2 row-span-2' : ''} relative shadow-lg group rounded-xl cursor-move`}>
            <img className='w-full h-full rounded-xl' src={path} alt="image" />
            <div
                className='w-full h-full bg-black absolute top-0 bottom-0 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-40 rounded-xl '>
            </div>
            <CheckBox
                onChange={handleChange}
                id={id}
                boxClass={`${isChecked ? "opacity-100" : ""} absolute opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 top-5 left-5`}
                checked={isChecked}
            />
        </div>
    )
}

export default ImageBox