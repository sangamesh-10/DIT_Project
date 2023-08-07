import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'

const Notifications = () => {
    const {user,token} = useStateContext()
    if(!token){
        return <Navigate to = '/StudentLogin' />
    }
  return (
    <div>
        Notifications
        <Outlet/>
    </div>
  )
}

export default Notifications
