import React from 'react';

const Milestone = ({milestone}) => {
    console.log(milestone)
    const startDate = new Date(milestone.start_date).toDateString();
    const endDate = new Date(milestone.end_date).toDateString()

    return (
        <li className="mb-10 ms-6 space-y-4">
            <span
                className="absolute flex items-center justify-center w-6 h-6 bg-purple-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-purple-900">
                <svg className="w-2.5 h-2.5 text-purple-800 dark:text-purple-300" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                </svg>
            </span>
            <div>
                <h3 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white">{milestone.destination?.destination_name}
                    {/*<span
                    className="bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300 ms-3">Latest</span>*/}
                </h3>
                <div className={'space-y-2'}>
                <span className={'destination text-sm text-gray-700 dark:text-gray-300 items-center flex'}>
                <svg className="min- w-5 h-5 me-1" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                     fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                    <path stroke="currentColor" strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"/>
                </svg>
                    {milestone.destination?.destination_city || milestone.destination?.destination_name}
                    {milestone.destination.destination_state && ', ' + milestone.destination?.destination_state}
                    {milestone.destination.destination_country && ', ' + milestone.destination?.destination_country}
            </span>
                    <time className="block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                        From {startDate} to {endDate}
                    </time>
                </div>
            </div>
            <p className={'text-gray-700 dark:text-gray-400 text-sm'}>{milestone?.description}</p>
            {/*<button
                className="inline-flex items-center font-medium text-sm text-purple-600 hover:text-purple-800 dark:text-purple-500 dark:hover:text-purple-700">
                See place
                <svg className=" w-2.5 h-2.5 ms-2 rtl:rotate-180" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="m1 9 4-4-4-4"/>
                </svg>
            </button>*/}
        </li>
    );
};

export default Milestone;
