import {PrimeCounterReply, PrimeCounterPayload} from '../../proto/primeCounter_pb';
import {ClientService, IClientServer } from '../../proto/primeCounter_grpc_pb';
import grpc, {Server} from 'grpc';

export class MockgRPCServer {
    private server: Server;
    constructor(){
        this.server = new Server();
    }
    public registerServices() {        
        const sendPrimeCountRequest: grpc.handleUnaryCall<PrimeCounterPayload, PrimeCounterReply> = (call, callback) => {
            const from = call.request.getFrom();
            const until = call.request.getUntil();
            console.log(`from::${from} || until::${until}`);
            const rep = new PrimeCounterReply();
            rep.setTotal(0);
            if(from!=until) {
                callback(null, rep)
            } else {
                callback({details:"Value Error", code:606, message: "Value Error", metadata:call.metadata, name:"Err", stack:""}, null);
            }
        }
        this.server.addService<IClientServer>(ClientService, {
            sendPrimeCountRequest: sendPrimeCountRequest
        })
    }
    public startServer(address: string) {
        this.server.bind(address, grpc.ServerCredentials.createInsecure());
        this.server.start();
    }
    public stopServer() {
        const t = setTimeout(() => {
            this.server.forceShutdown();
        }, 2000);
        this.server.tryShutdown(() => {
            console.log('shutdown completed')
            clearTimeout(t);
        })
    }
}
