import { useState, useEffect, useCallback } from 'react'
import Search from './components/search'
import Link from 'next/link'
import Head from 'next/head'


const textColor = {
  PS: 'text-[#ff66ff]',
  PSD: 'text-[#f68a21]',
  CHEGA: 'text-[#333399]',
  IL: 'text-[#52c1ec]',
  PCP: 'text-[#EC1B24]',
  BLOCO: 'text-[#8B0000]',
  PAN: 'text-[#036A84]',
  LIVRE: 'text-[#00CD8C]'
}

async function solrSearch(searchTerm, party, start = 0, dateRange) {

  const baseRequestUrl = "http://localhost:8983/solr/parties/select?hl=on&hl.method=unified&defType=edismax&indent=true&facet=true&facet.field=party";

  party = (party != null && party != '') ? '&fq=party:' + party : ''
  const query = '&q=' + searchTerm;
  start = (start != null && start != '') ? '&start=' + start : ''
  dateRange = (dateRange != null && dateRange != '') ? '&fq=date:' + dateRange : ''

  let requestUrl = baseRequestUrl + '&q.op=AND';
  let response = await fetch(requestUrl, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    mode: 'cors',
    body: query + '&qf=title^5 text' + party + dateRange + '&rows=10' + start + "&stopwords=true&synonyms=true"
  })

  const data = await response.json();

  console.log(data)
  return data;
}

