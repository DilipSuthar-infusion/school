import React from 'react'
import {  Users, Award, BookOpen, GraduationCap, MoveRight } from 'lucide-react'
import { useNavigate } from 'react-router'

const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full -translate-x-36 -translate-y-36 opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full translate-x-48 translate-y-48 opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            <div className="relative flex-1 max-w-2xl">
              <div className="relative w-full max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl transform rotate-3 opacity-20"></div>
                <div className="relative bg-white p-3 rounded-3xl shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Students in classroom"
                    className="w-full h-80 object-cover rounded-2xl"
                  />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-32 hidden lg:block">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl transform -rotate-3 opacity-20"></div>
                <div className="relative bg-white p-2 rounded-2xl shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                    alt="Modern classroom"
                    className="w-full h-28 object-cover rounded-xl"
                  />
                </div>
              </div>
              
              <div className="absolute -top-4 -left-4 bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">5+</div>
                    <div className="text-xs text-gray-500">Years Excellence</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-1/2 -right-8 bg-white rounded-2xl p-4 shadow-lg border border-gray-100 hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">500+</div>
                    <div className="text-xs text-gray-500">Happy Students</div>
                  </div>
                </div>
              </div>
            </div>


            <div className="flex-1 max-w-2xl">
              <div className="mb-8 text-center">
                <div className="inline-flex  items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <BookOpen className="w-4 h-4" />
                  About Apollo International
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-6 leading-tight">
                  The Place Where You Can{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 relative">
                    Achieve Excellence
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></span>
                  </span>
                </h2>
                
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  For over 5 years, Apollo International school has been nurturing young minds and shaping future leaders. 
                  We believe in providing holistic education that combines academic excellence with character development, 
                  preparing students for success in an ever-evolving world.
                </p>
              </div>

    
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { number: '98%', label: 'Success Rate', icon: Award },
                  { number: '20+', label: 'Expert Faculty', icon: Users },
                  { number: '10+', label: 'Programs', icon: BookOpen }
                ].map((stat, index) => (
                  <div key={index} className="text-center p-3 md:p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                    <stat.icon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-xl lg:2xl font-bold text-gray-800">{stat.number}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-4">
                <button onClick={()=>navigate('/about')} className="group bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 py-2 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                  <span>Learn More</span>
                  <MoveRight className="w-5 h-5 group-hover:animate-pulse" />
                </button>
                
                
              </div>
            </div>
          </div>
        </div>
      </section>

     
    </>
  )
}

export default AboutUs
