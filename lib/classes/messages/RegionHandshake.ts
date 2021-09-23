// This file has been automatically generated by writeMessageClasses.js

import { UUID } from '../UUID';
import * as Long from 'long';
import { MessageFlags } from '../../enums/MessageFlags';
import { MessageBase } from '../MessageBase';
import { Message } from '../../enums/Message';

export class RegionHandshakeMessage implements MessageBase
{
    name = 'RegionHandshake';
    messageFlags = MessageFlags.Trusted | MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = Message.RegionHandshake;

    RegionInfo: {
        RegionFlags: number;
        SimAccess: number;
        SimName: Buffer;
        SimOwner: UUID;
        IsEstateManager: boolean;
        WaterHeight: number;
        BillableFactor: number;
        CacheID: UUID;
        TerrainBase0: UUID;
        TerrainBase1: UUID;
        TerrainBase2: UUID;
        TerrainBase3: UUID;
        TerrainDetail0: UUID;
        TerrainDetail1: UUID;
        TerrainDetail2: UUID;
        TerrainDetail3: UUID;
        TerrainStartHeight00: number;
        TerrainStartHeight01: number;
        TerrainStartHeight10: number;
        TerrainStartHeight11: number;
        TerrainHeightRange00: number;
        TerrainHeightRange01: number;
        TerrainHeightRange10: number;
        TerrainHeightRange11: number;
    };
    RegionInfo2: {
        RegionID: UUID;
    };
    RegionInfo3: {
        CPUClassID: number;
        CPURatio: number;
        ColoName: Buffer;
        ProductSKU: Buffer;
        ProductName: Buffer;
    };
    RegionInfo4: {
        RegionFlagsExtended: Long;
        RegionProtocols: Long;
    }[];

    getSize(): number
    {
        return (this.RegionInfo['SimName'].length + 1) + (this.RegionInfo3['ColoName'].length + 1 + this.RegionInfo3['ProductSKU'].length + 1 + this.RegionInfo3['ProductName'].length + 1) + ((16) * this.RegionInfo4.length) + 231;
    }

