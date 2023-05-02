import React, { useState } from 'react';
import personalitiesData from '../../../public/personalities.json'



const Personalities = ({ party }) => {

    const [year, setYear] = useState("2019")
    const [personalitiesDivs, setPersonalitiesDivs] = useState([])

    const options = (() => {
        let options = []
        for (let y = 1996; y < 2021; y++) {
            options.push(<option value={y.toString()}>{y.toString()}</option>)
        }
        return options
    })();

    // define a function to handle changes to the dropdown
    const handleDropdownChange = (event) => {

        let personalities = personalitiesData[party][event.target.value];




        let personalitiesElements = []
        personalities.forEach(personality => {
            personalitiesElements.push(
                <div key={personality["name"]} className='flex flex-col w-1/5 m-7'>
                    <a target='_blank' href={personality["wiki"]} className='flex flex-col w-fit p-5'>
                        <img className='w-64 h-64 object-cover	' src={"/images/personalities/" + personality["image"]} alt="" />
                        <div className='flex justify-around mt-8'>
                            <h1 className='text-center text-lg w-fit m-auto font-bold'>{personality["name"]}</h1>
                        </div>
                    </a>
                </div>
            )
        });
        console.log(personalitiesElements)
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
            <h2 className='leading-[10rem]'>{personalitiesDivs.length == 0 ? "Sem dados referentes ao ano selecionado." : ''}</h2>
            {personalitiesDivs}

        </div>

    );
}

export default Personalities;
