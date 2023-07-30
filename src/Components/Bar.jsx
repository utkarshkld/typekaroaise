import React from "react";
import car from "../assets/car-4761.png"


const Bar = (props) => {
    return (
        <>
            <div className={`${props.carname} bars`}
                style={{
                    position: "relative",
                    margin: "2px",
                    left: 0,
                    top: 0,
                    transform: `translateX(${props.progress}px)`,
                    transition: `1s ease-in-out`,
                }}>
                <div>
                    {props.carname}

                </div>
                <div >

                    <img
                        src={car}
                        style={{
                            position: "relative",
                            left: 0,
                            top: 0,
                            width: `${props.sz ? props.sz : 20}px`,

                            transition: `1s ease-in-out`,
                        }}
                    />
                </div>
            </div>
        </>
    );
};
export default Bar;