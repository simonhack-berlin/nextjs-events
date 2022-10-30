import EventList from '../../components/events/events-list';
import { getAllEvents } from '../../dummy-data';

function AllEvents() {
    const events = getAllEvents();

    return (
        <div>
            <EventList events={events} />
        </div>
    )
}

export default AllEvents;
