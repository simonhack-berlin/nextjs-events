import { Fragment } from "react";
import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import ErrorAlert from "../../components/ui/error-alert";
import { getEventById, getAllEvents } from "../../helpers/api-util";

function EventDetailPage(props) {
    const event = props.event;

    if (!event) {
        return (
            <ErrorAlert>
                <p>Sorry, no event found.</p>
            </ErrorAlert>
        )
    }

    return(
       <Fragment>
            <EventSummary title={event.title} />
            <EventLogistics 
                date={event.date}
                address={event.location}
                image={event.image}
                imageAlt={event.title}
            />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
       </Fragment>
    )
}

export async function getStaticProps(context) {
    const eventId = context.params.id;

    const event = await getEventById(eventId);

    return {
        props: {
            event: event
        },
        revalidate: 30 // That means that every 30 sec. we regenerate this page for a new incoming request.
    }
}

export async function getStaticPaths() {
    const events = await getAllEvents();
    const paths = events.map(event => ({
        params: {
            id: event.id
        }
    }));

    return {
        paths: paths,
        fallback: false
    }
}

export default EventDetailPage;
