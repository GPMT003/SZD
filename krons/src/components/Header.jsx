import React, { useState } from 'react';
import { FaAngleDoubleUp } from "react-icons/fa";

function Header() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="absolute left-0 right-0 top-0 flex items-center justify-between gap-x-6 overflow-hidden bg-gray-800 px-6 py-2.5 sm:px-3.5 text-white z-[9999]">
      <div
        aria-hidden="true"
        className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
          }}
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-20"
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-sm text-gray-200">
          <strong className="font-semibold">Kronos 2024</strong>
          <span className="mx-2">•</span>
          Ez a demóváltozat a teljes funkcionalitás előzetes bemutatását szolgálja.
        </p>
      </div>

      <div className="flex flex-1 justify-end">
        <button 
          type="button" 
          className="-m-3 p-3 focus-visible:outline-offset-[-4px]" 
          onClick={() => setVisible(false)}
        >
          <span className="sr-only">Dismiss</span>
          <FaAngleDoubleUp aria-hidden="true" className="text-gray-200" />
        </button>
      </div>
    </div>
  );
}

export default Header;
