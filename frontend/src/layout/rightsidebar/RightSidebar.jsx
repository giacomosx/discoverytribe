import React from 'react';
import LatestFollowers from "../../components/latestfollowers/LatestFollowers";
import UpcomingTrips from "../../components/upcomingtrips/UpcomingTrips";
import RightSidebarElement from "../../components/rightsidebarelement/RightSidebarElement";

const RightSidebar = () => {
    return (
        <aside className={'hidden lg:block space-y-6 ps-8 max-w-sm min-w-96'}>
            <RightSidebarElement title={'Latest Followers'}>
                <LatestFollowers />
            </RightSidebarElement>
            <RightSidebarElement title={'Upcoming Trips'}>
                <UpcomingTrips />
            </RightSidebarElement>
        </aside>
    );
};

export default RightSidebar;
