import { useEffect, useState } from "react";
import ImageBox from "./components/ImageBox";
import CheckBox from "./components/CheckBox";
import UploadImageBtn from "./components/UploadImageBtn";

type ImageType = {
  id: number;
  path: string;
  isChecked: boolean;
};

function App() {
  // states
  const [imageUrls, setImageUrls] = useState<ImageType[]>([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState<ImageType[]>([]);
  const [dragItem, setDragItem] = useState<any>(null);
  const [dragOverItem, setDragOverItem] = useState<any>(null);


  // handle check box value
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const { checked } = e.target;
    let changedData: ImageType[];
    if (id === 555) {
      // all Images select
      changedData = imageUrls.map(image => {
        image.isChecked = true;
        return image;
      });
    } else {
      // single Image select
      changedData = imageUrls.map(image => {
        if (image.id === id) image.isChecked = checked;
        return image;
      });
    };

    setImageUrls(changedData);
  };

  // delete Images function
  const handleDeleteImage = () => {
    const remainingImages = imageUrls.filter(image => !selectedImageUrl.includes(image));
    setImageUrls(remainingImages);
  };

  // sort images
  const handleSort = () => {
    let clonedItems = [...imageUrls];
    const draggedItemContent = clonedItems.splice(dragItem, 1)[0];
    // switch the position
    clonedItems.splice(dragOverItem, 0, draggedItemContent)
    // refill urls
    setImageUrls(clonedItems);
    // reset value
    setDragItem(null);
    setDragOverItem(null);
  }


  // update selected items list
  useEffect(() => {
    const filteredData = imageUrls.filter(image => image.isChecked === true);
    setSelectedImageUrl(filteredData);
  }, [imageUrls]);


  // Fetch the JSON file from the public folder
  useEffect(() => {
    fetch('/ImageUrls.json')
      .then((response) => response.json())
      .then((data) => {
        setImageUrls(data);
      });
  }, []);

  return (
    <div className="container mx-auto flex flex-col justify-center items-center pt-5 pb-10">
      <div className='container flex justify-between items-center px-5'>
        {selectedImageUrl.length > 0 ?
          <div className='flex justify-center items-center'>
            <CheckBox
              checked={true}
              labelContent={`${selectedImageUrl.length} Images Selected`}
            />

            <CheckBox
              onChange={handleChange}
              id={555}
              checked={imageUrls.length > 0 ? selectedImageUrl.length >= imageUrls.length : false}
              labelContent='Select All'
              boxClass='ml-5'
            />
          </div>
          :
          <h1 className='text-slate-600 font-bold text-2xl'>Gallery</h1>
        }
        {selectedImageUrl.length > 0 &&
          <button onClick={handleDeleteImage} className='text-red-500 font-bold text-lg'>Delete Images</button>
        }
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
              onDragStart={() => setDragItem(index)}
              onDragEnter={() => setDragOverItem(index)}
              onDragEnd={handleSort}
            />
          })
        }

        <UploadImageBtn />
      </div>
    </div>
  );
}

export default App;