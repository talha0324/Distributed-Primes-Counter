import grpc from 'grpc';
import {PrimeCounterPayload, PrimeCounterReply} from '../proto/primeCounter_pb'
import {ClientClient} from '../proto/primeCounter_grpc_pb'

export class RequestSender {
    private client: ClientClient;
    constructor(address: string){
        this.client = new ClientClient(address, grpc.credentials.createInsecure());
    }
    public send(from: number, until: number): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            const request: PrimeCounterPayload = new PrimeCounterPayload();
            request.setFrom(from);
            request.setUntil(until);
            this.client.sendPrimeCountRequest(request, (error : grpc.ServiceError | null, response: PrimeCounterReply) => {
                if(error) {
                    reject(error);
                } else {
                    resolve(response.getTotal());
                }
            })
        })
    }
}