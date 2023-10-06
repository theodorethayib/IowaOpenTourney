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
import {updateCBracketMatches, updateChampionshipBracketMatches} from "../../features/singles/singlesSlice";
import axios from "axios";

function SinglesBracket({}) {
    const dispatch = useDispatch()
    const matchArray = structuredClone(useSelector((state) => state.singles.championshipBracketMatches));
    const cMatchArray = structuredClone(useSelector((state) => state.singles.cBracketMatches));

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

    // function test() {
    //     console.log(dispMatchArray)
    //     console.log(matchArray)
    //     setDoDisp(!doDisp)
    // }
    // function test2() {
    //     setDispMatchArray(structuredClone(matchArray));
    //     dispatch(updateMatches([
    //         {
    //             id: 1,
    //             name: "Semifinals",
    //             nextMatchId: 3,
    //             tournamentRoundText: "2",
    //             state: "DONE",
    //             participants: [
    //                 {
    //                     id: "1",
    //                     isWinner: true,
    //                     name: "Theodore",
    //                 },
    //                 {
    //                     id: "4",
    //                     isWinner: false,
    //                     name: "Elvin"
    //                 }
    //             ]
    //         },
    //         {
    //             id: 2,
    //             name: "Semifinals",
    //             nextMatchId: 3,
    //             tournamentRoundText: "2",
    //             state: "DONE",
    //             "participants": [
    //                 {
    //                     id: "2",
    //                     isWinner: true,
    //                     name: "Daniel",
    //                 },
    //                 {
    //                     id: "3",
    //                     isWinner: false,
    //                     name: "Andrew"
    //                 }
    //             ]
    //         },
    //         {
    //             id: 3,
    //             name: "Finals",
    //             nextMatchId: null,
    //             tournamentRoundText: "1",
    //             state: "DONE",
    //             "participants": [
    //                 {
    //                     id: "1",
    //                     isWinner: true,
    //                     name: "Theodore",
    //                 },
    //                 {
    //                     id: "2",
    //                     isWinner: false,
    //                     name: "TBD"
    //                 }
    //             ]
    //         }
    //     ]))
    // }
    // function test3() {
    //     dispatch(updateChampionshipBracketMatches(structuredClone(dispMatchArray)))
    // }
    return (
        <div>
            {/*<button type="button" onClick={test}>TESFDFKJL</button>*/}
            {/*<button type="button" onClick={test2}>TESFDFKJL</button>*/}
            {/*<button type="button" onClick={test3}>TESFDFKJL</button>*/}
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
                            onMouseUp={async () => {
                                // alert("TEST")
                                let updateMatchBracketObj = {};
                                let insertMatchArr = [];
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
                                // console.log("COMP ARR: " + tempCompArr)
                                // console.log("MID ARR: " + tempMidValueArr)
                                // console.log("COMP: " + num);
                                // console.log("MID: " + num2);
                                // console.log(match);
                                // console.log(matchArray)
                                let temp = structuredClone(matchArray)
                                let cBracket = structuredClone(cMatchArray)
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
                                    ],
                                    "tournamentRoundText": match.tournamentRoundText
                                }
                                updateMatchBracketObj.matchResult = ["SinglesChampionshipBracket", true, false, match.id]
                                console.log("SDFSDFSDF")
                                console.log(match.nextMatchId - cBracket[0].id)
                                console.log(cBracket[match.nextMatchId - cBracket[0].id])
                                if (match.tournamentRoundText === "1") {
                                    if (match.id < num2) {
                                        insertMatchArr.push(["SinglesCBracket", bottomParty.id, bottomParty.name, cBracket[match.nextMatchId - cBracket[0].id].participants[1].id, cBracket[match.nextMatchId - cBracket[0].id].participants[1].name, match.nextMatchId])
                                    } else {
                                        insertMatchArr.push(["SinglesCBracket", cBracket[match.nextMatchId - cBracket[0].id].participants[0].id, cBracket[match.nextMatchId - cBracket[0].id].participants[0].name, bottomParty.id, bottomParty.name, match.nextMatchId])
                                    }
                                    cBracket[match.nextMatchId - cBracket[0].id] = {
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
                                                id: cBracket[match.nextMatchId - cBracket[0].id].participants[1].id,
                                                isWinner: false,
                                                name: cBracket[match.nextMatchId - cBracket[0].id].participants[1].name,
                                            }


                                        ] : [
                                            {
                                                id: cBracket[match.nextMatchId - cBracket[0].id].participants[0].id,
                                                isWinner: false,
                                                name: cBracket[match.nextMatchId - cBracket[0].id].participants[0].name,
                                            },
                                            {
                                                id: bottomParty.id,
                                                isWinner: false,
                                                name: bottomParty.name,
                                            }
                                        ]),
                                        tournamentRoundText: temp[match.nextMatchId].tournamentRoundText
                                    }
                                }


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
                                    ]),
                                    tournamentRoundText: temp[match.nextMatchId].tournamentRoundText
                                }
                                if (match.id < num2) {
                                    console.log("TOP1")
                                    insertMatchArr.push(["singlesChampionshipBracket", topParty.id, topParty.name, temp[match.nextMatchId].participants[1].id, temp[match.nextMatchId].participants[1].name, match.nextMatchId])
                                } else {
                                    console.log("BOTTOM1")
                                    insertMatchArr.push(["singlesChampionshipBracket", temp[match.nextMatchId].participants[0].id, temp[match.nextMatchId].participants[0].name, topParty.id, topParty.name, match.nextMatchId])
                                }
                                updateMatchBracketObj.nextMatch = insertMatchArr;

                                let res = await axios.post("http://localhost:5000/updateMatchBracket", updateMatchBracketObj);
                                console.log(res);

                                setDispMatchArray(temp);
                                dispatch(updateChampionshipBracketMatches(temp))
                                console.log("CBRACKET")
                                console.log(cBracket)
                                dispatch(updateCBracketMatches(cBracket))
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
                                let updateMatchBracketObj = {};
                                let insertMatchArr = [];
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
                                let cBracket = structuredClone(cMatchArray)
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
                                    ],
                                    "tournamentRoundText": match.tournamentRoundText
                                }
                                updateMatchBracketObj.matchResult = ["SinglesChampionshipBracket", false, true, match.id]
                                if (match.tournamentRoundText === "1") {
                                    if (match.id < num2) {
                                        insertMatchArr.push(["SinglesCBracket", topParty.id, topParty.name, cBracket[match.nextMatchId - cBracket[0].id].participants[1].id, cBracket[match.nextMatchId - cBracket[0].id].participants[1].name, match.nextMatchId])
                                    } else {
                                        insertMatchArr.push(["SinglesCBracket", cBracket[match.nextMatchId - cBracket[0].id].participants[0].id, cBracket[match.nextMatchId - cBracket[0].id].participants[0].name, topParty.id, topParty.name, match.nextMatchId])
                                    }
                                    cBracket[match.nextMatchId - cBracket[0].id] = {
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
                                                id: cBracket[match.nextMatchId - cBracket[0].id].participants[1].id,
                                                isWinner: false,
                                                name: cBracket[match.nextMatchId - cBracket[0].id].participants[1].name,
                                            }


                                        ] : [
                                            {
                                                id: cBracket[match.nextMatchId - cBracket[0].id].participants[0].id,
                                                isWinner: false,
                                                name: cBracket[match.nextMatchId - cBracket[0].id].participants[0].name,
                                            },
                                            {
                                                id: topParty.id,
                                                isWinner: false,
                                                name: topParty.name,
                                            }
                                        ]),
                                        tournamentRoundText: temp[match.nextMatchId].tournamentRoundText
                                    }
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
                                    ]),
                                    tournamentRoundText: temp[match.nextMatchId].tournamentRoundText
                                }
                                if (match.id < num2) {
                                    console.log("TOP")
                                    insertMatchArr.push(["singlesChampionshipBracket", bottomParty.id, bottomParty.name, temp[match.nextMatchId].participants[1].id, temp[match.nextMatchId].participants[1].name, match.nextMatchId])
                                } else {
                                    console.log("BOTTOM")
                                    insertMatchArr.push(["singlesChampionshipBracket", temp[match.nextMatchId].participants[0].id, temp[match.nextMatchId].participants[0].name, bottomParty.id, bottomParty.name, match.nextMatchId])
                                }
                                updateMatchBracketObj.nextMatch = insertMatchArr;

                                let res = await axios.post("http://localhost:5000/updateMatchBracket", updateMatchBracketObj);
                                setDispMatchArray(temp);
                                dispatch(updateChampionshipBracketMatches(temp))
                                if (match.tournamentRoundText === "1") {
                                    dispatch(updateCBracketMatches(cBracket))
                                }
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

export default SinglesBracket;
