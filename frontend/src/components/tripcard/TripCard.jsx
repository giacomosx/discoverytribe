import React from 'react';
import {NavLink} from "react-router-dom";
import MoreDropDown from "../moredropdown/MoreDropDown";
import {useSession} from "../../hooks/useSession";
import TripTypeBadge from "../triptypebadge/TripTypeBadge";
import TripBudgetBadge from "../tripbudgetbadge/TripBudgetBadge";

const TripCard = ({trip, variants, description, moreButton, userId}) => {
    const user= useSession()
    const startDate = new Date(trip.start_date).toDateString();
    const endDate = new Date(trip.end_date).toDateString()
    const navLinkUrl = userId === user.decodedSession.userId ? `/trips/${trip._id}` : `/user/${userId}/trip/${trip._id}`;

    return (
        <li className={`${variants ? variants : ""}`}>
            <div className={'space-y-3.5 flex flex-col justify-between h-full'}>
                <img src={trip.cover} className={'w-full rounded-lg h-48 object-cover'} alt={trip.name}/>
                <div className="font-medium dark:text-white ps-1">
                    <h3 className={'-mt-2'}>{trip.name}</h3>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <svg className="min-w-4 h-4 me-1" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"/>
                        </svg>
                        <span className={'truncate'}>{trip.destination?.destination_name}{`, ${trip.destination?.destination_country}`}</span>
                    </div>
                    {description && <p className={'text-sm text-gray-700 dark:text-gray-300 mt-2'}>{trip.description}</p>}
                </div>
                <ul className="text-xs text-gray-500 dark:text-gray-400 ps-1 space-y-1.5">
                    <li className="flex items-center">
                        <svg className="w-3 h-3 me-2" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg"
                             fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                        </svg>
                        From {startDate} to {endDate}
                    </li>
                    {trip.type && (
                        <li className="flex items-center">
                            <TripTypeBadge>{trip.type}</TripTypeBadge>
                        </li>
                    )}
                    <li className="flex items-center">
                        <TripBudgetBadge>{trip.budget}</TripBudgetBadge>
                    </li>
                </ul>
                <div className="flex items-center justify-between">
                    <NavLink to={navLinkUrl}
                          className="inline-flex items-center font-medium text-sm text-purple-600 hover:text-purple-800 dark:text-purple-500 dark:hover:text-purple-700">
                        View trip
                        <svg className=" w-2.5 h-2.5 ms-2 rtl:rotate-180" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="m1 9 4-4-4-4"/>
                        </svg>
                    </NavLink>
                    {moreButton && userId === user.decodedSession.userId && (
                        <MoreDropDown editUrl={`/trips/${trip._id}/edit`} itemId={trip._id} typeItem={'trips'}/>
                    )}
                </div>
            </div>
        </li>
    );
};

export default TripCard;
