import { GameService } from '..';
import { Chats } from '../GSLive/Chats/index';
import { TurnBased } from '../GSLive/TurnBased/index';
import { RealTime } from '../GSLive/RealTime/index';
import { Command } from './Controllers/Command';
import { TurnBased as TurnbasedController } from './Controllers/ُTurnBased';
import { RealTime as RealTimeController } from './Controllers/RealTime';
import nWebSocket from 'ws';
export declare class GSLive {
    superThis: GameService;
    constructor(superThis: GameService);
    static CommandConnection: WebSocket | nWebSocket | undefined;
    IsCommandAvailable(): boolean;
    IsTurnBasedAvailable(): boolean;
    IsRealTimeAvailable(): boolean;
    GetPing(): number;
    Chats: Chats;
    TurnBased: TurnBased;
    RealTime: RealTime;
    Command: Command;
    TurnbasedController: TurnbasedController;
    RealTimeController: RealTimeController;
}
