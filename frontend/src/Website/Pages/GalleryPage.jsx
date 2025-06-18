import React, { useState } from "react";
import slide1 from "../../assets/Images/Slide 1.jpg";
import slide2 from "../../assets/Images/slide2.jpeg";
import slide3 from "../../assets/Images/slide3.jpg";
import slide4 from "../../assets/Images/slide4.webp";
import slide5 from "../../assets/Images/slide5.jpg";
import slide6 from "../../assets/Images/slide6.jpg";
import slide7 from "../../assets/Images/slide7.jpg";
import { X } from "lucide-react";
import Breadcrumb from "../Components/Breadcrumb";
const GalleryPage = () => {
  const [openImg, setOpenImage] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const images = [
    { src: slide1 },
    { src: slide2 },
    { src: slide3 },
    { src: slide4 },
    { src: slide5 },
    { src: slide6 },
    { src: slide7 },
    { src: slide3 },
    { src: slide4 },
    { src: slide5 },
    { src: slide6 },
    { src: slide7 },
  ];
  return (
    <>
      <Breadcrumb label={"Our Gallery"} />
      <section className="py-20 px-4 sm:px-6 lg:px-20 bg-gray-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((img, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition duration-300 group"
            >
              <img
                onClick={() => {
                  setOpenImage(true);
                  setSelectedImg(img.src);
                }}
                src={img.src}
                alt={`School photo ${index + 1}`}
                className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-300"
              />
            </div>
          ))}
        </div>
      </section>

      {openImg && (
        <>
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div>
              <div className="absolute top-10 right-10">
                <button
                  className=""
                  onClick={() => {
                    setOpenImage(false);
                  }}
                >
                  <X className="w-8 h-8 text-amber-400" />
                </button>
              </div>
              <div className="w-200 h-150">
                <img
                  src={selectedImg}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default GalleryPage;
