"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const Page = ({params}) => {

    const router = useRouter();

    return (
        <div>
            <p>slug: {params.slug}</p>
        </div>
    );
};

export default Page;