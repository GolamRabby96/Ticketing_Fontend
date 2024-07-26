import React, { useState, useEffect, useMemo } from 'react'
import { TopSearch } from '../TopSearch/TopSearch'
import JoditEditor from 'jodit-react';
import { Link, useParams } from 'react-router-dom';
import { TicketMap } from '../LiveTickets/TicketMap';
import { SidePanel } from './SidePanel';
import { Message } from './Message';

export const OpenTicket = () => {
    const [flag, SetTeamFlag] = useState(false);
    const [ModFlag, SetModaratorFlag] = useState(false);
    const { id } = useParams();
    const [um, SetUm] = useState([]);
    const [ticketMessage, GetMessage] = useState("")
    const [rightBar, SetRightBar] = useState(false);
    const userdata = JSON.parse(localStorage.getItem("user") || "[]");
    const [ticket, SetTicket] = useState([]);
    console.log(ticket);
    const [idTicket, SetIdTicket] = useState([]);
    const [checkState, SetStateUpdate] = useState(false);
    const [AllTicketFlag, SetALLTicketFlag] = useState(true);
    const [filterData, SetFilterData] = useState({
        ticket_zone: 'ALL',
        ticket_status: 'open'
    })
    const [radioFlag, SetFlags] = useState({
        OT: true,
        CT: false
    });

    console.log(filterData)

    const handleFilterData = (e) => {

        if (e.target.value === 'open') {
            SetFlags({ OT: true, CT: false })
        }
        if (e.target.value === 'closed') {
            SetFlags({ OT: false, CT: true })
        }

        const totalData = { ...filterData };
        totalData[e.target.name] = e.target.value;
        SetFilterData(totalData);
        handleApi(totalData);
    }
    const handleApi = async (totalData) => {
        if (totalData.ticket_zone == 'ALL') {
            console.log('clicked all');
            const response = await fetch('http://localhost:5000/allTickets');
            const data = await response.json();
            const filterTicket = data.data.filter(t => t.ticket_status == totalData.ticket_status);
            SetTicket(filterTicket);
        }
        if (totalData.ticket_zone != 'ALL') {
            console.log('clicked zone');
            const response = await fetch(`http://localhost:5000/ticketZone/${totalData.ticket_zone}`);
            const data = await response.json();
            const filterTicket = data.data.filter(t => t.ticket_status == totalData.ticket_status);
            SetTicket(filterTicket);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const messageData = {
            user_name: userdata.userName,
            ticket_id: id,
            comment: ticketMessage
        }


        fetch('http://localhost:5000/cm', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(messageData),
        })
            .then((res) => res.json())
            .then((data) => {
                GetMessage("");
                SetStateUpdate(!checkState);
            })
            .catch((error) => {
                console.log(error.message);
            });
        e.target.reset();

    }

    console.log('..............');
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
            const data = await response.json();
            const filterTicket = data.data.filter(t => t.ticket_status == 'open');
            SetTicket(filterTicket);
            SetALLTicketFlag(false);
        }

        const ticketById = async () => {
            const response = await fetch(`http://localhost:5000/singleTicket/${id}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            SetIdTicket(data.data[0]);
        }
        const messageApi = async () => {
            const response = await fetch(`http://localhost:5000/cm/${id}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            SetUm(data.data);
        }
        if (AllTicketFlag) {
            ticketApi();
        }
        ticketById();
        messageApi();
    }, [id, checkState]);


    return (
        <div className={`main ${idTicket.ticket_priority}bgColor`}>
            <TopSearch />
            <div onClick={() => SetRightBar(!rightBar ? rightBar : !rightBar)} className='content px-3 py-2'>
                <div className='container-fluid'>
                    <div className="row">
                        <div className="col-md-12">
                            <div className='ticket-name'>
                                <h2>Ticket id: # {idTicket.ticket_id} - {idTicket?.ticket_name} <span className={`${idTicket.ticket_priority}extensionMain normalextensionMainEDITCSS`}>Ticket Priority: {idTicket.ticket_priority}</span> </h2>
                            </div>
                        </div>
                        <div className="col-md-12 mb-2">
                            <div className='ticket-info '>
                                <p className='ticket-info-float'><span>_Site Adress</span> : {idTicket?.address}</p>
                                <p className='ticket-info-float'><span>_Phone</span> : {idTicket?.phone_number}</p>
                                <p className='ticket-info-float'><span>_Email</span> : golamrabbynwu@gmail.com</p>
                            </div>
                        </div>
                        <div className="col-md-12 mb-5">
                            <div className='ticket-issue mb-2 mt-2'>
                                <p><span>#Issue : </span> {idTicket?.ticket_issue}</p>
                            </div>
                            <div className='ticket-message'>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-floating">
                                        <textarea onBlur={(e) => GetMessage(e.target.value)} name="ticketMessage" required className="form-control form-message" placeholder="Leave a comment here" id="floatingTextarea2" />
                                        <label for="floatingTextarea2">Update your text here</label>

                                        <div class="mt-3 form-underButton">
                                            <button class="btn btn-primary" type="submit">Update Status</button>
                                            <button class="btn btn-danger" type="button">Closed Ticket</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* ------------------------------------message section-------------------------------------------------------- */}
                        {
                            um.length ? <Message um={um} /> : <p className='ticket-message-update'>No One Update Yet</p>
                        }
                        {/* ------------------------------------message section-------------------------------------------------------- */}

                        <div className='col-md-12 mt-5'>
                            <div className='clicked-list'>
                                <p className='clicked-user' >Ataur Rahman , </p>
                                <p className='clicked-user'> Al Mamun , </p>
                                <p className='clicked-user'> Firoz , </p>
                                <p className='clicked-user'> Watched ---- </p>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
            {/* -------------------------------Right Toggle bar Start------------------------------------------ */}
            <div className='right-bar-main'>
                <div className={`${rightBar}` + 'check'}>
                    <div onClick={() => SetRightBar(!rightBar)} className="r-menu">
                        <i class="fa-solid fa-bars "></i>
                    </div>
                    <div className='r-main'>
                        <div className="r-all mt-5">
                            <div className="row ms-2 mt-3">
                                {!flag && <div className="right-zone">
                                    <select onClick={handleFilterData} name="ticket_zone" id="inputState" required>
                                        <option value="ALL">Show All Zone</option>
                                        <option value="Dhaka">Dhaka Zone</option>
                                        <option value="Khulna">Khulna Zone</option>
                                        <option value="Chitagone">Chitagone Zone</option>
                                    </select>
                                </div>}
                                <div className="divvvv">
                                    {!flag && <div className='right-OpenClosedTicket'>
                                        <div className='r-Open-tickets-Radio'>
                                            <input checked={radioFlag.OT} onClick={handleFilterData} className='Radio-Button' type="radio" id="Open" name="ticket_status" value="open" />
                                            <label for="Open">OT</label>
                                        </div>
                                        <div className='r-Closed-tickets-Radio'>
                                            <input checked={radioFlag.CT} onClick={handleFilterData} className='Radio-Button' type="radio" id="Closed" name="ticket_status" value="closed" />
                                            <label for="Closed">CT</label>
                                        </div>
                                    </div>}
                                    {ticket.length ? <SidePanel ticket={ticket} /> : <p className='ticket-message-update text-warning mt-5'>No ticket found</p>}
                                    {/* ---------------------- */}
                                </div>

                            </div>
                            {/* ....................... */}
                        </div>

                    </div>

                </div>

            </div>
            {/* -------------------------------Right Toggle bar end------------------------------------------ */}
        </div >
    )
}
