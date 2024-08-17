import React, { useEffect, useState } from 'react'

export const TeamMember = () => {
    const [teamMember, getAllTeamMembers] = useState([]);
    console.log(teamMember.length);

    useEffect(() => {
        const teamMemberApi = async () => {
            const response = await fetch('https://ticketing-backend-tq82.onrender.com/getAllUser');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            getAllTeamMembers(data.data);
        }
        teamMemberApi();
    }, [])



    return (
        <div className='container'>
            <div className="row mt-5">

                {teamMember.length > 0 &&
                    teamMember.map(team => {
                        return (
                            <div className="col-md-4">
                                <div className={`${team.user_type}Box userCommonBox`}>
                                    <div className='userMainBox'>
                                        <h4>User Type : {team.user_type}</h4>
                                        <h3>User_id : {team.user_id}</h3>
                                        <h3>User_name : {team.user_name}</h3>
                                        <p>Team : {team.user_team}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                {teamMember.length <= 0 &&
                    <div className='Loading-button'>
                        <button class="btn btn-danger" type="button" disabled>
                            <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>&nbsp;&nbsp;&nbsp;
                            <span role="status">Loading . . . .</span>
                        </button>
                    </div>
                }

            </div>
        </div>
    )
}