export default function SearchPage() {
  const [year, setYear] = useState("")
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [party, setParty] = useState(null);
  const [dateRange, setDateRange] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [highlights, setHighlights] = useState(0);
  const [options, setOptions] = useState([{ name: 'PS', label:'PS', selected : false }, { name: 'PSD', label: 'PSD', selected: false }, { name: 'CHEGA', label: 'CHEGA', selected: false  }, { name: 'IL' , label: 'IL', selected: false }, 
                { name: 'PCP', label:'PCP', selected : false }, { name: 'BLOCO', label:'BLOCO', selected: false }, { name: 'PAN', label:'PAN', selected: false }, { name: 'LIVRE', label:'LIVRE', selected: false }]);

  // makes the Solr query for the results
  useEffect(() => {
    (
      async () => {
        if(searchTerm){
          const results = await solrSearch(searchTerm, party, '', dateRange);
          setSearchResults(results.response.docs);
          setTotalResults(results.response.numFound);
          setHighlights(results.highlighting);

          console.log(results.highlighting);
        }
      })();
  }, [searchTerm, dateRange, party]);


  // gets the facet results
  useEffect(() => {
    (
      async () => {
        const results = await solrSearch(searchTerm, '', '', dateRange);

        const facets = results.facet_counts.facet_fields.party
        const facetedOptions = [];
        for (let i = 0; i < facets.length; i += 2) {
          const name = facets[i];
          const results = i + 1 < facets.length ? facets[i + 1] : 0;
          const label = name + ' (' + results + ')';
          const selected = options.find(option => option.name == name).selected;
          facetedOptions.push({name, label, selected});
        }

        setOptions(facetedOptions);

      })();
  }, [searchTerm, dateRange]);


  // updates the parameters to filter by party and year
  useEffect(() => {
    (async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const updatedOptions = options.map((option) => option.name == urlParams.get('party') ? {name: urlParams.get('party'), label:option.label, selected: true} : option)

      setSearchTerm(urlParams.get('q'));
      setParty(urlParams.get('party'));
      setDateRange(urlParams.get('date'));
      setOptions(updatedOptions);
      setYear(urlParams.get('date') == null ? "": urlParams.get('date').substring(1,5));
    })();
  }, []);

  // handles previous pagination
  const handlePrevious = useCallback(() => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      const newStart = (newPage - 1) * 10;
      solrSearch(searchTerm, party, newStart, dateRange)
        .then((results) => {
          setSearchResults(results.response.docs);
        })
        .catch((error) => console.error(error));
    }
  }, [currentPage, searchTerm, party, dateRange]);

  // handles next pagination
  const handleNext = useCallback(() => {
    if (searchResults.length === 10) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      const newStart = (newPage - 1) * 10;

      solrSearch(searchTerm, party, newStart, dateRange)
        .then((results) => {
          setSearchResults(results.response.docs);
        })
        .catch((error) => console.error(error));
    }
  }, [currentPage, searchTerm, party, dateRange, searchResults]);

  // handles party selection
  const onSelectParty = (option) => {
    const updatedOptions = options.map((item) =>
      item.name === option.name ? { ...item, selected: !item.selected } : item
    );

    let partyFilter = "("
    let anyParty = false;
    for (let option in updatedOptions) {
      if(updatedOptions[option].selected){
        partyFilter = partyFilter + updatedOptions[option].name + ' OR ';
        anyParty = true;
      }
    }
    partyFilter = partyFilter.slice(0, -4);
    partyFilter = partyFilter + ')';

    if(!anyParty) partyFilter = "";
    
    setParty(partyFilter);
    setOptions(updatedOptions);
    setCurrentPage(1);
  }

  // updates years available
  const optionsYear = (() => {
    let options = [<option key={"empty-year"} value="" ></option>]
    for (let y = 1996; y < 2021; y++) {
      options.push(<option key={y} value={y.toString()}>{y.toString()}</option>)
    }
    return options
  })();

  // handles dropdown changes for year
  const handleDropdownChange = (event) => {
    const year = event.target.value;
    const date = year === "" ? year : `[${year}-01-01T00:00:00Z TO ${year}-12-31T23:59:59Z]`;
    setYear(year);
    setDateRange(date);
    setCurrentPage(1);
  }

  return (
    <>
    <Head>
      <title >Explore o Arquivo</title>
      <meta name="description" content="Um arquivo das páginas web dos partidos políticos Portugueses." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    
    <div className='flex-col p-0 px-4 sm:px-12 sm:m-auto'>
      {/* Procure a Verdade */}
      <div id="results" className='flex flex-col'>
        <h2 className='text-3xl lg:text-5xl font-extrabold inline-block select-none mt-5 flex justify-center items-center'>Explore o Arquivo</h2>
        <div id="searchForm">
          {searchTerm ? <Search value={searchTerm} /> : <></>}
        </div>
        <div id="partyFilter" className='flex justify-between flex-wrap sm:flex-nowrap'>
          <div className='w-full sm:w-2/3 sm:w-4/5 mr-5 sm:mr-10'>
            <h1 className='text-gray-900 text-lg mt-5 font-bold pb-2'> Filtrar por Partido</h1> 
            <div className='flex flex-wrap sm:flex-nowrap justify-start mt-2'>
              {options.length > 0 ? options.map((option) => (
                <div  key={option.name} className='my-2 sm:my-0 mx-2' >
                  { option.selected ? 
                    <button htmlFor={option.name} onClick={() => onSelectParty(option)} className="text-white bg-black text-xs py-3 px-4 rounded-full cursor-pointer transition-colors duration-200 ease-in-out "> {option.label} </button>
                  : <button htmlFor={option.name} onClick={() => onSelectParty(option)} className="bg-gray-300 hover:text-white hover:bg-black text-xs py-3 px-4 border-gray-300 rounded-full cursor-pointer transition-colors duration-200 ease-in-out"> {option.label} </button>}
                </div>
              )): <></>}
            </div> 
          </div>
          <div className='w-full sm:w-1/3 sm:w-1/5'>
            <h1 className='text-gray-900 text-lg mt-5 font-bold pb-2'> Filtrar por Ano</h1>
            <select name="year" value={year} onChange={handleDropdownChange} className="bg-gray-50 border border-gray-300 rounded-lg w-full h-12 focus:ring-blue-500 focus:border-blue-500 block p-2.5 font-extrabold">
              {optionsYear}
            </select>
          </div>
        </div>
        <div className='pt-2'>
          <h5 className='text-gray-400'> {totalResults} Resultados Encontrados</h5>
          {searchResults.length > 0 ? searchResults.map((result) => (
            <a key={result.id} href={result.link}>
              <div className="bg-white p-4 my-2 shadow-lg">
                <div className='flex justify-between flex-wrap sm:flex-nowrap'>
                  <h2 className="text-xl font-bold mb-2">{result.title}</h2>
                  <div className='flex'>
                    <h2 className={`text-xl ${textColor[result.party]} font-bold mb-2`}>{result.party}</h2>
                    <h2 className="text-xl mb-2 ml-2 ">{result.date.slice(0, 10)}</h2>
                  </div>
                </div>
                <p className="text-gray-700 break-words" dangerouslySetInnerHTML={{ __html: highlights[result.id].text.toString().replaceAll('<em>', '<strong>').replaceAll('</em>', '</strong>') }}/>
              </div>
            </a>
          )) :
            <h2 className="text-xl text-center mb-2">Não foram encontrados resultados.</h2>
          }
        </div>
        <div id="pagination" className='flex justify-center mt-10'>
          {currentPage > 1 ?
            <div className="inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={handlePrevious}>
              <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
              Previous
            </div> : <></>
          }
          <div className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={handleNext}>
            Next
            <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}