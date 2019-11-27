import chai from 'chai';
import { Main } from '../code/runner';
import { Config } from '../code/config';
describe('grpc', () => {
    it('should make a request to mocked grpc server and get desired response', async ()=>{
        let res = await Main.run(Config.getInstance().getServerAddress(), Config.getInstance().getPayload())
        chai.expect(res).to.have.property("total").equal(4);
    })
})
describe('grpc', () => {
    it('should make a request to mocked grpc server and get error response', async ()=>{
        let res = await Main.run(Config.getInstance().getServerAddress(), {batchId:'', endingPoint:1, startingPoint: 1}).catch(e=>e);
        chai.expect(res).to.have.property("code").equal(606);
    })
})