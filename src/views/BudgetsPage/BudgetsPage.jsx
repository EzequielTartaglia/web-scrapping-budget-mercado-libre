'use client'
import React, { useState, useEffect } from 'react';
import { FaEye, FaPlus } from 'react-icons/fa';
import Image from 'next/image';

export default function BudgetsPage() {
  const [query, setQuery] = useState('');
  //const [province, setProvince] = useState('Buenos Aires');
  const [country, setCountry] = useState('MLA'); 
  const [sortOrder, setSortOrder] = useState('price_asc');
  const [products, setProducts] = useState([]);

  // Lista de provincias de Argentina
  const argentinaProvinces = [
    'Buenos Aires',
    'Catamarca',
    'Chaco',
    'Chubut',
    'Córdoba',
    'Corrientes',
    'Entre Ríos',
    'Formosa',
    'Jujuy',
    'La Pampa',
    'La Rioja',
    'Mendoza',
    'Misiones',
    'Neuquén',
    'Río Negro',
    'Salta',
    'San Juan',
    'San Luis',
    'Santa Cruz',
    'Santa Fe',
    'Santiago del Estero',
    'Tierra del Fuego',
    'Tucumán'
  ];

  const countries = [
    { code: 'MLA', name: 'Argentina' },
    { code: 'MPY', name: 'Paraguay' },
    { code: 'MLC', name: 'Chile' },
    { code: 'MLU', name: 'Uruguay' }
  ];

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

  const handleViewLink = (link) => {
    window.open(link, '_blank');
  };

  // Se ejecuta al montar el componente para realizar la búsqueda inicial
  useEffect(() => {
    searchProducts();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={handleSearchSubmit} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={handleSearchInputChange}
          placeholder="Search products..."
          className="p-2 border border-black rounded text-black"
          style={{ width: '300px' }}
        />
    {/*     <select value={province} onChange={handleProvinceChange} className="ml-2 p-2 border border-black rounded text-black">
          {argentinaProvinces.map((prov) => (
            <option key={prov} value={prov}>{prov}</option>
          ))}
        </select> */}
        <select value={country} onChange={handleCountryChange} className="ml-2 p-2 border border-black rounded text-black">
          {countries.map((c) => (
            <option key={c.code} value={c.code}>{c.name}</option>
          ))}
        </select>
        <select value={sortOrder} onChange={handleSortOrderChange} className="ml-2 p-2 border border-black rounded text-black">
          <option value="price_desc">Precio: Mayor a Menor</option>
          <option value="price_asc">Precio: Menor a Mayor</option>
        </select>
        <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">Buscar</button>
      </form>
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
                    <button title="Agregar a comparativa">
                      <FaPlus />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </main>
  );
}
