"use client";
import { useEffect } from "react"

export default function MainLayout({
    children, // will be a page or nested layout
  }) {

    useEffect(() => {
        if(localStorage.getItem('access_token') === null) {
            window.location.href = '/'
        }
    }, [])

    return (
      <>   
        {children}
      </>
    )
  }