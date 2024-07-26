import React, { useEffect, useState } from 'react'

export const TeamMember = () => {
    const [teamMember, getAllTeamMembers] = useState([]);
    console.log(teamMember);

    useEffect(() => {
        const teamMemberApi = async () => {
            const response = await fetch('http://localhost:5000/getAllUser');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            getAllTeamMembers(data.data);
        }
        teamMemberApi();
    }, [])



    return (
        <div className='container'>
            <div className="row">

                {teamMember.map(team => {
                    return (
                        <div className="col-md-3">
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
                })}

            </div>
        </div>
    )
}
