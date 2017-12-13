/// <reference types="node" />
import { UUID } from '../UUID';
import { MessageFlags } from '../../enums/MessageFlags';
import { MessageBase } from '../MessageBase';
import { Message } from '../../enums/Message';
export declare class TeleportLureRequestMessage implements MessageBase {
    name: string;
    messageFlags: MessageFlags;
    id: Message;
    Info: {
        AgentID: UUID;
        SessionID: UUID;
        LureID: UUID;
        TeleportFlags: number;
    };
    getSize(): number;
    writeToBuffer(buf: Buffer, pos: number): number;
    readFromBuffer(buf: Buffer, pos: number): number;
}
