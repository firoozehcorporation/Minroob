import { AssetInfoData } from './models';
import { GameService } from '../index';
export declare class Assets {
    superThis: GameService;
    constructor(superThis: GameService);
    GetAssetInfo(tag: string): Promise<AssetInfoData>;
}
