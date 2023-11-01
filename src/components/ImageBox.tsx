import CheckBox from './CheckBox'

interface ImageBoxType {
    index: number;
    path: string;
    id: number;
    isChecked: boolean;
}
const ImageBox = ({ index, path, id, isChecked }: ImageBoxType) => {
    return (
        <div className={`${index === 0 ? 'col-span-2 row-span-2' : ''} relative shadow-lg group rounded-xl`}>
            <img className='w-full rounded-xl' src={path} alt="image" />
            <div className='w-full h-full bg-black absolute top-0 bottom-0 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-40 rounded-xl '>
            </div>
            <CheckBox
                id={id}
                boxClass={`${isChecked ? "opacity-100" : ""} absolute opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 top-5 left-5`}
                checked={isChecked}
            />
        </div>
    )
}

export default ImageBox