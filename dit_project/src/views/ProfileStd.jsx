import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';
import './view.css';

const ProfileStd = () => {
const [profileData, setProfileData] = useState([]);
const [loading, setLoading] = useState(true);
const { user } = useStateContext();
const roll_num = user?.roll_num || ''; // Use a default value if user is null or undefined

  useEffect(() => {
    if (!roll_num) {
        setLoading(false); // No need to make the API request if roll_num is empty
        return;
      }
    // Make the API request here
    axiosClient.get(`/studentMe?roll_num=${roll_num}`)
      .then(response => {
        setProfileData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [user]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profileData) {
    return <div>Error: Unable to fetch profile data</div>;
  }

  const { name, email,phone_num,father_name,mother_name } = profileData;

  return (
    <div className="container">
    <h2>User Profile</h2>
    <table>
      <tbody>
        <tr>
          <td>Name</td>
          <td>{name}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>{email}</td>
        </tr>
        <tr>
          <td>Phone Number</td>
          <td>{phone_num}</td>
        </tr>
        <tr>
          <td>Father's Name</td>
          <td>{father_name}</td>
        </tr>
        <tr>
          <td>Mother's Name</td>
          <td>{mother_name}</td>
        </tr>
        {/* Add additional profile fields here */}
      </tbody>
    </table>
  </div>
  );
}

export default ProfileStd;
