"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UUID_1 = require("../UUID");
const MessageFlags_1 = require("../../enums/MessageFlags");
const Message_1 = require("../../enums/Message");
class GroupVoteHistoryItemReplyMessage {
    constructor() {
        this.name = 'GroupVoteHistoryItemReply';
        this.messageFlags = MessageFlags_1.MessageFlags.Trusted | MessageFlags_1.MessageFlags.Zerocoded | MessageFlags_1.MessageFlags.FrequencyLow;
        this.id = Message_1.Message.GroupVoteHistoryItemReply;
    }
    getSize() {
        return (this.HistoryItemData['TerseDateID'].length + 1 + this.HistoryItemData['StartDateTime'].length + 1 + this.HistoryItemData['EndDateTime'].length + 1 + this.HistoryItemData['VoteType'].length + 1 + this.HistoryItemData['VoteResult'].length + 1 + this.HistoryItemData['ProposalText'].length + 2) + ((this.calculateVarVarSize(this.VoteItem, 'VoteCast', 1) + 20) * this.VoteItem.length) + 93;
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
        this.AgentData['GroupID'].writeToBuffer(buf, pos);
        pos += 16;
        this.TransactionData['TransactionID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt32LE(this.TransactionData['TotalNumItems'], pos);
        pos += 4;
        this.HistoryItemData['VoteID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt8(this.HistoryItemData['TerseDateID'].length, pos++);
        this.HistoryItemData['TerseDateID'].copy(buf, pos);
        pos += this.HistoryItemData['TerseDateID'].length;
        buf.writeUInt8(this.HistoryItemData['StartDateTime'].length, pos++);
        this.HistoryItemData['StartDateTime'].copy(buf, pos);
        pos += this.HistoryItemData['StartDateTime'].length;
        buf.writeUInt8(this.HistoryItemData['EndDateTime'].length, pos++);
        this.HistoryItemData['EndDateTime'].copy(buf, pos);
        pos += this.HistoryItemData['EndDateTime'].length;
        this.HistoryItemData['VoteInitiator'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt8(this.HistoryItemData['VoteType'].length, pos++);
        this.HistoryItemData['VoteType'].copy(buf, pos);
        pos += this.HistoryItemData['VoteType'].length;
        buf.writeUInt8(this.HistoryItemData['VoteResult'].length, pos++);
        this.HistoryItemData['VoteResult'].copy(buf, pos);
        pos += this.HistoryItemData['VoteResult'].length;
        buf.writeFloatLE(this.HistoryItemData['Majority'], pos);
        pos += 4;
        buf.writeInt32LE(this.HistoryItemData['Quorum'], pos);
        pos += 4;
        buf.writeUInt16LE(this.HistoryItemData['ProposalText'].length, pos);
        pos += 2;
        this.HistoryItemData['ProposalText'].copy(buf, pos);
        pos += this.HistoryItemData['ProposalText'].length;
        const count = this.VoteItem.length;
        buf.writeUInt8(this.VoteItem.length, pos++);
        for (let i = 0; i < count; i++) {
            this.VoteItem[i]['CandidateID'].writeToBuffer(buf, pos);
            pos += 16;
            buf.writeUInt8(this.VoteItem[i]['VoteCast'].length, pos++);
            this.VoteItem[i]['VoteCast'].copy(buf, pos);
            pos += this.VoteItem[i]['VoteCast'].length;
            buf.writeInt32LE(this.VoteItem[i]['NumVotes'], pos);
            pos += 4;
        }
        return pos - startPos;
    }
    readFromBuffer(buf, pos) {
        const startPos = pos;
        let varLength = 0;
        const newObjAgentData = {
            AgentID: UUID_1.UUID.zero(),
            GroupID: UUID_1.UUID.zero()
        };
        newObjAgentData['AgentID'] = new UUID_1.UUID(buf, pos);
        pos += 16;
        newObjAgentData['GroupID'] = new UUID_1.UUID(buf, pos);
        pos += 16;
        this.AgentData = newObjAgentData;
        const newObjTransactionData = {
            TransactionID: UUID_1.UUID.zero(),
            TotalNumItems: 0
        };
        newObjTransactionData['TransactionID'] = new UUID_1.UUID(buf, pos);
        pos += 16;
        newObjTransactionData['TotalNumItems'] = buf.readUInt32LE(pos);
        pos += 4;
        this.TransactionData = newObjTransactionData;
        const newObjHistoryItemData = {
            VoteID: UUID_1.UUID.zero(),
            TerseDateID: Buffer.allocUnsafe(0),
            StartDateTime: Buffer.allocUnsafe(0),
            EndDateTime: Buffer.allocUnsafe(0),
            VoteInitiator: UUID_1.UUID.zero(),
            VoteType: Buffer.allocUnsafe(0),
            VoteResult: Buffer.allocUnsafe(0),
            Majority: 0,
            Quorum: 0,
            ProposalText: Buffer.allocUnsafe(0)
        };
        newObjHistoryItemData['VoteID'] = new UUID_1.UUID(buf, pos);
        pos += 16;
        varLength = buf.readUInt8(pos++);
        newObjHistoryItemData['TerseDateID'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        varLength = buf.readUInt8(pos++);
        newObjHistoryItemData['StartDateTime'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        varLength = buf.readUInt8(pos++);
        newObjHistoryItemData['EndDateTime'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        newObjHistoryItemData['VoteInitiator'] = new UUID_1.UUID(buf, pos);
        pos += 16;
        varLength = buf.readUInt8(pos++);
        newObjHistoryItemData['VoteType'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        varLength = buf.readUInt8(pos++);
        newObjHistoryItemData['VoteResult'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        newObjHistoryItemData['Majority'] = buf.readFloatLE(pos);
        pos += 4;
        newObjHistoryItemData['Quorum'] = buf.readInt32LE(pos);
        pos += 4;
        varLength = buf.readUInt16LE(pos);
        pos += 2;
        newObjHistoryItemData['ProposalText'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        this.HistoryItemData = newObjHistoryItemData;
        const count = buf.readUInt8(pos++);
        this.VoteItem = [];
        for (let i = 0; i < count; i++) {
            const newObjVoteItem = {
                CandidateID: UUID_1.UUID.zero(),
                VoteCast: Buffer.allocUnsafe(0),
                NumVotes: 0
            };
            newObjVoteItem['CandidateID'] = new UUID_1.UUID(buf, pos);
            pos += 16;
            varLength = buf.readUInt8(pos++);
            newObjVoteItem['VoteCast'] = buf.slice(pos, pos + varLength);
            pos += varLength;
            newObjVoteItem['NumVotes'] = buf.readInt32LE(pos);
            pos += 4;
            this.VoteItem.push(newObjVoteItem);
        }
        return pos - startPos;
    }
}
exports.GroupVoteHistoryItemReplyMessage = GroupVoteHistoryItemReplyMessage;
//# sourceMappingURL=GroupVoteHistoryItemReply.js.map