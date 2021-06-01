import { GameService } from '../../index';
export declare class Message {
    superThis: GameService;
    constructor(superThis: GameService);
    private IsPrivate;
    GetIsPrivate(): boolean | undefined;
    SetIsPrivate(IsPrivate: boolean): void;
    private To;
    GetTo(): string | undefined;
    SetTo(To: string): void;
    private From;
    GetFrom(): object | undefined;
    SetFrom(From: object): void;
    private Text;
    GetText(): string | undefined;
    SetText(Text: string): void;
    private Time;
    GetTime(): number | undefined;
    SetTime(Time: number): void;
    private Channel;
    GetChannel(): string | undefined;
    SetChannel(Channel: string): void;
    private Cast;
    Parse(input: any): void;
    ToString(): string;
}
