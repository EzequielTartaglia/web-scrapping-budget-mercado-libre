'use client'

import { useState, useEffect } from 'react';
import { FaEye, FaPlus } from 'react-icons/fa';
import Image from 'next/image';

export default function BudgetsPage() {
  const [query, setQuery] = useState('');
  const [province, setProvince] = useState('Buenos Aires');
  const [sortOrder, setSortOrder] = useState('price_desc');
  const [products, setProducts] = useState([]);
  const [selectedProductLink, setSelectedProductLink] = useState(null);

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

  const searchProducts = async () => {
    try {
      const response = await fetch(
        `https://api.mercadolibre.com/sites/MLA/search?q=${query}&adress.state.name=${province}&sort=${sortOrder}
        `);
      const data = await response.json();
      setProducts(data.results);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSearchInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleProvinceChange = (event) => {
    setProvince(event.target.value);
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
        <select value={province} onChange={handleProvinceChange} className="ml-2 p-2 border border-black rounded text-black">
          {argentinaProvinces.map((prov) => (
            <option key={prov} value={prov}>{prov}</option>
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
              {products.map((product) => {
                  return (
                      <tr key={product.id}>
                        <td className="w-1/10 border border-white" style={{ padding: '2px', width: '500px' }}>
                              <a
                                  href={product.permalink}
                                  style={{
                                      padding: '2px',
                                      textDecoration: 'none', // Evita el subrayado por defecto
                                      color: 'white', // Cambia el color del texto
                                      borderBottom: '1px solid transparent', // Línea de subrayado transparente
                                      transition: 'border-color 0.3s ease', // Agrega transición suave al color de la línea
                                  }}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="Ver en Mercado Libre"
                                  onMouseEnter={(e) => { e.target.style.borderBottomColor = 'white'; } } // Cambia el color de la línea al pasar el mouse sobre el enlace
                                  onMouseLeave={(e) => { e.target.style.borderBottomColor = 'transparent'; } } // Restaura el color de la línea cuando el mouse deja el enlace
                              >
                                  {product.title}
                              </a>
                          </td>
                          <td className="border border-white" style={{ padding: '2px', width: '150px', textAlign: 'center' }}>$ {product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>


                          <td className="border border-white" style={{ padding: '2px' }}>
                              <Image src={product.thumbnail} alt={product.title} width="100" height="70" />
                          </td>

                          <td className="border border-white" style={{textAlign: 'center' }}>
                              <button title="Agregar a comparativa">
                                  <FaPlus />
                              </button>
                          </td>

                      </tr>
                  );
              })}
            </tbody>
          </table>
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </main>
  );
}