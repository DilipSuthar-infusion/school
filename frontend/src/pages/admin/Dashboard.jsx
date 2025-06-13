import React from "react";
import {
  BookOpen,
  Users,
  FileText,
  Calendar,
} from "lucide-react";
import useUserApi from "../../hooks/useUserApi";
import useClassApi from "../../hooks/useClassApi";
import useEventApi from "../../hooks/useEventApi";

export default function Dashboard() {
  const {users} = useUserApi();
  const {Classes} = useClassApi();
  const {Events} = useEventApi();
  const metrics = [
    {
      id: 1,
      name: "Students Enrolled",
      value: users?.filter(user => user.role === "student").length,
      icon: Users,
      iconColor: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
    {
      id: 2,
      name: "Teachers",
      value: users?.filter(user => user.role === "teacher").length,
      icon: Users,
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: 3,
      name: "Classes",
      value: Classes?.length,
      icon: BookOpen,
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      id: 4,
      name: "Upcoming Events",
      value: Events?.length,
      icon: Calendar,
      iconColor: "text-pink-600",
      bgColor: "bg-pink-100",
    },
  ];



  return (
    <div className="min-h-screen bg-white font-sans text-gray-700">
     

      <section className="bg-gray-50 pt-20 pb-28 sm:pt-26 sm:pb-26">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h1 className="max-w-4xl mx-auto text-5xl sm:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Welcome to Apollo International Dashboard
          </h1>
          <p className="mt-6 text-lg sm:text-xl max-w-2xl mx-auto text-gray-600">
            Monitor your school’s activities, manage students and staff
            efficiently.
          </p>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-20 mt-20">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className="flex items-center space-x-4 bg-white rounded-xl shadow-lg p-6 transition hover:shadow-xl cursor-pointer"
          >
            <div
              className={`rounded-full p-3 ${metric.bgColor} flex items-center justify-center`}
            >
              <metric.icon className={`h-8 w-8 ${metric.iconColor}`} />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">{metric.value}</p>
              <p className="text-sm font-medium text-gray-500">{metric.name}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="max-w-[1200px] mx-auto px-6 pb-16 space-y-16">
        <FeatureCard
          title="Student Management"
          description="Easily add, update, and track student details, attendance, and academic progress."
          icon={<Users className="h-12 w-12 text-indigo-600" />}
        />
        <FeatureCard
          title="Teacher Management"
          description="Manage teacher profiles, class assignments, and performance evaluations."
          icon={<Users className="h-12 w-12 text-green-600" />}
        />
        <FeatureCard
          title="Exam & Grades"
          description="Create exams, assign grades, and share results with students and parents securely."
          icon={<FileText className="h-12 w-12 text-yellow-600" />}
        />
        <FeatureCard
          title="School Events"
          description="Organize school events, notify participants, and promote active participation."
          icon={<Calendar className="h-12 w-12 text-pink-600" />}
        />
      </section>

      <footer className="py-8 border-t border-gray-200 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Apollo International. All rights reserved.
      </footer>
    </div>
  );
}

function FeatureCard({ title, description, icon }) {
  return (
    <div className="flex items-start space-x-6 p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition cursor-default">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
