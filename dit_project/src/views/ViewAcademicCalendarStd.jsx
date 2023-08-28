import React, { useState,useEffect } from "react";
import axiosClient from "../axios-client";
export const ViewAcademicCalendarStudent=()=>{
    const [calendar,setCalendar]=useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData=async()=>{
        try{
            const response=await axiosClient.get("/getAcademicCalendarStudent");
            setCalendar(response.data);
        }
        catch(err)
        {
            console.error("Error Occurred",err);
        }

    }
    return(
        <div>
                <div>
                    <h2>Academic Calendar</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>From</th>
                                <th>To</th>
                            </tr>
                        </thead>
                        <tbody>
                            {calendar.map((calendarItem, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{calendarItem.description}</td>
                                        <td>{calendarItem.from_date}</td>
                                        <td>{calendarItem.to_date ? calendarItem.to_date : "-"}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
        </div>
    )
}
