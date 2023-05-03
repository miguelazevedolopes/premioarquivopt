import eventsData from '../../../public/events-timeline.json'


const Timeline = ({ width, height, party }) => {

  const data = party ? eventsData[party] : "";

  const eventDivs = []
  for (let key in data) {
    const event = data[key];
    const yOffset = -1 * ((Number(key) - 1) % 2)

    let style = {
      height: `${Math.round(height / 6)}px`,
      transform: `translate(${((Number(key) - 1) * width / (Object.keys(data).length - 1)) - 2 * Number(key)}px,${yOffset * (Math.round(height / 6)) - 2}px)`
    }

    let styleDescription = {
      transform: `translate(-50%,${yOffset == 0 ? '30%' : '-100%'})`
    }

    console.log(event.description)

    eventDivs.push(
      event ? 
      <div key={key} style={style} className="block w-[2px] bg-black">
        <a href={event.link} style={styleDescription} className={`h-64 rounded-full hover:opacity-75 hover:text-white text-white bg-black w-64 px-2 flex flex-col justify-center text-center`}>
          <h4>{event.date}</h4>
          <h2 className="text-xl font-bold" >{event.title}</h2>
          <p className="text-xs px-3 ">
            {event.description}
          </p>
        </a>
      </div> :
      <></>
    )
  }

  return (

    <div style={{ width: `${width}px`, height: `${height}px`, "paddingTop": `${Math.round(height / 2)}px` }} className="my-40">
      <div className="h-[2px] w-full bg-black"></div>
      <div className="flex items-center">
        {eventDivs}
      </div>
    </div>
  );
}

export default Timeline;
