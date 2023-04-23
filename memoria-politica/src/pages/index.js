import Head from 'next/head'
import { TagCloud } from 'react-tagcloud' // esta foi a unica biblioteca de wordclouds que consegui meter a funcionar
// se arranjarem uma melhor aceito


export default function Home() {
  const data = [
    {
      value: 'JavaScript', count: 38,
      props: {
        title: 38, // quando se dá hover aparece o número de ocorrencias
        style: {
          color: 'white',
        },
      },
    },
    { value: 'React', count: 30 },
    { value: 'Nodejs', count: 28 },
    { value: 'Express.js', count: 25 },
    { value: 'HTML5', count: 33 },
    { value: 'MongoDB', count: 18 },
    { value: 'CSS3', count: 20 }
  ]


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
          <h1 className='text-5xl lg:text-7xl font-extrabold inline-block select-none'>Memória Política</h1>
          <h3 className='text-2xl mt-0 select-none'>Descriçãozinha mini do projeto, frase impactful.</h3>
          <div className='flex justify-center items-center h-80 w-100 bg-black mt-10'>
            <TagCloud
              minSize={12}
              maxSize={35}
              tags={data}
              onClick={tag => alert(`'${tag.value}' was selected!`)}
            />
          </div>
        </div>

      </main>
    </>
  )
}