import { Main } from "./runner";
import { Config } from "./config";
console.log('running...')
console.log(Config.getInstance().getPayload())
Main.run(Config.getInstance().getServerAddress(), Config.getInstance().getPayload());