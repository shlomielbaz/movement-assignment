import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { constants } from './config/constants';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');

dotenv.config();

(async () => {
  const app = await NestFactory.create(AppModule);

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });

  app.enableCors({
    allowedHeaders: '*',
    origin: [
      'http://localhost:4200',
      'http://www.google.com',
      'https://www.facebook.com',
    ],
  });

  const config = new DocumentBuilder()
    .setTitle('Movment RESTFul API')
    // .setDescription('The RESTFul API description')
    // .setVersion('1.0')
    // .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(constants.port).then(() => {
    console.log(`listening to port: ${constants.port}`);
  });
})();
