export interface Payload {
    startingPoint: number,
    endingPoint: number,
    batchId: string
}
export class Config {
    private static instance: Config;
    private from: number;
    private to: number;
    private workerBatchId: string;
    private address: string;
    private constructor() {
        this.from = Number.parseInt( process.env.FROM || "2" );
        this.to = Number.parseInt( process.env.TO || "10" );
        this.workerBatchId = process.env.WORKERBATCHID || "unknown";
        this.address = process.env.SERVERURL || "0.0.0.0:5001";
        if(this.from <= 1) {
            /* istanbul ignore next */
            this.from = 2;
        }
        if( this.to <= 1) {
            /* istanbul ignore next */
            this.to = 2;
        }
    }
    public static getInstance(): Config {
        if (!Config.instance) {
            Config.instance = new Config();
        }
        return Config.instance;
    }
    public getPayload(): Payload {
        return {
            endingPoint: this.to,
            startingPoint: this.from,
            batchId: this.workerBatchId
        }
    }
    public getServerAddress() {
        return this.address;
    }
}