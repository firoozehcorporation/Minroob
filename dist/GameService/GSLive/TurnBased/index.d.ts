import { GameService } from '../..';
import { PropertyType, CreateRoomOptions, AutoMatchOptions, Outcome } from './models';
import { PropertyChange } from '../Controllers/ُTurnBased/models';
import { Member } from '../../Player/models';
export declare class TurnBased {
    superThis: GameService;
    constructor(superThis: GameService);
    CreateRoom(options: CreateRoomOptions): Promise<void>;
    AutoMatch(options: AutoMatchOptions): Promise<void>;
    CancelAutoMatch(): Promise<void>;
    GetAvailableRooms(role: string, limit: number): Promise<void>;
    JoinRoom(roomID: string, extra?: string | undefined, password?: string | undefined): Promise<void>;
    FindMember(query: string, limit: number): Promise<void>;
    InviteUser(roomID: string, userID: string): Promise<void>;
    GetInviteInbox(): Promise<void>;
    AcceptInvite(inviteID: string, extra: string): Promise<void>;
    GetCurrentRoomInfo(): Promise<void>;
    GetRoomMembersDetail(): Promise<void>;
    ChooseNext(whoIsNext?: string | undefined): Promise<void>;
    TakeTurn(data: string | undefined, whoIsNext?: string | undefined): Promise<void>;
    GetCurrentTurnMember(): Promise<void>;
    Vote(outcomes: {
        [memberID: string]: Outcome;
    }): Promise<void>;
    AcceptVote(memberID: string): Promise<void>;
    SetOrUpdateProperty(type: PropertyType, data: {
        name: string;
        value: string;
    }): Promise<void>;
    RemoveProperty(type: PropertyType, name: string): Promise<void>;
    LeaveRoom(whoIsNext?: string | undefined): Promise<void>;
    OnReconnected: (sender: object, reconnectStatus: boolean) => void;
    OnJoinedRoom: (join: any) => void;
    OnAutoMatchUpdated: (e: any) => void;
    OnAutoMatchCanceled: (e: string) => void;
    OnAvailableRoomsReceived: (sender: object, e: object[]) => void;
    OnFindMemberReceived: (sender: object, e: object[]) => void;
    OnInvitationSent: (e: object) => void;
    OnInviteInboxReceived: (invites: object[]) => void;
    OnCurrentRoomInfoReceived: (roomData: any) => void;
    OnRoomMembersDetailReceived: (members: any[]) => void;
    OnChoosedNext: (whoIsNext: object) => void;
    OnTakeTurn: (sender: object, turn: object) => void;
    OnCurrentTurnMember: (currentMember: Member) => void;
    OnVoteReceived: (sender: object, vote: object) => void;
    OnComplete: (gameResult: object) => void;
    OnPropertyUpdated: (payload: PropertyChange) => void;
    OnLeaveRoom: (member: any) => void;
}
