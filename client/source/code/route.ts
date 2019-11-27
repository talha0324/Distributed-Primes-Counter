import { Router } from 'express';
import { Controller } from './controllers';
const routes = Router();
routes.get('/', Controller.getController);
routes.post('/', Controller.postController);
export default routes;