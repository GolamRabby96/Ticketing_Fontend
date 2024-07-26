import React from 'react'
import { TopSearch } from '../TopSearch/TopSearch'

export const AdminLandingPage = () => {
    return (
        <div className="main">
            <TopSearch />
            <main className="content px-3 py-2">
                <div className="container-fluid">
                    <div className="mb-3">
                        <h1>Welcome to the landing page</h1>
                    </div>
                </div>
            </main>
        </div>
    )
}
