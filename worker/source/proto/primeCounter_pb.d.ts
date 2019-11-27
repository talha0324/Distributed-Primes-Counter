// package: primer
// file: proto/primeCounter.proto

/* tslint:disable */

import * as jspb from "google-protobuf";

export class PrimeCounterPayload extends jspb.Message { 
    getFrom(): number;
    setFrom(value: number): void;

    getUntil(): number;
    setUntil(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PrimeCounterPayload.AsObject;
    static toObject(includeInstance: boolean, msg: PrimeCounterPayload): PrimeCounterPayload.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PrimeCounterPayload, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PrimeCounterPayload;
    static deserializeBinaryFromReader(message: PrimeCounterPayload, reader: jspb.BinaryReader): PrimeCounterPayload;
}

export namespace PrimeCounterPayload {
    export type AsObject = {
        from: number,
        until: number,
    }
}

export class PrimeCounterReply extends jspb.Message { 
    getTotal(): number;
    setTotal(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PrimeCounterReply.AsObject;
    static toObject(includeInstance: boolean, msg: PrimeCounterReply): PrimeCounterReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PrimeCounterReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PrimeCounterReply;
    static deserializeBinaryFromReader(message: PrimeCounterReply, reader: jspb.BinaryReader): PrimeCounterReply;
}

export namespace PrimeCounterReply {
    export type AsObject = {
        total: number,
    }
}

export class TotalPrimesResponse extends jspb.Message { 
    getTotal(): number;
    setTotal(value: number): void;

    getBatchid(): string;
    setBatchid(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TotalPrimesResponse.AsObject;
    static toObject(includeInstance: boolean, msg: TotalPrimesResponse): TotalPrimesResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TotalPrimesResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TotalPrimesResponse;
    static deserializeBinaryFromReader(message: TotalPrimesResponse, reader: jspb.BinaryReader): TotalPrimesResponse;
}

export namespace TotalPrimesResponse {
    export type AsObject = {
        total: number,
        batchid: string,
    }
}

export class SimpleReply extends jspb.Message { 
    getMessage(): string;
    setMessage(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SimpleReply.AsObject;
    static toObject(includeInstance: boolean, msg: SimpleReply): SimpleReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SimpleReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SimpleReply;
    static deserializeBinaryFromReader(message: SimpleReply, reader: jspb.BinaryReader): SimpleReply;
}

export namespace SimpleReply {
    export type AsObject = {
        message: string,
    }
}
