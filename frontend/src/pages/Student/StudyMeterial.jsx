import React, { useEffect, useMemo, useState } from 'react';
import useStudyMeterialApi from '../../hooks/useStudyMeterialApi';
import { Search } from 'lucide-react';

const StudyMeterial = () => {
  const { studentClassMeterial } = useStudyMeterialApi();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = useMemo(() => {
    if (!searchTerm) return studentClassMeterial;

    return studentClassMeterial.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            event.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [studentClassMeterial, searchTerm]);

  return (
    <div className="min-h-screen">
      <div>
        <div className="mb-6 sm:mb-8 bg-white rounded-lg ">
          <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex flex-col md:flex-row items-center justify-between px-4 py-3 md:py-2 shadow-md">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">Study Material</h1>
                <p className="text-sm sm:text-base text-gray-600">Discover and explore upcoming study materials</p>
              </div>
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search materials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg sm:rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 sm:py-16 lg:py-20 px-4">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-1 sm:mb-2">
              {searchTerm ? 'No materials found' : 'No materials available'}
            </h3>
            <p className="text-sm sm:text-base text-gray-500 max-w-md mx-auto">
              {searchTerm ? 'Try adjusting your search criteria' : 'Check back later for new materials'}
            </p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto rounded-lg shadow">
            <table className="min-w-full bg-white border border-gray-200 text-center">
              <thead className='bg-blue-50 text-left text-blue-600 font-semibold text-center'>
                <tr>
                <th className="py-3 px-3 border-b">Sr.No.</th>
                  <th className="py-3 px-3 border-b">Title</th>
                  <th className="py-3 px-3 border-b">Class</th>
                  <th className="py-3 px-3 border-b">Teacher</th>
                  <th className="py-3 px-3 border-b">Subject</th>
                  <th className="py-3 px-3 border-b">Description</th>
                  <th className="py-3 px-3 border-b">Download</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((study,index) => (
                  <tr key={study.id} className="hover:bg-gray-50 even:bg-gray-100 odd:bg-white">
                    <td className="py-3 px-3 border-b">{index+1}</td>
                    <td className="py-3 px-3 border-b">{study.title}</td>
                    <td className="py-3 px-3 border-b">{study?.class?.classname || "N/A"}</td>
                    <td className="py-3 px-3 border-b">{study?.teacher?.username || "N/A"}</td>
                    <td className="py-3 px-3 border-b">{study?.subject?.subjectName || "N/A"}</td>
                    <td className="py-3 px-3 border-b">
                      {study.description && study.description.length > 100
                        ? study.description.slice(0, 100) + '...'
                        : study.description}
                    </td>
                    <td className="py-3 px-3 border-b">
                      <a href={study.filePath} download className="text-white font-semibold px-1 py-1 rounded-sm  text-decoration-none bg-gradient-to-r from-amber-500 to-orange-600">
                        Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyMeterial;
