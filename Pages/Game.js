import React, { Component } from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import style from "../style";
import Modal from 'react-native-modalbox';
import { Ionicons } from '@expo/vector-icons';

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
            playerB: { ...this.props.props.route.params.players[1], level: "مین استوار", score: 0, color: "#03A9F4", },
            winner: {},
            freeze: false
        };
    }

    componentDidMount() {
        this.getCurrentTurn();
        this.initialMap();

        this.props.sdk.GSLive.TurnBased.OnCurrentTurnMember = async(currentTurn) => {
            console.log("[currentTurn]", currentTurn._id, "[Me]", this.state.me);
            if (currentTurn._id == this.state.me)
                this.props.sdk.GSLive.TurnBased.TakeTurn(`1|${JSON.stringify(this.initialMap())}`)

            this.setState({ turn: currentTurn._id });

            await this.props.sdk.GSLive.TurnBased.Vote({
                [this.state.playerA._id]: { Rank:  2, Value: 8 },
                [this.state.playerB._id]: { Rank:  1, Value: 10 },
            })
        }

        this.props.sdk.GSLive.TurnBased.OnTakeTurn = (sender, turn) => {
            let [action, alpa, beta] = turn.split("|");

            if (action == 1) {
                this.setState({ map: JSON.parse(alpa) });
                console.log(this.state.map)
            }
            if (action == 2) {
                // console.log("[OnTakeTurn]", { sender, turn }, alpa, beta);
                this.action(sender._id, parseInt(alpa), parseInt(beta));
            }
        }

        this.props.sdk.GSLive.TurnBased.OnChoosedNext = (who) => {
            console.log("[currentTurn-a]", who._id, "[Me]", this.state.me)
            this.setState({ turn: who._id });
        }

        this.props.sdk.GSLive.TurnBased.OnLeaveRoom = member => {
            console.log("[onLeft]", member._id, member._id == this.state.me)
            if (member._id == this.state.me)
                this.props.props.navigation.navigate("Home")
        }

        this.props.sdk.GSLive.TurnBased.OnVoteReceived = (sender, vote) => {
            console.log("[OnVoteReceived]", { sender, vote });

            this.props.sdk.GSLive.TurnBased.AcceptVote(sender._id)
        }

        this.props.sdk.GSLive.TurnBased.OnComplete = (result) => {
            console.log("[OnComplete]", { result });
        }
    }

    getCurrentTurn = async () => {
        this.props.sdk.GSLive.TurnBased.GetCurrentTurnMember()
    }

    initialMap = () => {
        let map = new Array(this.state.length).fill({}).map(() => new Array(this.state.length).fill({}));
        for (let i = 0; i <= this.state.numOfMines; i++) {
            let x = Math.floor(Math.random() * this.state.length);
            let y = Math.floor(Math.random() * this.state.length);
            if (map[x][y] && map[x][y].type == "bomb") { i++; continue; }
            map[x][y] = { type: "bomb", selected: false, selector: undefined };
        }

        for (let i = 0; i < this.state.length; i++) {
            for (let j = 0; j < this.state.length; j++) {
                if (map[i][j].type != "bomb") map[i][j] = {
                    type: "none",
                    selected: false,
                    selector: undefined,
                    numOfAroundBombs: 0
                };
            }
        }
        for (let i = 0; i < this.state.length; i++) {
            for (let j = 0; j < this.state.length; j++) {
                if (map[i][j].type != "bomb") map[i][j].numOfAroundBombs = this.getAroundBombs(map, i, j)
            }
        }

        return map;
    }

    select = async (i, j) => {
        if (
            this.state.winner._id != undefined
            ||
            this.state.map[i][j].selected
            ||
            this.state.freeze)
            return
        if (this.state.me != this.state.turn)
            return console.error(`T: ${this.state.turn} != M: ${this.state.me}`)

        this.setState({ freeze: true }, async () => {
            await this.props.sdk.GSLive.TurnBased.TakeTurn(`2|${i}|${j}`, (() => {
                if (this.state.playerA._id == this.state.me)
                    return this.state.playerB._id;
                return this.state.playerA._id;
            })())
        })
    }

    action = async (sender, i, j) => {
        let { map, playerA, playerB } = this.state;

        map[i][j].selected = true;
        map[i][j].selector = sender;

        // after ack
        if (map[i][j].numOfAroundBombs < 1) this.expand(i, j);
        if (map[i][j].type == "bomb") {
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
                //     this.setState({ winner: playerB, winnerModal: true });
                //     this.refs.winnerModal.open()
                await this.props.sdk.GSLive.TurnBased.Vote({
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
                    !map[x + i][y + j].selected &&
                    map[x + i][y + j].type != "bomb"
                ) {
                    map[x + i][y + j].selected = true;
                    map[x + i][y + j].selector = this.state.turn;
                    if (map[x + i][y + j].numOfAroundBombs < 1)
                        this.expand(x + i, y + j);
                }
            }
        }

        this.setState({ map });
    }

    Left = async () => {
        this.props.sdk.GSLive.TurnBased.LeaveRoom();
    }

    getAroundBombs = (map, x, y) => {
        let numOfAroundBombs = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (
                    x + i > -1 &&
                    y + j > -1 &&
                    x + i < this.state.length &&
                    y + j < this.state.length &&
                    map[x + i][y + j].type == "bomb"
                )
                    numOfAroundBombs++;
            }
        }
        return numOfAroundBombs;
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
                            this.state.map[i][j].selected && this.state.map[i][j].type === "none" && { backgroundColor: "#6D4C41" },
                            this.state.map[i][j].selected && this.state.map[i][j].type === "bomb" && {
                                backgroundColor: (() => {
                                    if (this.state.map[i][j].selector == this.state.playerA._id)
                                        return this.state.playerA.color
                                    return this.state.playerB.color
                                })()
                            },
                            { display: 'flex', alignItems: 'center', justifyContent: 'center' }
                        ]}>
                            {this.state.map[i][j].selected && this.state.map[i][j].type === "bomb" && <Image source={require('../Assets/bomb.svg')} style={{ position: 'absolute', marginLeft: 7, width: 40, height: 40 }} />}
                            {this.state.map[i][j].selected && this.state.map[i][j].type === "none" && <Text style={{ position: 'absolute', fontWeight: '900', fontSize: 20, color: "#FFF" }}>
                                {this.state.map[i][j].numOfAroundBombs > 0 && this.state.map[i][j].numOfAroundBombs}
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
                        <Pressable onPress={() => { }} style={style.button}>
                            <Text style={[style.b, { color: "#FFF", textAlign: 'center', fontSize: 18 }]}>بازی دوباره</Text>
                        </Pressable>
                        <Pressable onPress={() => { }} style={style.button}>
                            <Text style={[style.b, { color: "#FFF", textAlign: 'center', fontSize: 18 }]}>منوی اصلی</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    }
}

export default Game;