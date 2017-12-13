"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UUID_1 = require("../UUID");
const Vector3_1 = require("../Vector3");
const MessageFlags_1 = require("../../enums/MessageFlags");
class ObjectPositionPacket {
    constructor() {
        this.name = 'ObjectPosition';
        this.flags = MessageFlags_1.MessageFlags.Zerocoded | MessageFlags_1.MessageFlags.Deprecated | MessageFlags_1.MessageFlags.FrequencyMedium;
        this.id = 65284;
    }
    getSize() {
        return ((16) * this.ObjectData.length) + 33;
    }
    writeToBuffer(buf, pos) {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        const count = this.ObjectData.length;
        buf.writeUInt8(this.ObjectData.length, pos++);
        for (let i = 0; i < count; i++) {
            buf.writeUInt32LE(this.ObjectData[i]['ObjectLocalID'], pos);
            pos += 4;
            this.ObjectData[i]['Position'].writeToBuffer(buf, pos, false);
            pos += 12;
        }
        return pos - startPos;
    }
    readFromBuffer(buf, pos) {
        const startPos = pos;
        const newObjAgentData = {
            AgentID: UUID_1.UUID.zero(),
            SessionID: UUID_1.UUID.zero()
        };
        newObjAgentData['AgentID'] = new UUID_1.UUID(buf, pos);
        pos += 16;
        newObjAgentData['SessionID'] = new UUID_1.UUID(buf, pos);
        pos += 16;
        this.AgentData = newObjAgentData;
        const count = buf.readUInt8(pos++);
        this.ObjectData = [];
        for (let i = 0; i < count; i++) {
            const newObjObjectData = {
                ObjectLocalID: 0,
                Position: Vector3_1.Vector3.getZero()
            };
            newObjObjectData['ObjectLocalID'] = buf.readUInt32LE(pos);
            pos += 4;
            newObjObjectData['Position'] = new Vector3_1.Vector3(buf, pos, false);
            pos += 12;
            this.ObjectData.push(newObjObjectData);
        }
        return pos - startPos;
    }
}
exports.ObjectPositionPacket = ObjectPositionPacket;
//# sourceMappingURL=ObjectPosition.js.map