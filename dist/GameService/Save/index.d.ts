import { SaveDetails } from './models';
import { GameService } from '..';
export declare class Save {
    superThis: GameService;
    constructor(superThis: GameService);
    Set(saveName: string, saveData: string | object): Promise<SaveDetails>;
    Get(saveName?: string): Promise<object | string>;
    Remove(saveName: string): Promise<boolean>;
}
