// package: primer
// file: proto/primeCounter.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as proto_primeCounter_pb from "./primeCounter_pb";

interface IClientService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    sendPrimeCountRequest: IClientService_ISendPrimeCountRequest;
}

interface IClientService_ISendPrimeCountRequest extends grpc.MethodDefinition<proto_primeCounter_pb.PrimeCounterPayload, proto_primeCounter_pb.PrimeCounterReply> {
    path: string; // "/primer.Client/SendPrimeCountRequest"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<proto_primeCounter_pb.PrimeCounterPayload>;
    requestDeserialize: grpc.deserialize<proto_primeCounter_pb.PrimeCounterPayload>;
    responseSerialize: grpc.serialize<proto_primeCounter_pb.PrimeCounterReply>;
    responseDeserialize: grpc.deserialize<proto_primeCounter_pb.PrimeCounterReply>;
}

export const ClientService: IClientService;

export interface IClientServer {
    sendPrimeCountRequest: grpc.handleUnaryCall<proto_primeCounter_pb.PrimeCounterPayload, proto_primeCounter_pb.PrimeCounterReply>;
}

export interface IClientClient {
    sendPrimeCountRequest(request: proto_primeCounter_pb.PrimeCounterPayload, callback: (error: grpc.ServiceError | null, response: proto_primeCounter_pb.PrimeCounterReply) => void): grpc.ClientUnaryCall;
    sendPrimeCountRequest(request: proto_primeCounter_pb.PrimeCounterPayload, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proto_primeCounter_pb.PrimeCounterReply) => void): grpc.ClientUnaryCall;
    sendPrimeCountRequest(request: proto_primeCounter_pb.PrimeCounterPayload, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proto_primeCounter_pb.PrimeCounterReply) => void): grpc.ClientUnaryCall;
}

export class ClientClient extends grpc.Client implements IClientClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public sendPrimeCountRequest(request: proto_primeCounter_pb.PrimeCounterPayload, callback: (error: grpc.ServiceError | null, response: proto_primeCounter_pb.PrimeCounterReply) => void): grpc.ClientUnaryCall;
    public sendPrimeCountRequest(request: proto_primeCounter_pb.PrimeCounterPayload, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proto_primeCounter_pb.PrimeCounterReply) => void): grpc.ClientUnaryCall;
    public sendPrimeCountRequest(request: proto_primeCounter_pb.PrimeCounterPayload, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proto_primeCounter_pb.PrimeCounterReply) => void): grpc.ClientUnaryCall;
}

interface IWorkerService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    sendPrimeCountResult: IWorkerService_ISendPrimeCountResult;
}

interface IWorkerService_ISendPrimeCountResult extends grpc.MethodDefinition<proto_primeCounter_pb.TotalPrimesResponse, proto_primeCounter_pb.SimpleReply> {
    path: string; // "/primer.Worker/SendPrimeCountResult"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<proto_primeCounter_pb.TotalPrimesResponse>;
    requestDeserialize: grpc.deserialize<proto_primeCounter_pb.TotalPrimesResponse>;
    responseSerialize: grpc.serialize<proto_primeCounter_pb.SimpleReply>;
    responseDeserialize: grpc.deserialize<proto_primeCounter_pb.SimpleReply>;
}

export const WorkerService: IWorkerService;

export interface IWorkerServer {
    sendPrimeCountResult: grpc.handleUnaryCall<proto_primeCounter_pb.TotalPrimesResponse, proto_primeCounter_pb.SimpleReply>;
}

export interface IWorkerClient {
    sendPrimeCountResult(request: proto_primeCounter_pb.TotalPrimesResponse, callback: (error: grpc.ServiceError | null, response: proto_primeCounter_pb.SimpleReply) => void): grpc.ClientUnaryCall;
    sendPrimeCountResult(request: proto_primeCounter_pb.TotalPrimesResponse, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proto_primeCounter_pb.SimpleReply) => void): grpc.ClientUnaryCall;
    sendPrimeCountResult(request: proto_primeCounter_pb.TotalPrimesResponse, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proto_primeCounter_pb.SimpleReply) => void): grpc.ClientUnaryCall;
}

export class WorkerClient extends grpc.Client implements IWorkerClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public sendPrimeCountResult(request: proto_primeCounter_pb.TotalPrimesResponse, callback: (error: grpc.ServiceError | null, response: proto_primeCounter_pb.SimpleReply) => void): grpc.ClientUnaryCall;
    public sendPrimeCountResult(request: proto_primeCounter_pb.TotalPrimesResponse, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proto_primeCounter_pb.SimpleReply) => void): grpc.ClientUnaryCall;
    public sendPrimeCountResult(request: proto_primeCounter_pb.TotalPrimesResponse, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proto_primeCounter_pb.SimpleReply) => void): grpc.ClientUnaryCall;
}
