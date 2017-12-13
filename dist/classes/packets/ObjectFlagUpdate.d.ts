/// <reference types="node" />
import { UUID } from '../UUID';
import { Packet } from '../Packet';
export declare class ObjectFlagUpdatePacket implements Packet {
    name: string;
    flags: number;
    id: number;
    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
        ObjectLocalID: number;
        UsePhysics: boolean;
        IsTemporary: boolean;
        IsPhantom: boolean;
        CastsShadows: boolean;
    };
    ExtraPhysics: {
        PhysicsShapeType: number;
        Density: number;
        Friction: number;
        Restitution: number;
        GravityMultiplier: number;
    }[];
    getSize(): number;
    writeToBuffer(buf: Buffer, pos: number): number;
    readFromBuffer(buf: Buffer, pos: number): number;
}
