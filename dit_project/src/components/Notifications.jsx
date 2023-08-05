import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Notifications = () => {
  return (
    <div>
        Notifications
        <Outlet/>
    </div>
  )
}

export default Notifications
