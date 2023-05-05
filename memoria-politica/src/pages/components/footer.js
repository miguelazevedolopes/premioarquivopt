import Link from 'next/link'

export default function Footer() {
  return (
    <>
      <footer className='m-28 pt-5 border-t border-slate-200 flex justify-between text-slate-500'>
        <h2 className='w-1/2'>A página Memória Política é uma compilação de informação retirada das páginas web dos partidos políticos atualmente representados na Assembleia da República, arquivadas pelo   <Link href='https://arquivo.pt/'>Arquivo.pt</Link> .</h2>

        <div className="flex justify-around">
          <Link href='https://www.linkedin.com/in/miguelazevedolopes/' className="pr-2">Miguel Lopes</Link>|
          <Link href='https://www.linkedin.com/in/maria-carneiro-b15394206/' className="px-2">Maria Carneiro</Link>|
          <Link href='https://www.linkedin.com/in/jo%C3%A3o-afonso-andrade-182b221b9/' className="pl-2">João Andrade</Link>
        </div>
      </footer>
    </>
  )
}