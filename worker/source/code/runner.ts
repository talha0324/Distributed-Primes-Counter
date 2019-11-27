import { PrimeCounter } from "./primeCounter";
import { ResponseSender } from "./responseSender";
import { Payload } from "./config";
export interface MainResponse {
    total: number;
    msg: string;
}
export class Main {
    public static async run(address: string, payload:Payload): Promise<MainResponse> {
        return new Promise<MainResponse>(async (resolve, reject) => {
            try {
                const C: Payload = payload;
                const P: PrimeCounter = new PrimeCounter(C);
                const total = await P.getPrimesBetweenRanges();
                const S: ResponseSender = new ResponseSender(address);
                const msg = await S.send(total, C.batchId);
                // console.log(msg);
                resolve({msg:msg, total:total});
            } catch (err) {
                reject(err);
            }
        })
    }
}