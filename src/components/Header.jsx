import React from 'react';
import { Link } from 'react-router-dom';

function Header({ storeName, welcomeText, cityCountry, categories, onCategorySelect, selectedCategory }) {

    const handleCategoryChange = (e) => {
      const selectedValue = e.target.value === 'Todos' ? null : e.target.value;
      onCategorySelect(selectedValue);
    };

    return (
        <header className="bg-teal-600 text-white p-4 flex justify-between items-center">
            <div className='font-bold'>
                <h1 className="text-xl">{storeName}</h1>
                <p>{welcomeText} - {cityCountry}</p>
            </div>
            <div className="flex items-center">
                {/* Cart icon and Todos dropdown. Placeholder for now */}
                <span className="mr-4"> 🛒0</span>
                 <Link to="/settings" className="mr-4 bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                    ⚙️ Settings
                </Link>
                <select
                    className="bg-white text-gray-700 p-1 rounded"
                    onChange={handleCategoryChange}
                   value={selectedCategory || 'Todos'}
                 >
                  <option>Todos</option>
                  {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                     {category.name}
                 </option>
                ))}
                 </select>
            </div>
        </header>
    );
}

export default Header;