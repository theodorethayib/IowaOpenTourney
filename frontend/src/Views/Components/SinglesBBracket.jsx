import React, {useRef, useState, Component, useEffect} from "react";
import {
    SingleEliminationBracket,
    DoubleEliminationBracket,
    Match,
    MATCH_STATES,
    SVGViewer
} from '@g-loot/react-tournament-brackets';
import defaultTheme from "../Themes/defaultTheme";
import {useSelector, useDispatch} from "react-redux";
import {updateBBracketMatches} from "../../features/singles/singlesSlice";
import axios from "axios";

function SinglesBBracket({}) {
    const dispatch = useDispatch()
    const matchArray = structuredClone(useSelector((state) => state.singles.bBracketMatches));

    // const [width, height] = [1920, 1080];
    // const finalWidth = Math.max(width - 50, 500);
    // const finalHeight = Math.max(height - 100, 500);
    const windowSize = useRef([window.innerWidth, window.innerHeight]);
    const finalWidth = Math.max(windowSize.current[0] - 50, 500);
    // const finalHeight = Math.max(windowSize.current[1] - 100, 500);
    const finalHeight = 100000000;

    const [dispMatchArray, setDispMatchArray] = useState(matchArray);
    const [doDisp, setDoDisp] = useState(true);
    // useEffect(() => {
    //     // console.log("HELLO THERE")
    //     setDispMatchArray(structuredClone(matchArray));
    // }, [matchArray])


    return (
        <div>
            {(matchArray.length > 0 && doDisp) && (<>{matchArray.length}<SingleEliminationBracket
                matches={matchArray}
                options={{
                    style: {
                        roundHeader: {backgroundColor: '#AAA'},
                        connectorColor: '#FF8C00',
                        connectorColorHighlight: '#000',
                    },
                }}
                theme={defaultTheme}
                svgWrapper={({children, ...props}) => (
                    <SVGViewer
                        // background="#FFF"
                        // SVGBackground="#FFF"
                        width={finalWidth}
                        height={finalHeight}
                        {...props}
                    >
                        {children}
                    </SVGViewer>
                )}
                matchComponent={({
                                     match,
                                     onMatchClick,
                                     onPartyClick,
                                     onMouseEnter,
                                     onMouseLeave,
                                     topParty,
                                     bottomParty,
                                     topWon,
                                     bottomWon,
                                     topHovered,
                                     bottomHovered,
                                     topText,
                                     bottomText,
                                     connectorColor,
                                     computedStyles,
                                     teamNameFallback,
                                     resultFallback,
                                 }) => (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                            color: '#000',
                            width: '100%',
                            height: '100%',
                        }}

                    >
                        <div
                            onMouseEnter={() => onMouseEnter(topParty.id)}
                            style={{display: 'flex'}}
                            onMouseUp={() => {
                                // alert("TEST")
                                let num = ((matchArray.length) + 1) / 2;

                                let matchIdMidValueIncr = num/4 + num/2;
                                let num2 = num / 2
                                let tempCompArr = [num]
                                let tempMidValueArr = [num2]
                                for (let i = num; i > 2; i /= 2) {
                                    if (match.id < num) {
                                        break;
                                    }
                                    num += (i/2);
                                    tempCompArr.push(num);
                                    num2 += matchIdMidValueIncr
                                    tempMidValueArr.push(num2)
                                    matchIdMidValueIncr /= 2;

                                }
                                // console.log("COMP ARR: " + tempCompArr)
                                // console.log("MID ARR: " + tempMidValueArr)
                                // console.log("COMP: " + num);
                                // console.log("MID: " + num2);
                                // console.log(match);
                                // console.log(matchArray)
                                let temp = structuredClone(matchArray)
                                console.log("TEMP ARR")
                                console.log(temp)
                                temp[match.id] = {
                                    "id": match.id,
                                    "name": "name",
                                    "nextMatchId": match.nextMatchId,
                                    "state": "SCHEDULED",
                                    "participants": [
                                        {
                                            "id": topParty.id,
                                            "isWinner": true,
                                            "name": topParty.name
                                        },
                                        {
                                            "id": bottomParty.id,
                                            "isWinner": false,
                                            "name": bottomParty.name
                                        }
                                    ]
                                }
                                console.log("SDFSDFSDF")
                                console.log()
                                console.log(temp[match.id])
                                temp[match.nextMatchId] = {
                                    id: match.nextMatchId,
                                    name: "name",
                                    // nextMatchId: midPoint + i,
                                    nextMatchId: temp[match.nextMatchId].nextMatchId,
                                    state: "SCHEDULED",
                                    participants: (match.id < num2 ? [
                                        {
                                            id: topParty.id,
                                            isWinner: false,
                                            name: topParty.name,
                                        },
                                        {
                                            id: temp[match.nextMatchId].participants[1].id,
                                            isWinner: false,
                                            name: temp[match.nextMatchId].participants[1].name,
                                        }
                                    ] : [
                                        {
                                            id: temp[match.nextMatchId].participants[0].id,
                                            isWinner: false,
                                            name: temp[match.nextMatchId].participants[0].name,
                                        },
                                        {
                                            id: topParty.id,
                                            isWinner: false,
                                            name: topParty.name,
                                        }
                                    ])
                                }
                                setDispMatchArray(temp);
                                dispatch(updateBBracketMatches(temp))
                            }}
                        >
                            <div>{topParty.name || teamNameFallback}</div>
                            <div>{topParty.resultText ?? resultFallback(topParty)}</div>
                        </div>
                        <div
                            style={{height: '1px', width: '100%', background: '#FF8C00'}}
                        />
                        <div
                            onMouseEnter={() => onMouseEnter(bottomParty.id)}
                            style={{display: 'flex'}}
                            onMouseUp={async () => {

                                // alert("TEST")
                                let num = ((matchArray.length) + 1) / 2;

                                let matchIdMidValueIncr = num / 4 + num / 2;
                                let num2 = num / 2
                                let tempCompArr = [num]
                                let tempMidValueArr = [num2]
                                for (let i = num; i > 2; i /= 2) {
                                    if (match.id < num) {
                                        break;
                                    }
                                    num += (i / 2);
                                    tempCompArr.push(num);
                                    num2 += matchIdMidValueIncr
                                    tempMidValueArr.push(num2)
                                    matchIdMidValueIncr /= 2;

                                }
                                let temp = structuredClone(matchArray)
                                console.log("TEMP ARR")
                                console.log(temp)
                                temp[match.id] = {
                                    "id": match.id,
                                    "name": "name",
                                    "nextMatchId": match.nextMatchId,
                                    "state": "SCHEDULED",
                                    "participants": [
                                        {
                                            "id": topParty.id,
                                            "isWinner": false,
                                            "name": topParty.name
                                        },
                                        {
                                            "id": bottomParty.id,
                                            "isWinner": true,
                                            "name": bottomParty.name
                                        }
                                    ]
                                }
                                temp[match.nextMatchId] = {
                                    id: match.nextMatchId,
                                    name: "name",
                                    // nextMatchId: midPoint + i,
                                    nextMatchId: temp[match.nextMatchId].nextMatchId,
                                    state: "SCHEDULED",
                                    participants: (match.id < num2 ? [
                                        {
                                            id: bottomParty.id,
                                            isWinner: false,
                                            name: bottomParty.name,
                                        },
                                        {
                                            id: temp[match.nextMatchId].participants[1].id,
                                            isWinner: false,
                                            name: temp[match.nextMatchId].participants[1].name,
                                        }
                                    ] : [
                                        {
                                            id: temp[match.nextMatchId].participants[0].id,
                                            isWinner: false,
                                            name: temp[match.nextMatchId].participants[0].name,
                                        },
                                        {
                                            id: bottomParty.id,
                                            isWinner: false,
                                            name: bottomParty.name,
                                        }
                                    ])
                                }
                                setDispMatchArray(temp);
                                dispatch(updateBBracketMatches(temp))
                                // let res = await axios.post("http://localhost:5000/", {});
                            }}
                        >
                            <div>{bottomParty.name || teamNameFallback}</div>
                            <div>{bottomParty.resultText ?? resultFallback(topParty)}</div>
                        </div>
                    </div>
                )}
            /></>)}

        </div>
    );
}

export default SinglesBBracket;
