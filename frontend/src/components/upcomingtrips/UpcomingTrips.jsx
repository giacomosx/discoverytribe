import React from 'react';

const UpcomingTrips = () => {
    return (
            <ul className={'space-y-8 pt-4'}>
                <li className={'flex'}>
                    <img className="object-cover rounded-lg h-auto w-full max-h-32"
                         src="https://picsum.photos/200" alt=""/>
                    <div className={'ps-4'}>
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Winter in
                            New
                            York</h5>
                        <div className="flex flex-col justify-between leading-normal">
                            <p className="text-sm text-gray-700 dark:text-gray-400">Here are the biggest
                                enterprise
                                technology acquisitions of 2021 so far, in reverse chronological order.</p>
                        </div>
                    </div>
                </li>
                <li className={'flex'}>
                    <img className="object-cover rounded-lg h-auto w-full max-h-32"
                         src="https://picsum.photos/200" alt=""/>
                    <div className={'ps-4'}>
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Autumn in Paris</h5>
                        <div className="flex flex-col justify-between leading-normal">
                            <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">Here are the biggest
                                enterprise
                                technology acquisitions of 2021 so far, in reverse chronological order.</p>
                        </div>
                    </div>
                </li>
            </ul>
    );
};

export default UpcomingTrips;
