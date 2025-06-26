import { BookOpen, CheckCircle } from "lucide-react";
import React from "react";

const Acadamic = () => {
  const programs = [
    {
      title: "Primary Education",
      grades: "playGroup – Grade 5",
      description:
        "Building a strong academic and emotional foundation through interactive and inclusive learning experiences.",
      features: [
        "Play-based, experiential learning",
        "Introduction to STEAM and nature studies",
        "Character building and values education",
      ],
    },
    {
      title: "Middle School",
      grades: "Grades 6 – 8",
      description:
        "Developing academic skills, independence, and curiosity through a broad and engaging curriculum.",
      features: [
        "Exploratory subject tracks",
        "Leadership & life-skills workshops",
        "Project-based learning and teamwork",
      ],
    },
    {
      title: "High School",
      grades: "Grades 9 – 12",
      description:
        "Encouraging deep learning, creativity, and self-discipline to prepare students for responsible adulthood.",
      features: [
        "Elective subjects and interdisciplinary projects",
        "Career awareness and mentoring",
        "Research, innovation, and personal development",
      ],
    },
  ];

  return (
    <>
      <section id="programs" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 lg:mb-16">
            <div className="text-center">
              <div className="inline-flex items-center text-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <BookOpen className="w-4" />
                Milestones We've Reached
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-800 mb-2 md:mb-4">
              Academic Programs
            </h2>
            <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive educational programs designed to nurture students at
              every stage of their development
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {programs.map((program, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold mb-4 inline-block">
                  {program.grades}
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                  {program.title}
                </h3>
                <p className="text-gray-600 mb-6">{program.description}</p>
                <ul className="space-y-2 ps-0">
                  {program.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Acadamic;
