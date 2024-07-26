import React, { useState } from 'react'
import { useEffect } from 'react';

export const AddMember = () => {
    const [flag, SetFlag] = useState(true);

    const [formData, SetFormData] = useState({});
    const [infoMessage, SetInfoMessage] = useState("");
    const handleFormData = (e) => {
        const newData = { ...formData };
        newData[e.target.name] = e.target.value;
        SetFormData(newData);
    }
    const handleAddUserSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/addUser', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                SetInfoMessage("Successfully added user");
                SetFormData({});
            })
            .catch((error) => {
                console.log(error.message);
            });
        e.target.reset();
    }
    setTimeout(function () {
        SetInfoMessage("");
    }, 5000);
    return (
        <div className='container'>
            <form onSubmit={handleAddUserSubmit} className="row g-3 create-ticket-row">
                <div className="col-md-12 mb-3">
                    {infoMessage.length > 0 && <h3 className='infoMessage shadow'>{infoMessage}</h3>}
                    <h3>Add Member On Your Priority Basis</h3>
                </div>
                <div className="col-md-6 col-sm-12 mb-2">
                    <label for="inputEmail4" className="form-label">Team Member Name</label>
                    <input type="text" name="user_name" className="form-control" id="inputEmail4" placeholder='Team member name' onChange={handleFormData} required />
                </div>
                <div className="col-md-6 col-sm-12 mb-2">
                    <label for="inputPassword4" className="form-label">Team Member Id</label>
                    <input type="text" name="user_id" className="form-control" id="inputPassword4" placeholder='EX-1010822' onChange={handleFormData} required />
                </div>

                <div className="col-md-4 col-sm-12 mb-2">
                    <label for="inputState" className="form-label">Which team...</label>
                    <select id="inputState" className="form-select" name="user_team" onChange={handleFormData} required="true">
                        <option value="">Choose...</option>
                        <option value="Regional Team">Regional Team</option>
                        <option value="NOC">NOC</option>
                        <option value="CCD">CCD</option>
                        <option value="Radion" >Radio</option>
                        <option value="Fiber" >Fiber</option>
                    </select>
                </div>
                <div className="col-md-4 col-sm-12 mb-2">
                    <label for="inputState" className="form-label">Which Zone ...</label>
                    <select id="inputState" name="user_zone" className="form-select" onChange={handleFormData} required="true">
                        <option value="">Choose...</option>
                        <option value="Dhaka">Dhaka</option>
                        <option value="khulna">Khulna</option>
                        <option value="Chitagone">Chitagone</option>
                    </select>
                </div>
                <div className="col-md-4 col-sm-12 mb-2">
                    <label for="inputState" className="form-label">Access Level ...</label>
                    <select id="inputState" name="user_type" className="form-select" onChange={handleFormData} required="true">
                        <option value="">Choose...</option>
                        <option value="Admin">Admin</option>
                        <option value="Moderator">Moderator</option>
                        <option value="Team">Team</option>
                    </select>
                </div>
                <div className="col-12 col-sm-12 py-5">

                    {flag ? <button type="submit" className="btn btn-warning container">Create Team Member</button> : <button className="btn btn-default container">Create Team Member</button>}
                </div>
            </form>
        </div>
    )
}
