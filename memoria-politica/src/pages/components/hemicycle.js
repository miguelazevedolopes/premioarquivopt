import React, {useState} from "react";

const parties = {'PS': { 'name': 'Partido Socialista', 'deps' : 120, 'color' : '#ff66ff'            , 'sig': 'ps'},
                 'PSD': {  'name' : 'Partido Social Democrata', 'deps' : 77, 'color' : '#f68a21'    , 'sig': 'psd'}, 
                 'CH': {   'name' : 'Chega', 'deps' : 12, 'color' : '#333399'                       , 'sig': 'ch'}, 
                 'IL': {   'name' : 'Iniciativa Liberal',  'deps' : 8, 'color' : '#52c1ec'          , 'sig': 'il'}, 
                 'PCP' : { 'name' : 'Partido Comunista Português',  'deps' : 6, 'color' : '#EC1B24' , 'sig': 'pcp'}, 
                 'BE' : {  'name' : 'Bloco de Esquerda',  'deps' : 5, 'color' : '#000000'           , 'sig': 'be'}, 
                 'PAN':{   'name' : 'Pessoas-Animais-Natureza',  'deps' : 1, 'color' : '#036A84'    , 'sig': 'pan'}, 
                 'LIVRE':{ 'name' : 'Livre',  'deps' : 1, 'color' : '#00CD8C'                       , 'sig': 'livre'}}

const bloco = ['a-0-16', 'a-0-17', 'a-1-20', 'a-2-23', 'a-1-19']
const pcp = ['a-0-15', 'a-0-14', 'a-1-18', 'a-1-17', 'a-1-16', 'a-1-15']
const il = ['a-0-3', 'a-0-4', 'a-1-3', 'a-1-4', 'a-1-5', 'a-2-3', 'a-2-4', 'a-2-5']
const psd = ['a-3-9', 'a-3-10', 'a-3-11', 'a-3-12', 'a-2-9', 'a-2-10', 'a-2-11', 'a-1-9', 'a-5-12', 'a-7-12', 'a-7-13', 'a-7-14', 'a-6-12']

const textColor = {
  ps: 'text-[#ff66ff]',
  psd: 'text-[#f68a21]',
  ch: 'text-[#333399]',
  il: 'text-[#52c1ec]',
  pcp: 'text-[#EC1B24]',
  be: 'text-[#000000]',
  pan: 'text-[#036A84]',
  livre: 'text-[#00CD8C]'
}

const HemiCycle = ({width, height, circleRadius, hemiRadius, offset, arcs }) => {
  const [popoverVisible, setPopoverVisible] = useState({active: false, name: "", deps: 0, color: "#e5e7eb", sig: ""});

  const handlePopoverVisibility = (isVisible, name, deps, color, sig) => {
    setPopoverVisible({active: isVisible, name: name, deps: deps, color: color, sig: sig});
  };
  
  const baseY = height - circleRadius;
  const baseX = width - circleRadius;

  const circles = [];
  for (let j = arcs.length - 1; j >= 0; j--){
    for(let i = 0; i < arcs[j]; i++){

      const angle = (Math.PI/ (arcs[j]-1))
      const cx = Math.round(Math.cos(-angle * i)*(hemiRadius - offset*(arcs.length - j)) + baseX/2, 2)
      const cy = Math.round(Math.sin(-angle * i)*(hemiRadius - offset*(arcs.length - j)) + baseY/2, 2)

      const key = `a-${j}-${i}`

      let party = parties.PS
      if (j == 1 && i == 14) party = parties.LIVRE
      else if (j == 1 && i == 10) party = parties.PAN
      else if(bloco.includes(key)) party = parties.BE
      else if (pcp.includes(key)) party = parties.PCP
      else if (il.includes(key)) party = parties.IL
      else if ( i >= 0 && i <= 2 && j >= 0 && j <= 3) party = parties.CH
      else if ( psd.includes(key) || (j >= 4 && i <= 11) || (j >= 0 && i <= 8)) party = parties.PSD

      circles.push(
        <a key={key} data-popover-target="popover-no-arrow" data-popover-placement="left" onMouseEnter={() => handlePopoverVisibility(true, party.name, party.deps, party.color, party.sig)} onMouseLeave={() => handlePopoverVisibility(false, "", "", "")}className='flex flex-col w-fit p-5'>
          <circle key={`circle-${j}-${i}`} cx={cx} cy={cy} r={circleRadius} fill={party.color} />
        </a>
      )
    }
  }

  return (
    <div className="flex flex-col items-center">
      <svg width={width} height={height}>
        <g transform="translate(0, 250)">
          {circles}
        </g>
      </svg>
      <div data-popover id="popover-no-arrow" role="tooltip" className={`absolute z-10 justify-center inline-block w-96 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 shadow-sm ${popoverVisible.active ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        <div className={`px-3 text-center border-gray-300 py-2`}>
            <h3 className={`text-center text-2xl font-semibold pt-3 ${textColor[popoverVisible.sig]}`}>{popoverVisible.name}</h3>
        </div>
        <div className="px-3 text-xl text-center pb-3">
            <p>{`${popoverVisible.deps} deputados `}</p>
        </div>
      </div>
    </div>
  )
};

export default HemiCycle;
