// This file has been automatically generated by writeMessageClasses.js

import { UUID } from '../UUID';
import * as Long from 'long';
import { MessageFlags } from '../../enums/MessageFlags';
import { MessageBase } from '../MessageBase';
import { Message } from '../../enums/Message';

export class AgentGroupDataUpdateMessage implements MessageBase
{
    name = 'AgentGroupDataUpdate';
    messageFlags = MessageFlags.Trusted | MessageFlags.Zerocoded | MessageFlags.Deprecated | MessageFlags.FrequencyLow;
    id = Message.AgentGroupDataUpdate;

    AgentData: {
        AgentID: UUID;
    };
    GroupData: {
        GroupID: UUID;
        GroupPowers: Long;
        AcceptNotices: boolean;
        GroupInsigniaID: UUID;
        Contribution: number;
        GroupName: Buffer;
    }[];

    getSize(): number
    {
        return this.calculateVarVarSize(this.GroupData, 'GroupName', 1) + ((45) * this.GroupData.length) + 17;
    }

    calculateVarVarSize(block: {[key: string]: any}[], paramName: string, extraPerVar: number): number
    {
        let size = 0;
        for (const bl of block)
        {
            size += bl[paramName].length + extraPerVar;
        }
        return size;
    }

    // @ts-ignore
    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        const count = this.GroupData.length;
        buf.writeUInt8(this.GroupData.length, pos++);
        for (let i = 0; i < count; i++)
        {
            this.GroupData[i]['GroupID'].writeToBuffer(buf, pos);
            pos += 16;
            buf.writeInt32LE(this.GroupData[i]['GroupPowers'].low, pos);
            pos += 4;
            buf.writeInt32LE(this.GroupData[i]['GroupPowers'].high, pos);
            pos += 4;
            buf.writeUInt8((this.GroupData[i]['AcceptNotices']) ? 1 : 0, pos++);
            this.GroupData[i]['GroupInsigniaID'].writeToBuffer(buf, pos);
            pos += 16;
            buf.writeInt32LE(this.GroupData[i]['Contribution'], pos);
            pos += 4;
            buf.writeUInt8(this.GroupData[i]['GroupName'].length, pos++);
            this.GroupData[i]['GroupName'].copy(buf, pos);
            pos += this.GroupData[i]['GroupName'].length;
        }
        return pos - startPos;
    }

    // @ts-ignore
    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjAgentData: {
            AgentID: UUID
        } = {
            AgentID: UUID.zero()
        };
        newObjAgentData['AgentID'] = new UUID(buf, pos);
        pos += 16;
        this.AgentData = newObjAgentData;
        if (pos >= buf.length)
        {
            return pos - startPos;
        }
        const count = buf.readUInt8(pos++);
        this.GroupData = [];
        for (let i = 0; i < count; i++)
        {
            const newObjGroupData: {
                GroupID: UUID,
                GroupPowers: Long,
                AcceptNotices: boolean,
                GroupInsigniaID: UUID,
                Contribution: number,
                GroupName: Buffer
            } = {
                GroupID: UUID.zero(),
                GroupPowers: Long.ZERO,
                AcceptNotices: false,
                GroupInsigniaID: UUID.zero(),
                Contribution: 0,
                GroupName: Buffer.allocUnsafe(0)
            };
            newObjGroupData['GroupID'] = new UUID(buf, pos);
            pos += 16;
            newObjGroupData['GroupPowers'] = new Long(buf.readInt32LE(pos), buf.readInt32LE(pos + 4));
            pos += 8;
            newObjGroupData['AcceptNotices'] = (buf.readUInt8(pos++) === 1);
            newObjGroupData['GroupInsigniaID'] = new UUID(buf, pos);
            pos += 16;
            newObjGroupData['Contribution'] = buf.readInt32LE(pos);
            pos += 4;
            varLength = buf.readUInt8(pos++);
            newObjGroupData['GroupName'] = buf.slice(pos, pos + varLength);
            pos += varLength;
            this.GroupData.push(newObjGroupData);
        }
        return pos - startPos;
    }
}

