import Head from 'next/head'
import {useState, useEffect, useCallback } from 'react'
import WordCloud from 'react-d3-cloud'
import { redirect } from 'next/dist/server/api-utils'
// esta foi a unica biblioteca de wordclouds que consegui meter a funcionar
// se arranjarem uma melhor aceito

export default function Home() {
  const [isClient, setIsClient] = useState(false)
  /*const [hoveredWord, setHoveredWord] = useState(null);*/

  useEffect(() => {
    setIsClient(true)
  }, [])

  const data = [
    { text: 'Democracia', value: 7000    },
    { text: 'Parlamento', value: 4500    },
    { text: 'Eleições', value: 200       },
    { text: 'Governo', value: 500        },
    { text: 'Constituição', value: 3000  },
    { text: 'Cidadania', value: 5000     },
    { text: 'Direitos', value: 2000      },
    { text: 'Deveres', value: 2000       },
    { text: 'Transparência', value: 1000 },
    { text: 'Justiça', value: 1000       },
    { text: 'Corrupção', value: 200      },
    { text: 'Liberdade', value: 2000     },
    { text: 'Segurança', value: 500      },
    { text: 'Orçamento', value: 400      },
    { text: 'Política', value: 3000      }
    ];

    
  const onWordClick = useCallback((word) => {
    window.location.href = '/';
    console.log(`onWordClick: ${word}`);
  }, []);
  // não consegui por a dar hover tentem if u want
  /*const onWordMouseOver = useCallback((word) => {
    setHoveredWord(word);
    console.log(`onWordMouseOver: ${word}`);
  }, []);
  const onWordMouseOut = useCallback((word) => {
    setHoveredWord(null);
    console.log(`onWordMouseOut: ${word}`);
  }, []);*/

  return (
    <>
      <Head>
        <title >Memória Política</title>
        <meta name="description" content="Um arquivo das páginas web dos partidos políticos Portugueses." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='mt-5'>
        <div className='flex-col m-auto'>
          <a href='/' className='text-5xl lg:text-7xl font-extrabold inline-block select-none'>Memória Política</a>
          <h3 className='text-2xl mt-0 select-none'>Descriçãozinha mini do projeto, frase impactful.</h3>
          <div className='bg-black h-100 w-100 mt-10'>
            { isClient && <WordCloud data={data} height={200} font='__Epilogue_dfeb11' fontWeight="bold" spiral='rectangular'
                            rotate='0' fill='white' onWordClick={onWordClick} /*onWordMouseOver={onWordMouseOver} onWordMouseOut={onWordMouseOut}*/  /> }
          </div>
        </div>

      </main>
    </>
  )
}