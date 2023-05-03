import React, { useEffect, useState } from 'react';
import personalitiesData from '../../../public/personalities.json'

function getPersonalities(party, year){
    let personalities = personalitiesData[party][year];

    let personalitiesElements = []
    personalities.forEach(personality => {
        personalitiesElements.push(
            <div key={`div-${personality["name"]}-${year}-${party}`} className={`w-1/${personalities.length} p-5`}>
                <a target="personalidades" href={personality["wiki"]?personality["wiki"]: ''}>
                    <img className='w-52 h-52 hover:scale-125 ease-in duration-500 rounded-full object-cover m-auto' src={"/images/personalities/" + personality["image"]} alt="" />
                    <div className='flex justify-around mt-8'>
                        <h1 className='text-center text-lg w-fit m-auto font-bold'>{personality["name"]}</h1>
                    </div>
                </a>
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
        <div id="personalidades" className='flex flex-wrap w-full justify-around mt-10 p-10 bg-gray-200'>
            <div className='flex w-full justify-start mt-10 '>
                <h2 className='text-3xl lg:text-4xl font-extrabold select-none m-5 me-10 select-none w-fit'>Personalidades mais mencionadas em cada ano</h2>
                <div className="temporal-dropdown">
                    <select name="year" value={year} onChange={handleDropdownChange} className="temporal-dropdown__select temporal-dropdown__select--year">
                        {options}
                    </select>
                </div>
            </div>

            <div className='flex flex-col'>
                <h2 className='m-8'> {personalitiesDivs.length == 0 ? "Sem dados referentes ao ano selecionado." : ''}</h2>
                <div className='flex justify-around'>
                    {personalitiesDivs}
                </div>
            </div>
        </div>

    );
}

export default Personalities;
