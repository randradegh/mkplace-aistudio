import React, { useState } from 'react';

function ProductCard({ product }) {
    const [addedToCart, setAddedToCart] = useState(false);
    console.log('Product received on ProductCard:', product);

    const handleAddToCart = () => {
        setAddedToCart(true);
    };

    const formattedPrice = parseFloat(product.price).toFixed(2);

    return (
        <div className="bg-white rounded shadow p-4 flex flex-col min-w-72">
            <div className="aspect-w-1 aspect-h-1 overflow-hidden">
              <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover rounded"
              />
            </div>
            <h3 className="font-bold text-xl mb-2">{product.name}</h3>
            <p className="text-gray-700 text-base flex-grow">{product.description}</p>
            <div className="flex justify-between items-center mt-4">
                <span className="font-bold text-gray-900 text-lg">${formattedPrice}</span>
                {addedToCart ? (
                    <span className="bg-green-500 text-white px-3 py-1 rounded text-sm">Added to cart!</span>
                ) : (
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded text-lg"
                        onClick={handleAddToCart}
                    >
                        Añadir
                    </button>
                )}
            </div>
        </div>
    );
}

export default ProductCard;