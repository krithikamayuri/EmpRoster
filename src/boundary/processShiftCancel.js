import React, { useEffect, useState } from 'react';
import { getAllShiftCancelRequests } from '../controller/shiftController';

const ShiftCancel = () => {
    const [shiftCancelRequests, setShiftCancelRequests] = useState([]);

    useEffect(() => {
        // Call the function to retrieve shift cancellation requests
        const fetchData = async () => {
            try {
                const data = await getAllShiftCancelRequests();
                setShiftCancelRequests(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching shift cancellation requests:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Pending Requests</h1>
            <ul>
                {shiftCancelRequests.map(request => (
                    <li key={request.id}>{request.description}</li>
                ))}
            </ul>
        </div>
    );
}

export default ShiftCancel;
