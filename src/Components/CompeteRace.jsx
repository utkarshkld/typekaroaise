import React, { useEffect, useState } from 'react'

import { app } from '../firebase';
import Bar from '../Components/Bar';
import { onValue, ref, set } from 'firebase/database';
import { getDatabase } from 'firebase/database';
const db = getDatabase(app);

export default function CompeteRace({ usrname, startingin, handleTime, handledifficulty, handlechange, carelement, timerem, diff, word, wrong, something, coloredText, normaltext, hiscore, accuracy, progress, downthecount, resettext, tempwpm, wpm }) {
    const [allPlayers, setAllplayers] = useState([]);

    let snap = [];
    if (timerem == 0) {
        allPlayers.map((player) => {
            onValue(ref(db, `players/${player}`), (snapshot) => {
                snap.push(snapshot.val())
            })
        })
        snap.sort((a, b) => b.speed - a.speed);
        // console.log(snap);
    }

    let players = []
    useEffect(() => {
        carelement?.map((ele) => {
            players.push(ele)
        })
        setAllplayers(players);

    }, [carelement])


    return (
        <>
            <div className='race_page'>
                <div className='type_race'>
                    <div className={`completed ${timerem == 0 ? "" : "none"}`}>
                        {/* <button className='reset btn selectbtn' onClick={resettext}>Reset</button> */}
                        <h1>ACCURACY : {accuracy}%</h1>
                        <h1>SPEED (WPM) : {wpm}</h1>
                    </div>
                    <div className='timetab'>
                        {/* <button className='start btn' onClick={resettext}>Reload</button> */}
                        <h1>{diff}</h1>
                        <h1 className='timerem'>{timerem}s</h1>
                        <h1 className='timrem'> Starting in : {startingin >= 0 ? startingin : 0}s</h1>
                    </div>
                    <div className="visual">
                        <div className='car'>
                            <div className='abs'>

                                {allPlayers && allPlayers.map((redcarsid, ind) => {
                                    let data = 0;
                                    let progressm = 0;
                                    {/* console.log(redcarsid) */ }
                                    onValue(ref(db, `players/${redcarsid}`), (snapshot) => {
                                        data = snapshot.val();
                                        progressm = data.progressmeter
                                    })
                                    return <>
                                        <Bar key={ind} carname={data.name} className="progress_img_bar" progress={progressm} />
                                    </>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='speedmeter'>
                        <h1 className='speedtext'>

                            Speed in (WPM): {wpm}
                        </h1>

                    </div>
                    <div className="typearea">
                        <div className="text_content">
                            <p><span className='green'>{coloredText}</span>{normaltext}</p>
                        </div>
                        {timerem != 0 && <div className='input_area'>
                            <input className={`${wrong ? "wronginput" : "rightinput"} ${something ? "" : "trans"}`} type="text" name='text' value={word} onChange={handlechange} onKeyDown={downthecount} />
                        </div>}
                    </div>
                </div>
                <div className='stats'>
                    <div className='settings'>
                        {/* <div className='difficulty'>
                            <h1>Difficulty</h1>
                            <div className='selectdifficulty'>
                                <button className='btn selectbtn' onClick={() => { handledifficulty("Easy") }}>Easy</button>
                                <button className='btn selectbtn' onClick={() => { handledifficulty("Medium") }}>Medium</button>
                                <button className='btn selectbtn' onClick={() => { handledifficulty("Hard") }}>Hard</button>
                            </div>
                        </div>
                        <div className='time_duration'>
                            <h1>Time Duration</h1>
                            <div className='selecttime'>
                                <button className='btn selectbtn' onClick={() => { handleTime(30) }}>30s</button>
                                <button className='btn selectbtn' onClick={() => { handleTime(60) }}>60s</button>
                                <button className='btn selectbtn' onClick={() => { handleTime(120) }}>120s</button>
                            </div>
                        </div> */}
                        Ranking:

                    </div>
                    <div>
                        <h1>Your User Name: {usrname}</h1>
                    </div>
                    <div className='hiscore'>
                        {/* <h1>HIGH SCORE : {hiscore}</h1> */}
                        {snap ? snap.map((player, index) => <h1>{index + 1} {player.name} : {player.speed}</h1>) : " "}

                    </div>
                </div>

            </div>
        </>
    )
}
