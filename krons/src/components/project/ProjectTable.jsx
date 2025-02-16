import React, { useState, useEffect } from 'react';
import ProjectDetail from './ProjectDetail';

function ProjectTable({ projects, handleRowSelect, selectedRow }) {

  const [isModalOpen_Partner, setIsModalOpen_Partner] = useState(false);
  const [projectId,setprojectId] = useState();


  const handleAddClick_Partner = (e) => {
    setIsModalOpen_Partner(prevState => !prevState);
    setprojectId(e)
  };

  const handleModalClose_Partner = () => {
    setIsModalOpen_Partner(false);

  };
  return (
    <div className="relative w-full overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projekt név</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kezdete</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vége</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Szerződött fél</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Készültség</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Akciók</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} onClick={() => handleRowSelect(project)}  className={`cursor-pointer ${selectedRow && selectedRow.id === project.id ? 'bg-gray-200' : ''}`}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{project.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.start_date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.end_date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.contractor_name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.completion_level}%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button onClick={
                  () => {handleAddClick_Partner(project.id)}
                } className="bg-indigo-500 text-white px-4 py-2 rounded">Részletek</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ProjectDetail
        isOpen={isModalOpen_Partner}
        projectId = {projectId}
        onClose={handleModalClose_Partner}
      />
    </div>
  );
}

export default ProjectTable;
