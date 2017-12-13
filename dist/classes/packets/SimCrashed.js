"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UUID_1 = require("../UUID");
const MessageFlags_1 = require("../../enums/MessageFlags");
class SimCrashedPacket {
    constructor() {
        this.name = 'SimCrashed';
        this.flags = MessageFlags_1.MessageFlags.FrequencyLow;
        this.id = 4294902088;
    }
    getSize() {
        return ((16) * this.Users.length) + 9;
    }
    writeToBuffer(buf, pos) {
        const startPos = pos;
        buf.writeUInt32LE(this.Data['RegionX'], pos);
        pos += 4;
        buf.writeUInt32LE(this.Data['RegionY'], pos);
        pos += 4;
        const count = this.Users.length;
        buf.writeUInt8(this.Users.length, pos++);
        for (let i = 0; i < count; i++) {
            this.Users[i]['AgentID'].writeToBuffer(buf, pos);
            pos += 16;
        }
        return pos - startPos;
    }
    readFromBuffer(buf, pos) {
        const startPos = pos;
        const newObjData = {
            RegionX: 0,
            RegionY: 0
        };
        newObjData['RegionX'] = buf.readUInt32LE(pos);
        pos += 4;
        newObjData['RegionY'] = buf.readUInt32LE(pos);
        pos += 4;
        this.Data = newObjData;
        const count = buf.readUInt8(pos++);
        this.Users = [];
        for (let i = 0; i < count; i++) {
            const newObjUsers = {
                AgentID: UUID_1.UUID.zero()
            };
            newObjUsers['AgentID'] = new UUID_1.UUID(buf, pos);
            pos += 16;
            this.Users.push(newObjUsers);
        }
        return pos - startPos;
    }
}
exports.SimCrashedPacket = SimCrashedPacket;
//# sourceMappingURL=SimCrashed.js.map