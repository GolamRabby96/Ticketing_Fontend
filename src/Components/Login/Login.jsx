import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const navigate = useNavigate();
    const [flag, SetFlag] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [databaseUser, setDatabase] = useState([]);
    const [messageInfo, SetMessageInfo] = useState("")
    const handleUserForm = (e) => {
        const data = { ...userInfo };
        data[e.target.name] = e.target.value;
        setUserInfo(data)
        if (userInfo.userId) {
            console.log('......................................')
            const chekUser = async () => {
                const response = await fetch(`http://localhost:5000/getUser/${userInfo.userId}`);
                const data = await response.json();
                setDatabase(data.data[0]);
            }
            chekUser();
        }

    };
    const handleLogin = (e) => {
        e.preventDefault();
        if (databaseUser) {
            console.log('enter')
            if (databaseUser.user_password === userInfo.userPass) {
                localStorage.setItem("user", JSON.stringify({ user: true, userName: databaseUser.user_name, userRole: databaseUser.user_type }));
                SetMessageInfo("Login Successfully");
                e.target.reset();
                setUserInfo({});
                window.location.reload()
            }
            if (databaseUser.user_password != userInfo.userPass) {
                SetMessageInfo("User ID or Paddword not matched");
                localStorage.setItem("user", JSON.stringify(false));
            }
        } else {
            SetMessageInfo("User ID or Paddword not matched");
        }
        setUserInfo({});
        e.target.reset();
    }



    useEffect(() => {
        setTimeout(function () {
            SetMessageInfo("");
        }, 6000);
    }, [databaseUser, userInfo, flag])





    return (
        <div className='container-fluid bgColor'>
            <div className="row">
                <div className="col m-5">
                    <div className="login-top ">
                        <div className="login-section">
                            <form onSubmit={handleLogin}>
                                <h3>Log-in and exporer the featurer</h3>
                                <p className='messageForm'>{messageInfo}</p>
                                <div className="from-section">
                                    <div className='form-input-section'>
                                        <label for="inputEmail4" class="form-label">User ID</label>
                                        <input onBlur={handleUserForm} type="text" name="userId" class="form-control" id="inputEmail4" placeholder='Please Input your ID' required />
                                    </div>
                                    <div className='form-input-section'>
                                        <label for="inputEmail4" class="form-label">Password</label>
                                        <input onBlur={handleUserForm} type="text" class="form-control" name="userPass" id="inputEmail4" placeholder='Please Input your Password' required />
                                    </div>
                                    <div className="button-login">
                                        <button type='submit' className="btn btn-success container">Submit</button>
                                    </div>
                                    {/* btnFlag */}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
