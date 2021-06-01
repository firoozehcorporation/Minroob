import { GetTableItemsOptions } from './models';
import { GameService } from '..';
export declare class Table {
    superThis: GameService;
    constructor(superThis: GameService);
    GetTableItems(tableId: String, isGlobal?: Boolean, options?: GetTableItemsOptions): Promise<object[]>;
    Aggrigation(aggrigation: object): void;
    GetTableItem(tableId: string, itemId: number, isGlobal?: boolean): Promise<object>;
    AddItemToTable(tableId: string, newItem: object): Promise<any>;
    UpdateTableItem(tableId: string, itemId: number, editedItem: object): Promise<object>;
    DeleteTableItem(tableId: string, itemId: number): Promise<boolean>;
    DeleteAllTableItems(tableId: string): Promise<boolean>;
}
