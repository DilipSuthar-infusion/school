import React, { useState } from "react";
import {
  Search,
  Plus,
  Calendar,
  Award,
  Trophy,
  FileText,
  BookOpen,
  Users,
  Image,
  Camera,
  X,
} from "lucide-react";
import GalleryImgModal from "../../components/GalleryImgModal";
import Swal from "sweetalert2";
import useGalleryApi from "../../hooks/useGalleryApi";

const ManageGallery = () => {
  const { handleAddGallery, gallery, handleDeleteGallery } = useGalleryApi();
  const [activeBtn, setActiveBtn] = useState("Event");
  const [open, setOpen] = useState(false);
  const [imageView, setImageView] = useState([]);
  const [imagePath, setImagePath] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formdata, setFromdata] = useState({
    imgcategory: "",
  });
  const [imgId, setImgId] = useState(null);
  
  const [openImg, setOpenImage] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const categories = [
    { label: "Event", icon: Calendar },
    { label: "Annual Function", icon: Award },
    { label: "Sports", icon: Trophy },
    { label: "Newspaper", icon: FileText },
    { label: "Academic", icon: BookOpen },
    { label: "Cultural", icon: Users },
    { label: "Infrastructure", icon: Image },
    { label: "Achievements", icon: Camera },
  ];


  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const fileURLs = files.map((file) => URL.createObjectURL(file));
    setImageView(fileURLs);
    setImagePath(files);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFromdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageData = new FormData();
    imagePath.forEach((file) => {
      imageData.append("galleryImgPath", file);
    });
    imageData.append("imgcategory", formdata.imgcategory);
    setOpen(false);
    setImageView([]);
    setImagePath(null);

    const { error, success, data } = await handleAddGallery(imageData);
    if (success) {
      Swal.fire({
        icon: "success",
        text: data,
        confirmButtonText: "OK",
        confirmButtonColor: "#f97316",
        customClass: {
          popup: "swal-small-popup",
          title: "swal-small-title",
          text: "swal-small-text",
          confirmButton: "swal-small-btn",
        },
      });
    } else {
      Swal.fire({
        icon: "error",
        title: error,
        text: "Something went wrong!",
      });
    }
  };



  const handleImgDelete = async (id) => {
    const { error, success, data } = await handleDeleteGallery(id);
    if (success) {
      Swal.fire({
        icon: "success",
        text: data,
        confirmButtonText: "OK",
        confirmButtonColor: "#f97316",
        customClass: {
          popup: "swal-small-popup",
          title: "swal-small-title",
          text: "swal-small-text",
          confirmButton: "swal-small-btn",
        },
      });
    } else {
      Swal.fire({
        icon: "error",
        title: error,
        text: "Something went wrong!",
      });
    }
    setOpenImage(false);
    setSelectedImg(null);
  }





  const filteredCategories = categories.filter((category) =>
    category.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCategoryContent = (categoryLabel) => {
    const filteredImages = gallery?.filter(
      (img) => img.imgcategory?.toLowerCase() === categoryLabel?.toLowerCase()
    );

    return filteredImages.length > 0 ? (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredImages.map((img, index) => (
          <div key={index} className="border rounded overflow-hidden w-full h-full">
            <img
            onClick={() => {
              setImgId(img.id)
                  setOpenImage(true);
                  setSelectedImg(`http://localhost:2000/${img.galleryImgPath.replace(/\\/g, "/")}`);
                }}
              src={`http://localhost:2000/${img.galleryImgPath.replace(
                /\\/g,
                "/"
              )}`}
              alt={`Gallery ${img.imgcategory}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">{categoryLabel} Gallery</p>
        <p className="text-gray-400 text-sm mt-2">No images uploaded yet.</p>
      </div>
    );
  };

  return (
    <>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Gallery Management
            </h1>
            <p className="text-gray-600 text-sm">
              Manage your image collections
            </p>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded transition-colors hover:brightness-110"
          >
            <Plus size={18} />
            Add Images
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="relative max-w-sm">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Categories
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {filteredCategories.map((category, index) => {
              const IconComponent = category.icon;
              const isActive = activeBtn === category.label;
              return (
                <button
                  key={index}
                  onClick={() => setActiveBtn(category.label)}
                  className={`p-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <div className="flex flex-col items-center space-y-1">
                    <IconComponent size={20} />
                    <span className="text-xs font-medium text-center">
                      {category.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            {(() => {
              const activeCategory = categories.find(
                (cat) => cat.label === activeBtn
              );
              const IconComponent = activeCategory?.icon || Image;
              return (
                <>
                  <IconComponent size={20} className="text-gray-600" />
                  <h3 className="text-xl font-semibold text-gray-800">
                    {activeBtn} Gallery
                  </h3>
                </>
              );
            })()}
          </div>

          <div className="min-h-[300px]">
            {renderCategoryContent(activeBtn)}
          </div>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <GalleryImgModal
          setOpen={setOpen}
          handleSubmit={handleSubmit}
          error={error}
          handleFileChange={handleFileChange}
          imageView={imageView}
          handleChange={handleChange}
          formdata={formdata}
        />
      )}


       {openImg && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div>
            <div className="absolute top-10 right-10 flex flex-col items-end gap-6">
              <button onClick={() => setOpenImage(false)}>
                <X className="w-8 h-8 text-amber-400" />
              </button>
               <button className=" text-gray-500 px-2 py-1 bg-amber-400" onClick={() => handleImgDelete(imgId)}>
               Delete Image
              </button>
            </div>
            <div className="md:w-200 md:h-150 h-50 w-70 mx-auto">
              <img
                src={selectedImg}
                alt=""
                className="md:w-full md:h-full  object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageGallery;
