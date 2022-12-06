import { useRouter } from "next/router";
import { Fragment } from "react";
import EventList from "../../components/events/events-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { getFilteredEvents } from "../../helpers/api-util";

function FilteredEventsPage(props) {
    const { hasError, events } = props;
    const router = useRouter();
    const filterData = router.query.slug;

    if (!filterData) {
        return <p className="center">Loading...</p>;
    }

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    const yearToNumber = +filteredYear;
    const monthToNumber = +filteredMonth;

    if (hasError) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p>Error: invalid filter.</p>
                </ErrorAlert>
                <div className="center">
                    <Button link="/events">Show All Events</Button>
                </div>
            </Fragment>
        );
    }

    const filteredEvents = events;

    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p>No events found for the chosen filter.</p>
                </ErrorAlert>
                <div className="center">
                    <Button link="/events">Show All Events</Button>
                </div>
            </Fragment>
        );
    }

    const date = new Date(props.date.year, props.date.month -1);

    return (
    <Fragment>
        <ResultsTitle date={date} />
        <EventList events={filteredEvents} />
    </Fragment>
    )

}

export async function getServerSideProps(context) {
    const { params } = context;
    const filterData = params.slug;
    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];
    const yearToNumber = +filteredYear;
    const monthToNumber = +filteredMonth;

    if (isNaN(yearToNumber) || isNaN(monthToNumber) || monthToNumber < 1 || monthToNumber > 12) {
        return {
            props: {
                hasError: true
            }
            // notFound: true,
            // redirect: {
            //     destination: '/error',
            // }
        }
    }

    const filteredEvents = await getFilteredEvents({
        year: yearToNumber,
        month: monthToNumber,
    });
    
    return {
        props: {
            events: filteredEvents,
            date: {
                year: yearToNumber,
                month: monthToNumber
            }
        }
    }
}

export default FilteredEventsPage;
