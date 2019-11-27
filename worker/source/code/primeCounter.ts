import { Payload } from "./config";

export class PrimeCounter {
    private config: Payload;
    constructor(config: Payload){
        this.config = config;
    }
    public getPrimesBetweenRanges(): Promise<number> {
        return new Promise<number>((res) => {
            let count = 0
            let a = this.config.startingPoint;
            let b = this.config.endingPoint;
            let i: number;
            let flag: number;
            let j: number;
            for (i = a; i <= b; i++)  
            { 
                if (i == 1 || i == 0){
                    continue; 
                }
                flag = 1; 
                for (j = 2; j <= i / 2; ++j)  
                { 
                    if (i % j == 0)  
                    { 
                        flag = 0; 
                        break; 
                    } 
                }
                if (flag === 1) {
                    console.log(i)
                    count ++;
                }
            } 
            res(count);
        });
    }
}