import { GameService } from '../index';
export declare class Authentication {
    superThis: GameService;
    userToken: string;
    gameToken: string;
    gameID: string;
    constructor(superThis: GameService);
    Login(Email: string, Password: string): Promise<string>;
    LoginWithToken(Token: string): Promise<void>;
    SignUp(NickName: string, Email: string, Password: string): Promise<string>;
    CheckSmsStatus(): Promise<boolean>;
    SendLoginCodeSms(PhoneNumber: string): Promise<boolean>;
    LoginOrSignUpWithSms(NickName: string, PhoneNumber: string, Code: string): Promise<string>;
    LoginAsGuest(): Promise<string>;
    private Start;
}
