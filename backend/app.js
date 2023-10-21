const express = require('express')
const app = express()
const port = 5000
const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

const sqlite3 = require('sqlite3').verbose()

let db = new sqlite3.Database('./AmesOpen2023.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the Ames Open 2023 database.');
});

app.get('/getAllEntries', async (req, res) => {
    let ret = [];
    let sql = `SELECT PlayerID id, PlayerName name, PlayerSeed seed, SinglesDoubles sd FROM Entries ORDER BY PlayerSeed`
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
                ret.push({
                    "ID": row.id,
                    "Name": row.name,
                    "Seed": row.seed,
                    "SinglesDoubles": row.sd,
                })
        });
        res.send(ret);
    })
})

app.get('/getAllSinglesEntries', async (req, res) => {
    console.log("Getting all singles entries")
    let ret = [];
    let sql = `SELECT PlayerID id, PlayerName name, PlayerSeed seed, SinglesDoubles sd FROM Entries ORDER BY PlayerSeed`
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            if ((row.sd & (1 << 0)) > 0) {
                ret.push({
                    "ID": row.id,
                    "Name": row.name,
                    "Seed": row.seed,
                    "SinglesDoubles": row.sd,
                })
            }
        });
        res.send(ret);
    })
})

app.get('/getAllDoublesEntries', async (req, res) => {
    let ret = [];
    let sql = `SELECT PlayerID id, PlayerName name, PlayerSeed seed, SinglesDoubles sd FROM Entries ORDER BY PlayerSeed`
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            if ((row.sd & (1 << 1)) > 0) {
                ret.push({
                    "ID": row.id,
                    "Name": row.name,
                    "Seed": row.seed,
                    "SinglesDoubles": row.sd,
                })
            }
        });
        res.send(ret);
    })
})

app.get('/generateSinglesRoundRobinGroups', (req, res) => {
    let data = [];
    let sql = `SELECT PlayerID id, PlayerName name, PlayerSeed seed, SinglesDoubles sd FROM Entries ORDER BY PlayerSeed`

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            if ((row.sd & (1 << 0)) > 0) {
                data.push({
                    "ID": row.id,
                    "Name": row.name,
                    "Seed": row.seed,
                    "SinglesDoubles": row.sd,
                })
            }
        });
        // console.log("DATA")
        // console.log(data)
        db.serialize(() => {
            db.run('DROP TABLE IF EXISTS SinglesRoundRobin')
                .run('CREATE TABLE SinglesRoundRobin(rrId integer PRIMARY KEY AUTOINCREMENT, rrGroupNum integer, rrPlayerId integer, rrPlayerSeed integer, rrPlayerName text, rrPlacement integer, rrGroupSeed integer)')
            let numGroups = 6;
            // let numPlayersPerGroup = data.length / numGroups;
            let numPlayersPerGroup = 11;
            for (let i = 0; i < numPlayersPerGroup; i++) {
                if (i % 2 === 0) {
                    for (let j = 0; j < numGroups; j++) {
                        console.log("TEST")
                        console.log("I: " + i + " numGroups: " + numGroups + " j: " + j)
                        console.log(i * numGroups + j)
                        if (i * numGroups + j < 64) {
                            let tempData = [j + 1, data[i * numGroups + j].ID, data[i * numGroups + j].Seed, data[i * numGroups + j].Name, 0, i + 1]
                            // console.log(tempData)
                            console.log()
                            let sql = `INSERT INTO SinglesRoundRobin(rrGroupNum, rrPlayerId, rrPlayerSeed, rrPlayerName, rrPlacement, rrGroupSeed) VALUES(?, ?, ?, ?, ?, ?)`
                            db.run(sql, tempData, function (err) {
                                if (err) {
                                    return console.error(err.message);
                                }
                            })
                        }

                    }
                } else {
                    let tempNum = 0;
                    for (let j = numGroups - 1; j >= 0; j--) {
                        tempNum++;
                        console.log("TESTING")
                        console.log("I: " + i + " numGroups: " + numGroups + " j: " + j)
                        console.log(i * numGroups + j)
                        // console.log(i * numGroups + j)
                        // console.log(data[i * numGroups + j])
                        if (i * numGroups + j < 64) {
                            let tempData = [tempNum, data[i * numGroups + j].ID, data[i * numGroups + j].Seed, data[i * numGroups + j].Name, 0, i + 1]
                            let sql = `INSERT INTO SinglesRoundRobin(rrGroupNum, rrPlayerId, rrPlayerSeed, rrPlayerName, rrPlacement, rrGroupSeed) VALUES(?, ?, ?, ?, ?, ?)`
                            db.run(sql, tempData, function (err) {
                                if (err) {
                                    return console.error(err.message);
                                }
                            })
                        }

                    }
                }
            }
            // for (let i = 43; i < 64; i++) {
            //     let tempData = [i, "bye", ]
            // }
        })
        console.log("Singles Round Robin Groups Reset!")
        res.send("SUCCESS");
    })
})

