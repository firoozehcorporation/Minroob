import { Achievement } from './models';
import { GameService } from '..';
export declare class Achievements {
    superThis: GameService;
    constructor(superThis: GameService);
    GetAchievements(): Promise<Achievement[]>;
    Unlock(achievementid: string): Promise<Achievement>;
}
