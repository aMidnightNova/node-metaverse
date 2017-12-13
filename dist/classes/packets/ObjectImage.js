"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UUID_1 = require("../UUID");
const MessageFlags_1 = require("../../enums/MessageFlags");
class ObjectImagePacket {
    constructor() {
        this.name = 'ObjectImage';
        this.flags = MessageFlags_1.MessageFlags.Zerocoded | MessageFlags_1.MessageFlags.FrequencyLow;
        this.id = 4294901856;
    }
    getSize() {
        return ((this.calculateVarVarSize(this.ObjectData, 'MediaURL', 1) + this.calculateVarVarSize(this.ObjectData, 'TextureEntry', 2) + 4) * this.ObjectData.length) + 33;
    }
    calculateVarVarSize(block, paramName, extraPerVar) {
        let size = 0;
        block.forEach((bl) => {
            size += bl[paramName].length + extraPerVar;
        });
        return size;
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
            buf.write(this.ObjectData[i]['MediaURL'], pos);
            pos += this.ObjectData[i]['MediaURL'].length;
            buf.write(this.ObjectData[i]['TextureEntry'], pos);
            pos += this.ObjectData[i]['TextureEntry'].length;
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
                MediaURL: '',
                TextureEntry: ''
            };
            newObjObjectData['ObjectLocalID'] = buf.readUInt32LE(pos);
            pos += 4;
            newObjObjectData['MediaURL'] = buf.toString('utf8', pos, length);
            pos += length;
            newObjObjectData['TextureEntry'] = buf.toString('utf8', pos, length);
            pos += length;
            this.ObjectData.push(newObjObjectData);
        }
        return pos - startPos;
    }
}
exports.ObjectImagePacket = ObjectImagePacket;
//# sourceMappingURL=ObjectImage.js.map