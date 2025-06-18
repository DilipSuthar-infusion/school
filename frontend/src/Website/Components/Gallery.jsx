import React from "react";
import Slider from "react-slick";
import slide1 from "../../assets/Images/Slide 1.jpg";
import slide2 from "../../assets/Images/slide2.jpeg";
import slide3 from "../../assets/Images/slide3.jpg";
import slide4 from "../../assets/Images/slide4.webp";
import slide5 from "../../assets/Images/slide5.jpg";
import slide6 from "../../assets/Images/slide6.jpg";
import slide7 from "../../assets/Images/slide7.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BookOpen } from "lucide-react";

const images = [
  { src: slide1 },
  { src: slide2 },
  { src: slide3 },
  { src: slide4 },
  { src: slide5 },
  { src: slide6 },
  { src: slide7 },
];

const Gallery = () => {
  const settings = {
    infinite: true,
    autoplay: true,
    speed: 2000,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className=" px-4 py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="text-center">
        <span class="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <BookOpen className="w-4" />
          Snapshots of School Life
        </span>
      </div>

      <h2 className="text-3xl font-bold mb-2 md:mb-4 text-center">Photo Gallery</h2>
      <p class="text-sm text-center sm:text-lg text-gray-600 max-w-2xl mx-auto">
        Explore highlights of our vibrant campus life, from classrooms to
        cultural events and beyond
      </p>
      <Slider {...settings} className=" mt-8 md:mt-16">
        {images.map((img, index) => (
          <div key={index} className="px-2">
            <img
              src={img.src}
              alt={`Slide ${index}`}
              className="rounded-xl w-full h-64 object-cover shadow-lg"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Gallery;
