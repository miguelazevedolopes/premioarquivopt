import Head from 'next/head'
import { useState, useEffect, useCallback } from 'react'
import WordCloud from 'react-d3-cloud'
import Image from 'next/image'
import Search from './components/search'
import HemiCycle from './components/hemicycle'
import Link from 'next/link'

import ps from '../../public/ps.png'
import psd from '../../public/psd.png'
import ch from '../../public/chega.png'
import il from '../../public/il.png'
import pan from '../../public/pan.png'
import livre from '../../public/livre.png'
import be from '../../public/bloco.png'
import pcp from '../../public/pcp.png'

export default function Home() {
  const [isClient, setIsClient] = useState(false)
  /*const [hoveredWord, setHoveredWord] = useState(null);*/

  useEffect(() => {
    setIsClient(true)
  }, [])

  const data = [
    { text: 'Democracia', value: 7000 },
    { text: 'Parlamento', value: 4500 },
    { text: 'Eleições', value: 200 },
    { text: 'Governo', value: 500 },
    { text: 'Constituição', value: 3000 },
    { text: 'Cidadania', value: 5000 },
    { text: 'Direitos', value: 2000 },
    { text: 'Deveres', value: 2000 },
    { text: 'Transparência', value: 1000 },
    { text: 'Justiça', value: 1000 },
    { text: 'Corrupção', value: 200 },
    { text: 'Liberdade', value: 2000 },
    { text: 'Segurança', value: 500 },
    { text: 'Orçamento', value: 400 },
    { text: 'Política', value: 3000 },
    { text: 'Igualdade', value: 700 },
  ];


  const onWordClick = useCallback((event, d) => {
    console.log(`onWordClick: ${d.text}`);
  }, []);
  const onWordMouseOver = useCallback((event, d) => {
    console.log(`onWordClick: ${d.text}`);
  }, []);
  const onWordMouseOut = useCallback((event, d) => {
    console.log(`onWordClick: ${d.value}`);
  }, []);


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
          <a href='/' className='text-5xl lg:text-8xl font-extrabold inline-block select-none'>Memória Política</a>
          <h3 className='sm:text-2xl mt-0 select-none'>Descriçãozinha mini do projeto, frase impactful.</h3>

          {/* WordCloud */}
          <div className='bg-black mt-10 py-3 sm:pt-10 shadow-lg'>
            {isClient && <WordCloud data={data} height={200} font='__Epilogue_dfeb11' fontWeight="bold" spiral='rectangular'
              rotate={0} fill='white' onWordClick={onWordClick} onWordMouseOver={onWordMouseOver} onWordMouseOut={onWordMouseOut} />}
          </div>

          {/* Conheça os Partidos */}
          <div className='flex flex-wrap w-full sm:justify-around mt-10 sm:px-36 sm:py-10 p-0 items-center bg-gray-200 shadow-lg '>
            <h2 className='text-3xl lg:text-4xl font-extrabold select-none inline-block select-none mt-10 m-5 w-full text-center'>Conheça os Partidos</h2>

            <div className='flex flex-col w-1/6 m-10 items-strech'>
                <Link href={{
                    pathname: "/political_party",
                    query: {
                      name: 'Partido Socialista',
                    }, // the data
                  }}><Image className='rounded-full object-cover m-auto hover:scale-125 ease-in duration-500' src={ps} alt="PS" /></Link>
                <div className='flex justify-around mt-8'>
                  <h1 className='text-center text-lg w-fit m-auto font-bold'>Partido Socialista</h1>
                </div>
            </div>

             <div className='flex flex-col w-1/6 m-10'>
                <Link href={{
                    pathname: "/political_party",
                    query: {
                      name: 'Partido Social Democrata',
                    }, // the data
                  }}><Image className='rounded-full object-cover m-auto hover:scale-125 ease-in duration-500' src={psd} alt="PSD" /></Link>
                <div className='flex justify-around mt-8'>
                  <h1 className='text-center text-lg w-fit m-auto font-bold'>Partido Social Democrata</h1>
                </div>
            </div>

             <div className='flex flex-col w-1/6 m-10'>
                <Link href={{
                      pathname: "/political_party",
                      query: {
                        name: 'Chega',
                      }, // the data
                    }}><Image className='rounded-full object-cover m-auto hover:scale-125 ease-in duration-500' src={ch} alt="CH" /></Link>
                <div className='flex justify-around mt-8'>
                  <h1 className='text-center text-lg w-fit m-auto font-bold'>Chega</h1>
                </div>
            </div>

            <div className='flex flex-col w-1/6 m-10'>
                <Link href={{
                      pathname: "/political_party",
                      query: {
                        name: 'Iniciativa Liberal',
                      }, // the data
                    }}><Image className='rounded-full object-cover m-auto hover:scale-125 ease-in duration-500' src={il} alt="IL" /></Link>
                <div className='flex justify-around mt-8'>
                  <h1 className='text-center text-lg w-fit m-auto font-bold'>Iniciativa Liberal</h1>
                </div>
            </div>

            <div className='flex flex-col w-1/6 m-10'>
                <Link href={{
                      pathname: "/political_party",
                      query: {
                        name: 'Partido Comunista Português',
                      }, // the data
                    }}><Image className='rounded-full object-cover m-auto hover:scale-125 ease-in duration-500' src={pcp} alt="PCP" /></Link>
                <div className='flex justify-around mt-8'>
                  <h1 className='text-center text-lg w-fit m-auto font-bold'>Partido Comunista Português</h1>
                </div>
            </div>

            <div className='flex flex-col w-1/6 m-10'>
                <Link href={{
                      pathname: "/political_party",
                      query: {
                        name: 'Bloco de Esquerda',
                      }, // the data
                    }}><Image className='rounded-full object-cover m-auto hover:scale-125 ease-in duration-500' src={be} alt="BE" /></Link>
                <div className='flex justify-around mt-8'>
                  <h1 className='text-center text-lg w-fit m-auto font-bold'>Bloco de Esquerda</h1>
                </div>
            </div>

            <div className='flex flex-col w-1/6 m-10'>
                <Link href={{
                      pathname: "/political_party",
                      query: {
                        name: 'Pessoas-Animais-Natureza',
                      }, // the data
                    }}><Image className='rounded-full object-cover m-auto hover:scale-125 ease-in duration-500' src={pan} alt="PAN" /></Link>
                <div className='flex justify-around mt-8'>
                  <h1 className='text-center text-lg w-fit m-auto font-bold'>Pessoas-Animais-Natureza</h1>
                </div>
            </div>

            
            <div className='flex flex-col w-1/6 m-10'>
                <Link href={{
                      pathname: "/political_party",
                      query: {
                        name: 'Livre',
                      }, // the data
                    }}><Image className='rounded-full object-cover m-auto hover:scale-125 ease-in duration-500' src={livre} alt="Livre" /></Link>
                <div className='flex justify-around mt-8'>
                  <h1 className='text-center text-lg w-fit m-auto font-bold'>Livre</h1>
                </div>
            </div> 
            {/* Representação da Assembleia da República */}
            <h2 className='text-3xl lg:text-4xl font-extrabold select-none inline-block select-none mt-10 m-5 w-full text-center z-10'>A sua representatividade na Assembleia da República</h2>
            <div id="parlamento" className='flex justify-center items-center w-full h-full'>
              <HemiCycle width={900} height={400} circleRadius={12} hemiRadius={400} offset={25} arcs={[18,21,24,27,30,33,36,41]}/>
            </div>
          </div>

          {/* Procure a Verdade */}
          <div id="procure-verdade" className='flex flex-col'>
            <h2 className='text-3xl lg:text-4xl font-extrabold inline-block select-none mt-10'>Procure a verdade</h2>
            <h3 className='text-2xl mt-2 mb-10 select-none'>É preciso meter isto bonitinho.</h3>
            <Search />
            <div className='transition-all h-48 flex flex-wrap w-full justify-between mt-10 items-stretch flex-nowrap'>
              <a href="#" className="transition-all duration-1000 flex basis-1/3 hover:basis-1/2 p-6 m-4 ml-0 bg-black border border-gray-200 justify-around items-center shadow hover:bg-black-900">
                <h5 className="text-white text-2xl font-bold tracking-tight text-center text-gray-900"> Qual foi o grupo parlamentar do PSD em 2019?</h5>
              </a>
              <a href="#" className="transition-all duration-1000 flex basis-1/3 hover:basis-1/2 p-6 m-4 border bg-black border-gray-200 justify-around items-center shadow hover:bg-black-900">
                <h5 className="text-2xl font-bold text-white tracking-tight text-gray-900 text-center">Qual a posição dos partidos sobre o aborto?</h5>
              </a>
              <a href="#" className="transition-all duration-1000 flex basis-1/3 hover:basis-1/2 p-6 m-4 mr-0 bg-black border border-gray-200 justify-around items-center shadow hover:bg-black-900">
                <h5 className="text-2xl font-bold text-white tracking-tight text-gray-900 text-center">Qual foi o candidato do Bloco de Esquerda às Eleições Presidenciais de 2016?</h5>
              </a>
            </div>
          </div>

        </div>
      </main>
    </>
  )
}