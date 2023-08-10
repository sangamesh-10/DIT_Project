import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';
import './view.css';

const InternalMarks = () => {
  const [marksData, setMarksData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useStateContext(); // Assuming user object contains roll_num

  useEffect(() => {
    const roll_num = user.roll_num;

    // Make the API request here
    axiosClient.get(`/getInternalMarks?roll_num=${roll_num}`)
      .then(response => {
        setMarksData(response.data);
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

  if (marksData.length === 0) {
    return <div className="error-message">No marks found.</div>;
  }

  return (
    <div className='container'>
      <h2>Internal Marks</h2>
      <table>
        <thead>
          <tr>
            <th>Subject Code</th>
            <th>Subject Name</th>
            <th>Mid 1</th>
            <th>Mid 2</th>
          </tr>
        </thead>
        <tbody>
          {marksData.map((mark, index) => (
            <tr key={index}>
              <td>{mark.subject_code}</td>
              <td>{mark.subject_name}</td>
              <td>{mark.mid1 !== null ? mark.mid1 : 'Marks Not Updated'}</td>
              <td>{mark.mid2 !== null ? mark.mid2 : 'Marks Not Updated'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InternalMarks;
