import React from 'react';
import RightSidebarElement from "../../components/rightsidebarelement/RightSidebarElement";
import SavedTripsWidget from "../../components/savedtripswidget/SavedTripsWidget";
import StatisticsCard from "../../components/statisticscard/StatisticsCard";
import LatestFollowers from "../../components/latestfollowers/LatestFollowers";

const PersonalComps = () => {
    return (
        <>
            <RightSidebarElement title={'Favorite trips'} viewAllUrl={'/trips/saved'}>
                <SavedTripsWidget />
            </RightSidebarElement>
            <RightSidebarElement title={'About your journey'}>
                <StatisticsCard />
            </RightSidebarElement>
            <RightSidebarElement title={'Latest Followers'} viewAllUrl={'/followers'}>
                <LatestFollowers />
            </RightSidebarElement>
        </>
    );
};

export default PersonalComps;
