import React, { useEffect, useState } from 'react';
import personalitiesData from '../../../public/personalities.json'

function getPersonalities(party, year){
    let personalities = personalitiesData[party][year];

    let personalitiesElements = []
        personalities.forEach(personality => {
            personalitiesElements.push(
                <div key={personality["name"]} className='w-1/4 p-5'>
                    <a target='_blank' href={personality["wiki"]?personality["wiki"]: ''} className=''>
                        <img className='w-52 h-52 rounded-full object-cover m-auto' src={"/images/personalities/" + personality["image"]} alt="" />
                        <div className='flex justify-around mt-8'>
                            <h1 className='text-center text-lg w-fit m-auto font-bold'>{personality["name"]}</h1>
                        </div>
                    </a>
                </div>
            )
        });

    return personalitiesElements;
}



const Personalities = ({ party }) => {

    const [year, setYear] = useState("2020")
    const [personalitiesDivs, setPersonalitiesDivs] = useState([])

    console.log(party)

    useEffect( () => {
        if(party) setPersonalitiesDivs(getPersonalities(party, year))
    },[party]);


    const options = (() => {
        let options = []
        for (let y = 1996; y < 2021; y++) {
            options.push(<option value={y.toString()}>{y.toString()}</option>)
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
        <div className='flex flex-wrap w-full justify-around mt-10 p-10 bg-gray-200'>
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
