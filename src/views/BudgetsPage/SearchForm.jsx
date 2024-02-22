'use client'

const SearchForm = ({
  query,
  country,
  sortOrder,
  handleSearchInputChange,
  handleCountryChange,
  handleSortOrderChange,
  handleSearchSubmit,
  countries,
}) => {
  return (
    <form onSubmit={handleSearchSubmit} className="mt-4 mb-4 flex flex-col sm:flex-row items-center justify-center">
      <input
        type="text"
        value={query}
        onChange={handleSearchInputChange}
        placeholder="Buscar productos..."
        className="p-2 border border-black rounded text-black mb-2 sm:mr-2"
        style={{ minWidth: '200px' }}
      />
      <select
        value={country}
        onChange={handleCountryChange}
        className="p-2 border border-black rounded text-black mb-2 sm:mr-2"
        style={{ minWidth: '100px' }}
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
        className="p-2 border border-black rounded text-black mb-2 sm:mr-2"
        style={{ minWidth: '100px' }}
      >
        <option value="price_desc">Precio: Mayor a Menor</option>
        <option value="price_asc">Precio: Menor a Mayor</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto md:mt-[-5px]">
        Buscar
      </button>
    </form>
  );
};

export default SearchForm;
