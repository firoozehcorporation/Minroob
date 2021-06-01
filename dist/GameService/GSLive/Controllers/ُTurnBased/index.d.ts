import { GameService } from '../../../index';
import nWebSocket from 'ws';
export declare class TurnBased {
    superThis: GameService;
    constructor(superThis: GameService);
    turnbasedToken: string;
    RoomID: string;
    static Connection: nWebSocket | WebSocket | undefined;
    Initilize(RoomID: string, Endpoint: string, Port: number): void;
    protected OnConnect: (e: nWebSocket.OpenEvent) => void;
    protected OnReceive: (event: nWebSocket.MessageEvent) => void;
    private onDisconnect;
}
