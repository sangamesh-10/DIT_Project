import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';
import './view.css';

const ProfileFaculty = () => {
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useStateContext();
  const faculty_id = user?.faculty_id || '';

  useEffect(() => {
    if (!faculty_id) {
      setLoading(false); // No need to make the API request if roll_num is empty
      return;
    }

    // Make the API request to fetch profile data
    axiosClient
      .get(`/me?faculty_id=${faculty_id}`)
      .then((response) => {
        setProfileData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
      })
    .finally(() => {
        setLoading(false);
      });
  }, [faculty_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profileData) {
    return <div>Error: Unable to fetch profile data</div>;
  }

  const {
    name,
    email,
    alt_email,
    phone_num,
    designation,
    experience,
  } = profileData;


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
            <td>Alternative_Email</td>
            <td>{alt_email}</td>
          </tr>
          <tr>
            <td>Phone Number</td>
            <td>{phone_num}</td>
          </tr>
          <tr>
            <td>Designation</td>
            <td>{designation}</td>
          </tr>
          <tr>
            <td>Experience</td>
            <td>{experience}</td>
          </tr>
          {/* Add additional profile fields here */}
        </tbody>
      </table>
    </div>
  );
};

export default ProfileFaculty;

