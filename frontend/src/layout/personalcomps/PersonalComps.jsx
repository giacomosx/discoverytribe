import React from 'react';
import RightSidebarElement from "../../components/rightsidebarelement/RightSidebarElement";
import SavedTripsWidget from "../../components/savedtripswidget/SavedTripsWidget";
import StatisticsCard from "../../components/statisticscard/StatisticsCard";
import LatestFollowers from "../../components/latestfollowers/LatestFollowers";
import CtaCard from "../../components/ctacard/CtaCard";
import {useSelector} from "react-redux";
import {userState} from "../../redux/loginSlice";

const PersonalComps = () => {
    const user = useSelector(userState)
    return (
        <>
            {user.trips?.length === 0 && (
                <CtaCard title={'Begin Your Journey with Us!'} linkTitle={'Get Started'} linkUrl={'/trip/create'}>
                    Create your First Trip on DiscoveryTribe.
                    Share your stories and inspire others with your unique adventures.
                </CtaCard>
            )}
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
