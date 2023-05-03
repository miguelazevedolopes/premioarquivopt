import Head from 'next/head'
import {useState, useEffect, useCallback } from 'react'
import WordCloud from 'react-d3-cloud'
import { useRouter } from "next/router";
import DoughnutChart from './components/doughnut';
import commonWordsData from '../../public/common-words.json'
import Timeline from './components/timeline';
import Personalities from './components/personalities';

const textColor = {
  'Partido Socialista': 'text-[#ff66ff]',
  'Partido Social Democrata': 'text-[#f68a21]',
  'Chega': 'text-[#333399]',
  'Iniciativa Liberal': 'text-[#52c1ec]',
  'Partido Comunista Português': 'text-[#EC1B24]',
  'Bloco de Esquerda': 'text-[#8B0000]',
  'Pessoas-Animais-Natureza': 'text-[#036A84]',
  'Livre': 'text-[#00CD8C]'
}


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


export default function PoliticalParty() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false)

  const query = router.query;
  let data = query.name ? parseData(commonWordsData[query.name][0]) : [];
  
  useEffect(() => {
    setIsClient(true)
  }, []) 

  return (
    <>
      <Head>
        <title >{query.name}</title>
        <meta name="description" content="Um arquivo das páginas web dos partidos políticos Portugueses." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='mt-5'>
        <div className='flex-col m-auto'>
          <h1 href='' className={`text-5xl lg:text-8xl ${textColor[query.name]} font-extrabold inline-block select-none`}>{query.name}</h1>
          <h3 className='text-2xl mt-0 select-none'>'.'</h3>
          <div className='bg-black mt-10 py-3 sm:pt-10 shadow-lg'>
            { isClient && <WordCloud data={data} height={200} font='__Epilogue_dfeb11' fontWeight="bold" spiral='rectangular'
                            rotate={0} fill='white'  /> }
          </div>

          {/* Personalidades */}
          <Personalities party={query.name}/>
          
          <div id="procure-verdade" className='flex flex-col'>
            <h2 className='text-3xl lg:text-4xl font-extrabold inline-block select-none mt-10'>Perca-se no Tempo</h2>
            <h3 className='text-2xl mt-2 mb-10 select-none'>É preciso meter isto bonitinho.</h3>
            <div className='flex justify-around'>
                <Timeline width={1000} height={500} party={query.name}></Timeline>
            </div>
          </div>

          <div id="mentions" className='flex flex-col'>
            <h2 className='text-3xl lg:text-4xl font-extrabold inline-block select-none mt-10'>Outros Partidos</h2>
            <h3 className='text-2xl mt-2 mb-10 select-none'>É preciso meter isto bonitinho.</h3>
            {query.name ? <DoughnutChart politicalParty = {query.name}></DoughnutChart> : <></>}
          </div>
            
        </div>
      </main>
    </>
  )
}