import React, { useEffect } from 'react'
import useStudyMeterialApi from '../../hooks/useStudyMeterialApi'

const StudyMeterial = () => {
    const {studentMeterial} = useStudyMeterialApi();
 
    
  return (
    <>
    <div className="mt-5">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Class</th>
              <th className="border px-4 py-2">Subject</th>
              <th className="border px-4 py-2">Teacher</th>
              <th className="border px-4 py-2">File</th>
            </tr>
          </thead>
          <tbody>
          {studentMeterial.map((study, index) => (
  <tr key={index}>
    <td className="border px-4 py-2">{study.title}</td>
    <td className="border px-4 py-2">{study.description}</td>
    <td className="border px-4 py-2">{study.class?.name || study.class?.classname}</td>
    <td className="border px-4 py-2">{study.subject?.name || study.subject?.subjectName}</td>
    <td className="border px-4 py-2">{study.teacher?.username}</td>
    <td className="border px-4 py-2">
  <a
    href={study.filePath}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-500 underline"
    download
  >
    Download
  </a>
</td>
  </tr>
))}
          </tbody>
        </table>
      </div></>
  )
}

export default StudyMeterial