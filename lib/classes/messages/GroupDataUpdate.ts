// This file has been automatically generated by writeMessageClasses.js

import { UUID } from '../UUID';
import * as Long from 'long';
import { MessageFlags } from '../../enums/MessageFlags';
import { MessageBase } from '../MessageBase';
import { Message } from '../../enums/Message';

export class GroupDataUpdateMessage implements MessageBase
{
    name = 'GroupDataUpdate';
    messageFlags = MessageFlags.Trusted | MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = Message.GroupDataUpdate;

    AgentGroupData: {
        AgentID: UUID;
        GroupID: UUID;
        AgentPowers: Long;
        GroupTitle: Buffer;
    }[];

    getSize(): number
    {
        return this.calculateVarVarSize(this.AgentGroupData, 'GroupTitle', 1) + ((40) * this.AgentGroupData.length) + 1;
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
        const count = this.AgentGroupData.length;
        buf.writeUInt8(this.AgentGroupData.length, pos++);
        for (let i = 0; i < count; i++)
        {
            this.AgentGroupData[i]['AgentID'].writeToBuffer(buf, pos);
            pos += 16;
            this.AgentGroupData[i]['GroupID'].writeToBuffer(buf, pos);
            pos += 16;
            buf.writeInt32LE(this.AgentGroupData[i]['AgentPowers'].low, pos);
            pos += 4;
            buf.writeInt32LE(this.AgentGroupData[i]['AgentPowers'].high, pos);
            pos += 4;
            buf.writeUInt8(this.AgentGroupData[i]['GroupTitle'].length, pos++);
            this.AgentGroupData[i]['GroupTitle'].copy(buf, pos);
            pos += this.AgentGroupData[i]['GroupTitle'].length;
        }
        return pos - startPos;
    }

    // @ts-ignore
    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        if (pos >= buf.length)
        {
            return pos - startPos;
        }
        const count = buf.readUInt8(pos++);
        this.AgentGroupData = [];
        for (let i = 0; i < count; i++)
        {
            const newObjAgentGroupData: {
                AgentID: UUID,
                GroupID: UUID,
                AgentPowers: Long,
                GroupTitle: Buffer
            } = {
                AgentID: UUID.zero(),
                GroupID: UUID.zero(),
                AgentPowers: Long.ZERO,
                GroupTitle: Buffer.allocUnsafe(0)
            };
            newObjAgentGroupData['AgentID'] = new UUID(buf, pos);
            pos += 16;
            newObjAgentGroupData['GroupID'] = new UUID(buf, pos);
            pos += 16;
            newObjAgentGroupData['AgentPowers'] = new Long(buf.readInt32LE(pos), buf.readInt32LE(pos + 4));
            pos += 8;
            varLength = buf.readUInt8(pos++);
            newObjAgentGroupData['GroupTitle'] = buf.slice(pos, pos + varLength);
            pos += varLength;
            this.AgentGroupData.push(newObjAgentGroupData);
        }
        return pos - startPos;
    }
}

