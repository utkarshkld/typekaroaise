import React, { useEffect, useState } from 'react'
import { app } from '../firebase'
import { easy, medium, hard } from '../Components/Data';
import { onValue, DataSnapshot, getDatabase, onDisconnect, ref, set } from "firebase/database"
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
// import Cookies from 'universal-cookie'
import { push } from 'firebase/database';
import { get, child } from 'firebase/database';
import { onChildAdded } from 'firebase/database';
// import Race from '../Pages/Race';
import CompeteRace from './CompeteRace';

const db = getDatabase(app);



export default function Compete() {
    const [playeradded, setPlayeradded] = useState(0);
    const [allelements, setAllelements] = useState([]);
    const [hidediv, setHidediv] = useState(false)
    const [allPlayers, setAllplayers] = useState([]);
    // const [currprogress, setcurrprogress] = useState(0);
    const [playerRefid, setPlayerRefid] = useState(null);
    const auth = getAuth();
    // ---------------------------------------------------------------------------------------------------------------------------------

    const [word, setWord] = useState("");
    const [wrong, setWrong] = useState(false);
    const [stTime, setStTime] = useState((new Date()).getTime());
    const [endTime, setendTime] = useState((new Date()).getTime());
    const [tflag, setTflag] = useState(0);
    const [rtcount, setRtcount] = useState(0);
    const [totcnt, setTotcnt] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [something, setSomething] = useState(false);
    const [cur, setCur] = useState(0);
    const [timerem, setTimerem] = useState(2);
    const [timeselect, setTimeselect] = useState(35);
    const [diff, setDiff] = useState("Easy");
    const [hiscore, setHiscore] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [matchtext, setmatchtext] = useState("");
    const [progress, setProgress] = useState(0);
    const [usrname, setusrname] = useState("");


    var match_text_content = "typing is a valuable skill to have in the modern world whether you are a student an office worker or just someone who uses a computer regularly improving your typing speed and accuracy can save you time and make you more productive practice is the key to getting better at typing so dont be discouraged by initial difficulties keep at it and you will see improvement over time there are ";
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
        setCur(0);
        setWord("");
        setSomething(false);
        setWpm(0);
        setDiff("Easy");
        // let rand = Math.floor(Math.random() * (easy.length));
        // let curtext = easy[rand];
        // setmatchtext(curtext)
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
            var tempref = ref(db, `players/${playerRefid}`);

            set(tempref, {
                id: playerRefid,
                progressmeter: progress,
                name: `Usr${playerRefid.slice(0, 2)}`,
                speed: wppmm,
            })
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
        if (hidediv) {
            if (timerem > 0) {

                const intervalId = setInterval(() => {
                    setTimerem(prev => prev - 1);
                }, 1000);

                return () => clearInterval(intervalId);
            }
            else {
            }
        }
    }, [hidediv, timerem])


    function handlechange(event) {
        if (timerem >= 0) {

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

            var tempref = ref(db, `players/${playerRefid}`);

            set(tempref, {
                id: playerRefid,
                progressmeter: progress,
                name: `Usr${playerRefid.slice(0, 2)}`,
                speed: wpm,
            })
        }
        // onValue(tempref, (snapshot) => {
        //     const data = snapshot.val();
        //     console.log(data.progressmeter)
        // })


    }

    // if (hidediv) {
    //     setInterval(() => {
    //         allPlayers.map((player) => {
    //             var plref = ref(db, `players/${player}`);
    //             onValue(plref, (snapshot) => {
    //                 const data = snapshot.val();
    //                 setcurrprogress(data.progressmeter)
    //             });

    //         })


    //     }, 2000);
    // }

    // if (hiscore < wpm) {
    //     setHiscore(wpm)
    // }
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

    function handleTime(time) {
        if (time == 30) {
            setTimerem(30);
            setTimeselect(30)
        }
        else if (time == 60) {
            setTimerem(60);
            setTimeselect(60)

        }
        else if (time == 120) {
            setTimerem(120);
            setTimeselect(120)

        }
    }

    // --------------------------------------------------------------------------------------------------------------------------------------

    let playerid;
    // let playerRef;
    let allPlayersRef;
    // let allPlayers = [];

    // console.log("hi", allPlayers);
    // console.log("hello", allPlayersRef);

    // if (playeradded) {

    // }

    if (allPlayers.length >= 2) {

        if (!hidediv) {
            setHidediv(true);

        }
    }


    useEffect(() => {
        if (playeradded) {

            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // console.log(user);
                    playerid = user.uid;
                    // playerRef = firebase.database().ref(`players/${playerid}`);
                    const playerRef = ref(db, `players/${playerid}`);
                    setPlayerRefid(user.uid)
                    set(ref(db, `players/${playerid}`), {
                        id: playerid,
                        progressmeter: progress,
                        name: `Usr${playerid.slice(0, 2)}`,
                        speed: wpm,
                    })
                    setusrname(`Usr${playerid.slice(0, 2)}`);
                    allPlayersRef = ref(db, `players`);

                    onChildAdded(allPlayersRef, (data) => {
                        let addedPlayer = data.val();
                        // allPlayers.push(addedPlayer);
                        setAllplayers(prev => {
                            return [...prev, addedPlayer.id];
                        })
                        // const characterelement = document.createElement("div");
                        let current = {}
                        if (addedPlayer.id === playerid) {
                            current.class = "you";
                        }
                        else {
                            current.class = "another"

                        }

                        setAllelements(prev => {
                            return [...prev, current]
                        })
                    });
                    onDisconnect(playerRef).remove();

                } else {
                    // User is signed out
                    // ...
                }
            });
        }
    }, [playeradded])

    function adduser() {
        signInAnonymously(auth)
            .then(() => {
                // Signed in..
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ...
            });


        setPlayeradded(prev => prev + 1);
    }





    return (
        <>
            {!hidediv && <div className={`compete_settings`}>
                <button className='adduser_btn' onClick={() => adduser()}>To play click on this button</button>
                <h1>Players joined : {playeradded}</h1>
                <h1>Remaining Players to join : {2 - playeradded}</h1>
            </div>}
            {/* {playeradded > 1 && <div><h1>Lobby is full ! Wait for someone to leave : Players in Lobby{playeradded - 1}</h1></div>} */}

            <CompeteRace
                usrname={usrname}
                startingin={timerem - 30}
                handlechange={handlechange}
                carelement={allPlayers}
                playeradded={playeradded}
                timerem={timerem}
                word={word}
                wrong={wrong}
                something={something}
                coloredText={coloredText}
                normaltext={normaltext}
                timeselect={timeselect}
                diff={diff}
                hiscore={hiscore}
                accuracy={acc}
                // progress={progress}
                downthecount={downthecount}
                resettext={resettext}
                handledifficulty={handledifficulty}
                handleTime={handleTime}
                wpm={wpm}
            />
        </>
    )
}
