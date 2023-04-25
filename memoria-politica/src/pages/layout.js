import Navbar from './navbar'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <footer className='m-28 pt-5 border-t border-slate-200 flex justify-between text-slate-500 dark:border-slate-200/5'>
        <h2 className='w-1/2'>A página Memória Política é uma compilação de informação retirada das páginas web dos partidos políticos atualmente representados na Assembleia da República, arquivadas pelo   <a href='https://arquivo.pt/'>Arquivo.pt</a> .</h2>
        <h2 >Miguel Lopes | Maria Carneiro | João Andrade</h2>
      </footer>
    </>
  )
}