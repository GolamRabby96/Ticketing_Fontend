import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { TicketMap } from './TicketMap';
import { TopSearch } from '../TopSearch/TopSearch';

export const ClosedTicket = () => {
    const [ticket, SetTicket] = useState([]);

    useEffect(() => {
        const ticketApi = async () => {
            const response = await fetch('https://ticketing-backend-tq82.onrender.com/allTickets');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            SetTicket(data.data);
        }
        ticketApi();
    }, [])

    return (
        <div className="container mb-5">
            <div className="row ms-2">
                <div className="col-md-10">
                    <TopSearch />
                </div>
                <TicketMap ticket={ticket} />
            </div>
        </div>
    )
}
