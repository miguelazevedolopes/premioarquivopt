import eventsData from '../../../public/events-timeline.json'
import Link from 'next/link'

// const bgColor = {
//   'Partido Socialista': 'bg-[#ff66ff]',
//   'Partido Social Democrata': 'bg-[#f68a21]',
//   'Chega': 'bg-[#333399]',
//   'Iniciativa Liberal': 'bg-[#52c1ec]',
//   'Partido Comunista Português': 'bg-[#EC1B24]',
//   'Bloco de Esquerda': 'bg-[#8B0000]',
//   'Pessoas-Animais-Natureza': 'bg-[#036A84]',
//   'Livre': 'bg-[#00CD8C]'
// }


const Timeline = ({ width, height, party }) => {

  const color = /*party?  bgColor[party]: */"bg-black";

  const data = party ? eventsData[party] : "";

  const eventDivs = []
  const diamEvents = width*1.2/Object.keys(data).length;

  for (let key in data) {
    const event = data[key];
    const yOffset = -1 * ((Number(key) - 1) % 2)

    let style = {
      height: `${Math.round(height / 6)}px`,
      transform: `translate(${((Number(key) - 1) * width / (Object.keys(data).length - 1)) - 2 * Number(key)}px,${yOffset * (Math.round(height / 6)) - 2}px)`
    }

    let styleDescription = {
      transform: `translate(-50%,${yOffset == 0 ? '32%' : '-100%'})`,
      width: `${diamEvents}px`,
      height: `${diamEvents}px`,
    }

    eventDivs.push(
      event ? 
      <div key={key} style={style} className="block w-[2px] bg-black">
        <Link href={event.link} style={styleDescription} className={`rounded-full hover:opacity-75 hover:text-white ${color} text-white px-4 flex flex-col justify-center text-center`}>
          <h4>{event.date}</h4>
          <h2 className="text-xl font-bold" >{event.title}</h2>
          <p className="text-xs px-3 ">
            {event.description}
          </p>
        </Link>
      </div> :
      <></>
    )
  }

  return (

    <div style={{ width: `${width+diamEvents}px`, height: `${height}px`, "padding-top": `${Math.round(height / 2)}px`, "padding-left":`${diamEvents/2}px`, "padding-right":`${diamEvents/2}px` }} className="my-10 overflow-x-auto">
      <div className="h-[2px] bg-black" style={{ width: `${width}px`}} ></div>
      <div className="flex items-center">
        {eventDivs}
      </div>
    </div>
  );
}

export default Timeline;
