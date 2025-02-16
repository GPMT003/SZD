import React, {useEffect} from 'react';

function Alert({ message, type, onClose }) {
  const bgColor = type === 'error' ? 'bg-red-600' : type === 'success' ? 'bg-green-600' : 'bg-gray-600';


  useEffect(() => {
  
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
    
  }, []);

  return (
    <div
      data-dismissible="alert"
      role="alert"
      className={`fixed font-regular flex w-full max-w-xs rounded-lg ${bgColor} px-4 py-4 text-base text-white fixed bottom-4 right-4`}
      style={{zIndex: 1000}}
    >
      <div className="shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
          <path
            fillRule="evenodd"
            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
      <div className="ml-3 mr-12">
        {
          typeof message === 'object' && message !== null && Object.keys(message).length > 0 && (
            <ul className="mt-2 list-disc pl-5 text-sm">
              {Object.keys(message).map((key, index) => (
                <li key={index}>
                  <strong>{key}:</strong> 
                  {Array.isArray(message[key]) ? message[key].join(', ').split(', ').map((item, i) => (
                    <span key={i}>{item}<br /></span>
                  )) : message[key]}
                </li>
              ))}
            </ul>
          )
        }

        {
          typeof message === 'string' && <p>{message}</p>
        }

      </div>
      <button
        data-dismissible-target="alert"
        className="absolute top-3 right-3 select-none rounded-lg py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white transition-all hover:bg-white/10 active:bg-white/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
}

export default Alert;
