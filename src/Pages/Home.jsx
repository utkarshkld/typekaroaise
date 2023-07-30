import React from 'react'
import ankit from '../assets/ankit.jpg';
import utkarsh from '../assets/utkarsh.jpeg';
import saatvik from '../assets/saatvik.jpeg';
export default function Home() {
    return (
        <>
            <div className='home_page'>

                <div className='top_text'>
                    <h1>Welcome to TypeKaroAise.</h1>
                    {/* <h1>We are 3rd year undergraduate students at NIT Kurukshetra.</h1> */}

                </div>
                <div className='how_to_use'>
                    <h1>Directions:</h1>
                    <h3>There are two Modes : 1.Practice  2.Compete .</h3>
                    <h3>1.Practice</h3>
                    <p>A single player mode where you can select the difficulty and timing . And Track your typing speed and progress. </p>
                    <h3>2.Compete</h3>
                    <p>In this mode you can compete with other players around the world randomly. And Ranked based based upon your speed.</p>
                </div>
                {/* <div className='about_us'>
                    <div className="ankit name_div">

                        <img src={ankit} alt="" />
                        <h3 ><a className='linkedin' href="https://www.linkedin.com/in/ankit-kumar-549808229/"> Ankit kumar</a></h3>
                    </div>
                    <div className="utkarsh name_div">

                        <img src={utkarsh} alt="" />
                        <h3 ><a className='linkedin' href="https://www.linkedin.com/in/utkarsh-1aa707228/"> Utkarsh </a></h3>

                    </div>
                    <div className="saatvik name_div">

                        <img src={saatvik} alt="" />
                        <h3 ><a className='linkedin' href="https://www.linkedin.com/in/saatvik-garg/"> Saatvik </a></h3>
                    </div>
                </div> */}

            </div>
        </>
    )
}
