import { Member } from '../../Player/models';
import { FriendData } from './models';
import { GameService } from '../..';
export declare class Friends {
    superThis: GameService;
    constructor(superThis: GameService);
    FindMembers(query: string, skip?: number, limit?: number): Promise<[number, Member[]]>;
    GetMyFriends(skip?: number, limit?: number): Promise<[number, Member[]]>;
    GetFriendRequests(skip?: number, limit?: number): Promise<[number, FriendData[]]>;
    SendFriendRequest(memberId: string): Promise<boolean>;
    AcceptFriendRequest(memberId: string): Promise<boolean>;
    DeleteFriend(memberId: string): Promise<boolean>;
}
