"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MessageFlags_1 = require("../../enums/MessageFlags");
class PacketAckPacket {
    constructor() {
        this.name = 'PacketAck';
        this.flags = MessageFlags_1.MessageFlags.FrequencyFixed;
        this.id = 4294967291;
    }
    getSize() {
        return ((4) * this.Packets.length) + 1;
    }
    writeToBuffer(buf, pos) {
        const startPos = pos;
        const count = this.Packets.length;
        buf.writeUInt8(this.Packets.length, pos++);
        for (let i = 0; i < count; i++) {
            buf.writeUInt32LE(this.Packets[i]['ID'], pos);
            pos += 4;
        }
        return pos - startPos;
    }
    readFromBuffer(buf, pos) {
        const startPos = pos;
        const count = buf.readUInt8(pos++);
        this.Packets = [];
        for (let i = 0; i < count; i++) {
            const newObjPackets = {
                ID: 0
            };
            newObjPackets['ID'] = buf.readUInt32LE(pos);
            pos += 4;
            this.Packets.push(newObjPackets);
        }
        return pos - startPos;
    }
}
exports.PacketAckPacket = PacketAckPacket;
//# sourceMappingURL=PacketAck.js.map