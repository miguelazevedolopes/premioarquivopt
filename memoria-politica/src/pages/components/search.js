import { useState } from 'react';


const Search = ({value}) => {
  const [searchTerm, setSearchTerm] = useState(value);

  const handleSearch = async (e) => {
    e.preventDefault();
    window.location.href = `/search-results?q=${searchTerm}&abv=&party=&date=`;
  }

  return (
    <form onSubmit={handleSearch} className="flex items-center bg-gray-200 px-3 py-2 shadow-lg ">
      <input type="text" placeholder="Explore o Arquivo..." className="w-full outline-none bg-gray-200 text-gray-900 p-2 text-lg placeholder-gray-400" value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" className="outline-none focus:outline-none">
        <svg className="h-5 w-5 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M22 22l-6-6"></path>
          <circle cx="10" cy="10" r="8"></circle>
        </svg>
      </button>
    </form>
  );
};

export default Search;
