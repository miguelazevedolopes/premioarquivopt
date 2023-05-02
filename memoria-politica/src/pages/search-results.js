import {useState, useEffect, useCallback } from 'react'
import Search from './components/search'


const textColor = {
  PS: 'text-[#ff66ff]',
  PSD: 'text-[#f68a21]',
  CHEGA: 'text-[#333399]',
  IL: 'text-[#52c1ec]',
  PCP: 'text-[#EC1B24]',
  BE: 'text-[#000000]',
  PAN: 'text-[#036A84]',
  LIVRE: 'text-[#00CD8C]'
}

async function solrSearch(searchTerm){
  const query = '&q=' + searchTerm;

  const baseRequestUrl="http://localhost:8983/solr/parties/select?hl=on&hl.method=unified&defType=edismax&indent=true";

  let requestUrl=baseRequestUrl+'&q.op=AND';
  let response = await fetch(requestUrl,{
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'POST', 
    mode: 'cors',
    body:query+'&qf=title^5 text&rows=10&stopwords=true&synonyms=true'
  })

  const data = await response.json();
  return data;
}

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);

  useEffect( () => {(
    async () => {
      const urlParams = new URLSearchParams(window.location.search);

      const queryParam = urlParams.get('q');
      setSearchTerm(queryParam);

      const results = await solrSearch(searchTerm);
      setSearchResults(results.response.docs.sort((result) => result.date).reverse());

    })();
  }, [searchTerm]);


  return (
    <div className='flex-col p-0 sm:m-auto'>
        {/* Procure a Verdade */}
        <div id="results" className='flex flex-col'>
            <h2 className='text-3xl lg:text-5xl font-extrabold inline-block select-none mt-5 flex justify-center items-center'>Procure a verdade</h2>
            <div id = "searchForm">
             <Search/>
            </div>            
            <div className='search-results'>
              {searchResults.map((result) => (
                <a key={result.id} href={result.link}>
                  <div className="bg-white p-4 my-2 shadow-lg">
                    <div className='flex justify-between'>
                      <h2 className="text-xl font-bold mb-2">{result.title}</h2>
                      <div className='flex'>
                        <h2 className={`text-xl ${textColor[result.party]} font-bold mb-2`}>{result.party}</h2>
                        <h2 className="text-xl mb-2 ml-2 ">{result.date.slice(0,10)}</h2>
                      </div>
                    </div>
                    <p className="text-gray-700">{result.text.slice(0, 400)}...</p>
                  </div>
                </a>
              ))}
            </div>
        </div>
    </div>  
    )
}