import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cluster from 'cluster';

const workers: { [id: number]:  { worker: any, env: any } } = {};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log('START ', process.env.PORT);
  app.listen(process.env.PORT);
}

if (cluster.isMaster) {
  // const count = Math.min(4, numCPUs);
  const count = 4;
  for (let i = 0; i < count; ++i) {
    const env = { PORT: 4000 + (i + 1) };
    const worker = cluster.fork(env);
    workers[worker.id] = { worker, env };
  }
}

cluster.on('exit', (worker) => {
  console.log('exit cluster: ', worker.id);

  const env = workers[worker.id].env;
  delete workers[worker.id];

  const newWorker = cluster.fork(env);
  workers[newWorker.id] = { worker: newWorker, env };
});

if (cluster.isWorker) {
  bootstrap();
}


