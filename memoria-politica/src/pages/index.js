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
        <h1 className='display-1 fw-bolder'>Memória Política</h1>
        <h3>Descriçãozinha mini do projeto, frase impactful.</h3>
      </main>
    </>
  )
}