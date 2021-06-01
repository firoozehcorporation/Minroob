import { GameService } from '../../../index';
import nWebSocket from 'ws';
export declare class Command {
    superThis: GameService;
    constructor(superThis: GameService);
    commandToken: string;
    isInAutoMatchQueue: boolean;
    Initilize(): void;
    protected OnConnect: (e: nWebSocket.OpenEvent) => void;
    protected OnReceive: (event: nWebSocket.MessageEvent) => Promise<void>;
    private onDisconnect;
}
