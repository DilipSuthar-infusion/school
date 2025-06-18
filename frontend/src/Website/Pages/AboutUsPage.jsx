import React, { useState } from 'react';

import { Target, Eye, BookOpen } from 'lucide-react';
import { FaGlobe, FaGraduationCap, FaMedal, FaStar } from 'react-icons/fa';
import Breadcrumb from '../Components/Breadcrumb';

const AboutUsPage = () => {
  const [activeTab, setActiveTab] = useState('overview');




 





  return (

    <>
    <Breadcrumb label={'About Us'}/>
    <div className="min-h-screen bg-gray-50">


      <section className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 lg:gap-4">
            {[
              { id: 'overview', label: 'Overview', icon: Eye },
              { id: 'mission', label: 'Mission & Vision', icon: Target },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 lg:px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
     
          {activeTab === 'overview' && (
            <div className="space-y-16">
              
    
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
                    Welcome to Apollo International School
                  </h2>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    Established in 1998, Apollo International School stands as a beacon of educational excellence, 
                    committed to nurturing young minds and shaping future leaders. Our holistic approach combines 
                    academic rigor with character development, ensuring every student reaches their full potential.
                  </p>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    With state-of-the-art facilities, experienced faculty, and a diverse student body, we create 
                    an environment where learning transcends traditional boundaries and students are prepared for 
                    the challenges of tomorrow.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-green-600">
                      <FaMedal className="text-xl" />
                      <span className="font-semibold">CBSE Affiliated</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-600">
                      <FaGlobe className="text-xl" />
                      <span className="font-semibold">International Standards</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8 h-96 flex items-center justify-center text-6xl">
                    🏫
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-full p-4 shadow-xl">
                    <FaGraduationCap className="text-3xl text-blue-600" />
                  </div>
                </div>
              </div>

           
            </div>
          )}

    
          {activeTab === 'mission' && (
            <div className="space-y-12">
              <div className="grid lg:grid-cols-2 gap-12">
                
                {/* Mission */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4">
                      <Target className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    To provide a nurturing and challenging environment that empowers students to become 
                    confident, creative, and compassionate global citizens who contribute positively to society.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <FaStar className="text-yellow-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Foster academic excellence and critical thinking</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FaStar className="text-yellow-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Develop strong moral and ethical values</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FaStar className="text-yellow-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Encourage creativity and innovation</span>
                    </li>
                  </ul>
                </div>

                {/* Vision */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mr-4">
                      <Eye className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    To be recognized as a leading educational institution that shapes future leaders, 
                    innovators, and responsible citizens who make a meaningful impact on the world.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <FaStar className="text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Global recognition for educational excellence</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FaStar className="text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Sustainable and inclusive learning environment</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FaStar className="text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Alumni making global impact</span>
                    </li>
                  </ul>
                </div>
              </div>

            
            </div>
          )}

         
          </div>
          </section>
          </div>
          </>
)}
export default AboutUsPage;