import express from 'express';
import cors from 'cors';
import routes from './routes';

class App {
  constructor() {
    this.server = express();
    this.useCors();
    this.middleware();
    this.routes();
  }

  useCors() {
    this.server.use(cors());
  }

  middleware() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
