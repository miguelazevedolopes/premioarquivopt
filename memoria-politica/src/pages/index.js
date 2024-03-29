import Head from 'next/head'
import { useState, useEffect, useCallback } from 'react'
import WordCloud from 'react-d3-cloud'
import Image from 'next/image'
import Search from './components/search'
import HemiCycle from './components/hemicycle'
import Link from 'next/link'
import commonWordsData from '../../public/common-words.json'
import { epilogue } from './_app'


import ps from '../../public/images/ps.png'
import psd from '../../public/images/psd.png'
import ch from '../../public/images/chega.png'
import il from '../../public/images/il.png'
import pan from '../../public/images/pan.png'
import livre from '../../public/images/livre.png'
import be from '../../public/images/bloco.png'
import pcp from '../../public/images/pcp.png'

function parseData(party) {
  const data = [];

  const values = Object.values(party);
  const totalValue = values.reduce((acc, cur) => parseInt(cur) + acc, 0);

  for (const [key, value] of Object.entries(party)) {
    const text = key.trim();
    const mappedValue = Math.floor((parseInt(value) / totalValue) * 10000);
    const clampedValue = Math.min(mappedValue, 10000);
    data.push({ text, value: clampedValue * 3});
  }

  return data;
}

export default function Home() {
  const [isClient, setIsClient] = useState(false)
  const [windowWidth, setWindowWidth] = useState(900);

  useEffect(() => {
    setIsClient(true)
    if (typeof window !== "undefined") {
      setWindowWidth(window.outerWidth);
    }
  }, [windowWidth])


  return (
    <>
      <Head>
        <title >Memória Política</title>
        <meta name="description" content="Um arquivo das páginas web dos partidos políticos Portugueses." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='bg-white p-0 sm:mt-5 sm:mb-20'>
        <div className='flex-col p-0 sm:m-auto'>

          {/* Titulo do Projecto */}
          <Link href='/' className='text-5xl lg:text-8xl font-extrabold inline-block select-none'>Memória Política</Link>
          <h3 id = "party-desc" className='sm:text-2xl mt-0 select-none'>Arquivo de informação e documentos dos websites de todos os partidos políticos com representação parlamentar atual em Portugal.</h3>

          {/* WordCloud */}
          <div className='bg-black mt-10 py-3 sm:pt-10 shadow-lg'>
            {isClient && <WordCloud data={parseData(commonWordsData['full'])} height={200} font={`${epilogue.style.fontFamily}`} fontWeight="bold" spiral='rectangular'
              rotate={0} fill='white' />}
          </div>
          <h2 className='text-xl font-bold select-none inline-block select-none mt-3 w-full text-center'>Palavras Mais Frequentes em toda a Coleção</h2>

          {/* Conheça os Partidos */}
          <div className='flex flex-wrap w-full justify-around mt-10 sm:px-36 py-10 p-0 items-center bg-gray-200 shadow-lg '>
            <h2 className='text-3xl lg:text-4xl font-extrabold select-none inline-block select-none mt-10 m-5 w-full text-center'>Conheça os Partidos</h2>

            <div className='flex flex-col w-1/3 sm:w-1/6  sm:m-10 m-5 items-strech'>
                <Link href={{
                    pathname: "/political-party",
                    query: {
                      name: 'Partido Socialista',
                    }, // the data
                  }}><Image className='rounded-full object-cover m-auto hover:scale-125 ease-in duration-500' src={ps} alt="PS" /></Link>
                <div className='flex justify-around mt-8'>
                  <h1 className='text-center text-lg w-fit m-auto font-bold'>Partido Socialista</h1>
                </div>
            </div>

             <div className='flex flex-col w-1/3 sm:w-1/6 sm:m-10 m-5'>
                <Link href={{
                    pathname: "/political-party",
                    query: {
                      name: 'Partido Social Democrata',
                    }, // the data
                  }}><Image className='rounded-full object-cover m-auto hover:scale-125 ease-in duration-500' src={psd} alt="PSD" /></Link>
                <div className='flex justify-around mt-8'>
                  <h1 className='text-center text-lg w-fit m-auto font-bold'>Partido Social Democrata</h1>
                </div>
            </div>

             <div className='flex flex-col w-1/3 sm:w-1/6 sm:m-10 m-5'>
                <Link href={{
                      pathname: "/political-party",
                      query: {
                        name: 'Chega',
                      }, // the data
                    }}><Image className='rounded-full object-cover m-auto hover:scale-125 ease-in duration-500' src={ch} alt="CH" /></Link>
                <div className='flex justify-around mt-8'>
                  <h1 className='text-center text-lg w-fit m-auto font-bold'>Chega</h1>
                </div>
            </div>

            <div className='flex flex-col w-1/3 sm:w-1/6 sm:m-10 m-5'>
                <Link href={{
                      pathname: "/political-party",
                      query: {
                        name: 'Iniciativa Liberal',
                      }, // the data
                    }}><Image className='rounded-full object-cover m-auto hover:scale-125 ease-in duration-500' src={il} alt="IL" /></Link>
                <div className='flex justify-around mt-8'>
                  <h1 className='text-center text-lg w-fit m-auto font-bold'>Iniciativa Liberal</h1>
                </div>
            </div>

            <div className='flex flex-col w-1/3 sm:w-1/6 sm:m-10 m-5'>
                <Link href={{
                      pathname: "/political-party",
                      query: {
                        name: 'Partido Comunista Português',
                      }, // the data
                    }}><Image className='rounded-full object-cover m-auto hover:scale-125 ease-in duration-500' src={pcp} alt="PCP" /></Link>
                <div className='flex justify-around mt-8'>
                  <h1 className='text-center text-lg w-fit m-auto font-bold'>Partido Comunista Português</h1>
                </div>
            </div>

            <div className='flex flex-col w-1/3 sm:w-1/6 sm:m-10 m-5'>
                <Link href={{
                      pathname: "/political-party",
                      query: {
                        name: 'Bloco de Esquerda',
                      }, // the data
                    }}><Image className='rounded-full object-cover m-auto hover:scale-125 ease-in duration-500' src={be} alt="BE" /></Link>
                <div className='flex justify-around mt-8'>
                  <h1 className='text-center text-lg w-fit m-auto font-bold'>Bloco de Esquerda</h1>
                </div>
            </div>

            <div className='flex flex-col w-1/3 sm:w-1/6 sm:m-10 m-5'>
                <Link href={{
                      pathname: "/political-party",
                      query: {
                        name: 'Pessoas-Animais-Natureza',
                      }, // the data
                    }}><Image className='rounded-full object-cover m-auto hover:scale-125 ease-in duration-500' src={pan} alt="PAN" /></Link>
                <div className='flex justify-around mt-8'>
                  <h1 className='text-center text-lg w-fit m-auto font-bold'>Pessoas-Animais-Natureza</h1>
                </div>
            </div>

            
            <div className='flex flex-col w-1/3 sm:w-1/6 sm:m-10 m-5'>
                <Link href={{
                      pathname: "/political-party",
                      query: {
                        name: 'Livre',
                      }, // the data
                    }}><Image className='rounded-full object-cover m-auto hover:scale-125 ease-in duration-500' src={livre} alt="Livre" /></Link>
                <div className='flex justify-around mt-8'>
                  <h1 className='text-center text-lg w-fit m-auto font-bold'>Livre</h1>
                </div>
            </div> 
            {/* Representação da Assembleia da República */}
            <h2 className='text-3xl lg:text-4xl font-extrabold select-none inline-block select-none mt-10 m-5 w-full text-center z-10'> Representação Atual na Assembleia da República</h2>
            <div id="parlamento" className='flex justify-center items-center w-full h-full'>
              <HemiCycle width={windowWidth<700 ? 300 :900} height={windowWidth<700 ? 180 :540} circleRadius={windowWidth<700 ? 4 :12} hemiRadius={windowWidth<700 ? 133.33 :400} offset={windowWidth<700 ? 8.333 :25} arcs={[18,21,24,27,30,33,36,41]} arcsLength={8} translate={windowWidth<700 ? 80 :250}/>
            </div>
          </div>

          <div id="explore-o-arquivo" className='flex flex-col'>
            <h2 className='text-3xl lg:text-4xl font-extrabold inline-block select-none mt-10'>Explore o Arquivo</h2>
            <h3 className='text-2xl mt-2 mb-10 select-none'>O Arquivo.PT contém páginas de web arquivadas desde 1996. Aqui poderá pesquisar sobre as páginas web dos partidos políticos representados na Assembleia da República desde 1996 ou, em muitos casos, desde a primeira página web que o partido teve.</h3>
            <Search value={''}/>
            <div className='transition-all sm:h-48 flex flex-wrap w-full justify-between mt-10 items-stretch sm:flex-nowrap'>
              <Link href="/search-results?q=programa eleitoral legislativas&date=[2019-01-01T00:00:00Z TO 2019-12-31T23:59:59Z]&party=IL" className="transition-all duration-1000 flex sm:basis-1/3 sm:hover:basis-1/2 p-6 m-4 sm:ml-0 bg-black border border-gray-200 justify-around items-center shadow hover:bg-black-900">
                <h5 className="text-white sm:text-2xl font-bold tracking-tight text-center text-gray-900"> Qual foi o programa eleitoral da Iniciativa Liberal para as Legislativas de 2019?</h5>
              </Link>
              <Link href="/search-results?q=aborto&party=&date" className="transition-all duration-1000 flex sm:basis-1/3 sm:hover:basis-1/2 p-6 m-4 border bg-black border-gray-200 justify-around items-center shadow hover:bg-black-900">
                <h5 className="sm:text-2xl font-bold text-white tracking-tight text-gray-900 text-center">Qual a posição dos partidos sobre o aborto?</h5>
              </Link>
              <Link href="/search-results?q=candidato presidencial&date=[2015-01-01T00:00:00Z TO 2016-02-01T23:59:59Z]&party=BLOCO" className="transition-all duration-1000 flex sm:basis-1/3 sm:hover:basis-1/2 p-6 m-4 sm:mr-0 bg-black border border-gray-200 justify-around items-center shadow hover:bg-black-900">
                <h5 className="sm:text-2xl font-bold text-white tracking-tight text-gray-900 text-center">Qual foi o candidato do Bloco de Esquerda às Eleições Presidenciais de 2016?</h5>
              </Link>
            </div>
          </div>

        </div>
      </main>
    </>
  )
}