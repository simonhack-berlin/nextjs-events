import EventItem from "./event-item";

import classes from "./events-list.module.css";


function EventList(props) {
    const { events } = props;
  
    return (
      <ul className={classes.list}>
        {events.map((event) => {
            return (
                <EventItem
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    location={event.location}
                    date={event.date}
                    image={event.image}
                />
            )
        })}
      </ul>
    );
  }
  
  export default EventList;