app.get('/hardResetSinglesChampionshipBracket', (req, res) => {
    let data = [];
    let sql = `SELECT PlayerID id, PlayerName name, PlayerSeed seed, SinglesDoubles sd FROM Entries ORDER BY PlayerSeed`

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            if ((row.sd & (1 << 0)) > 0) {
                data.push({
                    "ID": row.id,
                    "Name": row.name,
                    "Seed": row.seed,
                    "SinglesDoubles": row.sd,
                })
            }
        });
        let bracketSize = 64;
        db.serialize(() => {
            db.run('DROP TABLE IF EXISTS SinglesChampionshipBracket')
                .run('CREATE TABLE SinglesChampionshipBracket(matchId integer, matchName text, nextMatchId integer, roundText integer, participant1Id integer, participant1IsWinner text, participant1Name text, participant2Id integer, participant2IsWinner text, participant2Name text)')
            let midPoint = bracketSize / 2;
            let counter = 0;
            let roundTxt = 1;
            for (let i = 0; i < midPoint; i++) {

                let tempData = [i, "name", (i < midPoint / 2) ? midPoint + i : midPoint * 2 - i - 1, roundTxt, data[i].Seed, false, data[i].Name, data[data.length - i - 1].Seed, false, data[data.length - i - 1].Name]
                let sql = `INSERT INTO SinglesChampionshipBracket(matchId, matchName, nextMatchId, roundText, participant1Id, participant1IsWinner, participant1Name, participant2Id, participant2IsWinner, participant2Name) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
                db.run(sql, tempData, function(err) {
                if (err) {
                    return console.error(err.message);
                }
            })
                counter++;
            }
            let nextMatchIdCounter = midPoint * 1.5;
            midPoint /= 2;
            // console.log("MIDPOINT: " + midPoint)
            while (midPoint > 1) {
                // console.log("NEXT MATCH ID: " + nextMatchIdCounter)
                roundTxt++;
                for (let i = 0; i < midPoint; i++) {
                    let tempData = [counter, "name", (i < midPoint / 2) ? nextMatchIdCounter + i : nextMatchIdCounter + midPoint - i - 1, roundTxt, "TBD", false, "TBD",  "TBD", false, "TBD"]
                    let sql = `INSERT INTO SinglesChampionshipBracket(matchId, matchName, nextMatchId, roundText, participant1Id, participant1IsWinner, participant1Name, participant2Id, participant2IsWinner, participant2Name) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
                    db.run(sql, tempData, function(err) {
                        if (err) {
                            return console.error(err.message);
                        }
                    })
                    counter++;
                }
                midPoint /= 2;
                nextMatchIdCounter += (midPoint);
            }
            roundTxt++;
            let tempData = [counter,"name",null,roundTxt,"TBD",false,"TBD","TBD",false,"TBD"]
            let sql = `INSERT INTO SinglesChampionshipBracket(matchId, matchName, nextMatchId, roundText, participant1Id, participant1IsWinner, participant1Name, participant2Id, participant2IsWinner, participant2Name) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
            db.run(sql, tempData, function(err) {
                if (err) {
                    return console.error(err.message);
                }
            })
        })
        console.log("Singles Championship Bracket Reset!")
        res.send("SUCCESS");
    })
})

app.get('/hardResetSinglesConsolationBracket', (req, res) => {
    let data = [];
    let sql = `SELECT PlayerID id, PlayerName name, PlayerSeed seed, SinglesDoubles sd FROM Entries ORDER BY PlayerSeed`

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            if ((row.sd & (1 << 0)) > 0) {
                data.push({
                    "ID": row.id,
                    "Name": row.name,
                    "Seed": row.seed,
                    "SinglesDoubles": row.sd,
                })
            }
        });
        let bracketSize = 64;
        db.serialize(() => {
            db.run('DROP TABLE IF EXISTS SinglesConsolationBracket')
                .run('CREATE TABLE SinglesConsolationBracket(matchId integer, matchName text, nextMatchId integer, roundText integer, participant1Id integer, participant1IsWinner text, participant1Name text, participant2Id integer, participant2IsWinner text, participant2Name text)')
            let midPoint = bracketSize / 2;
            let counter = 0;
            let roundTxt = 1;
            for (let i = 0; i < midPoint; i++) {

                // let tempData = [i, "name", (i < midPoint / 2) ? midPoint + i : midPoint * 2 - i - 1, roundTxt, data[i].Seed, false, data[i].Name, data[data.length - i - 1].Seed, false, data[data.length - i - 1].Name]
                // let sql = `INSERT INTO SinglesConsolationBracket(matchId, matchName, nextMatchId, roundText, participant1Id, participant1IsWinner, participant1Name, participant2Id, participant2IsWinner, participant2Name) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
                // db.run(sql, tempData, function(err) {
                //     if (err) {
                //         return console.error(err.message);
                //     }
                // })
                counter++;
            }
            let nextMatchIdCounter = midPoint * 1.5;
            midPoint /= 2;
            // console.log("MIDPOINT: " + midPoint)
            while (midPoint > 1) {
                // console.log("NEXT MATCH ID: " + nextMatchIdCounter)
                roundTxt++;
                for (let i = 0; i < midPoint; i++) {
                    let tempData = [counter, "name", (i < midPoint / 2) ? nextMatchIdCounter + i : nextMatchIdCounter + midPoint - i - 1, roundTxt, "TBD", false, "TBD",  "TBD", false, "TBD"]
                    let sql = `INSERT INTO SinglesConsolationBracket(matchId, matchName, nextMatchId, roundText, participant1Id, participant1IsWinner, participant1Name, participant2Id, participant2IsWinner, participant2Name) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
                    db.run(sql, tempData, function(err) {
                        if (err) {
                            return console.error(err.message);
                        }
                    })
                    counter++;
                }
                midPoint /= 2;
                nextMatchIdCounter += (midPoint);
            }
            let tempData = [counter,"name",null,roundTxt,"TBD",false,"TBD","TBD",false,"TBD"]
            let sql = `INSERT INTO SinglesConsolationBracket(matchId, matchName, nextMatchId, roundText, participant1Id, participant1IsWinner, participant1Name, participant2Id, participant2IsWinner, participant2Name) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
            db.run(sql, tempData, function(err) {
                if (err) {
                    return console.error(err.message);
                }
            })
        })

        console.log("Singles Consolation Bracket Reset!")
        res.send("SUCCESS");
    })
})

