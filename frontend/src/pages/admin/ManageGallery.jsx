import React, { useState } from "react";
import { FiMoreVertical, FiSearch } from "react-icons/fi";
import { ClipLoader } from "react-spinners";
import GalleryView from "../../components/GalleryView";

const ManageGallery = () => {
  const [loading, setLoading] = useState(false);
  const [activeBtn, setActiveBtn] = useState(null)

  const categories = [
    {
      label: "Event",
    },
    {
      label: "Annual Function",
    },
    {
      label: "Sports",
    },
    {
      label: "Newspaper",
    },
  ];
  return (
    <>
      <div className="p-2">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-4 px-4 py-4 bg-white rounded-lg shadow-md">
          <div className="flex items-center gap-2 border rounded px-3 py-2 w-1/3">
            <FiSearch />
            <input
              type="text"
              placeholder="Search Category Name..."
              className="outline-none bg-transparent w-full"
            />
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded hover:bg-blue-600">
            + Add Teacher
          </button>
        </div>
        <div className="flex justify-center items-center mb-4 px-4 py-4 bg-white rounded-lg shadow-md">
          <nav className="">
            <ul className="flex gap-5">
              {categories.map((category, index) => (
                <li key={index} className="bg-blue-500 text-white px-2 py-1"><button onClick={()=>{
                  setActiveBtn(category.label)
                }}>{category.label}</button></li>
              ))}
            </ul>
          </nav>
        </div>
      </div>



      {activeBtn == "Event" && <div>

        <GalleryView data='dfhufhffh'/></div>}


        {activeBtn == "Annual Function" && <div>
        fggtgtrgfdgdfg</div>}



      {activeBtn == "Sports" && <div>
        gfdgfgfddfgf</div>}

      {activeBtn == "Newspaper" && <div>
        gfdgrertuykk</div>}

    </>
  );
};

export default ManageGallery;
