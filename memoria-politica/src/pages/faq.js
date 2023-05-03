import Head from 'next/head'
import { useEffect, useState } from 'react'

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
      "O <strong>corpus</strong> final utilizado está dividido em diversos <strong>corpus</strong> diferentes, correspondendo cada um deles a um dos partidos políticos presentes na Assembleia Portuguesa atualmente.<p>Estes <strong>corpus</strong> foram criados com base nos ficheiros HTML obtidos através do Arquivo.pt que é um repositório nacional que guarda informação sobre páginas WEB Portuguesas desde 1996.</p><p> Dado que cada partido tem, não só uma data de criação diferente, como também diferentes presenças online, cada corpus abarca períodos temporais diferentes (<strong>PSD</strong> 1999-Final de 2020, <strong>PS</strong> 1996-Final de 2020, <strong>Chega</strong> 2019-Final de 2020, <strong>IL</strong> 2017-Final de 2020, <strong>PCP</strong> 1996-Final de 2020, <strong>BE</strong> 2003-Final de 2020, <strong>Livre</strong> 2015-Final de 2020, <strong>PAN</strong> 2013-Final de 2020).</p>"

  }
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
                    <h1 className="text-3xl font-bold mb-2">{result.title}</h1>
                    <div className="text-gray-700"dangerouslySetInnerHTML={{ __html: result.description }}/>                 
                  </div>
                ))}
              </div>
          </div>
      </div>   
    </> 
      )
  }