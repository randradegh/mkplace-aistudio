import React, { useState, useEffect } from 'react';
import { CogIcon } from '@heroicons/react/24/outline';

function StoreSettings() {
  const [storeName, setStoreName] = useState('');
  const [welcomeText, setWelcomeText] = useState('');
  const [cityCountry, setCityCountry] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchStoreSettings = async () => {
      try {
        const response = await fetch('http://localhost:5000/settings');
        if (!response.ok) {
          throw new Error('No se pudo cargar la configuración de la tienda.');
        }
        const data = await response.json();
        setStoreName(data.storeName);
        setWelcomeText(data.welcomeText);
        setCityCountry(data.cityCountry);
      } catch (e) {
        setError('Error al cargar la configuración de la tienda: ' + e.message);
      }
    };

    fetchStoreSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const storeData = {
      storeName,
      welcomeText,
      cityCountry,
    };

    try {
      const response = await fetch('http://localhost:5000/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(storeData),
      });
      if (!response.ok) {
        throw new Error('No se pudo guardar la configuración de la tienda.');
      }
      setSuccess(true);
    } catch (e) {
      setError('Error al guardar la configuración de la tienda: ' + e.message);
    }
  };

  return (
    <div className="min-h-screen py-8 flex items-center justify-center bg-orange-100">
      {/* Contenedor principal con fondo y borde */}
      <div className="w-full max-w-2xl shadow-2xl rounded-lg p-8 flex flex-col items-center border border-gray-300 bg-blue-400">
        <header className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-red-800 mb-2 flex items-center justify-center">
            <CogIcon className='mr-2' style={{height: '24px', width: '24px'}}/>
            Configuración de la tienda de la esquina
          </h2>
          <p className="text-gray-600 text-lg">
            Aquí puedes configurar la información que se mostrará en la página principal de tu tienda.
            <br/>
            Ingresa el nombre de la tienda, el texto de bienvenida y su ciudad y país.
          </p>
        </header>
        
        {/* Sección interna */}
        <div className='rounded p-8 w-full'>
          <form onSubmit={handleSubmit} className="mt-8 w-full max-w-xl mx-auto flex flex-col gap-4">
            <div className="flex flex-col ">
              <label htmlFor="storeName" className="block text-red-700 font-bold mb-2">
                Nombre de la tienda
              </label>
              <input
                type="text"
                id="storeName"
                placeholder='Ej. Fonda Doña Mary'
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                maxLength="150"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="welcomeText" className="block text-gray-700 font-bold mb-2">
                Texto de bienvenida
              </label>
              <textarea
                id="welcomeText"
                placeholder='Ej. La mejor comida Mexicana de la ciudad'
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={welcomeText}
                onChange={(e) => setWelcomeText(e.target.value)}
                maxLength="500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="cityCountry" className="block text-gray-700 font-bold mb-2">
                Ciudad y país
              </label>
              <input
                type="text"
                id="cityCountry"
                placeholder='Ej. Ciudad de México, México'
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={cityCountry}
                onChange={(e) => setCityCountry(e.target.value)}
                maxLength="100"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default StoreSettings;