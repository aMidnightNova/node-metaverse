"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UUID_1 = require("../UUID");
const MessageFlags_1 = require("../../enums/MessageFlags");
class GrantGodlikePowersPacket {
    constructor() {
        this.name = 'GrantGodlikePowers';
        this.flags = MessageFlags_1.MessageFlags.Trusted | MessageFlags_1.MessageFlags.FrequencyLow;
        this.id = 4294902018;
    }
    getSize() {
        return 49;
    }
    writeToBuffer(buf, pos) {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt8(this.GrantData['GodLevel'], pos++);
        this.GrantData['Token'].writeToBuffer(buf, pos);
        pos += 16;
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
        const newObjGrantData = {
            GodLevel: 0,
            Token: UUID_1.UUID.zero()
        };
        newObjGrantData['GodLevel'] = buf.readUInt8(pos++);
        newObjGrantData['Token'] = new UUID_1.UUID(buf, pos);
        pos += 16;
        this.GrantData = newObjGrantData;
        return pos - startPos;
    }
}
exports.GrantGodlikePowersPacket = GrantGodlikePowersPacket;
//# sourceMappingURL=GrantGodlikePowers.js.map