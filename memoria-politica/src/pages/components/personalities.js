import React, { useEffect, useState } from 'react';
import personalitiesData from '../../../public/personalities.json'
import Link from 'next/link'


function getPersonalities(party, year){
    let personalities = personalitiesData[party][year];

    let personalitiesElements = []
    personalities.forEach(personality => {
        personalitiesElements.push(
            <div key={`div-${personality["name"]}-${year}-${party}`} className={`w-1/${personalities.length} p-5`}>
                <Link target="personalidades" href={personality["wiki"]?personality["wiki"]: ''}>
                    <img className='w-40 h-40 sm:w-52 sm:h-52 hover:scale-110 ease-in duration-500 rounded-full object-cover m-auto' src={"/images/personalities/" + personality["image"]} alt="" />
                    <div className='flex justify-around mt-8'>
                        <h1 className='text-center text-lg w-fit m-auto font-bold'>{personality["name"]}</h1>
                    </div>
                </Link>
            </div>
        )
    });

    return personalitiesElements;
}


const startYear = {
    'Bloco de Esquerda' : 2001,
    'Partido Socialista' : 1999,
    'Partido Comunista Português' : 1999,
    'Pessoas-Animais-Natureza' : 2013,
    'Livre' : 2015,
    'Partido Social Democrata' : 1997,
    'Chega' : 2019,
    'Iniciativa Liberal' : 2017
}


const Personalities = ({ party }) => {

    const [year, setYear] = useState("2020")
    const [personalitiesDivs, setPersonalitiesDivs] = useState([])
    
    useEffect( () => {
        if(party) setPersonalitiesDivs(getPersonalities(party, year))
    },[party]);


    const options = (() => {
        let options = []
        for (let y = startYear[party]; y < 2021; y++) {
            options.push(<option key={y} value={y.toString()}>{y.toString()}</option>)
        }
        return options
    })();

    // define a function to handle changes to the dropdown
    const handleDropdownChange = (event) => {
        const personalitiesElements = getPersonalities(party, event.target.value)
        setYear(event.target.value);
        setPersonalitiesDivs(personalitiesElements)
    };



    return (
        <div id="personalidades" className='flex flex-wrap w-full justify-around mt-7 sm:mt-10 px-7 sm:p-10 bg-gray-200'>
            <div className='flex w-full flex-wrap mt-10 justify-center'>
                <h2 className='text-3xl lg:text-4xl font-extrabold select-none text-center my-auto sm:me-5 select-none w-fit h-fit'>Personalidades mais mencionadas em cada ano</h2>
                <div className="temporal-dropdown">
                    <select name="year" value={year} onChange={handleDropdownChange} className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-extrabold">
                        {options}
                    </select>
                </div>
            </div>

            <div className='flex flex-col'>
                <h2 className='m-4 sm:m-8'> {personalitiesDivs.length == 0 ? "Sem dados referentes ao ano selecionado." : ''}</h2>
                <div className='flex justify-around flex-wrap'>
                    {personalitiesDivs}
                </div>
            </div>
        </div>

    );
}

export default Personalities;
