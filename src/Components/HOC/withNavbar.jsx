import React from 'react';
import Navbar from '../Navbar/Navbar';

const withNavbar = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className="content bg-gray-100 p-2 lg:p-10"
                style={{ minHeight: "100vh" }} >
                {children}
            </div>
        </>
    )
}

export default withNavbar
