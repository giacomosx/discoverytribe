import React from 'react';
import {Link} from "react-router-dom";
import Milestone from "../milestone/Milestone";

const Timeline = ({milestones}) => {
    return (
        <ol className="relative border-s border-gray-200 dark:border-gray-700">
            {milestones.map((milestone) => {
                return <Milestone key={milestone._id} milestone={milestone} />;
            })}
        </ol>


    );
};

export default Timeline;
