"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealTime = void 0;
const Consts_1 = require("../../../../Utils/Consts");
const models_1 = require("./models");
const models_2 = require("./models");
const ws_1 = __importDefault(require("ws"));
const Logger_1 = require("../../../../Utils/Logger");
const models_3 = require("../../RealTime/models");
const models_4 = require("../\u064FTurnBased/models");
class RealTime {
    constructor(superThis) {
        this.superThis = superThis;
        this.realtimeToken = BigInt(0);
        this.RoomID = "";
        this.ConnectHash = "";
        this.OnConnect = (e) => {
            Logger_1.Log("[RealTime]", "[onConnect]");
            // Send Auth pkt
            let payload = new models_2.AuthPayload();
            payload.RoomID = this.RoomID;
            payload.Token = this.superThis.Authentication.gameToken;
            payload.Hash = this.ConnectHash;
            let pkt = new models_2.Packet();
            pkt.Action = Consts_1.Actions.RealTime.ActionAuth;
            pkt.Payload = payload.ToBuffer();
            pkt.Send();
        };
        this.OnReceive = (event) => {
            var _a, _b;
            let packet = new models_2.Packet();
            packet.Deserialize(Buffer.from(event.data.toString(), "base64"));
            switch (packet.Action) {
                case Consts_1.Actions.RealTime.ActionAuth:
                    this.realtimeToken = packet.Token;
                    break;
                // case Actions.RealTime.ActionData:
                //     break
                case Consts_1.Actions.RealTime.ActionPublicMessage:
                    let msg = new models_1.Data();
                    msg.Deserialize(packet.Payload);
                    this.superThis.GSLive.RealTime.NewMessageReceived({
                        MessageInfo: {
                            MessageType: models_3.MessageType[packet.Action],
                            SendType: models_3.GProtocolSendType[packet.Type],
                            ClientReceiveTime: packet.ClientSendTime,
                        },
                        Message: msg.Export(),
                    });
                    break;
                case Consts_1.Actions.RealTime.ActionPrivateMessage:
                    let msgPrv = new models_1.Data();
                    msgPrv.Deserialize(packet.Payload);
                    this.superThis.GSLive.RealTime.NewMessageReceived({
                        MessageInfo: {
                            MessageType: models_3.MessageType[packet.Action],
                            SendType: models_3.GProtocolSendType[packet.Type],
                            ClientReceiveTime: packet.ClientSendTime,
                        },
                        Message: msgPrv.Export(),
                    });
                    break;
                case Consts_1.Actions.RealTime.ActionJoin:
                    let payload = new models_1.JoinPayload();
                    payload.Parse(JSON.parse(models_2.BufferToString(packet.Payload)));
                    this.superThis.GSLive.RealTime.OnJoinedRoom(payload.Export());
                    break;
                case Consts_1.Actions.RealTime.ActionMembersDetail:
                    let members = JSON.parse(models_2.BufferToString(packet.Payload));
                    this.superThis.GSLive.RealTime.RoomMembersDetailReceived(members);
                    break;
                case Consts_1.Actions.RealTime.ActionLeave:
                    let member = JSON.parse(models_2.BufferToString(packet.Payload));
                    this.superThis.GSLive.RealTime.OnLeaveRoom(member);
                    if (member.user.isMe) {
                        (_a = RealTime.Connection) === null || _a === void 0 ? void 0 : _a.close();
                        this.realtimeToken = BigInt(0);
                        this.ConnectHash = "";
                        this.RoomID = "";
                        RealTime.Connection = undefined;
                    }
                    break;
                // case Actions.RealTime.ActionDestroy:
                //     break
                // case Actions.RealTime.ActionStatus:
                //     break
                // case Actions.RealTime.ActionMirror:
                //     // Do Nothing
                //     break
                case Consts_1.Actions.RealTime.ActionEventMessage:
                    let evM = new models_1.Data();
                    evM.Deserialize(packet.Payload);
                    let ev = new models_3.EventPayload();
                    ev.Deserialize(evM.Payload);
                    this.superThis.GSLive.RealTime.OnPropertyEvent({
                        By: evM.SenderID,
                        Name: ev.Name,
                        Value: models_2.BufferToString(ev.Value),
                        Action: evM.GetExtra().Action,
                        Type: evM.GetExtra().Type,
                    });
                    break;
                // case Actions.RealTime.ActionGetRoomSnapshot:
                //     console.log("ActionGetRoomSnapshot", BufferToString(packet.Payload!))
                //     break
                // case Actions.RealTime.ActionObserver:
                //     break
                case Consts_1.Actions.RealTime.ActionRoomInfo:
                    let roomInfoS = JSON.parse(models_2.BufferToString(packet.Payload));
                    let roomInfo = new models_4.Room();
                    roomInfo.Parse(roomInfoS);
                    this.superThis.GSLive.RealTime.CurrentRoomInfoReceived(roomInfo.Export());
                    break;
                case Consts_1.Actions.Error:
                    console.error(`[Error] [Msg: ${(_b = packet.Payload) === null || _b === void 0 ? void 0 : _b.toString()}]`);
                    break;
                default:
                    Logger_1.Log("[RealTime]", `[OnReceive]: ${packet.ToString()}`);
            }
        };
        this.onDisconnect = (event) => {
            if (event.wasClean) {
                Logger_1.Log("[RealTime]", `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
            }
            else {
                // e.g. server process killed or network down event.code is usually 1006 in this case
                Logger_1.Log("[RealTime]", '[close] Connection died');
            }
            this.realtimeToken = BigInt(0);
            this.ConnectHash = "";
        };
    }
    Initilize(RoomID, ConnectHash, Endpoint, Port) {
        Logger_1.Log("[RealTime]", `[Connecting] [${RoomID}] [ws://${Endpoint}:${Port}]`);
        this.RoomID = RoomID;
        this.ConnectHash = ConnectHash;
        RealTime.Connection = new ws_1.default(`ws://${Endpoint}:${Port}`);
        RealTime.Connection.binaryType = "arraybuffer";
        RealTime.Connection.onopen = this.OnConnect;
        RealTime.Connection.onmessage = this.OnReceive;
        RealTime.Connection.onclose = this.onDisconnect;
        RealTime.Connection.onerror = function (error) {
            throw error;
        };
    }
}
exports.RealTime = RealTime;
RealTime.Connection = undefined;
