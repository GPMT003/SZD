import React, { useState, useEffect } from 'react';
import ProjectTable from './project/ProjectTable';
import ProjectModal from './project/ProjectModal';
import Alert from './Alert';
import axios from 'axios';
import Loader from './Loader';



function Project() {

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
    },
  });
  
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [partners, setPartners] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewEntry, setIsNewEntry] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(true);
  const [isModalOpen_Partner, setIsModalOpen_Partner] = useState(false);


  useEffect(() => {
    fetchProjects();
    fetchPartners();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axiosInstance.post('projects', {});
      setProjects(response.data);
    } catch (error) {
      setAlert({ message: `Hiba történt a projektek lekérése során: ${error.message}`, type: 'error' });
    }
  };

  const fetchPartners = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('partners', {});
      setPartners(response.data);
    } catch (error) {
      setAlert({ message: `Hiba történt a partnerek lekérése során: ${error.message}`, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleRowSelect = (project) => {
    setSelectedProject(project);
  };

  const handleModalClose = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  const handleEditClick = () => {
    if (selectedProject) {
      setIsModalOpen(true);
      setIsNewEntry(false);
    } else {
      setAlert({ message: 'Kérlek válassz egy projektet a szerkesztéshez!', type: 'warning' });
    }
  };

  const handleAddClick = () => {
    setSelectedProject(null);
    setIsModalOpen(true);
    setIsNewEntry(true);
  };

  const handleCloseAlert = () => {
    setAlert({ message: '', type: '' });
  };

  const handleSave = async (projectData) => {
    try {
      let response;
      if (isNewEntry) {
        response = await axiosInstance.post('createProject', projectData);
      } else {
        response = await axiosInstance.post('updateProject', projectData);
      }
      fetchProjects();
      setAlert({ message: 'Projekt sikeresen mentve!', type: 'success' });
      setIsModalOpen(false);
      setSelectedProject(null);
      return true;
    } catch (error) {
      setAlert({ message: error.response?.data?.message || 'Hiba történt a projekt mentésekor.', type: 'error' });
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="py-1 bg-blueGray-50">
        <div className="w-full xl:w-11/12 mb-12 xl:mb-0 px-4 mx-auto mt-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-lg uppercase text-blueGray-700">Projektek</h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <button
                    onClick={handleAddClick}
                    className="bg-indigo-500 text-white py-2 px-3 rounded-lg font-bold font-bold text-xs uppercase mx-1 my-1"
                    type="button"
                  >
                    Új hozzáadása
                  </button>
                  <button
                    onClick={handleEditClick}
                    className="bg-yellow-500 text-indigo py-2 px-3 rounded-lg font-bold text-xs uppercase mx-1 my-1"
                    type="button"
                  >
                    Szerkesztés
                  </button>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto">
              <ProjectTable projects={projects} handleRowSelect={handleRowSelect} selectedRow={selectedProject} />
            </div>
          </div>
        </div>
        <ProjectModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSave={handleSave}
          initialData={selectedProject}
          partners={partners}
          isModalOpen_Partner={isModalOpen_Partner}
          setIsModalOpen_Partner={setIsModalOpen_Partner}
        />
        {alert.message && <Alert message={alert.message} type={alert.type} onClose={handleCloseAlert} />}
      </div>
    </div>
  );
}

export default Project;
