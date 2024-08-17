import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TicketMap } from '../LiveTickets/TicketMap';

export const TopSearch = () => {
    const [searchItem, SetItem] = useState({});
    const [inputSearch, SetInputSearch] = useState("");
    const handleChange = (e) => {
        SetInputSearch(e.target.value);
        let scearchContent = e.target.value;
        console.log(scearchContent.length)
        const messageApi = async () => {
            const response = await fetch(`https://ticketing-backend-tq82.onrender.com/ticket/${scearchContent}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            SetItem(data.data);
        }
        messageApi();
        if (scearchContent.length <= 0) {
            SetItem({})
            console.log('checked')
        }
    }
    const handleSearchClear = () => {
        SetItem({});
        SetInputSearch("")
    }

    return (
        <div>
            <nav className="navbar navbar-expand px-3 border-bottom">
                <button className="btn mobile-menu" type="button" data-bs-theme="light">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <input onChange={handleChange} type="text" className="form-control mt-3" id="formGroupExampleInput" value={inputSearch} placeholder="Search your ticket" />
            </nav>
            <div className='searchBox'>
                <div>
                    {searchItem.length > 0 && <TicketMap ticket={searchItem} handleSearchClear={handleSearchClear} />}
                    {searchItem.length > 0 && <p className='searchBottomBar'>
                        Top section is your Search result                    </p>}
                </div >
            </div>
        </div>
    )
}
