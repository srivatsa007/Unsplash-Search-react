import { useState } from "react";

const Detail = ({ item, clicked }) => {
  const handleClick = () => {
    clicked();
  };
  const imageUrl = item.links.download;

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "downloaded_image.jpg";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="flex items-start justify-around h-[655px] gap-20 bg-gray-300 py-[57px]">
      <button
        onClick={handleClick}
        className="absolute p-1 text-white duration-300 bg-black rounded-md left-5 top-20 hover:bg-gray-700 hover:scale-105"
      >
        Back
      </button>
      <div>
        <img
          className="w-[90%] rounded-md hover:scale-105 duration-300"
          src={item.urls.small}
        />
      </div>
      <div>
        <h2 className="my-2 text-4xl font-semibold">
          Uploded By: {item.user.name} @{item.id}
        </h2>
        <h2 className="my-2 text-3xl font-semibold">
          Upload Date: {item.user.updated_at}
        </h2>
        <hr className="my-4" />
        <p className="my-2 text-xl font-semibold">Width: {item.width}</p>
        <p className="my-2 text-xl font-semibold">Height: {item.height}</p>
        <hr className="my-4" />
        <button
          onClick={downloadImage}
          className="p-2 text-white bg-black rounded-md hover:bg-gray-700"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default Detail;
