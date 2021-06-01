export declare class Packet {
    private _Action;
    get Action(): number | undefined;
    set Action(value: number | undefined);
    Payload: Uint8Array | undefined;
    private _Token;
    get Token(): bigint;
    set Token(value: bigint);
    private _Type;
    get Type(): number;
    set Type(value: number);
    ClientSendTime: number | undefined;
    Cast(): {
        "1": number | undefined;
        "2": string;
        "3": number;
        "4": number;
        "5": number | undefined;
    };
    ToString(): string;
    Parse(inputJ: any): void;
    Serialize(): Uint8Array;
    Deserialize(input: Uint8Array): void;
    Send: () => void;
}
export declare class Data {
    private _SenderID;
    get SenderID(): string | undefined;
    set SenderID(value: string | undefined);
    private _ReceiverID;
    get ReceiverID(): string | undefined;
    set ReceiverID(value: string | undefined);
    private _Payload;
    get Payload(): Uint8Array | undefined;
    set Payload(value: Uint8Array | undefined);
    private _Extra;
    GetExtra(): any;
    SetExtra(type: Types, action: Operations): void;
    Cast(): {
        "1": string | undefined;
        "2": string | undefined;
        "3": string;
        "4": Uint8Array;
    };
    Parse(inputJ: any): void;
    Export(): {
        SenderID: string | undefined;
        ReceiverID: string | undefined;
        Payload: string;
        Extra: any;
    };
    Serialize(): Uint8Array;
    Deserialize(input: Uint8Array): void;
}
export declare enum Types {
    Object = 1,
    Function = 2,
    Property = 3
}
export declare enum Operations {
    SetMemberProperty = 2,
    DelMemberProperty = 3,
    SetRoomProperty = 0,
    DelRoomProperty = 1,
    BufferedFunction = 2,
    InstanceObject = 0,
    DestroyObject = 1
}
export declare function StringToBuffer(str: string): Uint8Array;
export declare function BufferToString(buff: Uint8Array): string;
export declare class AuthPayload {
    RoomID: string | undefined;
    Token: string | undefined;
    Hash: string | undefined;
    Cast(): {
        "1": string | undefined;
        "2": string | undefined;
        "3": string | undefined;
    };
    Parse(inputJ: any): void;
    ToString(): string;
    ToBuffer(): Uint8Array;
}
export declare class JoinPayload {
    JoinType: number | undefined;
    Room: object | undefined;
    UserJoined: object | undefined;
    JoinMemberOrder: number | undefined;
    Cast(): {
        "1": number | undefined;
        "2": object | undefined;
        "3": object | undefined;
        "4": number | undefined;
    };
    Parse(inputJ: any): void;
    ToString(): string;
    ToBuffer(): Uint8Array;
    Export(): {
        JoinType: number | undefined;
        Room: object | undefined;
        UserJoined: object | undefined;
        JoinMemberOrder: number | undefined;
    };
}