app.get('/getSinglesRoundRobinGroups', (req, res) => {
    let ret = []
    let sql = `SELECT rrId rrId, rrGroupNum groupNum, rrPlayerId playerId, rrPlayerSeed playerSeed, rrPlayerName playerName, rrPlacement placement, rrGroupSeed groupSeed FROM SinglesRoundRobin ORDER BY rrGroupNum, rrPlayerSeed`
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        let tempArr = []
        rows.forEach((row) => {
            // console.log("LENGTH: " + tempArr.length)
            if (tempArr.length === 0 || tempArr[tempArr.length - 1].groupNum === row.groupNum) {
                tempArr.push(row);
            } else {
                ret.push(tempArr);
                tempArr = [];
                tempArr.push(row);
            }

            // ret.push(tempArr);
            // console.log(row)
            // ret.push(row)
        });
        ret.push(tempArr)
        res.send(ret);
    })
})

app.post('/uploadSinglesRoundRobinResults', (req, res) => {
    let data = req.body.matchData;
    data.forEach((rows) => {
        rows.forEach((row) => {
            console.log(row);
            let sql = `UPDATE SinglesRoundRobin SET rrPlacement = ? WHERE rrPlayerId = ? `
            let tempData = [row.placement, row.playerId]
            // console.log("PLAYER ID: " + row.playerId + " Placement: " + row.placement);
            db.run(sql, tempData, function(err) {
                if (err) {
                    return console.error(err.message);
                }
            })
        })
    })
    res.send("SUCCESS!")
    console.log("Singles Round Robin Results Uploaded!")
    // console.log(data)
})

