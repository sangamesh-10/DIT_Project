import React, { useRef } from 'react'
import { Outlet } from 'react-router-dom'
import axiosClient from '../axiosClient';
import { useStateContext } from '../contexts/ContextProvider';

export const StudentLogin = () => {

    const student_id=useRef();
    const password=useRef();
    const {setUser,setToken}=useStateContext();
    const onSubmit =(e) =>{
        e.preventDefault();
        const payload ={
            student_id : student_id.current.value,
            password : password.current.value
        }
        //console.log(payload);
        axiosClient.post('/studentLogin',payload)
        .then(({data})=>{
            setUser(data.user)
            setToken(data.token)
        })
        .catch(err =>{
            const response =err.response;
            if(response && response.status===422)
            {
                console.log(response.data.errors);
            }
        })
    }
  return(
    <div>
        <h2>LOGIN FORM</h2>
        <div>
            <form onSubmit={onSubmit}>
            <input ref={student_id} type="text" placeholder='RollNumber'/><br /><br />
            <input ref={password} type="password"placeholder='password'/><br /><br />
            <button >LOGIN</button>
            </form>
        </div>
    </div>
  )
}
