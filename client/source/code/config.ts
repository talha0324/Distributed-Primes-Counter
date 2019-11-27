export class Config {
    private static instance: Config;
    private serverAddress: string;
    private port: number;
    private constructor() {
        this.port = parseInt(process.env.PORT || "9000");
        this.serverAddress =  process.env.SERVERURL || "0.0.0.0:5001";
    }
    public static getInstance(): Config {
        if (!Config.instance) {
            Config.instance = new Config();
        }
        return Config.instance;
    }
    public getServerAddress() {
        return Config.instance.serverAddress;
    }
    public getPort() {
        return Config.instance.port;
    }
}