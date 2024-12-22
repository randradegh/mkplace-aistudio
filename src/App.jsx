import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import {supabase} from './supabaseClient'
import StoreSettings from '../server/StoreSettings';

function App() {
  const [products, setProducts] = useState([])
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(null)
  const [storeName, setStoreName] = useState('');
   const [welcomeText, setWelcomeText] = useState('');
    const [cityCountry, setCityCountry] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    async function fetchData() {
         try {
            const {data, error} = await supabase
                .from('products')
                .select('*')

            if(error){
                setError(error)
            } else {
                 console.log('Data from Supabase:', data);
                setProducts(data)
            }
        } catch(error){
            setError(error)
        } finally{
            setLoading(false)
        }

      try{
          const response = await fetch('http://localhost:5000/settings')
           if (!response.ok) {
              throw new Error('No se pudo cargar la configuración de la tienda.');
            }
            const data = await response.json();
            setStoreName(data.storeName);
            setWelcomeText(data.welcomeText);
            setCityCountry(data.cityCountry);
      } catch (e){
         setError('Error al cargar la configuración de la tienda: ' + e.message);
      }
    try {
         const { data, error } = await supabase
             .from('categories')
             .select('*');
            if(error){
                 setError(error)
            } else {
                setCategories(data)
            }
        } catch (e) {
          setError('Error al cargar las categorías: ' + e.message);
        }
    }
      fetchData();
  }, []);
  if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }
   const filteredProducts = selectedCategory ?
       products.filter(product => product.category_id === selectedCategory)
       : products
  return (
      <BrowserRouter>
            <Header storeName={storeName} welcomeText={welcomeText} cityCountry={cityCountry} categories={categories} onCategorySelect={setSelectedCategory} selectedCategory={selectedCategory} />
        <Routes>
          <Route path="/" element={
            <ProductList products={filteredProducts}/>
          } />
           <Route path="/settings" element={
              <StoreSettings/>
           } />
            <Route path="/cart" element={
              <ShoppingCart />
           } />
        </Routes>
      </BrowserRouter>
  );
}

export default App;