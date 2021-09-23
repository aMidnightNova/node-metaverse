// This file has been automatically generated by writeMessageClasses.js

import { UUID } from '../UUID';
import * as Long from 'long';
import { MessageFlags } from '../../enums/MessageFlags';
import { MessageBase } from '../MessageBase';
import { Message } from '../../enums/Message';

export class SimulatorSetMapMessage implements MessageBase
{
    name = 'SimulatorSetMap';
    messageFlags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = Message.SimulatorSetMap;

    MapData: {
        RegionHandle: Long;
        Type: number;
        MapImage: UUID;
    };

    getSize(): number
    {
        return 28;
    }

    // @ts-ignore
    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        buf.writeInt32LE(this.MapData['RegionHandle'].low, pos);
        pos += 4;
        buf.writeInt32LE(this.MapData['RegionHandle'].high, pos);
        pos += 4;
        buf.writeInt32LE(this.MapData['Type'], pos);
        pos += 4;
        this.MapData['MapImage'].writeToBuffer(buf, pos);
        pos += 16;
        return pos - startPos;
    }

    // @ts-ignore
    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        const newObjMapData: {
            RegionHandle: Long,
            Type: number,
            MapImage: UUID
        } = {
            RegionHandle: Long.ZERO,
            Type: 0,
            MapImage: UUID.zero()
        };
        newObjMapData['RegionHandle'] = new Long(buf.readInt32LE(pos), buf.readInt32LE(pos + 4));
        pos += 8;
        newObjMapData['Type'] = buf.readInt32LE(pos);
        pos += 4;
        newObjMapData['MapImage'] = new UUID(buf, pos);
        pos += 16;
        this.MapData = newObjMapData;
        return pos - startPos;
    }
}

