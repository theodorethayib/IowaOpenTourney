import {createSlice} from "@reduxjs/toolkit";

export const singlesSlice = createSlice({
    name: "singles",
    initialState: {
        championshipBracketMatches: [
            {
                id: 1,
                name: "Semifinals",
                nextMatchId: 3,
                tournamentRoundText: "2",
                state: "DONE",
                participants: [
                    {
                        id: "1",
                        isWinner: true,
                        name: "Theodore",
                    },
                    {
                        id: "4",
                        isWinner: false,
                        name: "Elvin"
                    }
                ]
            },
            {
                id: 2,
                name: "Semifinals",
                nextMatchId: 3,
                tournamentRoundText: "2",
                state: "DONE",
                "participants": [
                    {
                        id: "2",
                        isWinner: true,
                        name: "Daniel",
                    },
                    {
                        id: "3",
                        isWinner: false,
                        name: "Andrew"
                    }
                ]
            },
            {
                id: 3,
                name: "Finals",
                nextMatchId: null,
                tournamentRoundText: "1",
                state: "DONE",
                "participants": [
                    {
                        id: "1",
                        isWinner: true,
                        name: "Theodore",
                    },
                    {
                        id: "2",
                        isWinner: false,
                        name: "TBD"
                    }
                ]
            }
        ],
        bBracketMatches: [
    {
        id: 1,
        name: "Semifinals",
        nextMatchId: 3,
        tournamentRoundText: "2",
        state: "DONE",
        participants: [
            {
                id: "1",
                isWinner: true,
                name: "Theodore",
            },
            {
                id: "4",
                isWinner: false,
                name: "Elvin"
            }
        ]
    },
    {
        id: 2,
        name: "Semifinals",
        nextMatchId: 3,
        tournamentRoundText: "2",
        state: "DONE",
        "participants": [
            {
                id: "2",
                isWinner: true,
                name: "Daniel",
            },
            {
                id: "3",
                isWinner: false,
                name: "Andrew"
            }
        ]
    },
    {
        id: 3,
        name: "Finals",
        nextMatchId: null,
        tournamentRoundText: "1",
        state: "DONE",
        "participants": [
            {
                id: "1",
                isWinner: true,
                name: "Theodore",
            },
            {
                id: "2",
                isWinner: false,
                name: "TBD"
            }
        ]
    }
],
        cBracketMatches: [
    {
        id: 1,
        name: "Semifinals",
        nextMatchId: 3,
        tournamentRoundText: "2",
        state: "DONE",
        participants: [
            {
                id: "1",
                isWinner: true,
                name: "Theodore",
            },
            {
                id: "4",
                isWinner: false,
                name: "Elvin"
            }
        ]
    },
    {
        id: 2,
        name: "Semifinals",
        nextMatchId: 3,
        tournamentRoundText: "2",
        state: "DONE",
        "participants": [
            {
                id: "2",
                isWinner: true,
                name: "Daniel",
            },
            {
                id: "3",
                isWinner: false,
                name: "Andrew"
            }
        ]
    },
    {
        id: 3,
        name: "Finals",
        nextMatchId: null,
        tournamentRoundText: "1",
        state: "DONE",
        "participants": [
            {
                id: "1",
                isWinner: true,
                name: "Theodore",
            },
            {
                id: "2",
                isWinner: false,
                name: "TBD"
            }
        ]
    }
],
        dBracketMatches: [
    {
        id: 1,
        name: "Semifinals",
        nextMatchId: 3,
        tournamentRoundText: "2",
        state: "DONE",
        participants: [
            {
                id: "1",
                isWinner: true,
                name: "Theodore",
            },
            {
                id: "4",
                isWinner: false,
                name: "Elvin"
            }
        ]
    },
    {
        id: 2,
        name: "Semifinals",
        nextMatchId: 3,
        tournamentRoundText: "2",
        state: "DONE",
        "participants": [
            {
                id: "2",
                isWinner: true,
                name: "Daniel",
            },
            {
                id: "3",
                isWinner: false,
                name: "Andrew"
            }
        ]
    },
    {
        id: 3,
        name: "Finals",
        nextMatchId: null,
        tournamentRoundText: "1",
        state: "DONE",
        "participants": [
            {
                id: "1",
                isWinner: true,
                name: "Theodore",
            },
            {
                id: "2",
                isWinner: false,
                name: "TBD"
            }
        ]
    }
],
        roundRobinGroups: [
            [
                {
                    "rrId": 1,
                    "groupNum": 1,
                    "playerId": 1,
                    "playerSeed": 1,
                    "playerName": "Theodore Thayib",
                    "placement": 0,
                    "groupSeed": 1
                },
                {
                    "rrId": 16,
                    "groupNum": 1,
                    "playerId": 9,
                    "playerSeed": 9,
                    "playerName": "9",
                    "placement": 0,
                    "groupSeed": 2
                },
                {
                    "rrId": 17,
                    "groupNum": 1,
                    "playerId": 17,
                    "playerSeed": 17,
                    "playerName": "17",
                    "placement": 0,
                    "groupSeed": 3
                },
                {
                    "rrId": 32,
                    "groupNum": 1,
                    "playerId": 25,
                    "playerSeed": 25,
                    "playerName": "25",
                    "placement": 0,
                    "groupSeed": 4
                },
                {
                    "rrId": 33,
                    "groupNum": 1,
                    "playerId": 33,
                    "playerSeed": 33,
                    "playerName": "33",
                    "placement": 0,
                    "groupSeed": 5
                },
                {
                    "rrId": 48,
                    "groupNum": 1,
                    "playerId": 41,
                    "playerSeed": 41,
                    "playerName": "41",
                    "placement": 0,
                    "groupSeed": 6
                },
                {
                    "rrId": 49,
                    "groupNum": 1,
                    "playerId": 49,
                    "playerSeed": 49,
                    "playerName": "49",
                    "placement": 0,
                    "groupSeed": 7
                },
                {
                    "rrId": 64,
                    "groupNum": 1,
                    "playerId": 57,
                    "playerSeed": 57,
                    "playerName": "57",
                    "placement": 0,
                    "groupSeed": 8
                }
            ],
            [
                {
                    "rrId": 2,
                    "groupNum": 2,
                    "playerId": 2,
                    "playerSeed": 2,
                    "playerName": "Daniel McGinnis",
                    "placement": 0,
                    "groupSeed": 1
                },
                {
                    "rrId": 15,
                    "groupNum": 2,
                    "playerId": 10,
                    "playerSeed": 10,
                    "playerName": "10",
                    "placement": 0,
                    "groupSeed": 2
                },
                {
                    "rrId": 18,
                    "groupNum": 2,
                    "playerId": 18,
                    "playerSeed": 18,
                    "playerName": "18",
                    "placement": 0,
                    "groupSeed": 3
                },
                {
                    "rrId": 31,
                    "groupNum": 2,
                    "playerId": 26,
                    "playerSeed": 26,
                    "playerName": "26",
                    "placement": 0,
                    "groupSeed": 4
                },
                {
                    "rrId": 34,
                    "groupNum": 2,
                    "playerId": 34,
                    "playerSeed": 34,
                    "playerName": "34",
                    "placement": 0,
                    "groupSeed": 5
                },
                {
                    "rrId": 47,
                    "groupNum": 2,
                    "playerId": 42,
                    "playerSeed": 42,
                    "playerName": "42",
                    "placement": 0,
                    "groupSeed": 6
                },
                {
                    "rrId": 50,
                    "groupNum": 2,
                    "playerId": 50,
                    "playerSeed": 50,
                    "playerName": "50",
                    "placement": 0,
                    "groupSeed": 7
                },
                {
                    "rrId": 63,
                    "groupNum": 2,
                    "playerId": 58,
                    "playerSeed": 58,
                    "playerName": "58",
                    "placement": 0,
                    "groupSeed": 8
                }
            ],
        ],
    },

    reducers: {
        updateChampionshipBracketMatches: (state, action) => {
            state.championshipBracketMatches = structuredClone(action.payload);
        },
        updateBBracketMatches: (state, action) => {
            state.bBracketMatches = structuredClone(action.payload);
        },
        updateCBracketMatches: (state, action) => {
            state.cBracketMatches = structuredClone(action.payload);
        },
        updateDBracketMatches: (state, action) => {
            state.dBracketMatches = structuredClone(action.payload);
        },
        updateRoundRobinGroups: (state, action) => {
            state.roundRobinGroups = structuredClone(action.payload);
        },
    },
});

export const {updateChampionshipBracketMatches} = singlesSlice.actions;
export const {updateBBracketMatches} = singlesSlice.actions;
export const {updateCBracketMatches} = singlesSlice.actions;
export const {updateDBracketMatches} = singlesSlice.actions;
export const {updateRoundRobinGroups} = singlesSlice.actions;

export default singlesSlice.reducer;
