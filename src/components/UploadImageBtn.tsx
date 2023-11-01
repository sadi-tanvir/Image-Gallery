import { ImageIcon } from './Icons'

const UploadImageBtn = ({ setRefetchImages, refetchImages }: { setRefetchImages: (args: boolean) => void, refetchImages: boolean }) => {
    return (
        <div onClick={() => setRefetchImages(!refetchImages)} className='w-full min-w-[150px] min-h-[150px] flex flex-col justify-center items-center cursor-pointer bg-white border-dashed border-[1.5px] border-gray-400 rounded-xl'>
            <ImageIcon />
            <h1 className='text-xl font-semibold text-gray-600'>Add Image</h1>
        </div>
    );
};

export default UploadImageBtn;