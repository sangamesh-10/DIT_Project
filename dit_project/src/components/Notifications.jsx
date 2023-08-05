import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Notifications = () => {
    const {user,token} = useStateContext()
    if(token){
        return <Navigate to = '/FacultyLogin' />
    }
  return (
    <div>
        Notifications
        <Outlet/>
    </div>
  )
}

export default Notifications
