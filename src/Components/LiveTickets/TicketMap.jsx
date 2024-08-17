import React from 'react'
import { Link } from 'react-router-dom';

export const TicketMap = ({ ticket = [], handleSearchClear }) => {
    return (
        <div>
            {
                ticket.map((ticket) => {

                    return (
                        <div className="col-md-12 mt-5">

                            <Link onClick={handleSearchClear} to={`/open-ticket/${ticket._id}`}>
                                <div className="all-tickets">
                                    <div className='ticket-box'>
                                        <div className="ticketAndIssue">
                                            <h2>
                                                <span>#{ticket.ticket_id} </span>
                                                <span className='middle-bar'>||</span> {ticket.ticket_name} &nbsp;
                                            </h2>
                                            <p className='text-danger'>issues : {ticket.ticket_issue} &nbsp;&nbsp;&nbsp; <span className={`${ticket.ticket_priority}MainPage extensionMainCSS`}> {ticket.ticket_priority}</span>
                                                &nbsp;&nbsp;&nbsp;
                                                <span className={`${ticket.ticket_status}Status extensionMainCSS`}> {ticket.ticket_status}</span></p>
                                        </div>
                                        <div className="ticketInformation">
                                            <p className='opening-time'><span className='text-success'>opening time</span> :{new Date(ticket.createdAt).toLocaleString()}</p>
                                            <p className='opening-time'> <span className='text-danger'>Created By </span>: {ticket.createdBy}</p>
                                        </div>

                                    </div>
                                    <div className='ticket-zone'>
                                        <p className='zone-name'>{ticket.ticket_zone} zone</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )
                })}
        </div>
    )
}
