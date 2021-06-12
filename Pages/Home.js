import React, { Component } from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import style from "../style";
import Modal from 'react-native-modalbox';
import Loading from "../Components/Loading";
import AsyncStorage from "@react-native-community/async-storage";
import { Ionicons } from '@expo/vector-icons';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            user: {},
            scores: []
        };
    }

    componentDidMount() {
        this.getUser();
    }

    getUser = async () => {
        try {
            let user = await this.props.sdk.Player.GetCurrentPlayer();
            await AsyncStorage.setItem("user", user);
            this.setState({ "user": user, loading: false });
        } catch (e) {
            console.error(e);
        }
    }

    getLeaderBoard = async () => {
        try {
            let result = await this.props.sdk.Leaderboards.GetLeaderBoardDetails("608829831530e0001945c39b", 0, 10);
            this.setState({ scores: result.scores });
            this.refs.leaderboardModal.open();
        } catch (e) {
            console.error(e);
        }
    }
    render() {
        return <View style={style.page}>
            {this.state.loading ?
                <Loading />
                :
                <View style={{ maxWidth: 500, width: '80%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{
                        width: '100%',
                        position: 'absolute',
                        top: 20,
                        display: 'flex',
                        flexDirection: 'row-reverse',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <View style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center' }}>
                            <Image source={require('../Assets/logo.png')} style={{ width: 50, height: 50 }} />
                            <Text style={[style.b, { fontSize: 28 }]}>مینروب</Text>
                        </View>
                        <Pressable onPress={() => { this.refs.userModal.open(); }} style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse', backgroundColor: 'white', borderRadius: 7, padding: 3, paddingLeft: 15, paddingRight: 7, borderBottomWidth: 5, borderStyle: 'solid', borderColor: "#BEBEBE" }}>
                            <Image source={this.state.user.logo} style={{ width: 40, height: 40, marginLeft: 7 }} />
                            <Text style={[style.b, { fontSize: 16 }]}>{this.state.user.name}</Text>
                        </Pressable>
                    </View>
                    <Pressable onPress={() => { this.props.props.navigation.navigate("AutoMatch") }} style={style.button}>
                        <Text style={[style.b, { color: "#FFF", textAlign: 'center', fontSize: 18 }]}>شروع بازی</Text>
                    </Pressable>
                    <Pressable onPress={() => { this.getLeaderBoard(); }} style={style.button}>
                        <Text style={[style.b, { color: "#FFF", textAlign: 'center', fontSize: 18 }]}>جدول امتیازات</Text>
                    </Pressable>
                    <Pressable onPress={() => { }} style={style.button}>
                        <Text style={[style.b, { color: "#FFF", textAlign: 'center', fontSize: 18 }]}>راهنما</Text>
                    </Pressable>
                </View>
            }
            <Modal
                style={[style.Modal]}
                ref={"userModal"}
                swipeToClose={true}
                onClosingState={this.onClosingState}
            >
                <View style={style.Modal}>
                    <View style={style.modalView}>
                        <View style={{ backgroundColor: "#EEE", borderRadius: '50%', margin: 'auto', padding: 5 }}>
                            <Image source={this.state.user.logo} style={{ width: 90, height: 90, backgroundColor: "#FAFAFA", borderRadius: '50%', margin: 'auto' }} />
                        </View>
                        <View style={{ padding: 15, marginBottom: 30 }}>
                            <Text style={[style.b, { fontSize: 25, marginBottom: 5, textAlign: 'center' }]}>{this.state.user.name}</Text>
                            <Text style={[style.p, { fontSize: 18, textAlign: 'center' }]}>مین بان</Text>
                        </View>

                        <Pressable onPress={() => { AsyncStorage.clear(); this.props.props.navigation.navigate("Login") }} style={[style.button, style.btnOrange]}>
                            <Text style={[style.b, { color: "#FFF", textAlign: 'center', fontSize: 18 }]}>خروج از حساب</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Modal
                style={[style.Modal]}
                ref={"leaderboardModal"}
                swipeToClose={true}
                onClosingState={this.onClosingState}
            >
                <View style={style.Modal}>
                    <View style={style.modalView}>
                        {this.state.scores.map(score => <View style={{ paddingBottom: 15, flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <Image source={`${score.member.logo}`} style={{ width: 60, height: 60, marginLeft: 15 }} />
                            <View>
                                <Text style={[style.p, { fontWeight: 'bold', fontSize: 16 }]}>{`${score.member.name}`}</Text>
                                <Text style={[style.p]}>{`${score.value} امتیاز - ${score.tries} بازی`}</Text>
                            </View>
                        </View>)}
                        <Pressable onPress={() => { }} style={[style.button, style.btnOrange]}>
                            <Text style={{ color: "#FFF", textAlign: 'center' }}>
                                <Ionicons name="md-arrow-back-outline" size={29} color="white" />
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    }
}

export default Home;