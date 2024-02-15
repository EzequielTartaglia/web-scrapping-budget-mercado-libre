'use client'
import React, { useState, useEffect } from 'react';
import { FaEye, FaFilePdf, FaPlus, FaShoppingCart, FaTrash } from 'react-icons/fa';
import Image from 'next/image';
import { jsPDF } from 'jspdf';

//import argentinaProvinces from './provinces';
import countries from './countries';
import SearchForm from './SearchForm';

export default function BudgetsPage() {
  const [query, setQuery] = useState('');
  //const [province, setProvince] = useState('Buenos Aires');
  const [country, setCountry] = useState('MLA'); 
  const [sortOrder, setSortOrder] = useState('price_asc');
  const [products, setProducts] = useState([]);

  //Carrito
  const [cartItems, setCartItems] = useState([]); 
  const [cartVisible, setCartVisible] = useState(false);
  const [showComparativePDF, setShowComparativePDF] = useState(false); 

  // Calcula el total de productos en el carrito
  const cartItemCount = cartItems.length;

  // Función para agregar un producto al carrito
  const addToCart = (product) => {
    setShowComparativePDF(false);
    setCartItems([...cartItems, product]);
  };

  // Función para mostrar u ocultar el carrito
  const toggleCartVisibility = () => {
    setCartVisible(!cartVisible);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Resta para esconder el carrito
useEffect(() => {
  const handleUnload = () => {
    clearCart();
  };

  if (cartVisible) {
    window.addEventListener('unload', handleUnload);
  }

  return () => {
    window.removeEventListener('unload', handleUnload);
  };
}, [cartVisible]);

  // Resta para esconder el carrito
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.cart-container')) {
        setCartVisible(false);
      }
    };

    if (cartVisible) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [cartVisible]);

  // Resta para esconder el carrito
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setCartVisible(false);
      }
    };

    if (cartVisible) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [cartVisible]);

  // Resta para esconder el carrito
  useEffect(() => {
    const handleScroll = () => {
      setCartVisible(false);
    };

    if (cartVisible) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [cartVisible]);

  // Resta para esconder el carrito
  useEffect(() => {
    const handleResize = () => {
      setCartVisible(false);
    };

    if (cartVisible) {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [cartVisible]);

  // Resta para esconder el carrito
  useEffect(() => {
    const handleUnload = () => {
      setCartVisible(false);
    };

    if (cartVisible) {
      window.addEventListener('unload', handleUnload);
    }

    return () => {
      window.removeEventListener('unload', handleUnload);
    };
  }, [cartVisible]);

  const searchProducts = async () => {
    try {
      const response = await fetch(
        //`https://api.mercadolibre.com/sites/${country}/search?q=${query}&adress.state.name=${province}&country=${country}&sort=${sortOrder}&status=active&site_id=${country}`
        `https://api.mercadolibre.com/sites/${country}/search?q=${query}&country=${country}&sort=${sortOrder}&status=active&site_id=${country}`
      );
      const data = await response.json();
      setProducts(data.results);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSearchInputChange = (event) => {
    setQuery(event.target.value);
  };

/*   const handleProvinceChange = (event) => {
    setProvince(event.target.value);
  }; */

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    searchProducts();
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    let yPos = 10;

    cartItems.forEach((product) => {
      doc.text(product.title + ' - $' + product.price, 10, yPos);
      yPos += 10;
    });

    doc.save('Comparativa_Mercado_Libre.pdf');
    setShowComparativePDF(true); 

    setTimeout(() => {
      clearCart();
      setCartVisible(false); 
    }, 100); 
  };
  
  
  
  // Se ejecuta al montar el componente para realizar la búsqueda inicial
  useEffect(() => {
    searchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
      <SearchForm
        query={query}
        country={country}
        sortOrder={sortOrder}
        handleSearchInputChange={handleSearchInputChange}
        handleCountryChange={handleCountryChange}
        handleSortOrderChange={handleSortOrderChange}
        handleSearchSubmit={handleSearchSubmit}
      />
      
      <div style={{ position: 'fixed', bottom: '50px', right: '20px' }}>
      <button onClick={toggleCartVisibility} className="relative bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center">
        <FaShoppingCart size={24} color="white" />
        {cartItemCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">{cartItemCount}</span>
        )}
      </button>

        {cartVisible && (
          <div className="w-[800px] absolute bottom-full right-0 bg-white border border-gray-300 shadow-lg p-4 mt-2 cart-container" style={{"color":"black"}}>
            {cartItems.length > 0 ? (
              <ul>
                {cartItems.map((item, index) => (
                  <li key={index} className="flex items-center justify-between mb-2">
                    <span>{item.title}</span>
                    <span>${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </li>
                ))}
                <li className="flex justify-between">
                  <span>Total:</span>
                  <span>${cartItems.reduce((total, item) => total + item.price, 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </li>
                <div className="flex justify-between">
                  <button onClick={clearCart} className="bg-red-500 text-white mt-4 px-4 py-2 rounded mb-2 mr-2" title='Vaciar Carrito'><FaTrash /></button>
                  <button onClick={handleDownloadPDF} className="bg-blue-500 text-white mt-4 px-4 py-2 rounded mb-2" title='Compilar Comparativa'><FaFilePdf /></button>
                </div>
              </ul>
            ) : (
              <p>No hay productos en el carrito</p>
            )}
          </div>
        )}
      </div>
      <div className="mt-4">
        {products.length > 0 ? (
          <table className="table-auto border border-white">
            <thead>
              <tr>
                <th className="border border-white">Producto</th>
                <th className="border border-white">Precio</th>
                <th className="w-1/10 border border-white">Imagen</th>
                <th className="border border-white">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="w-1/10 border border-white" style={{ padding: '2px', width: '500px' }}>
                    <a
                      href={product.permalink}
                      style={{
                        padding: '2px',
                        textDecoration: 'none',
                        color: 'white',
                        borderBottom: '1px solid transparent',
                        transition: 'border-color 0.3s ease',
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Ver en Mercado Libre"
                      onMouseEnter={(e) => { e.target.style.borderBottomColor = 'white'; }}
                      onMouseLeave={(e) => { e.target.style.borderBottomColor = 'transparent'; }}
                    >
                      {product.title}
                    </a>
                  </td>
                  <td className="border border-white" style={{ padding: '2px', width: '150px', textAlign: 'center' }}>$ {product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                  <td className="border border-white" style={{ padding: '2px' }}>
                    <Image src={product.thumbnail} alt={product.title} width="100" height="70" />
                  </td>
                  <td className="border border-white" style={{ textAlign: 'center' }}>
                    <button title="Agregar a comparativa" onClick={() => addToCart(product)}>
                      <FaPlus />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No se encontraron coincidencias.</p>
        )}
      </div>     
    </main>
  );
}
