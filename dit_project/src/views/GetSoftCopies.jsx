import React, { useState, useEffect } from 'react';
import axiosClient from "../axios-client";
import { useStateContext } from '../contexts/ContextProvider';

function GetSoftCopies() {
    const [softCopies, setSoftCopies] = useState({});
    const { user } = useStateContext();
    // const roll_num =user.roll_num;
    useEffect(() => {
        async function fetchSoftCopies() {
            try {
                const response = await axiosClient.get(`/getSoftCopies/?roll_num=${user.roll_num}`);
                setSoftCopies(response.data.softCopies);
            } catch (error) {
                console.error(error);
            }
        }

        fetchSoftCopies();
    });

    return (
        <div>
            <h2>Soft Copies</h2>
            <ul>
                {Object.keys(softCopies).map((column, index) => (
                    <li key={index}>
                        <a href={softCopies[column]} target='_blank' download>
                            {column}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GetSoftCopies;
