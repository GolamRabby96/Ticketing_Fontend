import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LeftPanel } from './Components/LeftPanel/LeftPanel';
import { AdminLandingPage } from './Components/AdminLandingPage/AdminLandingPage';
import { OpenTicket } from './Components/OpenTicket/OpenTicket';
import { LiveTickets } from './Components/LiveTickets/LiveTickets';
import { CreateTicket } from './Components/CreateTicket/CreateTicket';
import { AddMember } from './Components/AddMember/AddMember';
import { Login } from './Components/Login/Login';
import { useEffect } from 'react';
import { TeamMember } from './Components/TeamMember/TeamMember';
import cong from './firebase.config.js';
// https://ticketing-backend-tq82.onrender.com


function App() {
  const [count, setCount] = useState({});
  const [checkUser, SetUser] = useState(false)
  console.log(checkUser);
  const userdata = JSON.parse(localStorage.getItem("user") || "[]");
  console.log(userdata)
  useEffect(() => {
    if (userdata.user === true) {
      SetUser(true);
    } else {
      SetUser(false)
    }

  }, [count, userdata.user]);

  return (
    <div className='wrapper'>
      {checkUser ?
        <Router>
          <LeftPanel />
          <Routes>
            <Route exact path="/" element={<AdminLandingPage />} />
            <Route exact path="/open-ticket/:id" element={<OpenTicket />} />
            <Route exact path="/all-tickets" element={<LiveTickets />} />
            <Route exact path="/create-ticket" element={<CreateTicket />} />
            <Route exact path="/add-member" element={<AddMember />} />
            <Route exact path="/team-member" element={<TeamMember />} />
          </Routes>
        </Router>
        :
        <Router>
          < Login />
        </Router>
      }
    </div>
  )
}

export default App
