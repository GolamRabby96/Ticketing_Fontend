import React, { useEffect, useState } from 'react'
import '../../App.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { GrTicket } from "react-icons/gr";
import { PiTicketDuotone } from "react-icons/pi";
import { DiGoogleAnalytics } from "react-icons/di";
import { HiMiniUserGroup } from "react-icons/hi2";
import { MdGroupAdd } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";


export const LeftPanel = () => {
    const [flag, SetTeamFlag] = useState(false);
    const [ModFlag, SetModaratorFlag] = useState(false);

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.setItem("user", JSON.stringify(false));
        window.location.reload()
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
    }, [])

    return (
        <aside id="sidebar">
            <div className="left-side-menu">
                <div className="sidebar-logo">
                    <Link to="#">ADN Tickets</Link>
                </div>
                <ul className="sidebar-nav">
                    <li className="sidebar-header">
                        Tools & Components
                    </li>
                    <li className="sidebar-item">
                        <Link to="/all-tickets" className="sidebar-link">
                            <GrTicket />&nbsp;
                            Tickets
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/create-ticket" className="sidebar-link">
                            <PiTicketDuotone />&nbsp;
                            Create Tickets
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="#" className="sidebar-link">
                            <DiGoogleAnalytics />&nbsp;
                            Analysis
                        </Link>
                    </li>
                    {!flag && !ModFlag && <li className="sidebar-item">
                        <Link to="/team-member" className="sidebar-link">

                            <HiMiniUserGroup />&nbsp;
                            Team Member
                        </Link>
                    </li>}
                    {!flag && !ModFlag && <li className="sidebar-item">
                        <Link to="/add-member" className="sidebar-link">
                            < MdGroupAdd />&nbsp;
                            Add Member
                        </Link>
                    </li>}
                    <hr />
                    <hr />
                    <li onClick={handleLogout} className="sidebar-item mt-5">
                        <Link to="" className="sidebar-link bg-danger">
                            <IoMdLogOut />&nbsp;
                            Log Out
                        </Link>
                    </li>

                </ul>

            </div>
        </aside>
    )
}
