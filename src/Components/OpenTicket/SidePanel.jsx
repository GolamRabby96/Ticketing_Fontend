import React from 'react'
import { Link } from 'react-router-dom'

export const SidePanel = ({ ticket = [] }) => {
    return (
        <div className='r-side-panel-margin'>
            {
                ticket.map((ticket) => {
                    return (
                        <div className="col-md-12 mt-4">
                            <Link to={`/open-ticket/${ticket._id}`}>
                                <div className="all-tickets r-all-tickets">
                                    <div className='r-ticket-box'>
                                        <h2><span># {ticket.ticket_id} </span><span className='middle-bar'>||
                                        </span> {ticket.ticket_name} </h2>
                                        <p className='text-danger'>issues : {ticket.ticket_issue}
                                            <span className={`${ticket.ticket_status}Status extensionCSS`}>{ticket.ticket_status}</span>
                                            <span className={`${ticket.ticket_priority}extension extensionCSS`}>{ticket.ticket_priority}</span>&nbsp;
                                        </p>
                                    </div>
                                    <div className='r-ticket-zone'>
                                        <p className='zone-name'>{ticket.ticket_zone} zone</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )
                })
            }

        </div>
    )
}
