import React from 'react';
import LatestFollowers from "../../components/latestfollowers/LatestFollowers";
import RightSidebarElement from "../../components/rightsidebarelement/RightSidebarElement";
import CtaCard from "../../components/ctacard/CtaCard";
import StatisticsCard from "../../components/statisticscard/StatisticsCard";
import {useLocation} from "react-router-dom";
import LatestTrips from "../../components/latesttrips/LatestTrips";
import SavedTripsWidget from "../../components/savedtripswidget/SavedTripsWidget";
import PersonalComps from "../personalcomps/PersonalComps";

const RightSidebar = ({children}) => {


    return (
        <aside className={'hidden lg:block space-y-6 ps-8 max-w-sm min-w-96'}>
            {children}
        </aside>
    );
};

export default RightSidebar;
