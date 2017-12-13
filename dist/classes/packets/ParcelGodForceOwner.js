"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UUID_1 = require("../UUID");
const MessageFlags_1 = require("../../enums/MessageFlags");
class ParcelGodForceOwnerPacket {
    constructor() {
        this.name = 'ParcelGodForceOwner';
        this.flags = MessageFlags_1.MessageFlags.Zerocoded | MessageFlags_1.MessageFlags.FrequencyLow;
        this.id = 4294901974;
    }
    getSize() {
        return 52;
    }
    writeToBuffer(buf, pos) {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        this.Data['OwnerID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeInt32LE(this.Data['LocalID'], pos);
        pos += 4;
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
        const newObjData = {
            OwnerID: UUID_1.UUID.zero(),
            LocalID: 0
        };
        newObjData['OwnerID'] = new UUID_1.UUID(buf, pos);
        pos += 16;
        newObjData['LocalID'] = buf.readInt32LE(pos);
        pos += 4;
        this.Data = newObjData;
        return pos - startPos;
    }
}
exports.ParcelGodForceOwnerPacket = ParcelGodForceOwnerPacket;
//# sourceMappingURL=ParcelGodForceOwner.js.map