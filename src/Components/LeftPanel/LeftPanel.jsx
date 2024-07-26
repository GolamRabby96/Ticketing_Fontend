import React, { useEffect, useState } from 'react'
import '../../App.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


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
        console.log(checkUser.userRole);
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
                            <i className="fa-regular fa-snowflake"></i>&nbsp;
                            Tickets
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/create-ticket" className="sidebar-link">
                            <i className="fa-solid fa-ticket"></i>&nbsp;
                            Create Tickets
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="#" className="sidebar-link">
                            <i className="fa-regular fa-chart-bar"></i>&nbsp;
                            Analysis
                        </Link>
                    </li>
                    {!flag && !ModFlag && <li className="sidebar-item">
                        <Link to="/team-member" className="sidebar-link">
                            <i className="fa-solid fa-people-roof"></i>&nbsp;
                            Team Member
                        </Link>
                    </li>}
                    {!flag && !ModFlag && <li className="sidebar-item">
                        <Link to="/add-member" className="sidebar-link">
                            <i className="fa-solid fa-share-nodes pe-2"></i>&nbsp;
                            Add Member
                        </Link>
                    </li>}
                    <hr />
                    <hr />
                    <li onClick={handleLogout} className="sidebar-item mt-5">
                        <Link to="" className="sidebar-link bg-danger">
                            <i className="fa-solid fa-share-nodes pe-2"></i>&nbsp;
                            Log Out
                        </Link>
                    </li>

                </ul>

            </div>
        </aside>
    )
}
