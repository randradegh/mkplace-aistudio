import React from 'react';
import ProductCard from './ProductCard';

function ProductList({ products }) {
  if (!products) {
    return null;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;