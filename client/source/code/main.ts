import {RequestSender} from './requestSender';
export class Main {
    public static run(address: string, from: number, until:number): Promise<number> {
        return new Promise<number> (async (resolve, reject) => {
            try {
                const R = new RequestSender(address);
                let result = await R.send(from, until);
                resolve(result);
            } catch (err) {
                reject(err);
            }
        })
    }
}