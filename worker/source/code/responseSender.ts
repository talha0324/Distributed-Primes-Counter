import grpc from 'grpc';
import {TotalPrimesResponse, SimpleReply} from '../proto/primeCounter_pb';
import {WorkerClient} from '../proto/primeCounter_grpc_pb';
export class ResponseSender {
    private client: WorkerClient;
    constructor (address: string) {
        this.client = new WorkerClient(address, grpc.credentials.createInsecure());
    }
    public send(total: number, id: string): Promise<string> {
        return new Promise<string> ((resolve, reject) => {
            let req: TotalPrimesResponse = new TotalPrimesResponse();
            req.setTotal(total);
            req.setBatchid(id);
            this.client.sendPrimeCountResult(req, (err: grpc.ServiceError | null, res: SimpleReply) => {
                if(err) {
                    reject({code:err.code, message: err.message, details: err.details});
                } else {
                    resolve(res.getMessage());
                }
            })
        })
    }
}