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

async function solrSearch(searchTerm, party, start, dateRange){

  const baseRequestUrl="http://localhost:8983/solr/parties/select?hl=on&hl.method=unified&defType=edismax&indent=true";
  party= (party!=null && party!='') ? '&fq=party:' + party : ''
  const query = '&q=' + searchTerm;
  start = (start!=null && start!='') ? '&start=' + start : ''
  dateRange = (dateRange!=null && dateRange!='') ? '&fq=date:' + dateRange : ''
  
  let requestUrl=  baseRequestUrl+'&q.op=AND';
  let response = await fetch(requestUrl,{
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'POST', 
    mode: 'cors',
    body: query+'&qf=title^5 text'+party+dateRange+'&rows=10'+start+"&stopwords=true&synonyms=true"
  })

  const data = await response.json();
  return data;
}

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect( () => {(
    async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const queryParam = urlParams.get('q');
      setSearchTerm(queryParam);

      const abv = urlParams.get('abv')
      const party = urlParams.get('party')
      const dateRange = urlParams.get('date')
      const start = urlParams.get('start')

      const results = await solrSearch(abv? abv: searchTerm, party, start, dateRange);
      setSearchResults(results.response.docs);

    })();
  }, [searchTerm]);


  return (
    <div className='flex-col p-0 px-12 sm:m-auto'>
        {/* Procure a Verdade */}
        <div id="results" className='flex flex-col'>
            <h2 className='text-3xl lg:text-5xl font-extrabold inline-block select-none mt-5 flex justify-center items-center'>Procure a verdade</h2>
            <div id = "searchForm">
             {searchTerm ? <Search value={searchTerm}/> : <></>}
            </div>            
            <div className='search-results'>
              { searchResults.length > 0? searchResults.map((result) => (
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
              )) : 
              <h2 className="text-xl text-center mb-2">Não foram encontrados resultados.</h2>
              }
            </div>
        </div>
    </div>  
    )
}