import React, { useState, useEffect } from "react";
import Link from 'next/link'
import { useRouter } from "next/router";


export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const router = useRouter();

  useEffect(() => {
    setShowDropdown(false); // close dropdown on route change
  }, [router]);

  return (
    <>
      <div className="flex w-full justify-between">
        <div className="sm:ml-12 py-7 pl-10 sm:px-12 flex">
          {router.route=='/' ? "" : <a href="/" className="self-center font-bold text-2xl sm:text-3xl">Memória Política</a>}
          
        </div>
        <ul className="bg-white flex justify-end p-6 relative">

          <li className="mr-0">
            <button id="dropdownParties" data-dropdown-toggle="dropdownParties" onClick={toggleDropdown} className="flex items-center justify-between w-full p-3 sm:p-7 sm:text-xl hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:w-auto dark:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent font-bold"> Partidos Políticos <svg className="w-5 h-5 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg></button>
            <div id="dropdownParties" className={`fixed z-10 font-normal bg-white divide-y divide-gray-100 shadow w-44 dark:bg-gray-700 dark:divide-gray-600 ${showDropdown ? "" : "hidden"}`}>
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                <li>
                  <Link href={{
                    pathname: "/political-party",
                    query: {
                      name: 'Partido Socialista',
                    }, // the data
                  }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">PS</Link>
                </li>
                <li>
                  <Link href={{
                    pathname: "/political-party",
                    query: {
                      name: 'Partido Social Democrata',
                    }, // the data
                  }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">PSD</Link>
                </li>
                <li>
                  <Link href={{
                    pathname: "/political-party",
                    query: {
                      name: 'Chega',
                    }, // the data
                  }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">CH</Link>
                </li>
                <li>
                  <Link href={{
                    pathname: "/political-party",
                    query: {
                      name: 'Iniciativa Liberal',
                    }, // the data
                  }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">IL</Link>
                </li>
                <li>
                  <Link href={{
                    pathname: "/political-party",
                    query: {
                      name: 'Partido Comunista Português',
                    }, // the data
                  }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">PCP</Link>
                </li>
                <li>
                  <Link href={{
                    pathname: "/political-party",
                    query: {
                      name: 'Bloco de Esquerda',
                    }, // the data
                  }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">BE</Link>
                </li>
                <li>
                  <Link href={{
                    pathname: "/political-party",
                    query: {
                      name: 'Pessoas-Animais-Natureza',
                    }, // the data
                  }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">PAN</Link>
                </li>
                <li>
                  <Link href={{
                    pathname: "/political-party",
                    query: {
                      name: 'Livre',
                    }, // the data
                  }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">LIVRE</Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="mr-3 items-center p-3 sm:p-7">
            <a className="font-bold sm:text-xl" href="/#procure-verdade">Explore o Arquivo</a>
          </li>
          <li className="mr-3 items-center p-3 sm:p-7 mr-10">
            <a className="font-bold sm:text-xl" href="/faq">FAQ</a>
          </li>
        </ul>
      </div>

    </>
  )
}
