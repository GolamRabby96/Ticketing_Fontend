import React, { useState, useEffect } from 'react'

export const Message = ({ um }) => {
    const formatDate = (string) => {
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([], options);
    }
    formatDate()
    return (
        <div>
            {
                um.map(umMap => {
                    return (
                        <div div className='col-md-12 mb-3'>
                            <div className="message-body ">
                                <div className="message-info">
                                    <h3>{umMap.comment}</h3>
                                </div>
                                <div className='message-sender'>
                                    <p><span>{new Date(umMap.createdAt).toLocaleString()}</span></p>
                                    <p>Sender //<span> {umMap.user_name}</span></p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }




        </div >
    )
}
