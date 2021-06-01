export declare enum PropertyType {
    Room = "room",
    Member = "member"
}
export declare class CreateRoomOptions {
    constructor();
    roomName: string;
    role: string;
    minPlayer: number;
    maxPlayer: number;
    isPrivate: boolean;
    isPersist: boolean;
    extra: string | undefined;
    roomPassword: string | undefined;
}
export declare class AutoMatchOptions {
    constructor();
    role: string;
    minPlayer: number;
    maxPlayer: number;
    isPersist: boolean;
    extra: string | null;
}
export declare enum GProtocolSendType {
    UnReliable = 0,
    Reliable = 1
}
export declare enum MessageType {
    Private = 4,
    Public = 3
}
export declare class EventPayload {
    Name: string;
    Value: Uint8Array;
    Serialize(): Uint8Array;
    Deserialize(input: any): void;
    Export(): {
        Name: string;
        Value: string;
    };
}
