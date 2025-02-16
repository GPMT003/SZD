import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
          Az oldal nem található
        </h1>
        <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
        Sajnáljuk, nem találtuk meg a keresett oldalt.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link to="/" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Vissza a főoldalra
          </Link>
        </div>
      </div>
    </main>
  );
}

export default PageNotFound;
