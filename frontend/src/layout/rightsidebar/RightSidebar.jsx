import React from 'react';
import LatestFollowers from "../../components/latestfollowers/LatestFollowers";
import UpcomingTrips from "../../components/upcomingtrips/UpcomingTrips";
import RightSidebarElement from "../../components/rightsidebarelement/RightSidebarElement";
import CtaCard from "../../components/ctacard/CtaCard";
import StatisticsCard from "../../components/statisticscard/StatisticsCard";
import {useSelector} from "react-redux";
import {userState} from "../../redux/loginSlice";

const RightSidebar = () => {
    const user  = useSelector(userState)

    return (
        <aside className={'hidden lg:block space-y-6 ps-8 max-w-sm min-w-96'}>
            {user.trips?.length === 0 ? (
                <CtaCard title={'Begin Your Journey with Us!'} buttonTitle={'Get Started'}>
                    Create your First Trip on DiscoveryTribe.
                    Share your stories and inspire others with your unique adventures.
                </CtaCard>
            ) : (
                <RightSidebarElement title={'Upcoming Trips'} viewAllUrl={'/me/trips'}>
                    <UpcomingTrips />
                </RightSidebarElement>
            )}
            <RightSidebarElement title={'About your journey'}>
                <StatisticsCard />
            </RightSidebarElement>
            <RightSidebarElement title={'Latest Followers'} viewAllUrl={'/me/followers'}>
                <LatestFollowers />
            </RightSidebarElement>
        </aside>
    );
};

export default RightSidebar;
