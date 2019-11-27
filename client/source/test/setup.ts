import { MockgRPCServer } from './mock/mockgrpcServer';
import { Config } from '../code/config';
const M:MockgRPCServer =  new MockgRPCServer();
before(function () {
    M.registerServices();
    M.startServer(Config.getInstance().getServerAddress());
    console.log('global setup ==============================');
});

after(function () {
    M.stopServer();
    console.log('global teardown ======================');
});