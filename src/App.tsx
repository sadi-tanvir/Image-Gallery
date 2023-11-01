import { useEffect, useState } from "react";
import { ImageIcon, ImageUrls } from "./components/ImageUrls";
import ImageBox from "./components/ImageBox";
import CheckBox from "./components/CheckBox";

type ImageType = {
  id: number;
  path: string;
  isChecked: boolean
}

function App() {
  const [imageUrls, setImageUrls] = useState<ImageType[]>(ImageUrls)
  const [filteredImageUrl, setFilteredImageUrl] = useState<ImageType[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const { checked } = e.target;
    let changedData: ImageType[];
    if (id === 555) {
      changedData = imageUrls.map(image => {
        image.isChecked = true;
        return image;
      });
    } else {
      changedData = imageUrls.map(image => {
        if (image.id === id) image.isChecked = checked;
        return image;
      });
    }

    setImageUrls(changedData);
  };

  useEffect(() => {
    const filteredData = imageUrls.filter(image => image.isChecked === true);
    setFilteredImageUrl(filteredData)
  }, [imageUrls])

  return (
    <div className="container mx-auto flex flex-col justify-center items-center pt-5 pb-10">
      <div className='container flex justify-between items-center px-5'>
        {filteredImageUrl.length > 0 ?
          <div className='flex justify-center items-center'>
            <CheckBox
              checked={true}
              labelContent={`${filteredImageUrl.length} Files Selected`}
            />

            <CheckBox
              onChange={handleChange}
              id={555}
              checked={imageUrls.length > 0 ? filteredImageUrl.length >= imageUrls.length : false}
              labelContent='Select All'
              boxClass='ml-5'
            />
          </div>
          :
          <h1 className='text-slate-600 font-bold text-2xl'>Gallery</h1>
        }
        <div>
          <button className='text-red-500 font-bold text-lg'>Delete files</button>
        </div>
      </div>
      <hr className="w-full h-[2px] my-2 bg-gray-300 border-red-100" />
      <div className='grid grid-cols-2 md:grid-cols-5 gap-5 px-5'>
        {
          imageUrls.map((elem, index) => {
            const { id, isChecked, path } = elem;
            return <ImageBox
              key={index}
              index={index}
              id={id}
              isChecked={isChecked}
              path={path}
              handleChange={handleChange}
            />
          })
        }

        <div className='w-full min-h-[150px] sm:w-full flex flex-col justify-center items-center cursor-pointer bg-white border-dashed border-[1.5px] border-gray-400 rounded-xl'>
          <ImageIcon />
          <h1 className='text-xl font-semibold text-gray-600'>Add Image</h1>
        </div>
      </div>
    </div>
  );
}

export default App;