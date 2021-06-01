import { GameService } from '../../index';
export declare class Data {
    superThis: GameService;
    constructor(superThis: GameService);
    Head: number | undefined;
    ID: string | undefined;
    Data: string | undefined;
    Next: string | undefined;
    Outcomes: object | undefined;
    Private: boolean | undefined;
    private Cast;
    ToString(): string;
}
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
export declare class Outcome {
    private _Value;
    get Value(): number | undefined;
    set Value(value: number | undefined);
    private _Rank;
    get Rank(): number | undefined;
    set Rank(value: number | undefined);
}
