import { GameService } from '../../../index';
export declare class Packet {
    superThis: GameService;
    constructor(superThis: GameService);
    Parse(input: any): void;
    private Token;
    GetToken(): string | undefined;
    SetToken(Token: string): void;
    private Head;
    GetHead(): number | undefined;
    SetHead(Head: number): void;
    private Data;
    GetData(): string | undefined;
    SetData(Data: string): void;
    private Msg;
    GetMsg(): string | undefined;
    SetMsg(Msg: string): void;
    private Cast;
    ToString(): string;
    Send: () => void;
}
export declare class Payload {
    superThis: GameService;
    constructor(superThis: GameService);
    private GameID;
    GetGameID(): string | undefined;
    SetGameID(GameID: string): void;
    private Token;
    GetToken(): string | undefined;
    SetToken(Token: string): void;
    private Cast;
    ToString(): string;
}
export declare class Data {
    superThis: GameService;
    constructor(superThis: GameService);
    private ID;
    GetID(): string | undefined;
    SetID(ID: string): void;
    private User;
    GetUser(): string | undefined;
    SetUser(User: string): void;
    private Invite;
    GetInvite(): string | undefined;
    SetInvite(Invite: string): void;
    private Name;
    GetName(): string | undefined;
    SetName(Name: string): void;
    private Head;
    GetHead(): string | undefined;
    SetHead(Head: string): void;
    private Min;
    GetMin(): number | undefined;
    SetMin(Min: number): void;
    private Max;
    GetMax(): number | undefined;
    SetMax(Max: number): void;
    private SyncMode;
    GetSyncMode(): number | undefined;
    SetSyncMode(SyncMode: number): void;
    private Role;
    GetRole(): string | undefined;
    SetRole(Role: string): void;
    private Private;
    GetPrivate(): boolean | undefined;
    SetPrivate(Private: boolean): void;
    private Persist;
    GetPersist(): boolean | undefined;
    SetPersist(Persist: boolean): void;
    private Extra;
    GetExtra(): string | undefined;
    SetExtra(Extra: string): void;
    private Password;
    GetPassword(): string | undefined;
    SetPassword(Password: string): void;
    Parse(inputJ: any): void;
    Export(): {
        ID: string | undefined;
        User: string | undefined;
        Invite: string | undefined;
        Name: string | undefined;
        Head: string | undefined;
        Min: number | undefined;
        Max: number | undefined;
        SyncMode: number | undefined;
        Role: string | undefined;
        Private: boolean | undefined;
        Persist: boolean | undefined;
        Extra: string | undefined;
        Password: string | undefined;
    };
    private Cast;
    ToString(): string;
}
export declare class StartGame {
    MemerID: string | undefined;
    Area: Area | undefined;
    Room: any | undefined;
    parse(inputS: string): void;
    cast(): object;
    toString(): string;
}
export declare class Area {
    Endpoint: string;
    Protocol: string | undefined;
    Port: number;
    Token: string | undefined;
    PublicKey: string | undefined;
    Hash: string | undefined;
    parse(inputS: string): void;
    cast(): object;
    toString(): string;
}
