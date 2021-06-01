import { Authentication } from "./Authentication/index";
import { Assets } from "./Assets/index";
import { Leaderboards } from "./Leaderboards/index";
import { Achievements } from "./Achievements/index";
import { Player } from "./Player/index";
import { Save } from "./Save/index";
import { Table } from "./Table/index";
import { GSLive } from "./GSLive/index";
import { Social } from "./Social/index";
export declare class GameService {
    ClientID: string;
    ClientSecret: string;
    Verbose: boolean;
    constructor(clientId: string, clientSecret: string, Verbose?: boolean);
    IsAuthenticated(): boolean;
    IsCommandAvailabe(): boolean;
    Authentication: Authentication;
    Assets: Assets;
    Achievements: Achievements;
    Leaderboards: Leaderboards;
    Player: Player;
    Save: Save;
    Table: Table;
    GSLive: GSLive;
    Social: Social;
    onReady: Function;
}
