import React, { Component } from "react";
import { View, Image, Text, Pressable } from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import style from "../style";
import AsyncStorage from "@react-native-community/async-storage";
import Loading from "../Components/Loading";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        console.log(this.props)
        AsyncStorage.getItem("userToken", async (err, res) => {
            if (err) {
                this.setState({ loading: false })
                throw err;
            }
            if (res) {
                console.log("[userToken]", res)
                await this.props.sdk.Authentication.LoginWithToken(res);
                this.props.props.navigation.navigate("Home");
            }
            this.setState({ loading: false })
        })
    }

    Submit = async () => {
        let { email, password } = this.state;
        this.setState({ loading: true })
        try {
            let token = await this.props.sdk.Authentication.Login(email, password);
            await AsyncStorage.setItem('userToken', token);
            this.props.props.navigation.navigate("Home");
            this.setState({ loading: false })
        } catch (e) {
            console.error(e);
            this.setState({ loading: false })
        }
    }

    render() {
        return <View style={style.page}>
            {this.state.loading ?
                <Loading />
                :
                <View style={{
                    maxWidth: 500,
                    width: '70%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 20
                }}>
                    <Text style={[style.b, { fontSize: 18, margin: 20 }]}>ورود به حساب کاربری</Text>

                    <TextInput
                        style={style.textInput}
                        placeholder="ایمیل"
                        value={this.state.email}
                        textContentType="emailAddress"
                        onChange={e => this.setState({ email: e.target.value })}
                    />

                    <TextInput
                        style={style.textInput}
                        placeholder="رمز عبور"
                        textContentType="password"
                        value={this.state.password}
                        onChange={e => this.setState({ password: e.target.value })}
                    />

                    <Pressable onPress={this.Submit} style={style.button}>
                        <Text style={[style.b, { color: "#FFF", textAlign: 'center', fontSize: 18 }]}>
                            {this.state.isRegister ? "ثبت نام" : "ورود"}
                        </Text>
                    </Pressable>
                </View>
            }
        </View>
    }
}

export default Login;