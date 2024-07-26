import React from 'react'
import { useState } from 'react'

export const CreateTicket = () => {
    const userdata = JSON.parse(localStorage.getItem("user") || "[]");
    const [collectData, SetData] = useState({});
    const [infoMessage, SetInfoMessage] = useState("");

    const handleData = (e) => {
        const totalData = { ...collectData, ... { createdBy: userdata.userName } };
        totalData[e.target.name] = e.target.value;
        SetData(totalData);
    }
    const handleAddTicket = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/addTicket', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(collectData),
        })
            .then((res) => res.json())
            .then((data) => {
                SetInfoMessage(data.message);
                console.log(data)
                SetData({});
            })
            .catch((error) => {
                console.log(error.message);
            });
        e.target.reset();
    }
    setTimeout(function () {
        SetInfoMessage("");
    }, 6000);
    return (
        <div className='container'>
            <form onSubmit={handleAddTicket} className="row g-3 create-ticket-row">
                <div className="col-md-12">
                    {infoMessage.length > 0 && <h3 className='infoMessage shadow'>{infoMessage}</h3>}
                    <h3>Create ticket with customer proper information</h3>
                </div>
                <div className="col-6">
                    <label for="inputEmail4" className="form-label">Customer Name</label>
                    <input onBlur={handleData} name="ticket_name" type="text" className="form-control" id="inputEmail4" placeholder='Name' required />
                </div>
                <div className="col-6">
                    <label for="inputPassword4" className="form-label">Contact Number</label>
                    <input onBlur={handleData} name="phone_number" type="text" className="form-control" id="inputPassword4" placeholder='***A Valid phone number must' required />
                </div>
                <div className="col-6">
                    <label for="inputPassword4" className="form-label">Email Address</label>
                    <input onBlur={handleData} name="ticket_email" type="email" className="form-control" id="inputPassword4" placeholder='Email address' required />
                </div>
                <div className="col-6">
                    <label for="inputAddress2" className="form-label">Ticket Issue</label>
                    <input onBlur={handleData} name="ticket_issue" type="text" className="form-control" id="inputAddress2" placeholder="Write a valid issue" required />
                </div>
                <div className="col-12">
                    <label for="inputAddress" className="form-label">Customer Address</label>
                    <input onBlur={handleData} name="address" type="text" className="form-control" id="inputAddress" placeholder="Customer address also lat-long if possible" required />
                </div>
                <div className="col-md-4">
                    <label for="inputState" className="form-label">Select Team</label>
                    <select onBlur={handleData} name="team" id="inputState" className="form-select" required>
                        <option value=''>Choose...</option>
                        <option value='Radio'>Radio</option>
                        <option value='Fiber'>Fiber</option>
                        <option value='VSAT'>VSAT</option>
                        <option value='IPTSP'>IPTSP</option>
                        <option value='NOC'>NOC</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <label for="inputState" className="form-label">Zone ...</label>
                    <select onBlur={handleData} name="ticket_zone" id="inputState" className="form-select" required>
                        <option value=''>Choose...</option>
                        <option value='Dhaka'>Dhaka</option>
                        <option value='Khulna'>Khulna</option>
                        <option value='Chitagone'>Chitagone</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <label for="inputState" className="form-label">Priority ...</label>
                    <select onBlur={handleData} name="ticket_priority" id="inputState" className="form-select" required>
                        <option value=''>Choose...</option>
                        <option value='Normal'>Normal</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Emergency">Emergency</option>
                    </select>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-warning container">Create Ticket</button>
                </div>
            </form>
        </div>
    )
}
