import { GameService } from '../..';
import { CreateRoomOptions, AutoMatchOptions, GProtocolSendType } from './models';
export declare class RealTime {
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
    SendPublicMessage(data: string, sendType: GProtocolSendType): Promise<void>;
    SendPrivateMessage(recieverID: string, data: string): Promise<void>;
    SetOrUpdateMemberProperty(name: string, value: string): Promise<void>;
    RemoveMemberProperty(propertyName: string): Promise<void>;
    SetOrUpdateRoomProperty(name: string, value: string): Promise<void>;
    RemoveRoomProperty(propertyName: string): Promise<void>;
    GetRoomProperties(): Promise<void>;
    LeaveRoom(): Promise<void>;
    OnReconnected: (sender: object, reconnectStatus: boolean) => void;
    OnJoinedRoom: (joinData: any) => void;
    OnAutoMatchUpdated: (e: any) => void;
    OnAutoMatchCanceled: (e: string) => void;
    OnAvailableRoomsReceived: (sender: object, e: object[]) => void;
    OnFindMemberReceived: (sender: object, e: object[]) => void;
    OnInvitationSent: (sender: object, e: object) => void;
    CurrentRoomInfoReceived: (roomData: any) => void;
    RoomMembersDetailReceived: (members: any[]) => void;
    NewMessageReceived: (event: any) => void;
    OnLeaveRoom: (member: any) => void;
    OnPropertyEvent: (PropertyUpdate: any) => void;
}
