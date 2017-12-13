"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UUID_1 = require("../UUID");
const MessageFlags_1 = require("../../enums/MessageFlags");
class RemoveParcelPacket {
    constructor() {
        this.name = 'RemoveParcel';
        this.flags = MessageFlags_1.MessageFlags.Trusted | MessageFlags_1.MessageFlags.FrequencyLow;
        this.id = 4294901982;
    }
    getSize() {
        return ((16) * this.ParcelData.length) + 1;
    }
    writeToBuffer(buf, pos) {
        const startPos = pos;
        const count = this.ParcelData.length;
        buf.writeUInt8(this.ParcelData.length, pos++);
        for (let i = 0; i < count; i++) {
            this.ParcelData[i]['ParcelID'].writeToBuffer(buf, pos);
            pos += 16;
        }
        return pos - startPos;
    }
    readFromBuffer(buf, pos) {
        const startPos = pos;
        const count = buf.readUInt8(pos++);
        this.ParcelData = [];
        for (let i = 0; i < count; i++) {
            const newObjParcelData = {
                ParcelID: UUID_1.UUID.zero()
            };
            newObjParcelData['ParcelID'] = new UUID_1.UUID(buf, pos);
            pos += 16;
            this.ParcelData.push(newObjParcelData);
        }
        return pos - startPos;
    }
}
exports.RemoveParcelPacket = RemoveParcelPacket;
//# sourceMappingURL=RemoveParcel.js.map