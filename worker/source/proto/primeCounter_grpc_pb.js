// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var proto_primeCounter_pb = require('../proto/primeCounter_pb.js');

function serialize_primer_PrimeCounterPayload(arg) {
  if (!(arg instanceof proto_primeCounter_pb.PrimeCounterPayload)) {
    throw new Error('Expected argument of type primer.PrimeCounterPayload');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_primer_PrimeCounterPayload(buffer_arg) {
  return proto_primeCounter_pb.PrimeCounterPayload.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_primer_PrimeCounterReply(arg) {
  if (!(arg instanceof proto_primeCounter_pb.PrimeCounterReply)) {
    throw new Error('Expected argument of type primer.PrimeCounterReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_primer_PrimeCounterReply(buffer_arg) {
  return proto_primeCounter_pb.PrimeCounterReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_primer_SimpleReply(arg) {
  if (!(arg instanceof proto_primeCounter_pb.SimpleReply)) {
    throw new Error('Expected argument of type primer.SimpleReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_primer_SimpleReply(buffer_arg) {
  return proto_primeCounter_pb.SimpleReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_primer_TotalPrimesResponse(arg) {
  if (!(arg instanceof proto_primeCounter_pb.TotalPrimesResponse)) {
    throw new Error('Expected argument of type primer.TotalPrimesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_primer_TotalPrimesResponse(buffer_arg) {
  return proto_primeCounter_pb.TotalPrimesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ClientService = exports.ClientService = {
  sendPrimeCountRequest: {
    path: '/primer.Client/SendPrimeCountRequest',
    requestStream: false,
    responseStream: false,
    requestType: proto_primeCounter_pb.PrimeCounterPayload,
    responseType: proto_primeCounter_pb.PrimeCounterReply,
    requestSerialize: serialize_primer_PrimeCounterPayload,
    requestDeserialize: deserialize_primer_PrimeCounterPayload,
    responseSerialize: serialize_primer_PrimeCounterReply,
    responseDeserialize: deserialize_primer_PrimeCounterReply,
  },
};

exports.ClientClient = grpc.makeGenericClientConstructor(ClientService);
var WorkerService = exports.WorkerService = {
  sendPrimeCountResult: {
    path: '/primer.Worker/SendPrimeCountResult',
    requestStream: false,
    responseStream: false,
    requestType: proto_primeCounter_pb.TotalPrimesResponse,
    responseType: proto_primeCounter_pb.SimpleReply,
    requestSerialize: serialize_primer_TotalPrimesResponse,
    requestDeserialize: deserialize_primer_TotalPrimesResponse,
    responseSerialize: serialize_primer_SimpleReply,
    responseDeserialize: deserialize_primer_SimpleReply,
  },
};

exports.WorkerClient = grpc.makeGenericClientConstructor(WorkerService);
