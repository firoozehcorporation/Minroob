import React, { Component } from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import style from "../style";
import Modal from 'react-native-modalbox';
import { Ionicons } from '@expo/vector-icons';
import GameService from '../gameservice-sdk.js';

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            map: new Array(length).fill("").map(() => new Array(length).fill("")),
            numOfMines: 10,
            length: 8,
            turn: undefined,
            me: this.props.props.route.params.me,
            room: this.props.props.route.params.room,
            playerA: { ...this.props.props.route.params.players[0], level: "مینچی کوچک", score: 0, color: "#ef5350", },
            playerB: { ...this.props.props.route.params.players[1], level: "مینچی کوچک", score: 0, color: "#03A9F4", },
            winner: {},
            freeze: false
        };
    }

    componentDidMount() {
        this.getCurrentTurn();
        this.initialMap();

        GameService.GSLive.TurnBased.OnCurrentTurnMember = async (currentTurn) => {
            console.log("[currentTurn]", currentTurn._id, "[Me]", this.state.me);
            if (currentTurn._id == this.state.me) {
                console.log(`${JSON.stringify(this.initialMap())}`)
                await GameService.GSLive.TurnBased.TakeTurn(`1|${JSON.stringify(this.initialMap())}`)
            }
            this.setState({ turn: currentTurn._id });
        }

        GameService.GSLive.TurnBased.OnTakeTurn = (sender, turn) => {
            console.log({ turn })
            let [action, alpa, beta] = turn.split("|");

            switch (action) {
                case "1":
                    let map = new Array(this.state.length).fill({}).map(() => new Array(this.state.length).fill({}));
                    (JSON.parse(alpa)).map(bomb => {
                        map[bomb.x][bomb.y] = { t: "B", by: undefined };
                    })

                    for (let i = 0; i < this.state.length; i++) {
                        for (let j = 0; j < this.state.length; j++) {
                            if (map[i][j].t != "B") map[i][j] = {
                                t: "N",
                                by: undefined,
                                n: 0
                            };
                        }
                    }
                    for (let i = 0; i < this.state.length; i++) {
                        for (let j = 0; j < this.state.length; j++) {
                            if (map[i][j].t != "B") map[i][j].n = this.getn(map, i, j)
                        }
                    }
                    this.setState({ map });
                    break
                case "2":
                    this.action(sender._id, parseInt(alpa), parseInt(beta));
                    break
            }
        }

        GameService.GSLive.TurnBased.OnChoosedNext = (who) => {
            console.log("[currentTurn-a]", who._id, "[Me]", this.state.me)
            this.setState({ turn: who._id });
        }

        GameService.GSLive.TurnBased.OnLeaveRoom = member => {
            console.log("[onLeft]", member._id, member._id == this.state.me)
            if (member._id == this.state.me)
                this.props.props.navigation.navigate("Home")
        }

        GameService.GSLive.TurnBased.OnVoteReceived = (sender, vote) => {
            console.log("[OnVoteReceived]", { sender, vote });

            GameService.GSLive.TurnBased.AcceptVote(sender._id)
        }

        GameService.GSLive.TurnBased.OnComplete = async (result) => {
            console.log("[OnComplete]", { result });
            let winner = (
                result.Outcome[this.state.playerA._id].Rank < result.Outcome[this.state.playerB._id].Rank
                    ?
                    this.state.playerA
                    :
                    this.state.playerB
            );
            if (winner._id == this.state.me)
                await GameService.Leaderboards.SubmitScore("608829831530e0001945c39b", winner.score)
            this.setState({ winner, winnerModal: true });
            this.refs.winnerModal.open()
        }
    }

    getCurrentTurn = async () => {
        await GameService.GSLive.TurnBased.GetCurrentTurnMember()
    }

    initialMap = () => {
        let bombs = [];
        for (let i = 0; i <= this.state.numOfMines; i++) {
            let x = Math.floor(Math.random() * this.state.length);
            let y = Math.floor(Math.random() * this.state.length);

            let isDuplicate = false;
            for (let bomb in bombs) {
                if (bomb.x == x && bomb.y == y) { isDuplicate = true; break; }
            }
            if (isDuplicate) { i++; continue; }
            bombs.push({ x, y });
        }

        return bombs;
    }

    select = async (i, j) => {
        if (
            this.state.winner._id != undefined
            ||
            this.state.map[i][j].by != undefined
            ||
            this.state.freeze)
            return
        if (this.state.me != this.state.turn)
            return console.error(`T: ${this.state.turn} != M: ${this.state.me}`)

        this.setState({ freeze: true }, async () => {
            await GameService.GSLive.TurnBased.TakeTurn(`2|${i}|${j}`, (() => {
                if (this.state.playerA._id == this.state.me)
                    return this.state.playerB._id;
                return this.state.playerA._id;
            })())
        })
    }

    action = async (sender, i, j) => {
        let { map, playerA, playerB } = this.state;

        map[i][j].by = sender;

        // after ack
        if (map[i][j].n < 1) this.expand(i, j);
        if (map[i][j].t == "B") {
            if (sender == playerA._id) {
                this.setState({ playerA: { ...playerA, score: playerA.score + 1 } })
            } else {
                this.setState({ playerB: { ...playerB, score: playerB.score + 1 } })
            }
        }

        this.setState({ map, freeze: false }, this.calcWinner);
    }

    calcWinner = async () => {
        let { numOfMines, playerA, playerB } = this.state;
        let leftMines = numOfMines - ((playerA.score) + playerB.score) - 1;

        if (
            (leftMines + playerA.score < playerB.score)
            ||
            (leftMines + playerB.score < playerA.score)
            ||
            (playerA.score + playerB.score >= numOfMines)
        ) {
            console.log("[Vote]", {
                [this.state.playerA._id]: { Rank: this.state.playerA.score > this.state.playerB.score ? 1 : 2, Value: this.state.playerA.score },
                [this.state.playerB._id]: { Rank: this.state.playerA.score > this.state.playerB.score ? 2 : 1, Value: this.state.playerB.score },
            })
            this.setState({ freeze: true }, async () => {
                await GameService.GSLive.TurnBased.Vote({
                    [this.state.playerA._id]: { Rank: this.state.playerA.score > this.state.playerB.score ? 1 : 2, Value: this.state.playerA.score },
                    [this.state.playerB._id]: { Rank: this.state.playerA.score > this.state.playerB.score ? 2 : 1, Value: this.state.playerB.score },
                })
            })
        }
    }

    expand = (x, y) => {
        let { map } = this.state;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (
                    x + i > -1 &&
                    y + j > -1 &&
                    x + i < this.state.length &&
                    y + j < this.state.length &&
                    map[x + i][y + j].by == undefined &&
                    map[x + i][y + j].t != "B"
                ) {
                    map[x + i][y + j].by = this.state.turn;
                    if (map[x + i][y + j].n < 1)
                        this.expand(x + i, y + j);
                }
            }
        }

        this.setState({ map });
    }

    Left = async () => {
        GameService.GSLive.TurnBased.LeaveRoom();
    }

    getn = (map, x, y) => {
        let n = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (
                    x + i > -1 &&
                    y + j > -1 &&
                    x + i < this.state.length &&
                    y + j < this.state.length &&
                    map[x + i][y + j].t == "B"
                )
                    n++;
            }
        }
        return n;
    }

    render() {
        return <View style={style.page}>
            <View style={{ width: (this.state.length * 50) + 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <View style={[style.playerBox, { borderColor: this.state.playerA.color, borderLeftWidth: 5 }]}>
                    <View>
                        <Text style={[style.b, { textAlign: 'left', fontSize: 18 }]}>{this.state.playerA.name}</Text>
                        <Text style={[style.p, { textAlign: 'left' }]}>{this.state.playerA.level}</Text>
                        <Text style={[style.p, { textAlign: 'left' }]}>{(this.state.playerA.score).toLocaleString("fa-IR")} امتیاز</Text>
                    </View>
                    {this.state.turn == this.state.playerA._id && <Image source={require('../Assets/turn-mark.png')} style={{ width: 30, height: 30, margin: 20 }} />}
                </View>
                <View style={[style.playerBox, { borderColor: this.state.playerB.color, borderRightWidth: 5, }]}>
                    {this.state.turn == this.state.playerB._id && <Image source={require('../Assets/turn-mark.png')} style={{ width: 30, height: 30, margin: 20 }} />}
                    <View>
                        <Text style={[style.b, { fontSize: 18 }]}>{this.state.playerB.name}</Text>
                        <Text style={[style.p, {}]}>{this.state.playerB.level}</Text>
                        <Text style={[style.p, {}]}>{(this.state.playerB.score).toLocaleString("fa-IR")} امتیاز</Text>
                    </View>
                </View>
            </View>
            <View style={[style.map, (this.state.freeze ? { backgroundColor: "#666" } : {})]}>
                {this.state.map.map((row, i) => (<View key={`${i}`} style={style.mapRow}>
                    {row.map((col, j) => <Pressable key={`${i} ${j}`} onPress={() => { this.select(i, j) }}>
                        <View style={[
                            style.tile,
                            this.state.map[i][j].by != undefined && this.state.map[i][j].t === "N" && { backgroundColor: "#6D4C41" },
                            this.state.map[i][j].by != undefined && this.state.map[i][j].t === "B" && {
                                backgroundColor: (() => {
                                    if (this.state.map[i][j].by == this.state.playerA._id)
                                        return this.state.playerA.color
                                    return this.state.playerB.color
                                })()
                            },
                            { display: 'flex', alignItems: 'center', justifyContent: 'center' }
                        ]}>
                            {this.state.map[i][j].by != undefined && this.state.map[i][j].t === "B" && <Image source={require('../Assets/bomb.svg')} style={{ position: 'absolute', marginLeft: 7, width: 40, height: 40 }} />}
                            {this.state.map[i][j].by != undefined && this.state.map[i][j].t === "N" && <Text style={{ position: 'absolute', fontWeight: '900', fontSize: 20, color: "#FFF" }}>
                                {this.state.map[i][j].n > 0 && this.state.map[i][j].n}
                            </Text>}
                        </View>
                    </Pressable>)}
                </View>))}
            </View>
            <View style={{ width: (this.state.length * 50) + 63, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <Pressable onPress={this.Left} style={[style.button, style.btnOrange]}>
                    <Text style={{ color: "#FFF", textAlign: 'center' }}>
                        <Ionicons name="md-arrow-back-outline" size={29} color="white" />
                    </Text>
                </Pressable>
            </View>
            <Modal
                style={[style.Modal]}
                ref={"winnerModal"}
                swipeToClose={false}
                onClosingState={this.onClosingState}
            >
                <View style={style.Modal}>
                    <View style={style.modalView}>
                        <Image source={require('../Assets/win.png')} style={{ width: 150, height: 150, margin: 'auto' }} />
                        <View style={{ padding: 15, marginBottom: 30 }}>
                            <Text style={[style.b, { fontSize: 25, marginBottom: 5, textAlign: 'center' }]}>{this.state.winner.name} برنده شد!</Text>
                            <Text style={[style.p, { fontSize: 18, textAlign: 'center' }]}>{this.state.winner.level}</Text>
                        </View>
                        <Pressable onPress={() => this.props.props.navigation.navigate("AutoMatch")} style={style.button}>
                            <Text style={[style.b, { color: "#FFF", textAlign: 'center', fontSize: 18 }]}>بازی دوباره</Text>
                        </Pressable>
                        <Pressable onPress={() => this.props.props.navigation.navigate("Home")} style={style.button}>
                            <Text style={[style.b, { color: "#FFF", textAlign: 'center', fontSize: 18 }]}>منوی اصلی</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    }
}

export default Game;