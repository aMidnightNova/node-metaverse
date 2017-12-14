// This file has been automatically generated by writeMessageClasses.js

import Long = require('long');
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class AbortXferMessage implements MessageBase
{
    name = 'AbortXfer';
    messageFlags = MessageFlags.FrequencyLow;
    id = Message.AbortXfer;

    XferID: {
        ID: Long;
        Result: number;
    };

    getSize(): number
    {
        return 12;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        buf.writeInt32LE(this.XferID['ID'].low, pos);
        pos += 4;
        buf.writeInt32LE(this.XferID['ID'].high, pos);
        pos += 4;
        buf.writeInt32LE(this.XferID['Result'], pos);
        pos += 4;
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjXferID: {
            ID: Long,
            Result: number
        } = {
            ID: Long.ZERO,
            Result: 0
        };
        newObjXferID['ID'] = new Long(buf.readInt32LE(pos), buf.readInt32LE(pos+4));
        pos += 8;
        newObjXferID['Result'] = buf.readInt32LE(pos);
        pos += 4;
        this.XferID = newObjXferID;
        return pos - startPos;
    }
}
