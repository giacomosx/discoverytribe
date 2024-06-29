import React from 'react';
import LatestFollowers from "../../components/latestfollowers/LatestFollowers";
import UpcomingTrips from "../../components/upcomingtrips/UpcomingTrips";
import RightSidebarElement from "../../components/rightsidebarelement/RightSidebarElement";
import CtaCard from "../../components/ctacard/CtaCard";
import StatisticsCard from "../../components/statisticscard/StatisticsCard";
import {useSelector} from "react-redux";
import {userState} from "../../redux/loginSlice";
import {useLocation} from "react-router-dom";

const RightSidebar = () => {
    const user  = useSelector(userState)
    const location = useLocation()

    return (
        <aside className={'hidden lg:block space-y-6 ps-8 max-w-sm min-w-96'}>
            {user.trips?.length === 0 && (
                <CtaCard title={'Begin Your Journey with Us!'} linkTitle={'Get Started'} linkUrl={'/trip/create'}>
                    Create your First Trip on DiscoveryTribe.
                    Share your stories and inspire others with your unique adventures.
                </CtaCard>
            )}
            {user.trips?.length > 0 && location.pathname !== '/trips' && (
                <RightSidebarElement title={'Upcoming Trips'} viewAllUrl={'/trips'}>
                    <UpcomingTrips />
                </RightSidebarElement>
            )}
            <RightSidebarElement title={'About your journey'}>
                <StatisticsCard />
            </RightSidebarElement>
            <RightSidebarElement title={'Latest Followers'} viewAllUrl={'/followers'}>
                <LatestFollowers />
            </RightSidebarElement>
        </aside>
    );
};

export default RightSidebar;
