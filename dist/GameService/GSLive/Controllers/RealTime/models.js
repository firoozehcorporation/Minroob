"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinPayload = exports.AuthPayload = exports.BufferToString = exports.StringToBuffer = exports.Operations = exports.Types = exports.Data = exports.Packet = void 0;
const _1 = require(".");
const models_1 = require("../\u064FTurnBased/models");
class Packet {
    constructor() {
        this._Token = BigInt(0);
        // 0 -> unReliable, 1 -> Reliable
        this._Type = 0;
        this.Send = () => {
            let serilized = this.Serialize();
            if (_1.RealTime.Connection.readyState)
                _1.RealTime.Connection.send(serilized, { binary: true, compress: false });
        };
    }
    get Action() {
        return this._Action;
    }
    set Action(value) {
        if (value > 255)
            value = 255;
        this._Action = value;
    }
    get Token() {
        return this._Token;
    }
    set Token(value) {
        this._Token = value;
    }
    get Type() {
        return this._Type;
    }
    set Type(value) {
        if (value > 255)
            value = 255;
        this._Type = value;
    }
    Cast() {
        return {
            "1": this.Action,
            "2": BufferToString(this.Payload),
            "3": Number(this.Token),
            "4": this.Type,
            "5": this.ClientSendTime
        };
    }
    ToString() {
        return JSON.stringify(this.Cast());
    }
    Parse(inputJ) {
        this.Action = inputJ["1"];
        this.Payload = inputJ["2"];
        this.Token = inputJ["3"];
        this.Type = inputJ["4"];
        this.ClientSendTime = inputJ["5"];
    }
    Serialize() {
        var _a;
        let havePayload = 0x0;
        let haveClientSendTime = 0x0;
        if (this.Payload)
            havePayload = 0x1;
        if (this.ClientSendTime)
            haveClientSendTime = 0x1;
        let source = [this.Action, haveClientSendTime, havePayload];
        if (havePayload === 0x1) {
            let t = Buffer.alloc(2);
            t.writeUInt16LE((_a = this.Payload) === null || _a === void 0 ? void 0 : _a.length);
            source = [...source, ...t.valueOf()];
        }
        source.push(this.Type);
        let t = Buffer.alloc(8);
        t.writeBigUInt64LE(this.Token);
        source = [...source, ...t.valueOf()];
        if (havePayload === 0x1)
            source = [...source, ...this.Payload];
        if (haveClientSendTime === 0x1) {
            let t = Buffer.alloc(8);
            t.writeBigInt64LE(BigInt(this.ClientSendTime));
            source = [...source, ...t.valueOf()];
        }
        return new Uint8Array(source);
    }
    Deserialize(input) {
        let buff = Buffer.from(input);
        let offset = 0;
        let haveClientSendTime = 0x0;
        let havePayload = 0x0;
        let payloadLen = 0x0;
        this.Action = buff.readUInt8(offset++);
        haveClientSendTime = buff.readUInt8(offset++);
        havePayload = buff.readUInt8(offset++);
        if (havePayload > 0) {
            payloadLen = buff.readUInt16LE(offset);
            offset += 2;
        }
        this.Type = buff.readUInt8(offset++);
        this.Token = buff.readBigUInt64LE(offset);
        offset += 8;
        if (havePayload > 0) {
            this.Payload = buff.slice(offset, offset + payloadLen);
            offset += payloadLen;
        }
        if (haveClientSendTime > 0) {
            this.ClientSendTime = Number(buff.readBigInt64LE(offset));
        }
    }
}
exports.Packet = Packet;
class Data {
    constructor() {
        this._Extra = new Uint8Array();
    }
    get SenderID() {
        return this._SenderID;
    }
    set SenderID(value) {
        this._SenderID = value;
    }
    get ReceiverID() {
        return this._ReceiverID;
    }
    set ReceiverID(value) {
        this._ReceiverID = value;
    }
    get Payload() {
        return this._Payload;
    }
    set Payload(value) {
        this._Payload = value;
    }
    GetExtra() {
        let b = Buffer.from(this._Extra);
        return {
            Type: b.readUInt8(),
            Action: b.readUInt8(1)
        };
    }
    SetExtra(type, action) {
        this._Extra = new Uint8Array([type, action]);
    }
    Cast() {
        return {
            "1": this.SenderID,
            "2": this.ReceiverID,
            "3": BufferToString(this.Payload),
            "4": this._Extra,
        };
    }
    Parse(inputJ) {
        this.SenderID = inputJ["1"];
        this.ReceiverID = inputJ["2"];
        this.Payload = inputJ["3"];
        this._Extra = inputJ["4"];
    }
    Export() {
        return {
            SenderID: this.SenderID,
            ReceiverID: this.ReceiverID,
            Payload: BufferToString(this.Payload),
            Extra: this.GetExtra(),
        };
    }
    Serialize() {
        var _a, _b;
        let haveSenderID = 0x0;
        let haveRecieverID = 0x0;
        let havePayload = 0x0;
        let haveExtra = 0x0;
        if (this.SenderID) {
            haveSenderID = 0x1;
        }
        if (this.ReceiverID) {
            haveRecieverID = 0x1;
        }
        if (this.Payload.length > 0) {
            havePayload = 0x1;
        }
        if (this._Extra) {
            haveExtra = 0x1;
        }
        let source = [haveSenderID, haveRecieverID, havePayload, haveExtra];
        let ReceiverIDBuff = StringToBuffer(this.ReceiverID);
        let SenderIDBuff = StringToBuffer(this.SenderID);
        if (haveSenderID > 0) {
            source.push(SenderIDBuff.length);
        }
        if (haveRecieverID > 0) {
            source.push(ReceiverIDBuff.length);
        }
        if (havePayload > 0) {
            let t = Buffer.alloc(2);
            t.writeUInt16LE((_a = this.Payload) === null || _a === void 0 ? void 0 : _a.length);
            source = [...source, ...t.valueOf()];
        }
        if (haveExtra > 0) {
            let t = Buffer.alloc(2);
            t.writeUInt16LE((_b = this._Extra) === null || _b === void 0 ? void 0 : _b.length);
            source = [...source, ...t.valueOf()];
        }
        if (haveSenderID > 0) {
            source = [...source, ...SenderIDBuff];
        }
        if (haveRecieverID > 0) {
            source = [...source, ...ReceiverIDBuff];
        }
        if (havePayload > 0) {
            source = [...source, ...this.Payload];
        }
        if (haveExtra > 0) {
            source = [...source, ...this._Extra];
        }
        return new Uint8Array(source);
    }
    Deserialize(input) {
        let buff = Buffer.from(input);
        let offset = 0;
        let senderLen = 0;
        let receiverLen = 0;
        let payloadLen = 0;
        let extraLen = 0;
        let haveSender = buff.readUInt8(offset++);
        let haveReceiver = buff.readUInt8(offset++);
        let havePayload = buff.readUInt8(offset++);
        let haveExtra = buff.readUInt8(offset++);
        if (haveSender > 0) {
            senderLen = buff.readUInt8(offset++);
        }
        if (haveReceiver > 0) {
            receiverLen = buff.readUInt8(offset++);
        }
        if (havePayload > 0) {
            payloadLen = buff.readUInt16LE(offset);
            offset += 2;
        }
        if (haveExtra > 0) {
            extraLen = buff.readUInt16LE(offset);
            offset += 2;
        }
        if (haveSender > 0) {
            this.SenderID = BufferToString(buff.slice(offset, offset + senderLen));
            offset += senderLen;
        }
        if (haveReceiver > 0) {
            this.ReceiverID = BufferToString(buff.slice(offset, offset + receiverLen));
            offset += receiverLen;
        }
        if (havePayload > 0) {
            this.Payload = buff.slice(offset, offset + payloadLen);
            offset += payloadLen;
        }
        if (haveExtra > 0) {
            this._Extra = buff.slice(offset, offset + extraLen);
            offset += extraLen;
        }
    }
}
exports.Data = Data;
var Types;
(function (Types) {
    Types[Types["Object"] = 1] = "Object";
    Types[Types["Function"] = 2] = "Function";
    Types[Types["Property"] = 3] = "Property";
})(Types = exports.Types || (exports.Types = {}));
var Operations;
(function (Operations) {
    Operations[Operations["SetMemberProperty"] = 2] = "SetMemberProperty";
    Operations[Operations["DelMemberProperty"] = 3] = "DelMemberProperty";
    Operations[Operations["SetRoomProperty"] = 0] = "SetRoomProperty";
    Operations[Operations["DelRoomProperty"] = 1] = "DelRoomProperty";
    Operations[Operations["BufferedFunction"] = 2] = "BufferedFunction";
    Operations[Operations["InstanceObject"] = 0] = "InstanceObject";
    Operations[Operations["DestroyObject"] = 1] = "DestroyObject";
})(Operations = exports.Operations || (exports.Operations = {}));
function StringToBuffer(str) {
    let string = unescape(encodeURIComponent(str)), charList = string.split(''), uintArray = [];
    for (var i = 0; i < charList.length; i++) {
        uintArray.push(charList[i].charCodeAt(0));
    }
    return new Uint8Array(uintArray);
}
exports.StringToBuffer = StringToBuffer;
function BufferToString(buff) {
    var encodedString = String.fromCharCode.apply(null, [].slice.call(buff)), decodedString = decodeURIComponent(escape(encodedString));
    return decodedString;
}
exports.BufferToString = BufferToString;
class AuthPayload {
    Cast() {
        return {
            "1": this.RoomID,
            "2": this.Token,
            "3": this.Hash
        };
    }
    Parse(inputJ) {
        this.RoomID = inputJ["1"];
        this.Token = inputJ["2"];
        this.Hash = inputJ["3"];
    }
    ToString() {
        return JSON.stringify(this.Cast());
    }
    ToBuffer() {
        return StringToBuffer(this.ToString());
    }
}
exports.AuthPayload = AuthPayload;
class JoinPayload {
    Cast() {
        return {
            "1": this.JoinType,
            "2": this.Room,
            "3": this.UserJoined,
            "4": this.JoinMemberOrder
        };
    }
    Parse(inputJ) {
        this.JoinType = inputJ["1"];
        let room = new models_1.Room();
        room.Parse(inputJ["2"]);
        this.Room = room.Export();
        this.UserJoined = inputJ["3"];
        this.JoinMemberOrder = inputJ["4"];
    }
    ToString() {
        return JSON.stringify(this.Cast());
    }
    ToBuffer() {
        return StringToBuffer(this.ToString());
    }
    Export() {
        return {
            JoinType: this.JoinType,
            Room: this.Room,
            UserJoined: this.UserJoined,
            JoinMemberOrder: this.JoinMemberOrder,
        };
    }
}
exports.JoinPayload = JoinPayload;
