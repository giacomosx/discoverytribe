import React from 'react';
import RightSidebarElement from "../../components/rightsidebarelement/RightSidebarElement";
import LatestTrips from "../../components/latesttrips/LatestTrips";
import StatisticsCard from "../../components/statisticscard/StatisticsCard";

const ProfileComps = ({userId, username}) => {
    return (
        <>
            <RightSidebarElement title={'About @' + username + ' journey'}>
                <StatisticsCard userId={userId} />
            </RightSidebarElement>
            <RightSidebarElement title={'Latest Trips'}>
                <LatestTrips/>
            </RightSidebarElement>
        </>
    );
};

export default ProfileComps;
