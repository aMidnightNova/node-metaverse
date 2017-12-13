/// <reference types="node" />
import { UUID } from '../UUID';
import { MessageBase } from '../MessageBase';
import { Message } from '../../enums/Message';
export declare class TransferRequestMessage implements MessageBase {
    name: string;
    messageFlags: number;
    id: Message;
    TransferInfo: {
        TransferID: UUID;
        ChannelType: number;
        SourceType: number;
        Priority: number;
        Params: Buffer;
    };
    getSize(): number;
    writeToBuffer(buf: Buffer, pos: number): number;
    readFromBuffer(buf: Buffer, pos: number): number;
}