app.get('/generateSinglesChampionshipBracket', (req, res) => {
    let data = [];
    let matchArr = []
    let sql = `SELECT rrPlayerId id, rrPlayerName name, rrPlacement placement, rrGroupNum groupNum FROM SinglesRoundRobin ORDER BY rrPlacement, rrGroupNum`

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            data.push({
                "ID": row.id,
                "Name": row.name,
                "Seed": row.placement,
                "PlayerId": row.id,
            })
        });
        let bracketSize = 64;
        db.serialize(() => {
            db.run('DROP TABLE IF EXISTS SinglesChampionshipBracket')
                .run('CREATE TABLE SinglesChampionshipBracket(matchId integer, matchName text, nextMatchId integer, roundText integer, participant1Id integer, participant1IsWinner text, participant1Name text, participant2Id integer, participant2IsWinner text, participant2Name text)')

            let midPoint = bracketSize / 2;
            let counter = 0;
            let roundTxt = 1;
            for (let i = 0; i < midPoint; i++) {

                let tempData = [i, "name", (i < midPoint / 2) ? midPoint + i : midPoint * 2 - i - 1, roundTxt, data[i].PlayerId, false, data[i].Name, data[data.length - i - 1].PlayerId, false, data[data.length - i - 1].Name]
                let sql = `INSERT INTO SinglesChampionshipBracket(matchId, matchName, nextMatchId, roundText, participant1Id, participant1IsWinner, participant1Name, participant2Id, participant2IsWinner, participant2Name) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
                db.run(sql, tempData, function(err) {
                    if (err) {
                        return console.error(err.message);
                    }
                })
                let match = {
                    id: i,
                    name: "name",
                    nextMatchId: (i < midPoint / 2) ? midPoint + i : midPoint * 2 - i - 1,
                    // nextMatchId: null,
                    state: "PLAYED",
                    tournamentRoundText: '1',
                    participants: [
                        {
                            id: data[i].PlayerId,
                            isWinner: false,
                            name: data[i].Name,
                        },
                        {
                            id: data[data.length - i - 1].PlayerId,
                            isWinner: false,
                            name: data[data.length - i - 1].Name,
                        }
                    ]
                }
                matchArr.push(match)
                counter++;
            }
            // let roundText = 2;
            let nextMatchIdCounter = midPoint * 1.5;
            midPoint /= 2;
            // console.log("MIDPOINT: " + midPoint)
            while (midPoint > 1) {
                // console.log("NEXT MATCH ID: " + nextMatchIdCounter)
                roundTxt++;
                for (let i = 0; i < midPoint; i++) {
                    let match = {
                        id: counter,
                        name: "name",
                        // nextMatchId: midPoint + i,
                        nextMatchId: (i < midPoint / 2) ? nextMatchIdCounter + i : nextMatchIdCounter + midPoint - i - 1,
                        state: "SCHEDULED" + midPoint,
                        tournamentRoundText: roundTxt,
                        participants: [
                            {
                                id: "TBD",
                                isWinner: false,
                                name: "TBD",
                            },
                            {
                                id: "TBD",
                                isWinner: false,
                                name: "TBD",
                            }
                        ]
                    }
                    matchArr.push(match)
                    let tempData = [counter, "name", (i < midPoint / 2) ? nextMatchIdCounter + i : nextMatchIdCounter + midPoint - i - 1, roundTxt, "TBD", false, "TBD",  "TBD", false, "TBD"]
                    let sql = `INSERT INTO SinglesChampionshipBracket(matchId, matchName, nextMatchId, roundText, participant1Id, participant1IsWinner, participant1Name, participant2Id, participant2IsWinner, participant2Name) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
                    db.run(sql, tempData, function(err) {
                        if (err) {
                            return console.error(err.message);
                        }
                    })
                    counter++;
                }
                midPoint /= 2;
                nextMatchIdCounter += (midPoint);
            }
            roundTxt++;
            let tempData = [counter,"name",null,roundTxt,"TBD",false,"TBD","TBD",false,"TBD"]
            let sql = `INSERT INTO SinglesChampionshipBracket(matchId, matchName, nextMatchId, roundText, participant1Id, participant1IsWinner, participant1Name, participant2Id, participant2IsWinner, participant2Name) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
            db.run(sql, tempData, function(err) {
                if (err) {
                    return console.error(err.message);
                }
            })
            let match = {
                id: counter,
                name: "name",
                // nextMatchId: midPoint + i,
                nextMatchId: null,
                state: "SCHEDULED FINALS",
                participants: [
                    {
                        id: "TBD",
                        isWinner: false,
                        name: "TBD",
                    },
                    {
                        id: "TBD",
                        isWinner: false,
                        name: "TBD",
                    }
                ]
            }
            matchArr.push(match)
        })

        console.log("Singles Championship Bracket Generated!")
        console.log(matchArr)
        res.send(matchArr);
    })
})

app.get('/generateSinglesBBracket', (req, res) => {
    let data = [];
    let matchArr = []
    let sql = `SELECT rrPlayerId id, rrPlayerName name, rrPlacement placement, rrGroupNum groupNum FROM SinglesRoundRobin ORDER BY rrPlacement, rrGroupNum`

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            data.push({
                "ID": row.id,
                "Name": row.name,
                "Seed": row.placement,
                "PlayerId": row.id,
            })
        });
        // let bracketSize = 64/2;
        db.serialize(() => {
            db.run('DROP TABLE IF EXISTS SinglesBBracket')
                .run('CREATE TABLE SinglesBBracket(matchId integer, matchName text, nextMatchId integer, roundText integer, participant1Id integer, participant1IsWinner text, participant1Name text, participant2Id integer, participant2IsWinner text, participant2Name text)')

            let midPoint = data.length / 2;
            let counter = 48;
            let roundTxt = 2;
            // for (let i = 0; i < midPoint; i++) {
            //     counter++;
            // }
            // console.log("COUNTER: " + counter)
            // let roundText = 2;
            let nextMatchIdCounter = midPoint * 1.5;
            midPoint /= 2;
            midPoint /= 2;
            nextMatchIdCounter += (midPoint);

            // console.log("MIDPOINT: " + midPoint)
            while (midPoint > 1) {
                // console.log("NEXT MATCH ID: " + nextMatchIdCounter)
                roundTxt++;
                for (let i = 0; i < midPoint; i++) {
                    let match = {
                        id: counter,
                        name: "name",
                        // nextMatchId: midPoint + i,
                        nextMatchId: (i < midPoint / 2) ? nextMatchIdCounter + i : nextMatchIdCounter + midPoint - i - 1,
                        state: "SCHEDULED" + midPoint,
                        tournamentRoundText: roundTxt,
                        participants: [
                            {
                                id: "TBD",
                                isWinner: false,
                                name: "TBD",
                            },
                            {
                                id: "TBD",
                                isWinner: false,
                                name: "TBD",
                            }
                        ]
                    }
                    matchArr.push(match)
                    let tempData = [counter, "name", (i < midPoint / 2) ? nextMatchIdCounter + i : nextMatchIdCounter + midPoint - i - 1, roundTxt, "TBD", false, "TBD",  "TBD", false, "TBD"]
                    let sql = `INSERT INTO SinglesBBracket(matchId, matchName, nextMatchId, roundText, participant1Id, participant1IsWinner, participant1Name, participant2Id, participant2IsWinner, participant2Name) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
                    db.run(sql, tempData, function(err) {
                        if (err) {
                            return console.error(err.message);
                        }
                    })
                    counter++;
                }
                midPoint /= 2;
                nextMatchIdCounter += (midPoint);
            }
            roundTxt++;
            let tempData = [counter,"name",null,roundTxt,"TBD",false,"TBD","TBD",false,"TBD"]
            let sql = `INSERT INTO SinglesBBracket(matchId, matchName, nextMatchId, roundText, participant1Id, participant1IsWinner, participant1Name, participant2Id, participant2IsWinner, participant2Name) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
            db.run(sql, tempData, function(err) {
                if (err) {
                    return console.error(err.message);
                }
            })
            let match = {
                id: counter,
                name: "name",
                // nextMatchId: midPoint + i,
                nextMatchId: null,
                state: "SCHEDULED FINALS",
                participants: [
                    {
                        id: "TBD",
                        isWinner: false,
                        name: "TBD",
                    },
                    {
                        id: "TBD",
                        isWinner: false,
                        name: "TBD",
                    }
                ]
            }
            matchArr.push(match)
        })

        console.log("Singles B Bracket Generated!")
        // console.log(matchArr)
        res.send(matchArr);
    })
})

app.get('/generateSinglesCBracket', (req, res) => {
    let data = [];
    let matchArr = []
    let sql = `SELECT rrPlayerId id, rrPlayerName name, rrPlacement placement, rrGroupNum groupNum FROM SinglesRoundRobin ORDER BY rrPlacement, rrGroupNum`

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            data.push({
                "ID": row.id,
                "Name": row.name,
                "Seed": row.placement,
                "PlayerId": row.id,
            })
        });

        db.serialize(() => {
            db.run('DROP TABLE IF EXISTS SinglesCBracket')
                .run('CREATE TABLE SinglesCBracket(matchId integer, matchName text, nextMatchId integer, roundText integer, participant1Id integer, participant1IsWinner text, participant1Name text, participant2Id integer, participant2IsWinner text, participant2Name text)')

            let midPoint = data.length / 2;
            let counter = 32;
            let roundTxt = 1;
            // for (let i = 0; i < midPoint; i++) {
            //     counter++;
            // }
            // console.log("COUNTER: " + counter)
            // let roundText = 2;
            let nextMatchIdCounter = midPoint * 1.5;
            midPoint /= 2;
            // console.log("MIDPOINT: " + midPoint)
            while (midPoint > 1) {
                // console.log("NEXT MATCH ID: " + nextMatchIdCounter)
                roundTxt++;
                for (let i = 0; i < midPoint; i++) {
                    let match = {
                        id: counter,
                        name: "name",
                        // nextMatchId: midPoint + i,
                        nextMatchId: (i < midPoint / 2) ? nextMatchIdCounter + i : nextMatchIdCounter + midPoint - i - 1,
                        state: "SCHEDULED" + midPoint,
                        tournamentRoundText: roundTxt,
                        participants: [
                            {
                                id: "TBD",
                                isWinner: false,
                                name: "TBD",
                            },
                            {
                                id: "TBD",
                                isWinner: false,
                                name: "TBD",
                            }
                        ]
                    }
                    matchArr.push(match)
                    let tempData = [counter, "name", (i < midPoint / 2) ? nextMatchIdCounter + i : nextMatchIdCounter + midPoint - i - 1, roundTxt, "TBD", false, "TBD",  "TBD", false, "TBD"]
                    let sql = `INSERT INTO SinglesCBracket(matchId, matchName, nextMatchId, roundText, participant1Id, participant1IsWinner, participant1Name, participant2Id, participant2IsWinner, participant2Name) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
                    db.run(sql, tempData, function(err) {
                        if (err) {
                            return console.error(err.message);
                        }
                    })
                    counter++;
                }
                midPoint /= 2;
                nextMatchIdCounter += (midPoint);
            }
            roundTxt++;
            let tempData = [counter,"name",null,roundTxt,"TBD",false,"TBD","TBD",false,"TBD"]

            let sql = `INSERT INTO SinglesCBracket(matchId, matchName, nextMatchId, roundText, participant1Id, participant1IsWinner, participant1Name, participant2Id, participant2IsWinner, participant2Name) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
            db.run(sql, tempData, function(err) {
                if (err) {
                    return console.error(err.message);
                }
            })
            let match = {
                id: counter,
                name: "name",
                // nextMatchId: midPoint + i,
                nextMatchId: null,
                state: "SCHEDULED FINALS",
                participants: [
                    {
                        id: "TBD",
                        isWinner: false,
                        name: "TBD",
                    },
                    {
                        id: "TBD",
                        isWinner: false,
                        name: "TBD",
                    }
                ]
            }
            matchArr.push(match)
        })

        console.log("Singles C Bracket Generated!")
        // console.log(matchArr)
        res.send(matchArr);
    })
})
app.get('/generateSinglesDBracket', (req, res) => {
    let data = [];
    let matchArr = []
    let sql = `SELECT rrPlayerId id, rrPlayerName name, rrPlacement placement, rrGroupNum groupNum FROM SinglesRoundRobin ORDER BY rrPlacement, rrGroupNum`

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            data.push({
                "ID": row.id,
                "Name": row.name,
                "Seed": row.placement,
                "PlayerId": row.id,
            })
        });

        db.serialize(() => {
            db.run('DROP TABLE IF EXISTS SinglesDBracket')
                .run('CREATE TABLE SinglesDBracket(matchId integer, matchName text, nextMatchId integer, roundText integer, participant1Id integer, participant1IsWinner text, participant1Name text, participant2Id integer, participant2IsWinner text, participant2Name text)')

            let midPoint = data.length / 2;
            let counter = 48;
            let roundTxt = 2;
            // for (let i = 0; i < midPoint; i++) {
            //     counter++;
            // }
            // console.log("COUNTER: " + counter)
            // let roundText = 2;
            let nextMatchIdCounter = midPoint * 1.5;
            midPoint /= 2;
            midPoint /= 2;
            nextMatchIdCounter += (midPoint);

            // console.log("MIDPOINT: " + midPoint)
            while (midPoint > 1) {
                // console.log("NEXT MATCH ID: " + nextMatchIdCounter)
                roundTxt++;
                for (let i = 0; i < midPoint; i++) {
                    let match = {
                        id: counter,
                        name: "name",
                        // nextMatchId: midPoint + i,
                        nextMatchId: (i < midPoint / 2) ? nextMatchIdCounter + i : nextMatchIdCounter + midPoint - i - 1,
                        state: "SCHEDULED" + midPoint,
                        tournamentRoundText: roundTxt,
                        participants: [
                            {
                                id: "TBD",
                                isWinner: false,
                                name: "TBD",
                            },
                            {
                                id: "TBD",
                                isWinner: false,
                                name: "TBD",
                            }
                        ]
                    }
                    matchArr.push(match)
                    let tempData = [counter, "name", (i < midPoint / 2) ? nextMatchIdCounter + i : nextMatchIdCounter + midPoint - i - 1, roundTxt, "TBD", false, "TBD",  "TBD", false, "TBD"]
                    let sql = `INSERT INTO SinglesDBracket(matchId, matchName, nextMatchId, roundText, participant1Id, participant1IsWinner, participant1Name, participant2Id, participant2IsWinner, participant2Name) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
                    db.run(sql, tempData, function(err) {
                        if (err) {
                            return console.error(err.message);
                        }
                    })
                    counter++;
                }
                midPoint /= 2;
                nextMatchIdCounter += (midPoint);
            }
            roundTxt++;
            let tempData = [counter,"name",null,roundTxt,"TBD",false,"TBD","TBD",false,"TBD"]
            let sql = `INSERT INTO SinglesDBracket(matchId, matchName, nextMatchId, roundText, participant1Id, participant1IsWinner, participant1Name, participant2Id, participant2IsWinner, participant2Name) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
            db.run(sql, tempData, function(err) {
                if (err) {
                    return console.error(err.message);
                }
            })
            let match = {
                id: counter,
                name: "name",
                // nextMatchId: midPoint + i,
                nextMatchId: null,
                state: "SCHEDULED FINALS",
                participants: [
                    {
                        id: "TBD",
                        isWinner: false,
                        name: "TBD",
                    },
                    {
                        id: "TBD",
                        isWinner: false,
                        name: "TBD",
                    }
                ]
            }
            matchArr.push(match)
        })

        console.log("Singles D Bracket Generated!")
        // console.log(matchArr)
        res.send(matchArr);
    })
})

app.post('/updateMatchBracket', (req, res) => {
    let data = req.body;
    console.log(data);
    let tempData = [false, false, 0 ]
    let sql = `UPDATE ` + data.matchResult[0] + ` SET participant1IsWinner = ?, participant2IsWinner = ? WHERE matchId = ?`
    db.run(sql, data.matchResult.slice(1), function(err) {
    // db.run(sql, tempData, function(err) {
        if (err) {
            return console.error(err.message);
        }
    })
    console.log("Match " + data.matchResult[3] + " result updated!")

    data.nextMatch.forEach((row) => {
        sql = `UPDATE ` + row[0] + ` SET participant1Id = ?, participant1Name = ?, participant2Id = ?, participant2Name = ? WHERE matchId = ?`
        db.run(sql, row.slice(1), function(err) {
            if (err) {
                return console.error(err.message);
            }
        })
        console.log("Updated the draw for the " + row[5] + " match of the " + row[0] + "bracket")
    })
    console.log("Matches and Brackets Updated!")
    res.send("SUCCESS");
})

app.post('/createMatchArray', (req, res) => {
    let data = req.body.matchList;
    // console.log(data);
    // console.log(data.length);
    console.log(data[0]);
    let matchArr = []

    let midPoint = data.length / 2;
    console.log("MIDPOINT: " + midPoint)
    let counter = 0;
    for (let i = 0; i < midPoint; i++) {
        let match = {
            id: i,
            name: "name",
            nextMatchId: (i < midPoint / 2) ? midPoint + i : midPoint * 2 - i - 1,
            // nextMatchId: null,
            state: "PLAYED",
            tournamentRoundText: '1',
            participants: [
                {
                    id: data[i].Seed,
                    isWinner: false,
                    name: data[i].Name,
                },
                {
                    id: data[data.length - i - 1].Seed,
                    isWinner: false,
                    name: data[data.length - i - 1].Name,
                }
            ]
        }
        matchArr.push(match)
        counter++;
    }
    let roundText = 2;
    let nextMatchIdCounter = midPoint * 1.5;
    midPoint /= 2;
    console.log("MIDPOINT: " + midPoint)
    while (midPoint > 1) {
        console.log("NEXT MATCH ID: " + nextMatchIdCounter)
        for (let i = 0; i < midPoint; i++) {
            let match = {
                id: counter,
                name: "name",
                // nextMatchId: midPoint + i,
                nextMatchId: (i < midPoint / 2) ? nextMatchIdCounter + i : nextMatchIdCounter + midPoint - i - 1,
                state: "SCHEDULED" + midPoint,
                tournamentRoundText: roundText,
                participants: [
                    {
                        id: "TBD",
                        isWinner: false,
                        name: "TBD",
                    },
                    {
                        id: "TBD",
                        isWinner: false,
                        name: "TBD",
                    }
                ]
            }
            matchArr.push(match)
            counter++;
        }
        midPoint /= 2;
        console.log("MIDPOINT: " + midPoint)
        nextMatchIdCounter += (midPoint);
        roundText++;
    }
    let match = {
        id: counter,
        name: "name",
        // nextMatchId: midPoint + i,
        nextMatchId: null,
        state: "SCHEDULED FINALS",
        participants: [
            {
                id: "TBD",
                isWinner: false,
                name: "TBD",
            },
            {
                id: "TBD",
                isWinner: false,
                name: "TBD",
            }
        ]
    }
    matchArr.push(match)
    // console.log(matchArr)
    console.log("Match Array Created")
    res.send(matchArr)
})

// app.get('/tempAddEntries', () => {
//     for (let i = 10; i <= 64; i++) {
//         let data = [i, i];
//         let sql = `INSERT INTO Entries(PlayerName, PlayerSeed) VALUES(?,?)`;
//         db.serialize(() => {
//             db.run(sql, data, function(err) {
//                 if (err) {
//                     return console.error(err.message);
//                 }
//                 console.log(`Row(s) updated: ${this.changes}`)
//             })
//         })
//     }
//     // db.serialize(() => {
//     //     for (let i = 7; i < 8; i++) {
//     //         db.run(`INSERT INTO Entries(PlayerName, PlayerSeed)
//     //                     VALUES(6,6)`)
//     //     }
//     // })
// })

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.post('/loadBracket', (req, res) => {
    let data = req.body.bracket
    let arr = []
    let sql = `SELECT matchId matchId, matchName matchName, nextMatchId nextMatchId, roundText tournamentRoundText, participant1Id participant1Id, participant1IsWinner participant1IsWinner, participant1Name participant1Name, participant2Id participant2Id, participant2IsWinner participant2IsWinner, participant2Name participant2Name FROM ` + data + ` ORDER BY matchId`
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            let state = ""
            if (row.participant1IsWinner || row.participant2IsWinner) {
                state = "DONE";
            } else {
                state = "SCHEDULED";
            }
            let tempObj = {
                "id": row.matchId,
                "name": row.matchName,
                "nextMatchId": row.nextMatchId,
                "tournamentRoundText": row.tournamentRoundText,
                "state": state,
                "participants": [
                    {
                        "id": row.participant1Id,
                        "isWinner": row.participant1IsWinner,
                        "name": row.participant1Name
                    },
                    {
                        "id": row.participant2Id,
                        "isWinner": row.participant2IsWinner,
                        "name": row.participant2Name
                    }
                ]
            }
            arr.push(tempObj)
        });
        res.send(arr);
    })
    console.log(arr);
})