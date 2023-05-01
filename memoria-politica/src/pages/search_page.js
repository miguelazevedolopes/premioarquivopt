import {useState, useEffect, useCallback } from 'react'
import Search from './components/search'


function SearchResultBox({ title, description }) {
    return (
      <div className="bg-white p-4 my-2 shadow-lg">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700">{description}</p>
      </div>
    );
  }
  
function SearchResults({ results }) {
    return (
      <div className='search-results'>
        {results.map((result) => (
          <SearchResultBox
            key={result.id}
            title={result.title}
            description={result.description}
          />
        ))}
      </div>
    );
  }

const results = [
    {
      id: 1,
      title: "The Truth About Cats and Dogs",
      description:
        "Learn about the differences between cats and dogs, and find out which one makes a better pet."
    },
    {
      id: 2,
      title: "10 Myths About Nutrition and Fitness",
      description:
        "Discover the truth about common myths related to nutrition and fitness, and learn how to stay healthy and fit."
    },
    {
      id: 3,
      title: "The History of the Internet",
      description:
        "Explore the origins of the internet, and learn how it has evolved over the years to become an integral part of our lives."
    },
    {
      id: 4,
      title: "The Benefits of Meditation",
      description:
        "Discover the many benefits of meditation, including reduced stress, improved focus, and greater emotional wellbeing."
    }
  ];

export default function SearchPage() {
  

  return (
    <div className='flex-col p-0 sm:m-auto'>
        {/* Procure a Verdade */}
        <div id="procure-verdade" className='flex flex-col'>
            <h2 className='text-3xl lg:text-4xl font-extrabold inline-block select-none mt-10 flex justify-center items-center'>Procure a verdade</h2>
            <div id = "searchForm">
             <Search />
            </div>            
            <SearchResults results = {results}></SearchResults>
        </div>
    </div>  
    )
}