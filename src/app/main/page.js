"use client"
import React, { useEffect } from "react";
const main = () => {
    useEffect(() => {
        const token = window.localStorage.getItem('access_token')
        console.log(token);
    },[]);
    return (
        <div>
            main
        </div>
    );
}
export default main;