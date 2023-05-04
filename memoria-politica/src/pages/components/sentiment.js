import React, { useEffect, useState } from 'react';
import sentiment from '../../../public/sentiment.json'
import legislatures from '../../../public/legislatures.json'

function getSentiment(party, legislature) {
    let polarity = sentiment[party][legislature]["polarity"]
    polarity = Math.round(50 + polarity * 100 / 2)
    let subjectivity = Math.round(sentiment[party][legislature]["subjectivity"] * 100)
    return [subjectivity.toString(), polarity.toString()]
}

function getLegislatures(legislature) {
    return legislatures[legislature]
}

function getGoverningPartiesImages(legislatureInfo) {
    let images = []
    legislatureInfo['governo'].forEach(party => {
        images.push(<img key={party} className='w-28 h-28 rounded-full object-cover m-auto' src={`/images/${party.toLowerCase()}.png`} alt="" />)
    });
    return images;
}


const Sentiment = ({ party }) => {
    const [legislature, setLegislature] = useState("XIV Legislatura")
    const [legislatureInfo, setLegislatureInfo] = useState({
        "start": "",
        "end": "",
        "governo": [],
        "maioria_absoluta": false
    })
    const [polarity, setPolarity] = useState('5')
    const [subjectivity, setSubjectivity] = useState('5')
    const [governingImages, setGoverningImages] = useState([])


    useEffect(() => {
        if (party) {
            setLegislature("XIV Legislatura");
            const [sub, pol] = getSentiment(party, "XIV Legislatura")
            setPolarity(pol)
            setSubjectivity(sub)
            const info = getLegislatures("XIV Legislatura")
            setLegislatureInfo(info)
            setGoverningImages(getGoverningPartiesImages(info))
        }
    }, [party,setLegislature]);

    const legislaturesOptions = ((party) => {

        let options = []
        if (party) {
            Object.keys(sentiment[party]).forEach(legislature => {
                options.push(<option key={legislature} value={legislature}>{legislature}</option>)
            });
        }
        return options
    })(party);



    const handleDropdownChange = (event) => {
        const [sub, pol] = getSentiment(party, event.target.value)
        setLegislature(event.target.value)
        const info = getLegislatures(event.target.value)
        setLegislatureInfo(info)
        setPolarity(pol)
        setSubjectivity(sub)
        setGoverningImages(getGoverningPartiesImages(info))
    };

    return (
        <div id="personalidades" className='flex flex-wrap w-full justify-around mt-10'>
            <div className='flex w-full justify-start mt-10 '>
                <h2 className='text-3xl lg:text-4xl font-extrabold select-none me-10 select-none w-fit'>Análise de Sentimento por Legislatura</h2>
            </div>
            <h3 className='text-2xl mt-2 mb-10 select-none'>Através da utilização de modelos de linguagem natural, classificamos o discurso presente nas páginas de cada partido ao longo de cada uma das legislaturas. Fornecemos uma medida referente ao quão positivo ou negativo o discurso de cada partido é (polaridade), bem como uma classificação referente à subjectividade do mesmo.</h3>

            <div className='flex w-full justify-around'>
                <div className='flex flex-col w-[45%]'>
                    <h2 className='mb-1 ms-1'>Selecione a legislatura:</h2>
                    <div className="flex justify-around">
                        <select name="year" value={legislature} onChange={handleDropdownChange} className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-extrabold">
                            {legislaturesOptions}
                        </select>
                    </div>

                    <div>
                        <div className='flex justify-around my-10'>

                            {governingImages}

                        </div>
                        <h2><b>Partido(s) do Governo:&nbsp; </b>{legislatureInfo["governo"].toString()}</h2>
                        <h2><b>Maioria Absoluta:&nbsp; </b>{legislatureInfo["maioria_absoluta"] ? "Sim" : "Não"}</h2>
                        <h2><b>Data de Inicio:&nbsp; </b> {legislatureInfo["start"]}</h2>
                        <h2><b>Data de Fim:&nbsp; </b> {legislatureInfo["end"]}</h2>
                    </div>
                </div>
                <div className='w-0.5 bg-gray-300'></div>
                <div className='flex flex-col w-[45%] justify-around'>
                    <div className='flex flex-col items-center self-center w-full'>
                        <h2 className='text-center text-xl font-bold justify-around mb-1'>Polaridade</h2>
                        <p className='mx-[5%] text-justify text-sm'>Com base na linguagem determinada nos textos presentes nas páginas web dos partidos, é possível classificar o seu conteúdo como positivo ou negativo.</p>

                        <div className='flex w-11/12 justify-center items-center mt-5'>
                            <h2 className='w-[20%] h-fit text-end'>Negativo</h2>
                            <div className='w-[60%] flex h-12 border-solid border-black bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 border-[3px] mx-5'>
                                <div style={{ "transform": `translate(${polarity}000%)` }} className="w-[0.1%] z-50 h-full -moz-bg-black"></div>
                            </div>
                            <h2 className='w-[20%] h-fit text-start'>Positivo</h2>
                        </div>
                    </div>

                    <div className='flex flex-col items-center self-center w-full mt-5'>
                        <h2 className='text-center text-xl font-bold justify-around mb-1'>Subjectividade</h2>
                        <p className='mx-[5%] text-justify text-sm'>A subjectividade mede a quantidade de texto nas páginas web que corresponde a opiniões versus informação factual. Um valor mais alto de subjectividade, significa que durante a legislatura em questão, as páginas do partido tinham mais textos de opinião do que textos factuais.</p>


                        <div className='flex w-11/12 justify-center items-center mt-5'>
                            <h2 className='w-[20%] h-fit text-end'>Objectivo</h2>
                            <div className='w-[60%] flex h-12 border-solid border-black bg-gradient-to-r from-emerald-400  via-sky-400 to-indigo-400 border-[3px]  mx-5'>
                                <div style={{ "transform": `translate(${subjectivity}000%)` }} className="w-[0.1%] z-50 h-full bg-black"></div>
                            </div>
                            <h2 className='w-[20%] h-fit text-start'>Subjectivo</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className='h-2 border-solid'>
                <div>

                </div>
                <div></div>
            </div>
        </div>

    );
}

export default Sentiment;