import React, { useState, useEffect } from 'react'
import { TicketMap } from './TicketMap';
import { TopSearch } from '../TopSearch/TopSearch';

export const LiveTickets = () => {
    const [flag, SetTeamFlag] = useState(false);
    const [ModFlag, SetModaratorFlag] = useState(false);
    const [ticket, SetTicket] = useState([]);
    const [radioFlag, SetFlags] = useState({
        OT: true,
        CT: false
    });
    console.log(radioFlag);
    const handleClick = (e) => {
        if (e.target.value === 'open') {
            SetFlags({ OT: true, CT: false })
        }
        if (e.target.value === 'closed') {
            SetFlags({ OT: false, CT: true })
        }
        const ticketApi = async () => {
            const response = await fetch('http://localhost:5000/allTickets');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            const filterTicket = data.data.filter(t => t.ticket_status == e.target.value);
            SetTicket(filterTicket);
        }
        ticketApi();


    }

    useEffect(() => {
        const checkUser = JSON.parse(localStorage.getItem("user") || "[]");
        if (checkUser) {
            if (checkUser.userRole === 'Team') {
                SetTeamFlag(true);
            }
            if (checkUser.userRole === 'Moderator') {
                SetModaratorFlag(true);
            }
        }
        const ticketApi = async () => {
            const response = await fetch('http://localhost:5000/allTickets');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            const filterTicket = data.data.filter(t => t.ticket_status == 'open');
            SetTicket(filterTicket);
        }
        ticketApi();
        console.log('----------')
    }, [])

    return (
        <div className="container mb-5">
            <div className="row ms-2">
                <div className="col-md-10">
                    <TopSearch />

                </div>
                {!flag && <div className='OpenClosedTicket'>
                    <div className='Open-tickets-Radio'>
                        <input checked={radioFlag.OT} onClick={handleClick} className='Radio-Button' type="radio" id="Open" name="checkOpen" value="open" />
                        <label for="Open">Open Tickets</label>
                    </div>
                    <div className='Closed-tickets-Radio'>
                        <input checked={radioFlag.CT} onClick={handleClick} className='Radio-Button' type="radio" id="Closed" name="checkOpen" value="closed" />
                        <label for="Closed">Closed Tickets</label>
                    </div>
                </div>}
                <TicketMap ticket={ticket} />
            </div>
        </div>
    )
}
