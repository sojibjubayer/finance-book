import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <div className='bg-[#E0AFFE] flex flex-col justify-center items-center py-5'>
            <h3 className='text-center mb-4 font-bold'> Finance Tracker</h3>
            <div className=' flex flex-col md:flex-row justify-center md:gap-20 gap-5'>
                <Link href='#'>About Us</Link>
                <Link href="#">Contact Us</Link>
                <Link href="#">Privacy Policy</Link>
            </div>
        </div>
    );
};

export default Footer;