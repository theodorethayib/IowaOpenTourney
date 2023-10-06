import React, {useRef, useState, Component, useEffect} from "react";
import {
    SingleEliminationBracket,
    DoubleEliminationBracket,
    Match,
    MATCH_STATES,
    SVGViewer
} from '@g-loot/react-tournament-brackets';
import SinglesBracket1 from "./Components/SinglesBracket1";
import {useSelector, useDispatch} from "react-redux";
import {updateMatches} from "../features/singles/singlesSlice";
import {decrement, increment} from "../features/counter/counterSlice";
import Test from "./Components/Test";



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
    const matches = [
        {
            id: 19753,
            nextMatchId: null,
            participants: [],
            startTime: '2021-05-30',
            state: 'SCHEDULED',
            tournamentRoundText: '3'
        },
        {
            id: 19754,
            nextMatchId: 19753,
            participants: [
                {
                    id: '14754a1a-932c-4992-8dec-f7f94a339960',
                    isWinner: false,
                    name: 'CoKe BoYz',
                    picture: 'teamlogos/client_team_default_logo',
                    resultText: '',
                    status: null
                }
            ],
            startTime: '2021-05-30',
            state: 'SCHEDULED',
            tournamentRoundText: '2'
        },
        {
            id: 19755,
            nextMatchId: 19754,
            participants: [
                {
                    id: '14754a1a-932c-4992-8dec-f7f94a339960',
                    isWinner: true,
                    name: 'CoKe BoYz',
                    picture: 'teamlogos/client_team_default_logo',
                    resultText: 'Won',
                    status: 'PLAYED'
                },
                {
                    id: 'd16315d4-7f2d-427b-ae75-63a1ae82c0a8',
                    isWinner: false,
                    name: 'Aids Team',
                    picture: 'teamlogos/client_team_default_logo',
                    resultText: 'Lost',
                    status: 'PLAYED'
                }
            ],
            startTime: '2021-05-30',
            state: 'SCORE_DONE',
            tournamentRoundText: '1'
        },
        {
            id: 19756,
            nextMatchId: 19754,
            participants: [
                {
                    id: 'd8b9f00a-0ffa-4527-8316-da701894768e',
                    isWinner: false,
                    name: 'Art of kill',
                    picture: 'teamlogos/client_team_default_logo',
                    resultText: '',
                    status: null
                }
            ],
            startTime: '2021-05-30',
            state: 'RUNNING',
            tournamentRoundText: '1'
        },
        {
            id: 19757,
            nextMatchId: 19753,
            participants: [],
            startTime: '2021-05-30',
            state: 'SCHEDULED',
            tournamentRoundText: '2'
        },
        {
            id: 19758,
            nextMatchId: 19757,
            participants: [
                {
                    id: '9397971f-4b2f-44eb-a094-722eb286c59b',
                    isWinner: false,
                    name: 'Crazy Pepes',
                    picture: 'teamlogos/client_team_default_logo',
                    resultText: '',
                    status: null
                }
            ],
            startTime: '2021-05-30',
            state: 'SCHEDULED',
            tournamentRoundText: '1'
        },
        {
            id: 19759,
            nextMatchId: 19757,
            participants: [
                {
                    id: '42fecd89-dc83-4821-80d3-718acb50a30c',
                    isWinner: false,
                    name: 'BLUEJAYS',
                    picture: 'teamlogos/client_team_default_logo',
                    resultText: '',
                    status: null
                },
                {
                    id: 'df01fe2c-18db-4190-9f9e-aa63364128fe',
                    isWinner: false,
                    name: 'Bosphorus',
                    picture: 'teamlogos/r7zn4gr8eajivapvjyzd',
                    resultText: '',
                    status: null
                }
            ],
            startTime: '2021-05-30',
            state: 'SCHEDULED',
            tournamentRoundText: '1'
        }
    ]
    const dispatch = useDispatch()
    // dispatch(updateMatches([...matches]));

    // const [width, height] = useWindowSize();
    const [width, height] = [1920, 1080];
    const finalWidth = Math.max(width - 50, 500);
    const finalHeight = Math.max(height - 100, 500);


    const count = useSelector((state) => state.counter.value)
    const match1 = useSelector((state) => state.singles.matches);

    const [matchArray, setMatchArray] = useState([]);

    useEffect(() => {
        setMatchArray(structuredClone(match1));
    }, [])
    console.log(matchArray)

    useEffect(() => {
        // alert("HELLO")
    }, [count])
    return (
        <div>
            Hello!
            <single-elim-bracket />
            {/*<div><input type={"button"} onClick={() => {*/}
            {/*    // dispatch(updateMatches([...matches]));*/}

            {/*    const m = match1.slice()*/}
            {/*    console.log(m[0])*/}
            {/*}}/></div>*/}

            {/*<SingleEliminationBracket*/}
            {/*    matches={matches}*/}
            {/*    matchComponent={Match}*/}
            {/*    svgWrapper={({ children, ...props }) => (*/}
            {/*        <SVGViewer width={5000} height={5000} {...props}>*/}
            {/*            {children}*/}
            {/*        </SVGViewer>*/}
            {/*    )}*/}
            {/*/>*/}
            {/*<div>*/}
            {/*    <div>*/}
            {/*        <button*/}
            {/*            aria-label="Increment value"*/}
            {/*            onClick={() => dispatch(increment())}*/}
            {/*        >*/}
            {/*            Increment*/}
            {/*        </button>*/}
            {/*        <span>{count}</span>*/}
            {/*        <button*/}
            {/*            aria-label="Decrement value"*/}
            {/*            onClick={() => dispatch(decrement())}*/}
            {/*        >*/}
            {/*            Decrement*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<Test num={count}/>*/}
            {/*<SinglesBracket1 />*/}
        </div>
    );
}

export default Singles;
