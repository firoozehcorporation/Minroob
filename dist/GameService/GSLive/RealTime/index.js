"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealTime = void 0;
const Consts_1 = require("../../../Utils/Consts");
const models_1 = require("./models");
const models_2 = require("../Controllers/Command/models");
const models_3 = require("../Controllers/RealTime/models");
class RealTime {
    constructor(superThis) {
        this.superThis = superThis;
        // Event handlers
        this.OnReconnected = () => { };
        this.OnJoinedRoom = () => { };
        this.OnAutoMatchUpdated = () => { };
        this.OnAutoMatchCanceled = () => { };
        this.OnAvailableRoomsReceived = () => { };
        this.OnFindMemberReceived = () => { };
        this.OnInvitationSent = () => { };
        this.CurrentRoomInfoReceived = () => { };
        this.RoomMembersDetailReceived = () => { };
        this.NewMessageReceived = () => { };
        this.OnLeaveRoom = () => { };
        this.OnPropertyEvent = () => { };
    }
    // Functions
    CreateRoom(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.superThis.GSLive.Command.commandToken == "")
                throw "User not connected to Command Server";
            if (this.superThis.GSLive.RealTimeController.RoomID)
                throw "User is already in game room, please left from it first.";
            let data = new models_2.Data(this.superThis);
            data.SetMax(options.maxPlayer);
            data.SetMin(options.minPlayer);
            data.SetName(options.roomName);
            data.SetPassword(options.roomPassword);
            data.SetRole(options.role);
            data.SetPersist(options.isPersist);
            data.SetPrivate(options.isPrivate);
            data.SetExtra(options.extra);
            data.SetSyncMode(2);
            let pkt = new models_2.Packet(this.superThis);
            pkt.SetHead(Consts_1.Actions.Command.ActionCreateRoom);
            pkt.SetToken(this.superThis.GSLive.Command.commandToken);
            pkt.SetData(data.ToString());
            pkt.Send();
        });
    }
    AutoMatch(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.superThis.GSLive.Command.commandToken == "")
                throw "User not connected to Command Server";
            if (this.superThis.GSLive.Command.isInAutoMatchQueue)
                throw "User is in automatch queue already";
            if (this.superThis.GSLive.RealTimeController.RoomID)
                throw "User is already in game room, please left from it first.";
            let data = new models_2.Data(this.superThis);
            data.SetMax(options.maxPlayer);
            data.SetMin(options.minPlayer);
            data.SetRole(options.role);
            data.SetPersist(options.isPersist);
            data.SetExtra(options.extra);
            data.SetSyncMode(2);
            let pkt = new models_2.Packet(this.superThis);
            pkt.SetHead(Consts_1.Actions.Command.ActionAutoMatch);
            pkt.SetToken(this.superThis.GSLive.Command.commandToken);
            pkt.SetData(data.ToString());
            pkt.Send();
        });
    }
    CancelAutoMatch() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.superThis.GSLive.Command.commandToken == "")
                throw "User not connected to Command Server";
            if (!this.superThis.GSLive.Command.isInAutoMatchQueue)
                throw "User is not in automatch queue";
            let pkt = new models_2.Packet(this.superThis);
            pkt.SetHead(Consts_1.Actions.Command.LeftWaitingQ);
            pkt.SetToken(this.superThis.GSLive.Command.commandToken);
            pkt.Send();
        });
    }
    GetAvailableRooms(role, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.superThis.GSLive.Command.commandToken == "")
                throw "User not connected to Command Server";
            let data = new models_2.Data(this.superThis);
            data.SetMax(limit);
            data.SetRole(role);
            let pkt = new models_2.Packet(this.superThis);
            pkt.SetHead(Consts_1.Actions.Command.ActionGetRooms);
            pkt.SetToken(this.superThis.GSLive.Command.commandToken);
            pkt.SetData(data.ToString());
            pkt.Send();
        });
    }
    JoinRoom(roomID, extra = undefined, password = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.superThis.GSLive.Command.commandToken == "")
                throw "User not connected to Command Server";
            if (this.superThis.GSLive.RealTimeController.RoomID)
                throw "User is already in game room, please left from it first.";
            let data = new models_2.Data(this.superThis);
            data.SetID(roomID);
            data.SetExtra(extra);
            data.SetPassword(password);
            let pkt = new models_2.Packet(this.superThis);
            pkt.SetHead(Consts_1.Actions.Command.ActionJoinRoom);
            pkt.SetToken(this.superThis.GSLive.Command.commandToken);
            pkt.SetData(data.ToString());
            pkt.Send();
        });
    }
    FindMember(query, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.superThis.GSLive.Command.commandToken == "")
                throw "User not connected to Command Server";
            let data = new models_2.Data(this.superThis);
            data.SetUser(query);
            data.SetMax(limit);
            let pkt = new models_2.Packet(this.superThis);
            pkt.SetHead(Consts_1.Actions.Command.ActionFindUser);
            pkt.SetToken(this.superThis.GSLive.Command.commandToken);
            pkt.SetData(data.ToString());
            pkt.Send();
        });
    }
    InviteUser(roomID, userID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.superThis.GSLive.Command.commandToken == "")
                throw "User not connected to Command Server";
            let data = new models_2.Data(this.superThis);
            data.SetID(roomID);
            data.SetUser(userID);
            let pkt = new models_2.Packet(this.superThis);
            pkt.SetHead(Consts_1.Actions.Command.ActionInviteUser);
            pkt.SetToken(this.superThis.GSLive.Command.commandToken);
            pkt.SetData(data.ToString());
            pkt.Send();
        });
    }
    GetInviteInbox() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.superThis.GSLive.Command.commandToken == "")
                throw "User not connected to Command Server";
            let data = new models_2.Data(this.superThis);
            data.SetSyncMode(2);
            let pkt = new models_2.Packet(this.superThis);
            pkt.SetHead(Consts_1.Actions.Command.ActionGetInviteList);
            pkt.SetToken(this.superThis.GSLive.Command.commandToken);
            pkt.SetData(data.ToString());
            pkt.Send();
        });
    }
    AcceptInvite(inviteID, extra) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.superThis.GSLive.Command.commandToken == "")
                throw "User not connected to Command Server";
            if (this.superThis.GSLive.RealTimeController.RoomID)
                throw "User is already in game room, please left from it first.";
            let data = new models_2.Data(this.superThis);
            data.SetInvite(inviteID);
            data.SetExtra(extra);
            let pkt = new models_2.Packet(this.superThis);
            pkt.SetHead(Consts_1.Actions.Command.ActionAcceptInvite);
            pkt.SetToken(this.superThis.GSLive.Command.commandToken);
            pkt.SetData(data.ToString());
            pkt.Send();
        });
    }
    GetCurrentRoomInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.superThis.GSLive.RealTimeController.RoomID.length < 1)
                throw "User is not in any game room";
            let packet = new models_3.Packet();
            packet.Action = Consts_1.Actions.RealTime.ActionRoomInfo;
            packet.Token = this.superThis.GSLive.RealTimeController.realtimeToken;
            packet.Send();
        });
    }
    GetRoomMembersDetail() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.superThis.GSLive.RealTimeController.RoomID.length < 1)
                throw "User is not in any game room";
            let packet = new models_3.Packet();
            packet.Action = Consts_1.Actions.RealTime.ActionMembersDetail;
            packet.Token = this.superThis.GSLive.RealTimeController.realtimeToken;
            packet.Send();
        });
    }
    SendPublicMessage(data, sendType) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.superThis.GSLive.RealTimeController.RoomID.length < 1)
                throw "User is not in any game room";
            let packet = new models_3.Packet();
            packet.Action = Consts_1.Actions.RealTime.ActionPublicMessage;
            packet.Token = this.superThis.GSLive.RealTimeController.realtimeToken;
            packet.Type = sendType;
            packet.Payload = models_3.StringToBuffer(data);
            packet.Send();
        });
    }
    SendPrivateMessage(recieverID, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.superThis.GSLive.RealTimeController.RoomID.length < 1)
                throw "User is not in any game room";
            let payload = new models_3.Data();
            payload.ReceiverID = recieverID;
            payload.Payload = models_3.StringToBuffer(data);
            let packet = new models_3.Packet();
            packet.Action = Consts_1.Actions.RealTime.ActionPrivateMessage;
            packet.Token = this.superThis.GSLive.RealTimeController.realtimeToken;
            packet.Payload = payload.Serialize();
            packet.Send();
        });
    }
    SetOrUpdateMemberProperty(name, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.superThis.GSLive.RealTimeController.RoomID.length < 1)
                throw "User is not in any game room";
            let ev = new models_1.EventPayload();
            ev.Name = name;
            ev.Value = models_3.StringToBuffer(value);
            let payload = new models_3.Data();
            payload.Payload = ev.Serialize();
            let data = new models_3.Data();
            data.SetExtra(models_3.Types.Property, models_3.Operations.SetMemberProperty);
            data.Payload = ev.Serialize();
            let packet = new models_3.Packet();
            packet.Action = Consts_1.Actions.RealTime.ActionEventMessage;
            packet.Token = this.superThis.GSLive.RealTimeController.realtimeToken;
            packet.Payload = data.Serialize();
            packet.Send();
        });
    }
    RemoveMemberProperty(propertyName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.superThis.GSLive.RealTimeController.RoomID.length < 1)
                throw "User is not in any game room";
            let ev = new models_1.EventPayload();
            ev.Name = propertyName;
            let payload = new models_3.Data();
            payload.Payload = ev.Serialize();
            let data = new models_3.Data();
            data.SetExtra(models_3.Types.Property, models_3.Operations.DelMemberProperty);
            data.Payload = ev.Serialize();
            let packet = new models_3.Packet();
            packet.Action = Consts_1.Actions.RealTime.ActionEventMessage;
            packet.Token = this.superThis.GSLive.RealTimeController.realtimeToken;
            packet.Payload = data.Serialize();
            packet.Send();
        });
    }
    SetOrUpdateRoomProperty(name, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.superThis.GSLive.RealTimeController.RoomID.length < 1)
                throw "User is not in any game room";
            let ev = new models_1.EventPayload();
            ev.Name = name;
            ev.Value = models_3.StringToBuffer(value);
            let payload = new models_3.Data();
            payload.Payload = ev.Serialize();
            let data = new models_3.Data();
            data.SetExtra(models_3.Types.Property, models_3.Operations.SetRoomProperty);
            data.Payload = ev.Serialize();
            let packet = new models_3.Packet();
            packet.Action = Consts_1.Actions.RealTime.ActionEventMessage;
            packet.Token = this.superThis.GSLive.RealTimeController.realtimeToken;
            packet.Payload = data.Serialize();
            packet.Send();
        });
    }
    RemoveRoomProperty(propertyName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.superThis.GSLive.RealTimeController.RoomID.length < 1)
                throw "User is not in any game room";
            let ev = new models_1.EventPayload();
            ev.Name = propertyName;
            let payload = new models_3.Data();
            payload.Payload = ev.Serialize();
            let data = new models_3.Data();
            data.SetExtra(models_3.Types.Property, models_3.Operations.DelRoomProperty);
            data.Payload = ev.Serialize();
            let packet = new models_3.Packet();
            packet.Action = Consts_1.Actions.RealTime.ActionEventMessage;
            packet.Token = this.superThis.GSLive.RealTimeController.realtimeToken;
            packet.Payload = data.Serialize();
            packet.Send();
        });
    }
    GetRoomProperties() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.superThis.GSLive.RealTimeController.RoomID.length < 1)
                throw "User is not in any game room";
            let packet = new models_3.Packet();
            packet.Action = Consts_1.Actions.RealTime.ActionGetRoomSnapshot;
            packet.Token = this.superThis.GSLive.RealTimeController.realtimeToken;
            packet.Send();
        });
    }
    // public async GetRoomProperty(propertyName: string) {
    // }
    // public async GetMemberProperties(memberID: string) {
    // }
    // public async GetPropertyValues(propertyName: string) {
    // }
    // public async GetPropertyAndValueMembers(name: string, value: string) {
    // }
    // public async GetPropertyMembers(propertyName: string) {
    // }
    // public async GetRoomMembers() {
    // }
    LeaveRoom() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.superThis.GSLive.RealTimeController.RoomID.length < 1)
                throw "User is not in any game room";
            let packet = new models_3.Packet();
            packet.Action = Consts_1.Actions.RealTime.ActionLeave;
            packet.Token = this.superThis.GSLive.RealTimeController.realtimeToken;
            packet.Send();
        });
    }
}
exports.RealTime = RealTime;
