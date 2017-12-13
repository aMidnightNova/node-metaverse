/// <reference types="node" />
import { UUID } from '../UUID';
import { Packet } from '../Packet';
export declare class StartAuctionPacket implements Packet {
    name: string;
    flags: number;
    id: number;
    AgentData: {
        AgentID: UUID;
    };
    ParcelData: {
        ParcelID: UUID;
        SnapshotID: UUID;
        Name: string;
    };
    getSize(): number;
    writeToBuffer(buf: Buffer, pos: number): number;
    readFromBuffer(buf: Buffer, pos: number): number;
}
