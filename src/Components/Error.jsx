import React from 'react'

export default function Error() {
    return (
        <>
            <div className='home_page'>
                <h1>
                    The Page is having an error.
                </h1>
                <h1>
                    Please Reload the page.
                </h1>
                <Link to="/race">Click to go to practice page</Link>
            </div>
        </>
    )
}
