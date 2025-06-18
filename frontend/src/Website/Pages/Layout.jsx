import React from 'react'
import {  BookOpen, Globe, Heart, Shield, Users } from 'lucide-react'
import Slider from '../Components/Slider'
import AboutUs from '../Components/AboutUs'
import Programs from '../Components/Programs'
import Counter from '../Components/Counter'
import Gallery from '../Components/Gallery'
import Acadamic from '../Components/Acadamic'

const Layout = () => {


  const whyChooseUs = [
    {
      title: "Experienced Faculty",
      description: "Highly qualified and experienced teachers dedicated to student success",
      icon: Users,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Modern Infrastructure",
      description: "State-of-the-art facilities including smart classrooms and laboratories",
      icon: Globe,
      color: "from-green-500 to-green-600"
    },
    {
      title: "Holistic Development",
      description: "Focus on academic, physical, and emotional development of students",
      icon: Heart,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Individual Attention",
      description: "Small class sizes ensuring personalized attention to each student",
      icon: Shield,
      color: "from-pink-500 to-pink-600"
    }
  ];



  return (
    <>
  
    <Slider />

    <AboutUs />
    <Counter/>
    <Programs />
    <Acadamic />
    <Gallery />
   

   

      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
        <div class="text-center"><div class="inline-flex items-center text-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4"><BookOpen className='w-4'/>Milestones We've Reached</div></div>
          <div className="text-center mb-8 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2 md:mb-4">Why Choose Apollo International?</h2>
            <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Discover what makes us the preferred choice for parents and students seeking quality education
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center group bg-white md:p-6 p-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                <div className={`bg-gradient-to-r ${item.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      
</>
  )
}

export default Layout
