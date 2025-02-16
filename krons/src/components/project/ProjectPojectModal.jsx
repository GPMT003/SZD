import Project from '../Project';


function ProjectProjectModal({ isOpen, onClose}) {

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded shadow-lg z-10 sm:w-11/12 max-h-screen overflow-y-auto">
        <Project />
          <div className="py-3 sm:flex sm:flex-row-reverse">
            <button
              onClick={onClose}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Mégse
            </button>
          </div>
      </div>
    </div>
  );
}

export default ProjectProjectModal;
