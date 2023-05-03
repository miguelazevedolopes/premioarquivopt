import {useState, useEffect, useCallback } from 'react'
import Search from './components/search'
import MultiSelect from 'multiselect-react-dropdown';

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

async function solrSearch(searchTerm, party, start=0, dateRange){

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
  const [currentPage, setCurrentPage] = useState(1);
  const [abv, setAbv] = useState(null);
  const [party, setParty] = useState(null);
  const [dateRange, setDateRange] = useState(null);
  const [start, setStart] = useState(null);

  useEffect( () => {(
    async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const queryParam = urlParams.get('q');
      setSearchTerm(queryParam);

      setAbv(urlParams.get('abv'))
      party ? setParty(party) : setParty(urlParams.get('party'))
      setDateRange(urlParams.get('date'))
      setStart(urlParams.get('start'))

      const results = await solrSearch(abv? abv: searchTerm, party, start, dateRange);
      setSearchResults(results.response.docs);

    })();
  }, [searchTerm, party]);

  const handlePrevious = useCallback(() => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      const newStart = (newPage - 1) * 10;
      solrSearch(abv? abv: searchTerm, party, newStart, dateRange)
        .then((results) => {
          setSearchResults(results.response.docs);
        })
        .catch((error) => console.error(error));
    }
  }, [currentPage, searchTerm, party, dateRange]);

  const handleNext = useCallback(() => {
    if (searchResults.length === 10) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      const newStart = (newPage - 1) * 10;

      solrSearch(abv? abv: searchTerm, party, newStart, dateRange)
        .then((results) => {
          setSearchResults(results.response.docs);
        })
        .catch((error) => console.error(error));
    }
  }, [currentPage, searchTerm, party, dateRange, searchResults]);


  const options = [{name: 'PS'}, {name: 'PSD'}, {name: 'CH'}, {name: 'IL'}, {name: 'PCP'}, {name: 'BLOCO'}, {name: 'PAN'}, {name: 'LIVRE'}];
  const [selectedOptions, setSelectedOptions] = useState([]);

  const onChangeParties = (selectedList) => {

    let partyFilter = "("
    for (let option in selectedList){
        partyFilter = partyFilter + selectedList[option].name + ' OR ';
    }
    partyFilter = partyFilter.slice(0, -4);
    partyFilter = partyFilter + ')';

    setParty(partyFilter);
    setSelectedOptions(selectedList);
    setCurrentPage(1);
  }


  return (
    <div className='flex-col p-0 px-12 sm:m-auto'>
        {/* Procure a Verdade */}
        <div id="results" className='flex flex-col'>
            <h2 className='text-3xl lg:text-5xl font-extrabold inline-block select-none mt-5 flex justify-center items-center'>Procure a verdade</h2>
            <div id = "searchForm">
             {searchTerm ? <Search value={searchTerm}/> : <></>}
            </div> 
            <div id="partyFilter" className='mt-5'>
              <MultiSelect options={options} selectedValues={selectedOptions} onSelect={onChangeParties} onRemove={onChangeParties} avoidHighlightFirstOption={true} placeholder="" displayValue="name" showCheckbox={true} 
                className='w-full accent-gray-900'/>
              </div>           
            <div className='pt-5'>
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
              <div id="pagination" className='flex justify-center mt-10'>
              { currentPage > 1 ?               
              <a href="#" className="inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={handlePrevious}>
                <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
                Previous
              </a> : <></>
              }
              <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={handleNext}>
                Next
                <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </a>
              </div>
        </div>
    </div>  
    )
}