    // @ts-ignore
    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        buf.writeUInt32LE(this.RegionInfo['RegionFlags'], pos);
        pos += 4;
        buf.writeUInt8(this.RegionInfo['SimAccess'], pos++);
        buf.writeUInt8(this.RegionInfo['SimName'].length, pos++);
        this.RegionInfo['SimName'].copy(buf, pos);
        pos += this.RegionInfo['SimName'].length;
        this.RegionInfo['SimOwner'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt8((this.RegionInfo['IsEstateManager']) ? 1 : 0, pos++);
        buf.writeFloatLE(this.RegionInfo['WaterHeight'], pos);
        pos += 4;
        buf.writeFloatLE(this.RegionInfo['BillableFactor'], pos);
        pos += 4;
        this.RegionInfo['CacheID'].writeToBuffer(buf, pos);
        pos += 16;
        this.RegionInfo['TerrainBase0'].writeToBuffer(buf, pos);
        pos += 16;
        this.RegionInfo['TerrainBase1'].writeToBuffer(buf, pos);
        pos += 16;
        this.RegionInfo['TerrainBase2'].writeToBuffer(buf, pos);
        pos += 16;
        this.RegionInfo['TerrainBase3'].writeToBuffer(buf, pos);
        pos += 16;
        this.RegionInfo['TerrainDetail0'].writeToBuffer(buf, pos);
        pos += 16;
        this.RegionInfo['TerrainDetail1'].writeToBuffer(buf, pos);
        pos += 16;
        this.RegionInfo['TerrainDetail2'].writeToBuffer(buf, pos);
        pos += 16;
        this.RegionInfo['TerrainDetail3'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeFloatLE(this.RegionInfo['TerrainStartHeight00'], pos);
        pos += 4;
        buf.writeFloatLE(this.RegionInfo['TerrainStartHeight01'], pos);
        pos += 4;
        buf.writeFloatLE(this.RegionInfo['TerrainStartHeight10'], pos);
        pos += 4;
        buf.writeFloatLE(this.RegionInfo['TerrainStartHeight11'], pos);
        pos += 4;
        buf.writeFloatLE(this.RegionInfo['TerrainHeightRange00'], pos);
        pos += 4;
        buf.writeFloatLE(this.RegionInfo['TerrainHeightRange01'], pos);
        pos += 4;
        buf.writeFloatLE(this.RegionInfo['TerrainHeightRange10'], pos);
        pos += 4;
        buf.writeFloatLE(this.RegionInfo['TerrainHeightRange11'], pos);
        pos += 4;
        this.RegionInfo2['RegionID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeInt32LE(this.RegionInfo3['CPUClassID'], pos);
        pos += 4;
        buf.writeInt32LE(this.RegionInfo3['CPURatio'], pos);
        pos += 4;
        buf.writeUInt8(this.RegionInfo3['ColoName'].length, pos++);
        this.RegionInfo3['ColoName'].copy(buf, pos);
        pos += this.RegionInfo3['ColoName'].length;
        buf.writeUInt8(this.RegionInfo3['ProductSKU'].length, pos++);
        this.RegionInfo3['ProductSKU'].copy(buf, pos);
        pos += this.RegionInfo3['ProductSKU'].length;
        buf.writeUInt8(this.RegionInfo3['ProductName'].length, pos++);
        this.RegionInfo3['ProductName'].copy(buf, pos);
        pos += this.RegionInfo3['ProductName'].length;
        const count = this.RegionInfo4.length;
        buf.writeUInt8(this.RegionInfo4.length, pos++);
        for (let i = 0; i < count; i++)
        {
            buf.writeInt32LE(this.RegionInfo4[i]['RegionFlagsExtended'].low, pos);
            pos += 4;
            buf.writeInt32LE(this.RegionInfo4[i]['RegionFlagsExtended'].high, pos);
            pos += 4;
            buf.writeInt32LE(this.RegionInfo4[i]['RegionProtocols'].low, pos);
            pos += 4;
            buf.writeInt32LE(this.RegionInfo4[i]['RegionProtocols'].high, pos);
            pos += 4;
        }
        return pos - startPos;
    }

    // @ts-ignore
    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjRegionInfo: {
            RegionFlags: number,
            SimAccess: number,
            SimName: Buffer,
            SimOwner: UUID,
            IsEstateManager: boolean,
            WaterHeight: number,
            BillableFactor: number,
            CacheID: UUID,
            TerrainBase0: UUID,
            TerrainBase1: UUID,
            TerrainBase2: UUID,
            TerrainBase3: UUID,
            TerrainDetail0: UUID,
            TerrainDetail1: UUID,
            TerrainDetail2: UUID,
            TerrainDetail3: UUID,
            TerrainStartHeight00: number,
            TerrainStartHeight01: number,
            TerrainStartHeight10: number,
            TerrainStartHeight11: number,
            TerrainHeightRange00: number,
            TerrainHeightRange01: number,
            TerrainHeightRange10: number,
            TerrainHeightRange11: number
        } = {
            RegionFlags: 0,
            SimAccess: 0,
            SimName: Buffer.allocUnsafe(0),
            SimOwner: UUID.zero(),
            IsEstateManager: false,
            WaterHeight: 0,
            BillableFactor: 0,
            CacheID: UUID.zero(),
            TerrainBase0: UUID.zero(),
            TerrainBase1: UUID.zero(),
            TerrainBase2: UUID.zero(),
            TerrainBase3: UUID.zero(),
            TerrainDetail0: UUID.zero(),
            TerrainDetail1: UUID.zero(),
            TerrainDetail2: UUID.zero(),
            TerrainDetail3: UUID.zero(),
            TerrainStartHeight00: 0,
            TerrainStartHeight01: 0,
            TerrainStartHeight10: 0,
            TerrainStartHeight11: 0,
            TerrainHeightRange00: 0,
            TerrainHeightRange01: 0,
            TerrainHeightRange10: 0,
            TerrainHeightRange11: 0
        };
        newObjRegionInfo['RegionFlags'] = buf.readUInt32LE(pos);
        pos += 4;
        newObjRegionInfo['SimAccess'] = buf.readUInt8(pos++);
        varLength = buf.readUInt8(pos++);
        newObjRegionInfo['SimName'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        newObjRegionInfo['SimOwner'] = new UUID(buf, pos);
        pos += 16;
        newObjRegionInfo['IsEstateManager'] = (buf.readUInt8(pos++) === 1);
        newObjRegionInfo['WaterHeight'] = buf.readFloatLE(pos);
        pos += 4;
        newObjRegionInfo['BillableFactor'] = buf.readFloatLE(pos);
        pos += 4;
        newObjRegionInfo['CacheID'] = new UUID(buf, pos);
        pos += 16;
        newObjRegionInfo['TerrainBase0'] = new UUID(buf, pos);
        pos += 16;
        newObjRegionInfo['TerrainBase1'] = new UUID(buf, pos);
        pos += 16;
        newObjRegionInfo['TerrainBase2'] = new UUID(buf, pos);
        pos += 16;
        newObjRegionInfo['TerrainBase3'] = new UUID(buf, pos);
        pos += 16;
        newObjRegionInfo['TerrainDetail0'] = new UUID(buf, pos);
        pos += 16;
        newObjRegionInfo['TerrainDetail1'] = new UUID(buf, pos);
        pos += 16;
        newObjRegionInfo['TerrainDetail2'] = new UUID(buf, pos);
        pos += 16;
        newObjRegionInfo['TerrainDetail3'] = new UUID(buf, pos);
        pos += 16;
        newObjRegionInfo['TerrainStartHeight00'] = buf.readFloatLE(pos);
        pos += 4;
        newObjRegionInfo['TerrainStartHeight01'] = buf.readFloatLE(pos);
        pos += 4;
        newObjRegionInfo['TerrainStartHeight10'] = buf.readFloatLE(pos);
        pos += 4;
        newObjRegionInfo['TerrainStartHeight11'] = buf.readFloatLE(pos);
        pos += 4;
        newObjRegionInfo['TerrainHeightRange00'] = buf.readFloatLE(pos);
        pos += 4;
        newObjRegionInfo['TerrainHeightRange01'] = buf.readFloatLE(pos);
        pos += 4;
        newObjRegionInfo['TerrainHeightRange10'] = buf.readFloatLE(pos);
        pos += 4;
        newObjRegionInfo['TerrainHeightRange11'] = buf.readFloatLE(pos);
        pos += 4;
        this.RegionInfo = newObjRegionInfo;
        const newObjRegionInfo2: {
            RegionID: UUID
        } = {
            RegionID: UUID.zero()
        };
        newObjRegionInfo2['RegionID'] = new UUID(buf, pos);
        pos += 16;
        this.RegionInfo2 = newObjRegionInfo2;
        const newObjRegionInfo3: {
            CPUClassID: number,
            CPURatio: number,
            ColoName: Buffer,
            ProductSKU: Buffer,
            ProductName: Buffer
        } = {
            CPUClassID: 0,
            CPURatio: 0,
            ColoName: Buffer.allocUnsafe(0),
            ProductSKU: Buffer.allocUnsafe(0),
            ProductName: Buffer.allocUnsafe(0)
        };
        newObjRegionInfo3['CPUClassID'] = buf.readInt32LE(pos);
        pos += 4;
        newObjRegionInfo3['CPURatio'] = buf.readInt32LE(pos);
        pos += 4;
        varLength = buf.readUInt8(pos++);
        newObjRegionInfo3['ColoName'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        varLength = buf.readUInt8(pos++);
        newObjRegionInfo3['ProductSKU'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        varLength = buf.readUInt8(pos++);
        newObjRegionInfo3['ProductName'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        this.RegionInfo3 = newObjRegionInfo3;
        if (pos >= buf.length)
        {
            return pos - startPos;
        }
        const count = buf.readUInt8(pos++);
        this.RegionInfo4 = [];
        for (let i = 0; i < count; i++)
        {
            const newObjRegionInfo4: {
                RegionFlagsExtended: Long,
                RegionProtocols: Long
            } = {
                RegionFlagsExtended: Long.ZERO,
                RegionProtocols: Long.ZERO
            };
            newObjRegionInfo4['RegionFlagsExtended'] = new Long(buf.readInt32LE(pos), buf.readInt32LE(pos + 4));
            pos += 8;
            newObjRegionInfo4['RegionProtocols'] = new Long(buf.readInt32LE(pos), buf.readInt32LE(pos + 4));
            pos += 8;
            this.RegionInfo4.push(newObjRegionInfo4);
        }
        return pos - startPos;
    }
}

