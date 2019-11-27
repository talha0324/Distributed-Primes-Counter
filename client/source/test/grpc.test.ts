import chai from 'chai';
import { Main } from '../code/main';
import { Config } from '../code/config';

describe('grpc', () => {
    it('should make a request to mocked grpc server and get desired response', async ()=>{
        let res = await Main.run(Config.getInstance().getServerAddress(), 10,20)
        chai.expect(res).equal(0);
    })
})