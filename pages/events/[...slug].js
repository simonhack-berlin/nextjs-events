import { useRouter } from "next/router";
import { Fragment } from "react";
import EventList from "../../components/events/events-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { getFilteredEvents } from "../../dummy-data";

function FilteredEventsPage() {
    const router = useRouter();
    const filterData = router.query.slug;

    if (!filterData) {
        return <p className="center">Loading...</p>;
    }

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    const yearToNumber = +filteredYear;
    const monthToNumber = +filteredMonth;

    if (isNaN(yearToNumber) || isNaN(monthToNumber) || monthToNumber < 1 || monthToNumber > 12) {
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

    const filteredEvents = getFilteredEvents({
        year: yearToNumber,
        month: monthToNumber,
    });

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

    const date = new Date(yearToNumber, monthToNumber -1);

    return (
    <Fragment>
        <ResultsTitle date={date} />
        <EventList events={filteredEvents} />
    </Fragment>
    )

}

export default FilteredEventsPage;
