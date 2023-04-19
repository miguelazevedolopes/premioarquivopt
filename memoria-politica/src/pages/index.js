import Head from 'next/head'


export default function Home() {
  return (
    <>
      <Head>
        <title>Memória Política</title>
        <meta name="description" content="Um arquivo das páginas web dos partidos políticos Portugueses." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='mt-5'>
        <div className='flex-col m-auto'>
          <h1 className='text-5xl lg:text-7xl font-extrabold inline-block'>Memória Política</h1>
          <h3 className='text-2xl mt-0'>Descriçãozinha mini do projeto, frase impactful.</h3>
          <div className='flex justify-center items-center h-80 w-100 bg-black mt-10'>
            <h2 className='text-white text-center'>Aqui é para meter uma wordcloud geral?</h2>
          </div>
        </div>

      </main>
    </>
  )
}