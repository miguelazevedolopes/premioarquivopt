const events = [{
  date: "2020-01-01",
  title: "Event Title",
  description: "pretty description"
},
{
  date: "2020-01-01",
  title: "Event Title",
  description: "pretty description"
},
{
  date: "2020-01-01",
  title: "Event Title",
  description: "pretty description"
},
{
  date: "2020-01-01",
  title: "Event Title",
  description: "pretty description"
},
{
  date: "2020-01-01",
  title: "Event Title",
  description: "pretty description"
},
{
  date: "2020-01-01",
  title: "Event Title",
  description: "pretty description"
},
{
  date: "2020-01-01",
  title: "Event Title",
  description: "pretty description"
},
{
  date: "2020-01-01",
  title: "Event Title",
  description: "pretty description"
},
{
  date: "2020-01-01",
  title: "Event Title",
  description: "pretty description"
},
{
  date: "2020-01-01",
  title: "Event Title",
  description: "pretty description"
},
{
  date: "2020-01-01",
  title: "Event Title",
  description: "pretty description"
},
{
  date: "2020-01-01",
  title: "Event Title",
  description: "pretty description"
},
{
  date: "2020-01-01",
  title: "Event Title",
  description: "pretty description"
},
]


const Timeline = ({ width, height }) => {

  const eventDivs = []
  for (let index = 0; index < events.length; index++) {
    const event = events[index];
    const yOffset = -1 * (index % 2)

    let style = {
      height: `${Math.round(height / 2)}px`,
      transform: `translate(${(index * width / (events.length - 1)) - 2 * index-1}px,${yOffset * (Math.round(height / 2))-2}px)`
    }

    let styleDescription = {
      transform: `translate(-50%,${yOffset ==0 ? '100%' : '-100%'})`

    }

    eventDivs.push(
      <div style={style} className="block w-[2px] bg-black">
        <div style={styleDescription} className={`my-2 h-full w-fit flex flex-col justify-start text-center`}>
          <h2 className="text-lg font-bold w-fit whitespace-nowrap	" >{event.title}</h2>
          <h4 className="text-xs">{event.date}</h4>
          <p className="text-xs ">
            {event.description}
          </p>
        </div>
      </div>
    )
  }

  return (

    <div style={{ width: `${width}px`, height: `${height}px`, "padding-top": `${Math.round(height / 2)}px` }} className="my-40">
      <div className="h-[2px] w-full bg-black"></div>
      <div className="flex">
        {eventDivs}
      </div>
    </div>
  );
}

export default Timeline;

