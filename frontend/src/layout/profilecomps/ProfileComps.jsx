import React from 'react';
import RightSidebarElement from "../../components/rightsidebarelement/RightSidebarElement";
import LatestTrips from "../../components/latesttrips/LatestTrips";

const ProfileComps = ({userId}) => {

    return (

            <RightSidebarElement title={'Latest Trips'} >
                <LatestTrips />
            </RightSidebarElement>

    );
};

export default ProfileComps;
