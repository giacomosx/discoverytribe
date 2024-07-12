import React from 'react';

const RightSidebar = ({children}) => {


    return (
        <aside className={'hidden lg:block space-y-6 ps-8 max-w-sm min-w-96'}>
            {children}
        </aside>
    );
};

export default RightSidebar;
