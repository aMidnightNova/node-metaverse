/// <reference types="node" />
import { UUID } from '../UUID';
import { MessageBase } from '../MessageBase';
import { Message } from '../../enums/Message';
export declare class RequestInventoryAssetMessage implements MessageBase {
    name: string;
    messageFlags: number;
    id: Message;
    QueryData: {
        QueryID: UUID;
        AgentID: UUID;
        OwnerID: UUID;
        ItemID: UUID;
    };
    getSize(): number;
    writeToBuffer(buf: Buffer, pos: number): number;
    readFromBuffer(buf: Buffer, pos: number): number;
}
