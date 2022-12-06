import EventsList from "../components/events/events-list";
import { getFeaturedEvents } from "../helpers/api-util";

export default function HomePage(props) {

  return (
   <div>
    <EventsList events={props.events} />
   </div>
  )
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents
    },
    revalidate: 1800 // That means that every half hour we regenerate this page for a new incoming request.
  }
}
