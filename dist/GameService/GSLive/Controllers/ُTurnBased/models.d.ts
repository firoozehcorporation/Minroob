import { GameService } from '../../../index';
import { Member } from "../../../Player/models";
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
export declare class Room {
    Parse(inputJ: any): void;
    private _ID;
    get ID(): string;
    set ID(value: string);
    private _Name;
    get Name(): string;
    set Name(value: string);
    private _Logo;
    get Logo(): string;
    set Logo(value: string);
    private _Creator;
    get Creator(): string;
    set Creator(value: string);
    private _Min;
    get Min(): number;
    set Min(value: number);
    private _Max;
    get Max(): number;
    set Max(value: number);
    private _Role;
    get Role(): string;
    set Role(value: string);
    private _Private;
    get Private(): boolean;
    set Private(value: boolean);
    private _Status;
    get Status(): number;
    set Status(value: number);
    private _NumOfMembers;
    get NumOfMembers(): number;
    set NumOfMembers(value: number);
    private _Variables;
    get Variables(): object;
    set Variables(value: object);
    private _Persist;
    get Persist(): boolean;
    set Persist(value: boolean);
    private _CreatedAt;
    get CreatedAt(): string;
    set CreatedAt(value: string);
    Export(): {
        ID: string;
        Name: string;
        Logo: string;
        Creator: string;
        Min: number;
        Max: number;
        Role: string;
        Private: boolean;
        Status: number;
        NumOfMembers: number;
        Variables: object;
        Persist: boolean;
        CreatedAt: string;
    };
    Cast(): {
        "1": string;
        "2": string;
        "3": string;
        "4": string;
        "5": number;
        "6": number;
        "7": string;
        "8": boolean;
        "9": number;
        "10": number;
        "11": object;
        "12": boolean;
        "13": string;
    };
    ToString(): string;
}
export declare class PropertyChange {
    Parse(inputJ: any): void;
    Type: string | undefined;
    Action: string | undefined;
    Sender: object | undefined;
    Name: string | undefined;
    Value: string | undefined;
    Export(): {
        Type: string | undefined;
        Action: string | undefined;
        Sender: object | undefined;
        Name: string | undefined;
        Value: string | undefined;
    };
}
export declare class JoinDetail {
    JoinType: number | undefined;
    Member: Member | undefined;
    Room: Room | undefined;
    JoinOrder: number | undefined;
    Parse(inputJ: any): void;
    Export(): {
        JoinType: number | undefined;
        Member: Member | undefined;
        Room: {
            ID: string;
            Name: string;
            Logo: string;
            Creator: string;
            Min: number;
            Max: number;
            Role: string;
            Private: boolean;
            Status: number;
            NumOfMembers: number;
            Variables: object;
            Persist: boolean;
            CreatedAt: string;
        } | undefined;
        JoinOrder: number | undefined;
    };
}
export declare class VoteDetail {
    Member: object | undefined;
    Outcomes: object | undefined;
    Parse(inputJ: any): void;
}
export declare class GameResult {
    AcceptCount: number | undefined;
    Outcome: object | undefined;
    Parse(inputJ: any): void;
}
