import { GameService } from '../..';
export declare class Chats {
    superThis: GameService;
    constructor(superThis: GameService);
    SubscribeChannel(channelName: string): Promise<void>;
    OnSubscribeChannel: (channelName: string) => void;
    SendChannelMessage(channelName: string, message: string): Promise<void>;
    SendPrivateMessage(memberID: string, message: string): Promise<void>;
    OnChatReceived: (channelName: string, sender: object, message: string, isPrivate: boolean) => void;
    GetChannelsSubscribed(): Promise<void>;
    ChannelsSubscribed: (channels: object[]) => void;
    GetChannelRecentMessages(channelName: string): Promise<void>;
    ChannelsRecentMessages: (messages: object[]) => void;
    GetChannelMembers(channelName: string, skip?: number, limit?: number): Promise<void>;
    ChannelMembers: (members: object[]) => void;
    GetPendingMessages(): Promise<void>;
    PendingMessages: (pendingMessages: object[]) => void;
    UnSubscribeChannel(channelName: string): Promise<void>;
    OnUnSubscribeChannel: Function;
}
