import React from 'react';

const Footer = ({maxWidth = "480px"}) => {
    return (
        <footer
            className="bg-gray-200 text-center py-4 w-full text-xs text-[#666] mx-auto"
            style={{ maxWidth }}
        >
            <p>© 2025 Hazy. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
