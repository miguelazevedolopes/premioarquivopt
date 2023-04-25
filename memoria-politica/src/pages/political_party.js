import Head from 'next/head'
import {useState, useEffect, useCallback } from 'react'
import WordCloud from 'react-d3-cloud'
import { useRouter } from "next/router";

// esta foi a unica biblioteca de wordclouds que consegui meter a funcionar
// se arranjarem uma melhor aceito

export default function PoliticalParty() {
  const [isClient, setIsClient] = useState(false)

  const router = useRouter();
  const query = router.query;


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
    { text: 'Política', value: 3000      },
    { text: 'Igualdade', value: 700      },
    ];

    
  const onWordClick = useCallback((word) => {
    window.location.href = '/';
    console.log(`onWordClick: ${word}`);
  }, []);

  function handleWordMouseOver(event, word) {
    console.log(`Mouse over: ${word.text}`);
  }
  
  function handleWordMouseOut(event, word) {
    console.log(`Mouse out: ${word.text}`);
  }
  

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
          <a href='/' className='text-5xl lg:text-8xl font-extrabold inline-block select-none'>{query.name}</a>
          <h3 className='text-2xl mt-0 select-none'>Descriçãozinha mini do projeto, frase impactful.</h3>
          <div className='bg-black h-100 w-100 mt-10'>
            { isClient && <WordCloud data={data} height={200} font='__Epilogue_dfeb11' fontWeight="bold" spiral='rectangular'
                            rotate={0} fill='white' onWordClick={onWordClick}   onWordMouseOver={handleWordMouseOver} 
                            onWordMouseOut={handleWordMouseOut}   /> }
          </div>
          <a href='/' className='text-3xl lg:text-4xl font-extrabold inline-block select-none mt-10'>Conheça os Partidos</a>
        </div>
      </main>
    </>
  )
}