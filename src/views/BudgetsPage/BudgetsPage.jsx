'use client'
import React, { useState, useEffect } from 'react';
import { FaEye, FaFilePdf, FaPlus, FaShoppingCart, FaTrash } from 'react-icons/fa';
import Image from 'next/image';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

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
  
    // Función para agregar una nueva página si el contenido actual excede el límite de la página
    const addNewPageIfNeeded = (currentPage, requiredSpace) => {
      const pageHeight = doc.internal.pageSize.getHeight();
      if (currentPage + requiredSpace > pageHeight) {
        doc.addPage();
        return 10; // Reiniciar el contador de posición Y en la nueva página con un margen superior
      }
      return currentPage;
    };
  
    // Ordenar los productos por precio de menor a mayor
    const sortedCartItems = [...cartItems].sort((a, b) => a.price - b.price);
  
    // Obtener el precio del producto más barato
    const cheapestPrice = sortedCartItems.length > 0 ? sortedCartItems[0].price : 0;
  
    // Posición Y inicial en la primera página
    let currentPageY = 10;
  
    // Agregar título
    const titleLines = doc.splitTextToSize("Análisis de compras", 130); // Dividir el título en líneas si es necesario
    currentPageY = addNewPageIfNeeded(currentPageY, titleLines.length * 10); // Verificar si se necesita una nueva página
    doc.text(titleLines, 15, currentPageY);
    currentPageY += titleLines.length * 10; // Incrementar la posición Y
  
    // Datos de los productos
    sortedCartItems.forEach((product, index) => {
      // Agregar título
      const titleLines = doc.splitTextToSize(product.title, 130); // Dividir el título en líneas si es necesario
  
      // Calcular la altura total de la tarjeta
      const cardHeight = Math.max(titleLines.length * 10 + 45, 80); // Ajustar este valor según el espacio requerido por la tarjeta
  
      currentPageY = addNewPageIfNeeded(currentPageY, cardHeight); // Verificar si se necesita una nueva página
      const x = 15; // Posición X para la imagen
  
      // Agregar la imagen al documento PDF
      const imgData = product.thumbnail;
      const imgWidth = 40; // Ancho de la imagen en el PDF
      const imgHeight = 40; // Altura de la imagen en el PDF
      const yImage = currentPageY + (cardHeight - imgHeight) / 4; // Alinear la imagen verticalmente con el texto del título
      doc.addImage(imgData, 'JPEG', x, yImage, imgWidth, imgHeight); // Agregar la imagen al PDF
  
      // Agregar título
      doc.text(titleLines, x + imgWidth + 10, currentPageY + 10);
  
      // Calcular el ancho del texto del enlace
      const linkTextWidth = doc.getStringUnitWidth('Ver enlace') * doc.internal.getFontSize(); // Ancho del texto del enlace
  
      // Definir el color y el estilo del enlace
      const linkColor = '#007bff'; // Color azul suave
      const linkStyle = 'U'; // Subrayado
  
      // Agregar el texto del enlace con el estilo definido
      doc.setTextColor(linkColor);
      doc.textWithLink('Ver enlace', x + imgWidth + 10, currentPageY + titleLines.length * 10 + 20, { url: product.permalink, underline: linkStyle }); // Agregar el texto del enlace
  
      // Agregar precio
      doc.setTextColor(0, 0, 0); // Restaurar color de texto a negro
      if (product.price === cheapestPrice) {
        doc.setTextColor(255, 0, 0); // Establecer color de texto a rojo para el producto más barato
        doc.text("$" + product.price.toLocaleString('en-US', { minimumFractionDigits: 2 }) + " (Menor precio)", x + imgWidth + 10, currentPageY + titleLines.length * 10 + 30);
        doc.setTextColor(0, 0, 0); // Restaurar color de texto a negro
      } else {
        doc.text("$" + product.price.toLocaleString('en-US', { minimumFractionDigits: 2 }), x + imgWidth + 10, currentPageY + titleLines.length * 10 + 30);
      }
  
      // Dibujar línea divisoria
      doc.setDrawColor(0); // Color de la línea: negro
      doc.line(x, currentPageY + cardHeight - 10, 195, currentPageY + cardHeight - 10); // Dibujar línea divisoria
  
      // Incrementar la posición Y para la siguiente tarjeta de producto
      currentPageY += cardHeight + 10; // Ajusta este valor según el espacio que desees entre cada tarjeta de producto
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
        countries={countries}
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
