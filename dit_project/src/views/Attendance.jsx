import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';
import './view.css';

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useStateContext();

  useEffect(() => {
    const roll_num = user.roll_num;

    axiosClient.get(`/getAttendance?roll_num=${roll_num}`)
      .then(response => {
        setAttendanceData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (attendanceData.length === 0) {
    return <div className="error-message">No marks found.</div>;
  }

  return (
    <div className='container'>
      <h2>Attendance </h2>
      <table>
        <thead>
          <tr>
            <th>Subject Code</th>
            <th>Subject Name</th>
            <th>Total Classes Present</th>
            <th>Total Classes Taken</th>
            <th>Total Percentage</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((attendance, index) => (
            <tr key={index}>
              <td>{attendance.subject_code}</td>
              <td>{attendance.subject_name}</td>
              <td>{attendance.attended}</td>
              <td>{attendance.total}</td>
              <td>{attendance.percentage +' %'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Attendance;
