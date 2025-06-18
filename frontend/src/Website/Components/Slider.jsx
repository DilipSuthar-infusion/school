import { MoveLeftIcon, MoveRightIcon, GraduationCap, Award, BookOpen, MapPin, User2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        {
            image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            title: "Excellence in Education",
            subtitle: "Shaping Tomorrow's Leaders Today",
            description: "Join our prestigious institution where academic excellence meets character development. Experience world-class education with personalized attention.",
            stats: { students: "5000+", teachers: "200+", years: "25+" }
        },
        {
            image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
            title: "Modern Learning Environment",
            subtitle: "State-of-the-Art Facilities",
            description: "Experience learning in our cutting-edge classrooms, advanced laboratories, and digital libraries designed for 21st-century education.",
            stats: { labs: "50+", library: "100K+", campus: "25 Acres" }
        },
        {
            image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            title: "Holistic Development",
            subtitle: "Beyond Academics",
            description: "Sports, arts, and extracurricular activities for complete personality development. Building confident, creative, and capable individuals.",
            stats: { clubs: "30+", sports: "15+", awards: "500+" }
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <>
            <section id="home" className="relative h-150 md:h-200 overflow-hidden">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-all duration-1000 transform ${
                            index === currentSlide 
                                ? 'opacity-100 scale-100' 
                                : 'opacity-0 scale-105'
                        }`}
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat transform transition-transform duration-1000 hover:scale-105"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-blue-800/30 to-purple-900/70"></div>
                        </div>
                        
                        <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
                            <div className="max-w-6xl mx-auto">
                                <div className="mb-8">
                                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-lg rounded-full px-4 py-2 mb-6 animate-fadeInUp">
                                        <GraduationCap className="w-4 h-4 md:w-5 md:h-5 text-amber-400" />
                                        <span className="text-xs md:text-sm font-medium">Welcome To Apollo International</span>
                                    </div>
                                    
                                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fadeInUp delay-100">
                                        <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                                            {slide.title}
                                        </span>
                                    </h1>
                                    
                                    <h2 className="text-xl sm:text-3xl lg:text-4xl font-light mb-6 text-blue-100 animate-fadeInUp delay-200">
                                        {slide.subtitle}
                                    </h2>
                                    
                                    <p className="text-base sm:text-xl lg:text-xl mb-8 animate-fadeInUp delay-300 max-w-4xl mx-auto leading-relaxed text-gray-200">
                                        {slide.description}
                                    </p>
                                </div>

                                

                                <div className="flex flex-col md:flex-row gap-4 justify-center animate-fadeInUp delay-500">
                                    <button className="group bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 py-2 rounded-full font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:from-amber-400 hover:to-orange-500">
                                       <Link to='/about' className='text-white text-decoration-none'> 
                                       <span className="flex items-center justify-center gap-2">
                                            <BookOpen className="w-5 h-5" />
                                            Explore More
                                        </span>
                                        </Link>
                                    </button>
                                    <button className="group border-2 border-white text-white px-3 py-2 rounded-full font-semibold hover:text-blue-900 transition-all duration-300 backdrop-blur-sm">
                                    <Link to='/contact' className='text-white text-decoration-none'>
                                        <span className="flex items-center justify-center gap-2">
                                            <MapPin className="w-5 h-5" />
                                            Contact Now
                                        </span>
                                    </Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                

                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-140 md:top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
                >
                    <MoveLeftIcon className="w-6 h-6" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-140 md:top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
                >
                    <MoveRightIcon className="w-6 h-6" />
                </button>

               

            </section>

            <section className="relative bg-gradient-to-b from-gray-50 to-white ">
                <div className="">
                    <div className="bg-white shadow-2xl p-8 md:px-20 md:py-20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-32 translate-x-32 opacity-50"></div>
                        
                        <div className="relative z-10">
                            <div className="text-center mb-16">
                                <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                                    <Award className="w-4 h-4" />
                                        Best Programs
                                </span>
                                <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">Our Key Features</h2>
                                <p className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto">
                                    Discover what makes our school the perfect choice for your educational journey
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                {[
                                    {
                                        icon: <GraduationCap className='text-white'/>,
                                        title: "Scholarship Programs",
                                        description: "Merit-based scholarships and financial aid programs to support deserving students in their academic journey.",
                                        color: "from-blue-500 to-blue-600",
                                        bgColor: "bg-blue-50",
                                        textColor: "text-blue-800"
                                    },
                                    {
                                        icon: <User2 className='text-white'/>,
                                        title: "Expert Faculty",
                                        description: "Learn from experts and renowned academicians with years of experience in their respective fields.",
                                        color: "from-purple-500 to-purple-600",
                                        bgColor: "bg-purple-50",
                                        textColor: "text-purple-800"
                                    },
                                    {
                                        icon: <BookOpen className='text-white'/>,
                                        title: "Diverse Programs",
                                        description: "Comprehensive range of courses programs across multiple disciplines.",
                                        color: "from-green-500 to-green-600",
                                        bgColor: "bg-green-50",
                                        textColor: "text-green-800"
                                    }
                                ].map((feature, index) => (
                                    <div
                                        key={index}
                                        className={`group ${feature.bgColor} border border-gray-100 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer`}
                                    >
                                        <div className="flex items-start gap-6">
                                            <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                                {feature.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className={`text-xl font-bold mb-3 ${feature.textColor} group-hover:text-opacity-80 transition-colors duration-300`}>
                                                    {feature.title}
                                                </h4>
                                                <p className="text-gray-600 text-sm md:text-md leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

         

        </>
    );
};

export default Slider;
