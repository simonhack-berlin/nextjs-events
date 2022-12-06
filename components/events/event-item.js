import Image from "next/image";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";
import DateIcon from "../icons/date-icon";
import Button from "../ui/button";
import classes from "./event-item.module.css";

export default function EventItem(props) {

    const {id, title, image, date, location} = props;

    const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    return (
        <li className={classes.item}>
            <Image src={'/' + image} alt={title} width={250} height={160}/>
            <div className={classes.content}>
                <div className={classes.summary}>
                    <h2>{title}</h2>
                    <div className={classes.date}>
                        <DateIcon />
                        <time>{humanReadableDate}</time>
                    </div>
                    <div className={classes.address}>
                        <AddressIcon />
                        <address>{location}</address>
                    </div>
                </div>
                <div className={classes.actions}>
                    <Button link={'/events/' + id}>
                        <span>Explore Event</span>
                        <span className={classes.icon}>
                            <ArrowRightIcon />
                        </span>
                    </Button>
                </div>
            </div>
        </li>
    )
};
