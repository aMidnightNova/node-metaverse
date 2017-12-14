"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UUID_1 = require("../UUID");
const MessageFlags_1 = require("../../enums/MessageFlags");
const Message_1 = require("../../enums/Message");
class PreloadSoundMessage {
    constructor() {
        this.name = 'PreloadSound';
        this.messageFlags = MessageFlags_1.MessageFlags.Trusted | MessageFlags_1.MessageFlags.FrequencyMedium;
        this.id = Message_1.Message.PreloadSound;
    }
    getSize() {
        return ((48) * this.DataBlock.length) + 1;
    }
    writeToBuffer(buf, pos) {
        const startPos = pos;
        const count = this.DataBlock.length;
        buf.writeUInt8(this.DataBlock.length, pos++);
        for (let i = 0; i < count; i++) {
            this.DataBlock[i]['ObjectID'].writeToBuffer(buf, pos);
            pos += 16;
            this.DataBlock[i]['OwnerID'].writeToBuffer(buf, pos);
            pos += 16;
            this.DataBlock[i]['SoundID'].writeToBuffer(buf, pos);
            pos += 16;
        }
        return pos - startPos;
    }
    readFromBuffer(buf, pos) {
        const startPos = pos;
        let varLength = 0;
        const count = buf.readUInt8(pos++);
        this.DataBlock = [];
        for (let i = 0; i < count; i++) {
            const newObjDataBlock = {
                ObjectID: UUID_1.UUID.zero(),
                OwnerID: UUID_1.UUID.zero(),
                SoundID: UUID_1.UUID.zero()
            };
            newObjDataBlock['ObjectID'] = new UUID_1.UUID(buf, pos);
            pos += 16;
            newObjDataBlock['OwnerID'] = new UUID_1.UUID(buf, pos);
            pos += 16;
            newObjDataBlock['SoundID'] = new UUID_1.UUID(buf, pos);
            pos += 16;
            this.DataBlock.push(newObjDataBlock);
        }
        return pos - startPos;
    }
}
exports.PreloadSoundMessage = PreloadSoundMessage;
//# sourceMappingURL=PreloadSound.js.map