import Head from 'next/head'
import { useState, useEffect, useCallback } from 'react'
import WordCloud from 'react-d3-cloud'
import { redirect } from 'next/dist/server/api-utils'

// esta foi a unica biblioteca de wordclouds que consegui meter a funcionar
// se arranjarem uma melhor aceito
import ps from '../../public/ps.png'
import Image from 'next/image'

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
      <main className='bg-white mt-5 mb-20'>
        <div className='flex-col m-auto'>

          {/* Titulo do Projecto */}
          <a href='/' className='text-5xl lg:text-8xl font-extrabold inline-block select-none'>Memória Política</a>
          <h3 className='text-2xl mt-0 select-none'>Descriçãozinha mini do projeto, frase impactful.</h3>

          {/* WordCloud */}
          <div className='bg-black mt-10 pt-10'>
            {isClient && <WordCloud data={data} height={200} font='__Epilogue_dfeb11' fontWeight="bold" spiral='rectangular'
              rotate={0} fill='white' onWordClick={onWordClick} onWordMouseOver={onWordMouseOver} onWordMouseOut={onWordMouseOut} />}
          </div>

          {/* Conheça os Partidos */}
          <div className='flex flex-wrap w-full justify-around mt-10 p-10 bg-gray-200'>
            <h2 className='text-3xl lg:text-4xl font-extrabold select-none inline-block select-none mt-10 m-5 w-full text-center'>Conheça os Partidos</h2>

            <div className='flex flex-col w-1/5 m-7'>
              <a href="" className='flex flex-col w-fit p-5'>
                <Image className='rounded-full object-cover m-auto' src={ps} alt="PS" />
                <div className='flex justify-around mt-8'>
                  <h1 className='text-center text-lg w-fit m-auto font-bold'>Partido Socialista</h1>
                </div>
              </a>
            </div>

            <div className='flex flex-col w-1/5 m-7'>
              <a href="" className='flex flex-col w-fit p-5'>
                <Image className='rounded-full object-cover m-auto' src={ps} alt="PS" />
                <div className='flex justify-around mt-8'>
                  <h1 className='text-center text-lg w-fit m-auto font-bold'>Partido Socialista</h1>
                </div>
              </a>
            </div>

            <div className='flex flex-col w-1/5 m-7'>
              <a href="" className='flex flex-col w-fit p-5'>
                <Image className='rounded-full object-cover m-auto' src={ps} alt="PS" />
                <div className='flex justify-around mt-8'>
                  <h1 className='text-center text-lg w-fit m-auto font-bold'>Partido Socialista</h1>
                </div>
              </a>
            </div>

            <div className='flex flex-col w-1/5 m-7'>
              <a href="" className='flex flex-col w-fit p-5'>
                <Image className='rounded-full object-cover m-auto' src={ps} alt="PS" />
                <div className='flex justify-around mt-8'>
                  <h1 className='text-center text-lg w-fit m-auto font-bold'>Partido Socialista</h1>
                </div>
              </a>
            </div>

            <div className='flex flex-col w-1/5 m-7'>
              <a href="" className='flex flex-col w-fit p-5'>
                <Image className='rounded-full object-cover m-auto' src={ps} alt="PS" />
                <div className='flex justify-around mt-8'>
                  <h1 className='text-center text-lg w-fit m-auto font-bold'>Partido Socialista</h1>
                </div>
              </a>
            </div>

            <div className='flex flex-col w-1/5 m-7'>
              <a href="" className='flex flex-col w-fit p-5'>
                <Image className='rounded-full object-cover m-auto' src={ps} alt="PS" />
                <div className='flex justify-around mt-8'>
                  <h1 className='text-center text-lg w-fit m-auto font-bold'>Partido Socialista</h1>
                </div>
              </a>
            </div>

            <div className='flex flex-col w-1/5 m-7'>
              <a href="" className='flex flex-col w-fit p-5'>
                <Image className='rounded-full object-cover m-auto' src={ps} alt="PS" />
                <div className='flex justify-around mt-8'>
                  <h1 className='text-center text-lg w-fit m-auto font-bold'>Partido Socialista</h1>
                </div>
              </a>
            </div>

            <div className='flex flex-col w-1/5 m-7'>
              <a href="" className='flex flex-col w-fit p-5'>
                <Image className='rounded-full object-cover m-auto' src={ps} alt="PS" />
                <div className='flex justify-around mt-8'>
                  <h1 className='text-center text-lg w-fit m-auto font-bold'>Partido Socialista</h1>
                </div>
              </a>
            </div>

          </div>

          <div id="procure-verdade" className='flex flex-col'>
            <h2 className='text-3xl lg:text-4xl font-extrabold inline-block select-none mt-10'>Procure a verdade</h2>
            <h3 className='text-2xl mt-2 mb-10 select-none'>É preciso meter isto bonitinho.</h3>

            <input type="search" name="" id="" className='bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
          </div>

        </div>
      </main>
    </>
  )
}