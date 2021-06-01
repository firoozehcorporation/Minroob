import React, { Component } from "react";
import style from "../style";
import { View, Image, Text, Pressable } from 'react-native';

class AutoMatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            queue: [],

            me: undefined,
            players: [],
            room: {}
        };
    }

    componentDidMount() {
        this.props.sdk.GSLive.TurnBased.AutoMatch({
            role: "default",
            maxPlayer: 2,
            minPlayer: 2,
            isPersist: false,
            extra: ""
        })

        this.props.sdk.GSLive.TurnBased.OnAutoMatchUpdated = (e) => {
            if (typeof e === "string")
                return console.log("[AutoMatch]", e);
            this.setState({ queue: e });
        }

        this.props.sdk.GSLive.TurnBased.OnJoinedRoom = (joinDetail) => {
            console.log("[OnJoinedRoom]", joinDetail)
            this.setState({
                players: [...this.state.players,
                joinDetail.Member],
                room: joinDetail.Room,
                ...(() => {
                    if (joinDetail.Member.user.isMe == true)
                        return { me: joinDetail.Member._id }
                })()
            }, () => {
                if (this.state.players.length === 2)
                    this.props.props.navigation.navigate("Game", {
                        players: this.state.players,
                        room: this.state.room,
                        me: this.state.me
                    })
            });
        }
    }

    render() {
        return <View style={style.page}>
            {this.state.loading ?
                <Loading />
                :
                <View style={{ maxWidth: 400, width: '80%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{
                        width: '100%',
                        position: 'absolute',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={[style.b, { fontSize: 20, marginBottom: 20 }]}>...در حال پیدا کردن همبازی...</Text>

                        {this.state.queue.map((user, inx) => <View key={user._id} style={inx % 2 == 0 ? style.redBox : style.blueBox}>
                            <Image source={user.logo} style={{ width: 55, height: 55, margin: 7, borderRadius: 50 }} />
                            <Text style={[style.b, { fontSize: 20, color: "white", fontWeight: 'bold' }]}>{user.name}</Text>
                        </View>)}
                    </View>
                </View>
            }
        </View>
    }
}

export default AutoMatch;