"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventPayload = exports.MessageType = exports.GProtocolSendType = exports.AutoMatchOptions = exports.CreateRoomOptions = exports.PropertyType = void 0;
const models_1 = require("../Controllers/RealTime/models");
var PropertyType;
(function (PropertyType) {
    PropertyType["Room"] = "room";
    PropertyType["Member"] = "member";
})(PropertyType = exports.PropertyType || (exports.PropertyType = {}));
class CreateRoomOptions {
    constructor() {
        this.roomName = "default";
        this.role = "default";
        this.minPlayer = 2;
        this.maxPlayer = 2;
        this.isPrivate = false;
        this.isPersist = false;
        this.role = "default";
        this.minPlayer = 2;
        this.maxPlayer = 2;
        this.isPersist = false;
        this.extra = undefined;
        this.isPrivate = false;
        this.roomPassword = undefined;
        this.roomName = "default";
    }
}
exports.CreateRoomOptions = CreateRoomOptions;
class AutoMatchOptions {
    constructor() {
        this.role = "default";
        this.minPlayer = 2;
        this.maxPlayer = 2;
        this.isPersist = false;
        this.role = "default";
        this.minPlayer = 2;
        this.maxPlayer = 2;
        this.isPersist = false;
        this.extra = null;
    }
}
exports.AutoMatchOptions = AutoMatchOptions;
var GProtocolSendType;
(function (GProtocolSendType) {
    GProtocolSendType[GProtocolSendType["UnReliable"] = 0] = "UnReliable";
    GProtocolSendType[GProtocolSendType["Reliable"] = 1] = "Reliable";
})(GProtocolSendType = exports.GProtocolSendType || (exports.GProtocolSendType = {}));
var MessageType;
(function (MessageType) {
    MessageType[MessageType["Private"] = 4] = "Private";
    MessageType[MessageType["Public"] = 3] = "Public";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
class EventPayload {
    constructor() {
        this.Name = "";
        this.Value = new Uint8Array();
    }
    Serialize() {
        var _a;
        let b = Buffer.alloc(2);
        b.writeUInt16LE(models_1.StringToBuffer(this.Name).length);
        let a = Buffer.alloc(2);
        a.writeUInt16LE((_a = this.Value) === null || _a === void 0 ? void 0 : _a.length);
        let source = [
            2,
            12,
            ...b.valueOf(),
            ...models_1.StringToBuffer(this.Name),
            13,
            ...a.valueOf(),
            ...this.Value
        ];
        return new Uint8Array(source);
    }
    Deserialize(input) {
        let buff = Buffer.from(input);
        let offset = 1;
        offset++;
        let NameLength = buff.readUInt16LE(offset);
        offset += 2;
        let name = buff.slice(offset, offset + NameLength);
        offset += NameLength;
        this.Name = models_1.BufferToString(name);
        offset++;
        let ValueLength = buff.readUInt16LE(offset);
        offset += 2;
        let value = buff.slice(offset, offset + ValueLength);
        offset += ValueLength;
        this.Value = value;
    }
    Export() {
        return {
            Name: this.Name,
            Value: models_1.BufferToString(this.Value)
        };
    }
}
exports.EventPayload = EventPayload;
