"use client"
import { useSession } from 'next-auth/react';
import React from 'react';

const SetBudget = () => {
    const{data}=useSession();
    console.log(data?.user?.name)
    return (
        <div className='h-screen'>
            Set Budget
        </div>
    );
};

export default SetBudget;