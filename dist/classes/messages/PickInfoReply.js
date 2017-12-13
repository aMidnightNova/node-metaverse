"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UUID_1 = require("../UUID");
const Vector3_1 = require("../Vector3");
const MessageFlags_1 = require("../../enums/MessageFlags");
const Message_1 = require("../../enums/Message");
class PickInfoReplyMessage {
    constructor() {
        this.name = 'PickInfoReply';
        this.messageFlags = MessageFlags_1.MessageFlags.Trusted | MessageFlags_1.MessageFlags.FrequencyLow;
        this.id = Message_1.Message.PickInfoReply;
    }
    getSize() {
        return (this.Data['Name'].length + 1 + this.Data['Desc'].length + 2 + this.Data['User'].length + 1 + this.Data['OriginalName'].length + 1 + this.Data['SimName'].length + 1) + 110;
    }
    writeToBuffer(buf, pos) {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.Data['PickID'].writeToBuffer(buf, pos);
        pos += 16;
        this.Data['CreatorID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt8((this.Data['TopPick']) ? 1 : 0, pos++);
        this.Data['ParcelID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt8(this.Data['Name'].length, pos++);
        this.Data['Name'].copy(buf, pos);
        pos += this.Data['Name'].length;
        buf.writeUInt16LE(this.Data['Desc'].length, pos);
        pos += 2;
        this.Data['Desc'].copy(buf, pos);
        pos += this.Data['Desc'].length;
        this.Data['SnapshotID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt8(this.Data['User'].length, pos++);
        this.Data['User'].copy(buf, pos);
        pos += this.Data['User'].length;
        buf.writeUInt8(this.Data['OriginalName'].length, pos++);
        this.Data['OriginalName'].copy(buf, pos);
        pos += this.Data['OriginalName'].length;
        buf.writeUInt8(this.Data['SimName'].length, pos++);
        this.Data['SimName'].copy(buf, pos);
        pos += this.Data['SimName'].length;
        this.Data['PosGlobal'].writeToBuffer(buf, pos, true);
        pos += 24;
        buf.writeInt32LE(this.Data['SortOrder'], pos);
        pos += 4;
        buf.writeUInt8((this.Data['Enabled']) ? 1 : 0, pos++);
        return pos - startPos;
    }
    readFromBuffer(buf, pos) {
        const startPos = pos;
        let varLength = 0;
        const newObjAgentData = {
            AgentID: UUID_1.UUID.zero()
        };
        newObjAgentData['AgentID'] = new UUID_1.UUID(buf, pos);
        pos += 16;
        this.AgentData = newObjAgentData;
        const newObjData = {
            PickID: UUID_1.UUID.zero(),
            CreatorID: UUID_1.UUID.zero(),
            TopPick: false,
            ParcelID: UUID_1.UUID.zero(),
            Name: Buffer.allocUnsafe(0),
            Desc: Buffer.allocUnsafe(0),
            SnapshotID: UUID_1.UUID.zero(),
            User: Buffer.allocUnsafe(0),
            OriginalName: Buffer.allocUnsafe(0),
            SimName: Buffer.allocUnsafe(0),
            PosGlobal: Vector3_1.Vector3.getZero(),
            SortOrder: 0,
            Enabled: false
        };
        newObjData['PickID'] = new UUID_1.UUID(buf, pos);
        pos += 16;
        newObjData['CreatorID'] = new UUID_1.UUID(buf, pos);
        pos += 16;
        newObjData['TopPick'] = (buf.readUInt8(pos++) === 1);
        newObjData['ParcelID'] = new UUID_1.UUID(buf, pos);
        pos += 16;
        varLength = buf.readUInt8(pos++);
        newObjData['Name'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        varLength = buf.readUInt16LE(pos);
        pos += 2;
        newObjData['Desc'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        newObjData['SnapshotID'] = new UUID_1.UUID(buf, pos);
        pos += 16;
        varLength = buf.readUInt8(pos++);
        newObjData['User'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        varLength = buf.readUInt8(pos++);
        newObjData['OriginalName'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        varLength = buf.readUInt8(pos++);
        newObjData['SimName'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        newObjData['PosGlobal'] = new Vector3_1.Vector3(buf, pos, true);
        pos += 24;
        newObjData['SortOrder'] = buf.readInt32LE(pos);
        pos += 4;
        newObjData['Enabled'] = (buf.readUInt8(pos++) === 1);
        this.Data = newObjData;
        return pos - startPos;
    }
}
exports.PickInfoReplyMessage = PickInfoReplyMessage;
//# sourceMappingURL=PickInfoReply.js.map