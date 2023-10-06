import React, {useRef, useState, Component, useEffect} from "react";
import {
    SingleEliminationBracket,
    DoubleEliminationBracket,
    Match,
    MATCH_STATES,
    SVGViewer
} from '@g-loot/react-tournament-brackets';
import SinglesBracket from "./Components/SinglesBracket";
import {useSelector, useDispatch} from "react-redux";
import {
    updateChampionshipBracketMatches,
    updateBBracketMatches,
    updateCBracketMatches,
    updateDBracketMatches,
    updateRoundRobinGroups
} from "../features/singles/singlesSlice";
import {decrement, increment} from "../features/counter/counterSlice";
import Test from "./Components/Test";
import axios from "axios";
import SinglesConsolationBracket from "./Components/SinglesBBracket";
import SinglesRoundRobin from "./Components/SinglesRoundRobin";
import SinglesBBracket from "./Components/SinglesBBracket";
import SinglesCBracket from "./Components/SinglesCBracket";


// import useWindowSize from "@g-loot/react-tournament-brackets/dist/src/hooks/use-window-size";

// export const SingleElimination = () => (
//     <SingleEliminationBracket
//         matches={matches}
//         matchComponent={Match}
//         svgWrapper={({ children, ...props }) => (
//             <SVGViewer width={500} height={500} {...props}>
//                 {children}
//             </SVGViewer>
//         )}
//     />
// );

