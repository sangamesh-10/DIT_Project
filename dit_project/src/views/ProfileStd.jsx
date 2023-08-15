import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';
import './view.css';

const ProfileStd = () => {
  const [profileData, setProfileData] = useState({});
  const [enrolledData, setEnrolledData] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useStateContext();
  const roll_num = user?.roll_num || '';

  useEffect(() => {
    if (!roll_num) {
      setLoading(false); // No need to make the API request if roll_num is empty
      return;
    }

    // Make the API request to fetch profile data
    axiosClient
      .get(`/studentMe?roll_num=${roll_num}`)
      .then((response) => {
        setProfileData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
      });

    // Make the API request to fetch enrolled student data
    axiosClient
      .get(`/studentsEnrolled?roll_num=${roll_num}`)
      .then((response) => {
        setEnrolledData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching enrolled student data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [roll_num]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profileData) {
    return <div>Error: Unable to fetch profile data</div>;
  }

  const {
    name,
    email,
    phone_num,
    father_name,
    mother_name,
  } = profileData;
  const { batch, branch,specialization, semester } = enrolledData;

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
          <tr>
            <td>Batch</td>
            <td>{batch}</td>
          </tr>
          <tr>
            <td>Branch</td>
            <td>{branch}</td>
          </tr>
          <tr>
            <td>Specialization</td>
            <td>{specialization}</td>
          </tr>
          <tr>
            <td>Semester</td>
            <td>{semester}</td>
          </tr>
          {/* Add additional profile fields here */}
        </tbody>
      </table>
    </div>
  );
};

export default ProfileStd;

