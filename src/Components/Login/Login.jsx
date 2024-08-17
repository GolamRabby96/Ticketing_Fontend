import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const navigate = useNavigate();
    const [flag, setServerFlag] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [databaseUser, setDatabase] = useState([]);
    const [messageInfo, SetMessageInfo] = useState("");
    console.log(userInfo, flag, databaseUser);
    const handleUserForm = (e) => {
        const data = { ...userInfo };
        data[e.target.name] = e.target.value;
        setUserInfo(data);


    };
    const handleLogin = (e) => {

        e.preventDefault();

        console.log('..........', databaseUser);
        if (userInfo.user_id && userInfo.user_password) {
            if (flag) {
                if (databaseUser) {

                    if (databaseUser.user_password === userInfo.user_password) {
                        localStorage.setItem("user", JSON.stringify({ user: true, userName: databaseUser.user_name, userRole: databaseUser.user_type }));
                        SetMessageInfo("Login Successfully");
                        e.target.reset();
                        setUserInfo({});
                        navigate('/all-tickets');
                        window.location.reload()
                    } else if (databaseUser.user_password != userInfo.user_password) {
                        if (databaseUser.user_password == 'undefined' || databaseUser.user_password == null || databaseUser.user_password == '') {
                            chekUser(userInfo.user_id);
                            fetch(`https://ticketing-backend-tq82.onrender.com/getUser/${userInfo.user_id}`)
                                .then((res) => res.json())
                                .then((data) => {
                                    setDatabase(data.data[0]);
                                    console.log(data.data[0]);
                                })


                            if (databaseUser.user_password === userInfo.user_password) {
                                localStorage.setItem("user", JSON.stringify({ user: true, userName: databaseUser.user_name, userRole: databaseUser.user_type }));
                                SetMessageInfo("Login Successfully");
                                e.target.reset();
                                setUserInfo({});
                                window.location.reload()
                            }
                            else {
                                SetMessageInfo("Please Input a valid user id and password");
                                localStorage.setItem("user", JSON.stringify(false));
                            }

                        }
                        else {
                            SetMessageInfo("Please Input a valid user id and password");
                            localStorage.setItem("user", JSON.stringify(false));
                        }
                    } else {
                        SetMessageInfo("Please Input a valid user id and password");
                        localStorage.setItem("user", JSON.stringify(false));
                    }

                } else {
                    SetMessageInfo("Please Input a valid user id and password");
                    localStorage.setItem("user", JSON.stringify(false));
                }
            } else {
                SetMessageInfo("Please Input a valid user id and password");
            }

        }
    }
    const chekUser = async (id) => {
        const response = await fetch(`https://ticketing-backend-tq82.onrender.com/getUser/${id}`);
        const data = await response.json();
        setDatabase(data.data[0]);
        setServerFlag(true);

    }


    useEffect(() => {
        if (userInfo.user_id) {
            console.log('......................................')
            chekUser(userInfo.user_id);
        }

        setTimeout(function () {
            SetMessageInfo("");
        }, 6000);
    }, [flag, userInfo.user_id])




    return (
        <div className='container-fluid bgColor'>
            <div className="row">
                <div className="col-md-12">
                    <div className="login-top ">
                        <div className="login-section">
                            <form onSubmit={handleLogin}>
                                <h3>LOG-IN</h3>
                                <p className='messageForm'>{messageInfo}</p>
                                <div className="from-section">
                                    <div className='form-input-section'>
                                        <label for="inputEmail4" class="form-label">User ID</label>
                                        <input onBlur={handleUserForm} type="text" name="user_id" class="form-control" id="inputEmail4" placeholder='Please Input your ID' required />
                                    </div>
                                    <div className='form-input-section'>
                                        <label for="inputEmail4" class="form-label">Password</label>
                                        <input onBlur={handleUserForm} type="text" class="form-control" name="user_password" id="inputEmail4" placeholder='Please Input your Password' required />
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
