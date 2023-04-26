// import { FaRegClock } from 'react-icons/fa';
// import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
// import TimelineEvent from '../components/TimelineEvent';
// import 'react-vertical-timeline-component/style.min.css';

// const events = [
//   {
//     title: 'Event 1',
//     date: 'April 20, 2021',
//     description: 'Description of event 1',
//     image: '/images/event1.jpg',
//   },
//   {
//     title: 'Event 2',
//     date: 'May 5, 2021',
//     description: 'Description of event 2',
//     image: '/images/event2.jpg',
//   },
//   {
//     title: 'Event 3',
//     date: 'June 15, 2021',
//     description: 'Description of event 3',
//     image: '/images/event3.jpg',
//   },
// ];

// const Timeline = () => {
//   return (
//     <div className="timeline">
//       <h1>Timeline</h1>
//       <VerticalTimeline>
//         {events.map((event) => (
//           <VerticalTimelineElement
//             key={event.title}
//             contentStyle={{ background: 'transparent' }}
//             iconStyle={{ background: '#fff', color: '#000' }}
//             icon={<FaRegClock />}
//           >
//             <TimelineEvent
//               title={event.title}
//               date={event.date}
//               description={event.description}
//               image={event.image}
//             />
//           </VerticalTimelineElement>
//         ))}
//       </VerticalTimeline>
//     </div>
//   );
// };

// export default Timeline;
