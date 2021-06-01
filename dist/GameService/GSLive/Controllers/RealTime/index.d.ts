import { GameService } from '../../../index';
import WebSocket from 'ws';
export declare class RealTime {
    superThis: GameService;
    constructor(superThis: GameService);
    realtimeToken: bigint;
    RoomID: string;
    ConnectHash: string;
    static Connection: WebSocket | undefined;
    Initilize(RoomID: string, ConnectHash: string, Endpoint: string, Port: number): void;
    protected OnConnect: (e: WebSocket.OpenEvent) => void;
    protected OnReceive: (event: WebSocket.MessageEvent) => void;
    private onDisconnect;
}
