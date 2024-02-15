'use client'

import countries from './countries';

const SearchForm = ({
  query,
  country,
  sortOrder,
  handleSearchInputChange,
  handleCountryChange,
  handleSortOrderChange,
  handleSearchSubmit,
}) => {
  return (
    <form onSubmit={handleSearchSubmit} className="mt-4 mb-4">
      <input
        type="text"
        value={query}
        onChange={handleSearchInputChange}
        placeholder="Buscar productos..."
        className="p-2 border border-black rounded text-black"
        style={{ width: '300px' }}
      />
      <select
        value={country}
        onChange={handleCountryChange}
        className="ml-2 p-2 border border-black rounded text-black"
      >
        {countries.map((c) => (
          <option key={c.code} value={c.code}>
            {c.name}
          </option>
        ))}
      </select>
      <select
        value={sortOrder}
        onChange={handleSortOrderChange}
        className="ml-2 p-2 border border-black rounded text-black"
      >
        <option value="price_desc">Precio: Mayor a Menor</option>
        <option value="price_asc">Precio: Menor a Mayor</option>
      </select>
      <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
        Buscar
      </button>
    </form>
  );
};

export default SearchForm;
