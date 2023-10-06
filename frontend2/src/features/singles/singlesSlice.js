import {createSlice} from "@reduxjs/toolkit";

export const singlesSlice = createSlice({
    name: "singles",
    initialState: {
        // matches: [
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
        // ],
        matches: [
            {
                id: 1,
                name: "Semifinals",
                nextMatchId: 3,
                tournamentRoundText: "2",
                state: "DONE",
                "participants": [
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
                        name: "Daniel"
                    }
                ]
            }
        ]
    },

    reducers: {
        updateMatches: (state, action) => {
            state.data = [...action.payload];
        },
    },
});

export const {updateMatches} = singlesSlice.actions;

export default singlesSlice.reducer;
