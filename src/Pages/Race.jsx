import React, { useEffect, useState } from 'react'
import car from "../assets/car-4761.png"
import { easy, medium, hard } from '../Components/Data';
import Bar from '../Components/Bar';


export default function Race() {
    const [word, setWord] = useState("");
    const [wrong, setWrong] = useState(false);
    const [stTime, setStTime] = useState((new Date()).getTime());
    const [endTime, setendTime] = useState((new Date()).getTime());
    const [tflag, setTflag] = useState(0);
    const [rtcount, setRtcount] = useState(0);
    const [totcnt, setTotcnt] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [something, setSomething] = useState(false);
    // const [wrcnt, setwrCount] = useState(0);
    const [cur, setCur] = useState(0);
    const [complete, setComplete] = useState(false);
    const [timerem, setTimerem] = useState(2);
    const [timeselect, setTimeselect] = useState(30);
    const [diff, setDiff] = useState("Easy");
    const [hiscore, setHiscore] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [matchtext, setmatchtext] = useState("");
    const [progress, setProgress] = useState(0);
    const [allPlayers, setAllplayers] = useState([]);


    var match_text_content = matchtext || `Lorem ipsum`
    const list = match_text_content.split(" ");


    useEffect(() => {
        let rectwidth = visualelement?.getBoundingClientRect().width - 25;
        let inc = (rectwidth / list.length);
        if (cur) {
            setProgress(prev => prev + inc);

        }
    }, [cur]);
    const visualelement = document.querySelector('.car');



    // console.log(easy)
    const coloredText = match_text_content.slice(0, rtcount);
    const normaltext = match_text_content.slice(rtcount);
    // const inputelement = document.getElementsByClassName('input_element');
    function resettext() {

        setTflag(0);
        setTimerem(timeselect)
        setTotcnt(0);
        setRtcount(0);
        setProgress(0)
        setCur(0);
        setWord("");
        setSomething(false);
        setWpm(0);
        // setDiff("Easy");
        let curtext
        if (diff == "Easy") {
            let rand = Math.floor(Math.random() * (easy.length));
            curtext = easy[rand];

        }
        else if (diff == "Medium") {
            let rand = Math.floor(Math.random() * (medium.length));
            curtext = medium[rand];
        }
        else {
            let rand = Math.floor(Math.random() * (hard.length));
            curtext = hard[rand];
        }

        setmatchtext(curtext)
        setAccuracy(0);
    }

    useEffect(() => {
        resettext();
    }, [])

    useEffect(() => {
        if (tflag && timerem != 0) {

            const intervalId = setInterval(() => {
                setendTime((new Date()).getTime());
            }, 1000);

            let wppmm = Math.abs(Math.ceil((rtcount / 5) / ((endTime - stTime) / 60000)));

            setWpm(wppmm);
            return () => clearInterval(intervalId);
        }
    }, [tflag, endTime]);

    // let inputtext = "";
    function downthecount(event) {
        if (event.key == "Backspace") {
            if (!wrong && something) {
                setRtcount(prev => prev - 2);
            }

        }
    }
    useEffect(() => {
        if (tflag) {
            if (timerem > 0) {

                const intervalId = setInterval(() => {
                    setTimerem(prev => prev - 1);
                }, 1000);

                return () => clearInterval(intervalId);
            }
            else {
                console.log("finish");
            }
        }
    }, [tflag, timerem])


    function handlechange(event) {
        setTotcnt(prev => prev + 1);
        if (tflag == 0) {
            let date = new Date();
            setStTime(date.getTime());
            setTflag(1);
        }
        let inputtext = event.target.value;
        setWord(inputtext);
        if (inputtext === "") {
            setSomething(false);
        }
        else {
            setSomething(true);
        }
        let flag = 0;
        if ((inputtext.slice(0, inputtext.length - 1) == list[cur]) && inputtext[inputtext.length - 1] == ' ') {
            flag = 1;
        }

        if (flag || list[cur].slice(0, inputtext.length) == inputtext) {
            if (flag == 1) {
                setCur(prev => {
                    return prev + 1;
                })
                setWord("");
                setSomething(false)
            }
            if (!wrong) {
                setRtcount(prev => prev + 1);
            }
            setWrong(false);
        }
        else {
            // setwrCount(prev => prev + 1);
            setWrong(true);
        }


    }

    if (hiscore < wpm) {
        setHiscore(wpm)
    }
    let acc = 0, tempwpm = 0;
    if (timerem == 0) {
        acc = Math.ceil((rtcount / totcnt) * 100);
        tempwpm = wpm;
    }

    function handledifficulty(level) {
        setDiff(level);
        let rand;
        let curtext
        if (level == "Easy") {
            rand = Math.floor(Math.random() * (easy.length));
            curtext = easy[rand];

        }
        else if (level == "Medium") {
            rand = Math.floor(Math.random() * (medium.length));
            curtext = medium[rand];

        }
        else {
            rand = Math.floor(Math.random() * (hard.length));
            curtext = hard[rand];

        }
        setmatchtext(curtext)
    }
    // let players = []
    // useEffect(() => {
    //     props.carelement?.map((ele) => {
    //         players.push(ele.class)
    //     })
    //     setAllplayers(players);  
    //     console.log(allPlayers)

    // }, [props.carelement])


    return (
        <>
            <div className='race_page'>
                <div className='type_race'>
                    <div className={`completed ${timerem == 0 ? "" : "none"}`}>
                        <button className='reset btn selectbtn' onClick={resettext}>Reset</button>
                        <h1>ACCURACY : {acc}%</h1>
                        <h1>SPEED (WPM) : {tempwpm}</h1>
                    </div>
                    <div className='timetab'>
                        <button className='start btn' onClick={resettext}>Reload</button>
                        <h1 className={`${diff == "Easy" ? "green" : ""} ${diff == "Medium" ? "yel" : ""} ${diff == "Hard" ? "red" : ""}`}>{diff}</h1>
                        <h1 className='timerem'>{timerem}s</h1>
                    </div>
                    <div className="visual">
                        <div className='car'>
                            <div className='abs'>
                                <Bar carname={""} className="progress_img_bar" progress={progress} sz={100} />

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
                        <div className='input_area'>
                            <input className={`${wrong ? "wronginput" : "rightinput"} ${something ? "" : "trans"}`} type="text" name='text' value={word} onChange={handlechange} onKeyDown={downthecount} />
                        </div>
                    </div>
                </div>
                <div className='stats'>
                    <div className='settings'>
                        <div className='difficulty'>
                            <h1>Difficulty</h1>
                            <div className='selectdifficulty'>
                                <button className='btn selectbtn bg-green' onClick={() => { handledifficulty("Easy") }}>Easy</button>
                                <button className='btn selectbtn bg-yellow' onClick={() => { handledifficulty("Medium") }}>Medium</button>
                                <button className='btn selectbtn bg-red' onClick={() => { handledifficulty("Hard") }}>Hard</button>
                            </div>
                        </div>
                        <div className='time_duration'>
                            <h1>Time Duration</h1>
                            <div className='selecttime'>
                                <button className='btn selectbtn' onClick={() => { setTimerem(30); setTimeselect(30) }}>30s</button>
                                <button className='btn selectbtn' onClick={() => { setTimerem(60); setTimeselect(60) }}>60s</button>
                                <button className='btn selectbtn' onClick={() => { setTimerem(120); setTimeselect(120) }}>120s</button>
                            </div>
                        </div>

                    </div>
                    <div className='hiscore'>
                        <h1>HIGH SCORE : {hiscore}</h1>
                    </div>
                </div>

            </div>
        </>
    )
}
