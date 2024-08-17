import React, { useState, useEffect, useMemo } from 'react'
import { TopSearch } from '../TopSearch/TopSearch'
import JoditEditor from 'jodit-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TicketMap } from '../LiveTickets/TicketMap';
import { SidePanel } from './SidePanel';
import { Message } from './Message';
import { GiTensionSnowflake } from "react-icons/gi";
import { BiStreetView } from "react-icons/bi";

export const OpenTicket = () => {
    const userdata = JSON.parse(localStorage.getItem("user") || "[]");
    const navigate = useNavigate();
    const [flag, SetTeamFlag] = useState(false);
    const [ModFlag, SetModaratorFlag] = useState(false);
    const { id } = useParams();
    const [um, SetUm] = useState([]);
    const [ticketMessage, GetMessage] = useState("")
    const [rightBar, SetRightBar] = useState(false);
    const [ticket, SetTicket] = useState([]);
    const [isOpen, setTicketMessage] = useState(true);

    console.log(isOpen);
    const [idTicket, SetIdTicket] = useState([]);
    console.log('............23...........', idTicket);
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
            const response = await fetch('https://ticketing-backend-tq82.onrender.com/allTickets');
            const data = await response.json();
            const filterTicket = data.data.filter(t => t.ticket_status == totalData.ticket_status);
            SetTicket(filterTicket);
        }
        if (totalData.ticket_zone != 'ALL') {
            console.log('clicked zone');
            const response = await fetch(`https://ticketing-backend-tq82.onrender.com/ticketZone/${totalData.ticket_zone}`);
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


        fetch('https://ticketing-backend-tq82.onrender.com/cm', {
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
            const response = await fetch('https://ticketing-backend-tq82.onrender.com/allTickets');
            const data = await response.json();
            const filterTicket = data.data.filter(t => t.ticket_status == 'open');
            SetTicket(filterTicket);
            SetALLTicketFlag(false);

        }

        const ticketById = async () => {
            // const response = await fetch(`https://ticketing-backend-tq82.onrender.com/singleTicket/${id}`);
            const response = await fetch(`https://ticketing-backend-tq82.onrender.com/singleTicket/${id}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            SetIdTicket(data.data[0]);
            if (data.data[0].ticket_status == 'closed') {
                setTicketMessage(false);
            } else if (data.data[0].ticket_status == 'open') {
                setTicketMessage(true);
            }
            updateStatus()
        }
        const messageApi = async () => {
            const response = await fetch(`https://ticketing-backend-tq82.onrender.com/cm/${id}`);
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


    const updateStatus = async () => {
        fetch(`https://ticketing-backend-tq82.onrender.com/ticketStatus/${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify([userdata.userName]),
        })
            .then((res) => res.json())
            .then((data) => {
                SetIdTicket(data.data[0])
            })
            .catch((error) => {
                console.log(error.message);
            });
    }


    const handleClosedTicket = async () => {
        const response = await fetch(`https://ticketing-backend-tq82.onrender.com/ticketClosed/${id}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        navigate('/all-tickets');
    }



    return (
        <div className={`main ${idTicket.ticket_priority}bgColor`}>
            <TopSearch />
            <div onClick={() => SetRightBar(!rightBar ? rightBar : !rightBar)} className='content px-3 py-2'>
                <div className='container-fluid'>
                    <div className="row">
                        <div className="col-md-12">
                            {idTicket.ticket_id ? <div className='ticket-name'>
                                <h2>Ticket id: # {idTicket.ticket_id} - {idTicket?.ticket_name} </h2>
                            </div> : <div className='Loading-button-OpenTicket'>
                                <button class="btn btn-danger" type="button" disabled>
                                    <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>&nbsp;&nbsp;&nbsp;
                                    <span role="status">Loading . . . .</span>
                                </button>
                            </div>}
                        </div>
                        {
                            idTicket.ticket_id && <div className="col-md-12 mb-2">
                                <div className='ticket-info '>
                                    <p className='ticket-info-float'><span>_Site Adress</span> : {idTicket?.address}</p>
                                    <p className='ticket-info-float'><span>_Phone</span> : {idTicket?.phone_number}</p>
                                    <p className='ticket-info-float'><span>_Email</span> : {idTicket?.ticket_email}</p>
                                </div>
                            </div>
                        }
                        <div className="col-md-12 mb-5">
                            <div className='ticket-issue mb-2 mt-2'>
                                <p className=''>issues : {idTicket.ticket_issue} &nbsp;&nbsp;&nbsp; <span className={`${idTicket.ticket_priority}MainPage extensionMainCSS`}> {idTicket.ticket_priority}</span>
                                    &nbsp;&nbsp;&nbsp;
                                    <span className={`${idTicket.ticket_status}Status extensionMainCSS`}> {idTicket.ticket_status}</span></p>

                            </div>
                            {isOpen && <div className='ticket-message'>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-floating">
                                        <textarea onBlur={(e) => GetMessage(e.target.value)} name="ticketMessage" required className="form-control form-message" placeholder="Leave a comment here" id="floatingTextarea2" />
                                        <label for="floatingTextarea2">Update your text here</label>

                                        <div class="mt-3 form-underButton">
                                            <button class="btn btn-primary" type="submit">Update Status</button>
                                            <button class="btn btn-danger" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Closed Ticket</button>
                                        </div>
                                    </div>
                                </form>
                            </div>}
                        </div>

                        {/* ------------------------------------message section-------------------------------------------------------- */}
                        {
                            um.length ? <Message um={um} /> : <p className='ticket-message-update'>No One Update Yet</p>
                        }
                        {/* ------------------------------------message section-------------------------------------------------------- */}

                        <div className='col-md-12 mt-5'>
                            <div className='clicked-list'>
                                &nbsp;<p className='clicked-user'> <BiStreetView /></p>&nbsp;
                                {idTicket.watched?.map(m => <p className='clicked-user' >&nbsp;{m}, &nbsp;</p>)}
                                &nbsp;<p className='clicked-user'> <BiStreetView /></p>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
            {/* -------------------------------Right Toggle bar Start------------------------------------------ */}
            <div className='right-bar-main'>
                <div className={`${rightBar}` + 'check'}>
                    <div onClick={() => SetRightBar(!rightBar)} className="r-menu">
                        <GiTensionSnowflake />
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
            {/* <!-- Modal --> */}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Are you sure ?</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Once closed, No option to re-open this ticket.
                        </div>
                        <div class="modal-footer">
                            <button onClick={handleClosedTicket} type="button" class="btn btn-danger" data-bs-dismiss="modal">Ticket Closed</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
