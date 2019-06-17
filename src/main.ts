import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cluster from 'cluster';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.listen(3001);
}

if (cluster.isMaster) {
  // const count = Math.min(4, numCPUs);
  const count = 4;
  for (let i = 0; i < count; ++i) {
    cluster.fork();
  }
}

cluster.on('exit', (worker) => {
  console.log('exit cluster: ', worker.id);
  cluster.fork();
});

if (cluster.isWorker) {
  bootstrap();
}
