import {TotalPrimesResponse, SimpleReply} from '../../proto/primeCounter_pb';
import {WorkerService, IWorkerServer } from '../../proto/primeCounter_grpc_pb';
import grpc, {Server} from 'grpc';

export class MockgRPCServer {
    private server: Server;
    constructor(){
        this.server = new Server();
    }
    public registerServices() {        
        const sendPrimeCountResult: grpc.handleUnaryCall<TotalPrimesResponse, SimpleReply> = (call, callback) => {
            const batchID = call.request.getBatchid();
            const total = call.request.getTotal();
            console.log(`batchID::${batchID} || total::${total}`);
            const rep = new SimpleReply();
            rep.setMessage("ok");
            if(total > 0) {
                callback(null, rep)
            } else {
                callback({details:"Value Error", code:606, message: "Value Error", metadata:call.metadata, name:"Err", stack:""}, null);
            }
        }
        this.server.addService<IWorkerServer>(WorkerService, {
            sendPrimeCountResult:sendPrimeCountResult
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