function Singles() {
    // const matches = [
    //     {
    //         id: 19753,
    //         nextMatchId: null,
    //         participants: [],
    //         startTime: '2021-05-30',
    //         state: 'SCHEDULED',
    //         tournamentRoundText: '3'
    //     },
    //     {
    //         id: 19754,
    //         nextMatchId: 19753,
    //         participants: [
    //             {
    //                 id: '14754a1a-932c-4992-8dec-f7f94a339960',
    //                 isWinner: false,
    //                 name: 'CoKe BoYz',
    //                 picture: 'teamlogos/client_team_default_logo',
    //                 resultText: '',
    //                 status: null
    //             }
    //         ],
    //         startTime: '2021-05-30',
    //         state: 'SCHEDULED',
    //         tournamentRoundText: '2'
    //     },
    //     {
    //         id: 19755,
    //         nextMatchId: 19754,
    //         participants: [
    //             {
    //                 id: '14754a1a-932c-4992-8dec-f7f94a339960',
    //                 isWinner: true,
    //                 name: 'CoKe BoYz',
    //                 picture: 'teamlogos/client_team_default_logo',
    //                 resultText: 'Won',
    //                 status: 'PLAYED'
    //             },
    //             {
    //                 id: 'd16315d4-7f2d-427b-ae75-63a1ae82c0a8',
    //                 isWinner: false,
    //                 name: 'Aids Team',
    //                 picture: 'teamlogos/client_team_default_logo',
    //                 resultText: 'Lost',
    //                 status: 'PLAYED'
    //             }
    //         ],
    //         startTime: '2021-05-30',
    //         state: 'SCORE_DONE',
    //         tournamentRoundText: '1'
    //     },
    //     {
    //         id: 19756,
    //         nextMatchId: 19754,
    //         participants: [
    //             {
    //                 id: 'd8b9f00a-0ffa-4527-8316-da701894768e',
    //                 isWinner: false,
    //                 name: 'Art of kill',
    //                 picture: 'teamlogos/client_team_default_logo',
    //                 resultText: '',
    //                 status: null
    //             }
    //         ],
    //         startTime: '2021-05-30',
    //         state: 'RUNNING',
    //         tournamentRoundText: '1'
    //     },
    //     {
    //         id: 19757,
    //         nextMatchId: 19753,
    //         participants: [],
    //         startTime: '2021-05-30',
    //         state: 'SCHEDULED',
    //         tournamentRoundText: '2'
    //     },
    //     {
    //         id: 19758,
    //         nextMatchId: 19757,
    //         participants: [
    //             {
    //                 id: '9397971f-4b2f-44eb-a094-722eb286c59b',
    //                 isWinner: false,
    //                 name: 'Crazy Pepes',
    //                 picture: 'teamlogos/client_team_default_logo',
    //                 resultText: '',
    //                 status: null
    //             }
    //         ],
    //         startTime: '2021-05-30',
    //         state: 'SCHEDULED',
    //         tournamentRoundText: '1'
    //     },
    //     {
    //         id: 19759,
    //         nextMatchId: 19757,
    //         participants: [
    //             {
    //                 id: '42fecd89-dc83-4821-80d3-718acb50a30c',
    //                 isWinner: false,
    //                 name: 'BLUEJAYS',
    //                 picture: 'teamlogos/client_team_default_logo',
    //                 resultText: '',
    //                 status: null
    //             },
    //             {
    //                 id: 'df01fe2c-18db-4190-9f9e-aa63364128fe',
    //                 isWinner: false,
    //                 name: 'Bosphorus',
    //                 picture: 'teamlogos/r7zn4gr8eajivapvjyzd',
    //                 resultText: '',
    //                 status: null
    //             }
    //         ],
    //         startTime: '2021-05-30',
    //         state: 'SCHEDULED',
    //         tournamentRoundText: '1'
    //     }
    // ]
    const dispatch = useDispatch()
    // dispatch(updateMatches([...matches]));

    // const [width, height] = useWindowSize();
    // const [width, height] = [1920, 1080];
    // const finalWidth = Math.max(width - 50, 500);
    // const finalHeight = Math.max(height - 100, 500);


    const count = useSelector((state) => state.counter.value)
    const matchArray = useSelector((state) => state.singles.matches);
    const rrGroup = structuredClone(useSelector((state) => state.singles.roundRobinGroups));

    const [showRR, setShowRR] = useState(true);
    const [showChampionshipBracket, setShowChampionshipBracket] = useState(true);
    const [showBBracket, setShowBBracket] = useState(true);
    const [showCBracket, setShowCBracket] = useState(true);
    const [showDBracket, setShowDpBracket] = useState(true);

    const [matchList, setMatchList] = useState([]);

    useEffect(() => {
        // await getAllSinglesEntries()
        async function getSingles() {
            const res = await getAllSinglesEntries();
        }

        // const res =
        // console.log("HELLO")
        // await axios.get("localhost:5000/getAllSinglesEntries").then((res) => {
        //     console.log("STUFF")
        //     console.log(res.data);
        //     setMatchArray(structuredClone(res.data));
        // })

    }, [])
    // console.log(matchArray)

    useEffect(() => {
        // alert("HELLO")
    }, [count])

    async function getAllSinglesEntries() {
        await axios.get("http://localhost:5000/getAllSinglesEntries").then((res) => {
            console.log("STUFF")
            console.log(res.data);
            setMatchList(structuredClone(res.data))
            // setMatchArray(structuredClone(res.data));
        })
    }

    // async function test() {
    //     // await axios.post("http://localhost:5000/createMatchArray", {"matches": matchList}).then((res) => {
    //     //     console.log(res.data);
    //     // })
    //     console.log(matchList);
    //     let res = await axios.post("http://localhost:5000/createMatchArray", {matchList: matchList});
    //     console.log(res.data);
    //     dispatch(updateChampionshipBracketMatches(res.data))
    //     console.log("QUAKC")
    //     console.log(matchList.slice(matchList.length/2))
    //     res = await axios.post("http://localhost:5000/createMatchArray", {matchList: matchList.slice(matchList.length/2)});
    //     console.log(res.data);
    //     dispatch(updateConsolationBracketMatches(res.data))
    // }

    async function resetRoundRobinGroups() {
        let res1 = await axios.get('http://localhost:5000/generateSinglesRoundRobinGroups');
        let res2 = await axios.get('http://localhost:5000/getSinglesRoundRobinGroups');
        dispatch(updateRoundRobinGroups(res2.data));
    }

    async function getRoundRobinData() {
        let res2 = await axios.get('http://localhost:5000/getSinglesRoundRobinGroups');
        dispatch(updateRoundRobinGroups(res2.data));
        console.log(res2.data);
    }

    async function uploadRoundRobinData() {
        let res = await axios.post("http://localhost:5000/uploadSinglesRoundRobinResults", {matchData: rrGroup});
    }

    useEffect(() => {
        console.log("MATCH ARR CHANGE")
        console.log(matchArray)
    }, [matchArray])

    async function showMatches() {
        console.log(matchArray);
    }

    async function generateChampionshipBracket() {
        let res1 = await axios.post("http://localhost:5000/uploadSinglesRoundRobinResults", {matchData: rrGroup});
        let res = await axios.get("http://localhost:5000/generateSinglesChampionshipBracket");
        dispatch(updateChampionshipBracketMatches(res.data))
        res = await axios.get("http://localhost:5000/generateSinglesBBracket");
        dispatch(updateBBracketMatches(res.data))
        res = await axios.get("http://localhost:5000/generateSinglesCBracket");
        dispatch(updateCBracketMatches(res.data))
        res = await axios.get("http://localhost:5000/generateSinglesDBracket");
        dispatch(updateDBracketMatches(res.data))
        // console.log(res.data);
    }

    // async function enterResults() {
    //     let temp = structuredClone(matchArray)
    //     temp[0] = {
    //         "id": 0,
    //         "name": "name",
    //         "nextMatchId": 32,
    //         "state": "SCHEDULED",
    //         "participants": [
    //             {
    //                 "id": 1,
    //                 "isWinner": true,
    //                 "name": "Theodore Thayib"
    //             },
    //             {
    //                 "id": 64,
    //                 "isWinner": false,
    //                 "name": "64"
    //             }
    //         ]
    //     }
    //     temp[32] = {
    //         id: 32,
    //         name: "name",
    //         // nextMatchId: midPoint + i,
    //         nextMatchId: 48,
    //         state: "SCHEDULED",
    //         participants: [
    //             {
    //                 id: "Theodore Thayib",
    //                 isWinner: false,
    //                 name: "TBD",
    //             },
    //             {
    //                 id: "TBD",
    //                 isWinner: false,
    //                 name: "TBD",
    //             }
    //         ]
    //     }
    //     dispatch(updateMatches(temp))
    // }

    return (
        <div>
            Hello!
            {/*<button onClick={getAllSinglesEntries}>Load from DB</button>*/}
            {/*<button onClick={test}>UPDATE MATCHES</button>*/}
            {/*<button onClick={showMatches}>PRINT MATCHES</button>*/}
            <br />
            <button onClick={resetRoundRobinGroups}>Reset round robin groups</button>
            <button onClick={getRoundRobinData}>Get RR Data from DB</button>
            <button onClick={uploadRoundRobinData}>Upload RR Data to DB</button>
            <br />
            <button onClick={generateChampionshipBracket}>Generate Championship Bracket</button>
            {/*<button onClick={enterResults}>ENTER RESULT MATCHES</button>*/}
            <hr />
            <h1>ROUND ROBIN</h1>
            <SinglesRoundRobin />
            <div onClick={() => setShowChampionshipBracket(!showChampionshipBracket)}>
            <hr />
            <h1>CHAMPIONSHIP BRACKET</h1>
            </div>
            {showChampionshipBracket && (<SinglesBracket/>)}

            <div onClick={() => setShowCBracket(!showCBracket)}>
            <hr />
            <h1>C BRACKET</h1>
            </div>
            {showCBracket && (<><SinglesCBracket /></>)}

            {/*<SinglesBBracket />*/}
            {/*<SinglesConsolationBracket />*/}

        </div>
    );
}

export default Singles;
