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

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    Submit = async () => {
        let { email, name, password, isRegister } = this.state;

        if (isRegister && (!name || name.length < 3 || name.length > 12))
            return this.setState({ error: "نام کاربر باید ۳ تا ۱۲ کاراکتر باشد" })
        if (!password || password.length < 3 || password.length > 32)
            return this.setState({ error: "رمز عبور باید ۳ تا ۱۲ کاراکتر باشد" })

        if (!this.validateEmail(email))
            return this.setState({ error: "ایمیل وارد شده صحیح نیست" })

        this.setState({ loading: true });
        try {
            let token;
            if (isRegister)
                token = await this.props.sdk.Authentication.SignUp(name, email, password);
            else
                token = await this.props.sdk.Authentication.Login(email, password);
            await AsyncStorage.setItem('userToken', token);
            this.props.props.navigation.navigate("Home");
            this.setState({ loading: false, error: undefined })
        } catch (e) {
            console.error(e);
            this.setState({ loading: false, error: undefined })
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
                    <Image source={require('../Assets/logo.png')} style={{ width: 150, height: 150 }} />
                    <Text style={[style.b, { fontSize: 26, margin: 20 }]}>مینروب آنلاین</Text>

                    {this.state.error && <Text style={[style.p, { fontSize: 16, margin: 20, color: "#D81B60" }]}>{this.state.error}</Text>}

                    {this.state.isRegister && <TextInput
                        style={style.textInput}
                        placeholder="نام کاربر"
                        value={this.state.name}
                        textContentType="nickname"
                        onChange={e => this.setState({ name: e.target.value })}
                    />}

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
                    <Pressable onPress={() => this.setState({ isRegister: !this.state.isRegister })} style={style.buttonSec}>
                        <Text style={[style.b, { color: "#424242", textAlign: 'center', fontSize: 16 }]}>
                            {this.state.isRegister ? "حساب کاربری دارم!" : "حساب ندارم! ساخت حساب"}
                        </Text>
                    </Pressable>
                    <Image source={require('../Assets/gameservice.png')} style={{ width: 150, height: 30 }} />

                </View>
            }
        </View>
    }
}

export default Login;