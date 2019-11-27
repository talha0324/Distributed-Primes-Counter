import express  from 'express';
import bodyParser from 'body-parser';
import routes from './route';
import { Config } from './config';
import cors from 'cors';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors());
app.use(express.static('public'))
app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/', routes);
app.listen(Config.getInstance().getPort(), () => { console.log('listening...') });

export default app;

