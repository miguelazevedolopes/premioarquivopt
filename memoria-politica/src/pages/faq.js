import Head from 'next/head'
import { useEffect, useState } from 'react'
import Link from 'next/link'


const faqs = [
  {
    id: 1,
    title: "Quem somos?",
    description:
      "Somos 3 estudantes de <strong>Engenharia Informática</strong> na <strong>FEUP</strong>  (Faculdade de Engenharia da Universidade do Porto) com um especial interesse na área de processamento e análise de dados e que decidiu aceitar este desafio como uma forma de melhor desenvolver as nossas capacidades, tanto técnicas como também de trabalho em equipa."
  },
  {
    id: 2,
    title: "Como é constituído o corpus?",
    description:
      "O <strong>corpus</strong> final utilizado está dividido em diversos <strong>corpus</strong> diferentes, correspondendo cada um deles a um dos partidos políticos presentes na Assembleia Portuguesa atualmente.<p>Estes <strong>corpus</strong> foram criados com base nos ficheiros HTML obtidos através do Arquivo.pt que é um repositório nacional que guarda informação sobre páginas WEB Portuguesas desde 1996.</p><p> Dado que cada partido tem, não só uma data de criação diferente, como também diferentes presenças online, cada corpus abarca períodos temporais diferentes (<strong>PSD</strong> 1999-2020, <strong>PS</strong> 1996-2020, <strong>Chega</strong> 2019-2020, <strong>IL</strong> 2017-2020, <strong>PCP</strong> 1996-2020, <strong>BE</strong> 2003-2020, <strong>Livre</strong> 2015-2020, <strong>PAN</strong> 2013-2020).</p>"

  },
  {
    id: 3,
    title: "Porque é que alguns partidos não estão incluídos?",
    description:
      "A nossa escolha dos partidos a incluir baseou-se na relevância atual para a população portuguesa: é importante sabermos e conhecermos a história de quem nos representa. No entanto, futuramente, planeamos em incluir o resto dos partidos existentes atualmente e, possivelmente, novos partidos que possam surgir."
  },
  {
    id: 3,
    title: "A Análise de Sentimento é confiável?",
    description: `A Análise de Sentimento é baseada em modelos de linguagem pré-treinados e aplicada aos textos retirados do Arquivo.pt. Para mais informação acerca da confiança do modelo, visite este <a href={"https://textblob.readthedocs.io/en/dev/quickstart.html#sentiment-analysis"}></a>`
  },
  
];


export default function SearchPage() {


  return (
    <>
      <Head>
        <title >FAQ</title>
        <meta name="description" content="Um arquivo das páginas web dos partidos políticos Portugueses." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex-col p-0 sm:m-auto'>
        <div id="faq" className='flex flex-col mx-12'>
          <h2 className='text-3xl lg:text-4xl font-extrabold inline-block select-none mt-10 flex justify-center items-center'>FAQ</h2>
          <div className='mt-5'>
            {faqs.map((result) => (
              <div key={result.id} className="bg-white p-4 my-2 shadow-lg">
                <h1 className="text-3xl font-bold mb-4">{result.title}</h1>
                <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: result.description }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}