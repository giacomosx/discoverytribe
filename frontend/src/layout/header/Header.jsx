import React from 'react';

const Header = ({children}) => {
    return (
        <div className={'w-full'}>
            {children}
        </div>
    );
};

export default Header;
