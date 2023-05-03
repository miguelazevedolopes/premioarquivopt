import eventsData from '../../../public/events-timeline.json'


const Timeline = ({ width, height, party }) => {

  const data = party ? eventsData[party] : "";

  const eventDivs = []
  for (let key in data) {
    const event = data[key];
    const yOffset = -1 * ((Number(key) - 1) % 2)

    let style = {
      height: `${Math.round(height / 3)}px`,
      transform: `translate(${((Number(key) - 1) * width / (Object.keys(data).length - 1)) - 2 * Number(key)}px,${yOffset * (Math.round(height / 3)) - 2}px)`
    }

    let styleDescription = {
      transform: `translate(-50%,${yOffset == 0 ? '50%' : '-100%'})`
    }

    console.log(event.description)

    eventDivs.push(
      event ? 
      <div key={key} style={style} className="block w-[2px] bg-black">
        <a href={event.link} style={styleDescription} className={`h-48 rounded-full hover:opacity-75 hover:text-white text-white bg-black w-48 flex flex-col justify-center text-center`}>
          <h2 className="text-lg font-bold whitespace-nowrap" >{event.title}</h2>
          <h4 className="text-xs">{event.date}</h4>
          <p className="text-xs ">
            {event.description}
          </p>
        </a>
      </div> :
      <></>
    )
  }

  return (

    <div style={{ width: `${width}px`, height: `${height}px`, "paddingTop": `${Math.round(height / 3)}px` }} className="my-40">
      <div className="h-[2px] w-full bg-black"></div>
      <div className="flex">
        {eventDivs}
      </div>
    </div>
  );
}

export default Timeline;
