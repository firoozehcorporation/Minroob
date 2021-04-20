import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import style from "../style";

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            map: new Array(length).fill("").map(() => new Array(length).fill("")),
            numOfMines: 10,
            length: 8,
            turn: undefined,
            playerA: { id: 1, color: "#ef5350", score: 0, name: "علیرضا قدرتی", level: "مینچی کوچک" },
            playerB: { id: 2, color: "#03A9F4", score: 0, name: "امیر رستگار", level: "مین استوار" }
        };
    }

    componentDidMount() {
        this.initialMap();
    }

    initialMap = () => {
        let map = new Array(this.state.length).fill({}).map(() => new Array(this.state.length).fill({}));
        for (let i = 0; i < this.state.numOfMines; i++) {
            let x = Math.floor(Math.random() * this.state.length);
            let y = Math.floor(Math.random() * this.state.length);
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

        this.setState({ map, turn: this.state.playerA.id });
    }
    select = (i, j) => {
        let { map } = this.state;
        map[i][j].selected = true;
        map[i][j].selector = this.state.turn;
        if (map[i][j].numOfAroundBombs < 1) this.expand(i, j);
        if (map[i][j].type != "bomb")
            if (this.state.turn == this.state.playerA.id)
                this.setState({ turn: this.state.playerB.id })
            else
                this.setState({ turn: this.state.playerA.id })
        else
            if (this.state.turn == this.state.playerA.id)
                this.setState({ playerA: { ...this.state.playerA, score: this.state.playerA.score + 1 } })
            else
                this.setState({ playerB: { ...this.state.playerB, score: this.state.playerB.score + 1 } })

        this.setState({ map });
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
                    {this.state.turn == this.state.playerA.id && <Image source={require('../Assets/turn-mark.png')} style={{ width: 30, height: 30, margin: 20 }} />}
                </View>
                <View style={[style.playerBox, { borderColor: this.state.playerB.color, borderRightWidth: 5, }]}>
                    {this.state.turn == this.state.playerB.id && <Image source={require('../Assets/turn-mark.png')} style={{ width: 30, height: 30, margin: 20 }} />}
                    <View>
                        <Text style={[style.b, { fontSize: 18 }]}>{this.state.playerB.name}</Text>
                        <Text style={[style.p, {}]}>{this.state.playerB.level}</Text>
                        <Text style={[style.p, {}]}>{(this.state.playerB.score).toLocaleString("fa-IR")} امتیاز</Text>
                    </View>
                </View>
            </View>
            <View style={style.map}>
                {this.state.map.map((row, i) => (<View key={`${i}`} style={style.mapRow}>
                    {row.map((col, j) => <View key={`${i} ${j}`} onClick={() => { this.select(i, j) }}>
                        <View style={[
                            style.tile,
                            this.state.map[i][j].selected && this.state.map[i][j].type === "none" && { backgroundColor: "#6D4C41" },
                            this.state.map[i][j].selected && this.state.map[i][j].type === "bomb" && this.state.map[i][j].selector == this.state.playerA.id && { backgroundColor: "#ef5350" },
                            this.state.map[i][j].selected && this.state.map[i][j].type === "bomb" && this.state.map[i][j].selector == this.state.playerB.id && { backgroundColor: "#03A9F4" },
                            { display: 'flex', alignItems: 'center', justifyContent: 'center' }
                        ]}>
                            {this.state.map[i][j].selected && this.state.map[i][j].type === "bomb" && <Image source={require('../Assets/bomb.svg')} style={{ position: 'absolute', marginLeft: 7, width: 40, height: 40 }} />}
                            {this.state.map[i][j].selected && this.state.map[i][j].type === "none" && <Text style={{ position: 'absolute', fontWeight: '900', fontSize: 20, color: "#FFF" }}>
                                {this.state.map[i][j].numOfAroundBombs > 0 && this.state.map[i][j].numOfAroundBombs}
                            </Text>}
                        </View>
                    </View>)}
                </View>))}
            </View>
        </View>
    }
}

export default Game;