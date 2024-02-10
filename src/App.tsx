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
  const [refetchImages, setRefetchImages] = useState(false)


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

    // refill image URLS
    setImageUrls(changedData);
  };



  // delete Images function
  const handleDeleteImage = () => {
    const remainingImages = imageUrls.filter(image => !selectedImageUrl.includes(image));
    setImageUrls(remainingImages);
  };



  // sorting images by drugging
  const handleSort = () => {
    // duplicate all the images
    let clonedItems = [...imageUrls];

    // taking the draggable item
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



  // Fetch the JSON file of image URLS from the public folder
  useEffect(() => {
    fetch('/ImageUrls.json')
      .then((response) => response.json())
      .then((data) => {
        setImageUrls(data);
      });
  }, [refetchImages]);



  return (
    <div className="w-screen">
      <div className="container mx-auto flex flex-col justify-center items-center mt-10 pb-10 shadow-lg px-10">
        <div className='container flex justify-between items-center px-5'>
          {selectedImageUrl.length > 0 ?
            <div className='flex justify-center items-center'>
              {/* counting of selecting images */}
              <CheckBox
                checked={true}
                labelContent={`${selectedImageUrl.length} Images Selected`}
              />

              {/* select all images */}
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

        {/* image layout grid */}
        <div className='grid grid-cols-2 md:grid-cols-5 gap-5 px-5'>
          {
            imageUrls.length > 0 ?

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
              :
              // Loader
              [...Array(11)].map((item, index) => (
                <div className={`animate-pulse px-4 ${index === 0 ? 'col-span-2 row-span-2 h-full' : ''}`}>
                  <div className={`${index === 0 ? 'h-full' : 'h-36'}  min-w-10 bg-gray-300 rounded w-full mb-2`}></div>
                </div >
              ))
          }

          { /* upload image button */}
          {
            imageUrls.length < 12 && < UploadImageBtn
              setRefetchImages={setRefetchImages}
              refetchImages={refetchImages}
            />
          }
        </div>
      </div>
    </div>
  );
};

export default App;