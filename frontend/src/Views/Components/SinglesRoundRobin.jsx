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
import {updateChampionshipBracketMatches, updateRoundRobinGroups} from "../../features/singles/singlesSlice";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import "../../styles/singlesRoundRobin.css"

function SinglesBracket({}) {
    const dispatch = useDispatch()
    const groupArray = structuredClone(useSelector((state) => state.singles.roundRobinGroups));

    const [dispGroupArray, setDispGroupArray] = useState(groupArray);

    // async function getRoundRobinData() {
    // }
    function test() {
        console.log(groupArray);
        groupArray.forEach((row) => {
            console.log(row)
        })
    }

    function  placementInput(ele, groupNum, rrId) {
        console.log("HELLO")
        // console.log(ele.nativeEvent.data)
        // console.log(typeof ele.nativeEvent.data)
        let num = Number(ele.nativeEvent.data);
        if (num && num > 0 && num <= 8) {
            console.log(groupNum)
            console.log("GROUPNUM: " + (groupNum - 1) + " SEED: "  + rrId)
            console.log(rrId)
            let tempArr = structuredClone(groupArray);
            console.log(tempArr)
            console.log(tempArr[groupNum - 1][rrId - 1])
            tempArr[groupNum - 1][rrId - 1].placement = num;
            dispatch(updateRoundRobinGroups(tempArr));
            // dispatch(upda)
        }
    }

    return (
        <div>
            <button type="button" onClick={test}>RR</button>
            <div className="tableFlexWrapper">
                {groupArray.map((rows) => {
                    return(
                        <div key={rows.groupNum} className="tableFlexDiv">
                            <h1>GROUP {rows[0].groupNum}</h1>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 500 }} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Group Seed</TableCell>
                                            <TableCell>Player Name</TableCell>
                                            <TableCell>Player Placement</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow key={row.groupNum}
                                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell>{row.groupSeed}</TableCell>
                                                <TableCell>{row.playerName}</TableCell>
                                                <TableCell><input type="number" min="0" max="8" value={row.placement} onInput={e => placementInput(e, row.groupNum, row.groupSeed)} /></TableCell>

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    )
                })}
            </div>

        </div>
    );
}

export default SinglesBracket;
