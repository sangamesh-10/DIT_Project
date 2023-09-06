import React,{useEffect,useState} from "react"
import axiosClient from "../axios-client"

export const ViewSemester=()=>
{
    const [semester,setsemesters]=useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData=async()=>{
        try{
            const response=await axiosClient.get(`/getSemester`)
            // console.log(response.data);
            setsemesters(response.data);
        }
        catch(err)
        {
            console.error("Error occurred",err);
        }
    }
    return(
        <div>
            <h2>Semester Enrollement</h2>
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Code</th>
                <th>Semester</th>
                {/* Add more table headings as needed */}
              </tr>
            </thead>
            <tbody>
              {semester.map((sem, index) => (
                <tr key={index}>
                  <td>{sem.year}</td>
                  <td>{sem.code}</td>
                  <td>{sem.semester}</td>
                  {/* Add more table data as needed */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    )

}
