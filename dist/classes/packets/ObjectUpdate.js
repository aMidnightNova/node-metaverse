"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UUID_1 = require("../UUID");
const Vector3_1 = require("../Vector3");
const Long = require("long");
const MessageFlags_1 = require("../../enums/MessageFlags");
class ObjectUpdatePacket {
    constructor() {
        this.name = 'ObjectUpdate';
        this.flags = MessageFlags_1.MessageFlags.Trusted | MessageFlags_1.MessageFlags.Zerocoded | MessageFlags_1.MessageFlags.FrequencyHigh;
        this.id = 12;
    }
    getSize() {
        return ((this.calculateVarVarSize(this.ObjectData, 'ObjectData', 1) + this.calculateVarVarSize(this.ObjectData, 'TextureEntry', 2) + this.calculateVarVarSize(this.ObjectData, 'TextureAnim', 1) + this.calculateVarVarSize(this.ObjectData, 'NameValue', 2) + this.calculateVarVarSize(this.ObjectData, 'Data', 2) + this.calculateVarVarSize(this.ObjectData, 'Text', 1) + this.calculateVarVarSize(this.ObjectData, 'MediaURL', 1) + this.calculateVarVarSize(this.ObjectData, 'PSBlock', 1) + this.calculateVarVarSize(this.ObjectData, 'ExtraParams', 1) + 141) * this.ObjectData.length) + 11;
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
        buf.writeInt32LE(this.RegionData['RegionHandle'].low, pos);
        pos += 4;
        buf.writeInt32LE(this.RegionData['RegionHandle'].high, pos);
        pos += 4;
        buf.writeUInt16LE(this.RegionData['TimeDilation'], pos);
        pos += 2;
        const count = this.ObjectData.length;
        buf.writeUInt8(this.ObjectData.length, pos++);
        for (let i = 0; i < count; i++) {
            buf.writeUInt32LE(this.ObjectData[i]['ID'], pos);
            pos += 4;
            buf.writeUInt8(this.ObjectData[i]['State'], pos++);
            this.ObjectData[i]['FullID'].writeToBuffer(buf, pos);
            pos += 16;
            buf.writeUInt32LE(this.ObjectData[i]['CRC'], pos);
            pos += 4;
            buf.writeUInt8(this.ObjectData[i]['PCode'], pos++);
            buf.writeUInt8(this.ObjectData[i]['Material'], pos++);
            buf.writeUInt8(this.ObjectData[i]['ClickAction'], pos++);
            this.ObjectData[i]['Scale'].writeToBuffer(buf, pos, false);
            pos += 12;
            buf.write(this.ObjectData[i]['ObjectData'], pos);
            pos += this.ObjectData[i]['ObjectData'].length;
            buf.writeUInt32LE(this.ObjectData[i]['ParentID'], pos);
            pos += 4;
            buf.writeUInt32LE(this.ObjectData[i]['UpdateFlags'], pos);
            pos += 4;
            buf.writeUInt8(this.ObjectData[i]['PathCurve'], pos++);
            buf.writeUInt8(this.ObjectData[i]['ProfileCurve'], pos++);
            buf.writeUInt16LE(this.ObjectData[i]['PathBegin'], pos);
            pos += 2;
            buf.writeUInt16LE(this.ObjectData[i]['PathEnd'], pos);
            pos += 2;
            buf.writeUInt8(this.ObjectData[i]['PathScaleX'], pos++);
            buf.writeUInt8(this.ObjectData[i]['PathScaleY'], pos++);
            buf.writeUInt8(this.ObjectData[i]['PathShearX'], pos++);
            buf.writeUInt8(this.ObjectData[i]['PathShearY'], pos++);
            buf.writeInt8(this.ObjectData[i]['PathTwist'], pos++);
            buf.writeInt8(this.ObjectData[i]['PathTwistBegin'], pos++);
            buf.writeInt8(this.ObjectData[i]['PathRadiusOffset'], pos++);
            buf.writeInt8(this.ObjectData[i]['PathTaperX'], pos++);
            buf.writeInt8(this.ObjectData[i]['PathTaperY'], pos++);
            buf.writeUInt8(this.ObjectData[i]['PathRevolutions'], pos++);
            buf.writeInt8(this.ObjectData[i]['PathSkew'], pos++);
            buf.writeUInt16LE(this.ObjectData[i]['ProfileBegin'], pos);
            pos += 2;
            buf.writeUInt16LE(this.ObjectData[i]['ProfileEnd'], pos);
            pos += 2;
            buf.writeUInt16LE(this.ObjectData[i]['ProfileHollow'], pos);
            pos += 2;
            buf.write(this.ObjectData[i]['TextureEntry'], pos);
            pos += this.ObjectData[i]['TextureEntry'].length;
            buf.write(this.ObjectData[i]['TextureAnim'], pos);
            pos += this.ObjectData[i]['TextureAnim'].length;
            buf.write(this.ObjectData[i]['NameValue'], pos);
            pos += this.ObjectData[i]['NameValue'].length;
            buf.write(this.ObjectData[i]['Data'], pos);
            pos += this.ObjectData[i]['Data'].length;
            buf.write(this.ObjectData[i]['Text'], pos);
            pos += this.ObjectData[i]['Text'].length;
            this.ObjectData[i]['TextColor'].copy(buf, pos);
            pos += 4;
            buf.write(this.ObjectData[i]['MediaURL'], pos);
            pos += this.ObjectData[i]['MediaURL'].length;
            buf.write(this.ObjectData[i]['PSBlock'], pos);
            pos += this.ObjectData[i]['PSBlock'].length;
            buf.write(this.ObjectData[i]['ExtraParams'], pos);
            pos += this.ObjectData[i]['ExtraParams'].length;
            this.ObjectData[i]['Sound'].writeToBuffer(buf, pos);
            pos += 16;
            this.ObjectData[i]['OwnerID'].writeToBuffer(buf, pos);
            pos += 16;
            buf.writeFloatLE(this.ObjectData[i]['Gain'], pos);
            pos += 4;
            buf.writeUInt8(this.ObjectData[i]['Flags'], pos++);
            buf.writeFloatLE(this.ObjectData[i]['Radius'], pos);
            pos += 4;
            buf.writeUInt8(this.ObjectData[i]['JointType'], pos++);
            this.ObjectData[i]['JointPivot'].writeToBuffer(buf, pos, false);
            pos += 12;
            this.ObjectData[i]['JointAxisOrAnchor'].writeToBuffer(buf, pos, false);
            pos += 12;
        }
        return pos - startPos;
    }
    readFromBuffer(buf, pos) {
        const startPos = pos;
        const newObjRegionData = {
            RegionHandle: Long.ZERO,
            TimeDilation: 0
        };
        newObjRegionData['RegionHandle'] = new Long(buf.readInt32LE(pos), buf.readInt32LE(pos + 4));
        pos += 8;
        newObjRegionData['TimeDilation'] = buf.readUInt16LE(pos);
        pos += 2;
        this.RegionData = newObjRegionData;
        const count = buf.readUInt8(pos++);
        this.ObjectData = [];
        for (let i = 0; i < count; i++) {
            const newObjObjectData = {
                ID: 0,
                State: 0,
                FullID: UUID_1.UUID.zero(),
                CRC: 0,
                PCode: 0,
                Material: 0,
                ClickAction: 0,
                Scale: Vector3_1.Vector3.getZero(),
                ObjectData: '',
                ParentID: 0,
                UpdateFlags: 0,
                PathCurve: 0,
                ProfileCurve: 0,
                PathBegin: 0,
                PathEnd: 0,
                PathScaleX: 0,
                PathScaleY: 0,
                PathShearX: 0,
                PathShearY: 0,
                PathTwist: 0,
                PathTwistBegin: 0,
                PathRadiusOffset: 0,
                PathTaperX: 0,
                PathTaperY: 0,
                PathRevolutions: 0,
                PathSkew: 0,
                ProfileBegin: 0,
                ProfileEnd: 0,
                ProfileHollow: 0,
                TextureEntry: '',
                TextureAnim: '',
                NameValue: '',
                Data: '',
                Text: '',
                TextColor: Buffer.allocUnsafe(0),
                MediaURL: '',
                PSBlock: '',
                ExtraParams: '',
                Sound: UUID_1.UUID.zero(),
                OwnerID: UUID_1.UUID.zero(),
                Gain: 0,
                Flags: 0,
                Radius: 0,
                JointType: 0,
                JointPivot: Vector3_1.Vector3.getZero(),
                JointAxisOrAnchor: Vector3_1.Vector3.getZero()
            };
            newObjObjectData['ID'] = buf.readUInt32LE(pos);
            pos += 4;
            newObjObjectData['State'] = buf.readUInt8(pos++);
            newObjObjectData['FullID'] = new UUID_1.UUID(buf, pos);
            pos += 16;
            newObjObjectData['CRC'] = buf.readUInt32LE(pos);
            pos += 4;
            newObjObjectData['PCode'] = buf.readUInt8(pos++);
            newObjObjectData['Material'] = buf.readUInt8(pos++);
            newObjObjectData['ClickAction'] = buf.readUInt8(pos++);
            newObjObjectData['Scale'] = new Vector3_1.Vector3(buf, pos, false);
            pos += 12;
            newObjObjectData['ObjectData'] = buf.toString('utf8', pos, length);
            pos += length;
            newObjObjectData['ParentID'] = buf.readUInt32LE(pos);
            pos += 4;
            newObjObjectData['UpdateFlags'] = buf.readUInt32LE(pos);
            pos += 4;
            newObjObjectData['PathCurve'] = buf.readUInt8(pos++);
            newObjObjectData['ProfileCurve'] = buf.readUInt8(pos++);
            newObjObjectData['PathBegin'] = buf.readUInt16LE(pos);
            pos += 2;
            newObjObjectData['PathEnd'] = buf.readUInt16LE(pos);
            pos += 2;
            newObjObjectData['PathScaleX'] = buf.readUInt8(pos++);
            newObjObjectData['PathScaleY'] = buf.readUInt8(pos++);
            newObjObjectData['PathShearX'] = buf.readUInt8(pos++);
            newObjObjectData['PathShearY'] = buf.readUInt8(pos++);
            newObjObjectData['PathTwist'] = buf.readInt8(pos++);
            newObjObjectData['PathTwistBegin'] = buf.readInt8(pos++);
            newObjObjectData['PathRadiusOffset'] = buf.readInt8(pos++);
            newObjObjectData['PathTaperX'] = buf.readInt8(pos++);
            newObjObjectData['PathTaperY'] = buf.readInt8(pos++);
            newObjObjectData['PathRevolutions'] = buf.readUInt8(pos++);
            newObjObjectData['PathSkew'] = buf.readInt8(pos++);
            newObjObjectData['ProfileBegin'] = buf.readUInt16LE(pos);
            pos += 2;
            newObjObjectData['ProfileEnd'] = buf.readUInt16LE(pos);
            pos += 2;
            newObjObjectData['ProfileHollow'] = buf.readUInt16LE(pos);
            pos += 2;
            newObjObjectData['TextureEntry'] = buf.toString('utf8', pos, length);
            pos += length;
            newObjObjectData['TextureAnim'] = buf.toString('utf8', pos, length);
            pos += length;
            newObjObjectData['NameValue'] = buf.toString('utf8', pos, length);
            pos += length;
            newObjObjectData['Data'] = buf.toString('utf8', pos, length);
            pos += length;
            newObjObjectData['Text'] = buf.toString('utf8', pos, length);
            pos += length;
            newObjObjectData['TextColor'] = buf.slice(pos, pos + 4);
            pos += 4;
            newObjObjectData['MediaURL'] = buf.toString('utf8', pos, length);
            pos += length;
            newObjObjectData['PSBlock'] = buf.toString('utf8', pos, length);
            pos += length;
            newObjObjectData['ExtraParams'] = buf.toString('utf8', pos, length);
            pos += length;
            newObjObjectData['Sound'] = new UUID_1.UUID(buf, pos);
            pos += 16;
            newObjObjectData['OwnerID'] = new UUID_1.UUID(buf, pos);
            pos += 16;
            newObjObjectData['Gain'] = buf.readFloatLE(pos);
            pos += 4;
            newObjObjectData['Flags'] = buf.readUInt8(pos++);
            newObjObjectData['Radius'] = buf.readFloatLE(pos);
            pos += 4;
            newObjObjectData['JointType'] = buf.readUInt8(pos++);
            newObjObjectData['JointPivot'] = new Vector3_1.Vector3(buf, pos, false);
            pos += 12;
            newObjObjectData['JointAxisOrAnchor'] = new Vector3_1.Vector3(buf, pos, false);
            pos += 12;
            this.ObjectData.push(newObjObjectData);
        }
        return pos - startPos;
    }
}
exports.ObjectUpdatePacket = ObjectUpdatePacket;
//# sourceMappingURL=ObjectUpdate.js.map