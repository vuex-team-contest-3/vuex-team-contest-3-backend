import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { resolve } from 'path';
import { writeFileSync } from 'fs';
import { ValidationPipe } from '@nestjs/common';

const start = async () => {
  try {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
      allowedHeaders: ['content-type'],
      origin: ['*'],
      credentials: true,
    });

    const PORT = process.env.PORT || 7000;

    app.setGlobalPrefix('api');

    const config = new DocumentBuilder()
      .setTitle('NestJS TEST')
      .setDescription('REST API')
      .setVersion('1.0.0')
      .addTag('NodeJS, NestJS, MongoDB, mongoose')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document, {
      customCssUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      customJs: [
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js',
      ],
    });
    app.use(cookieParser.default());
    app.useGlobalPipes(new ValidationPipe());

    app.useGlobalPipes(new ValidationPipe());
    app.use((req, res, next) => {
      const startTime = Date.now();
      res.on('finish', () => {
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        console.log(
          `${req.method} ${req.originalUrl} ${res.statusCode} ${responseTime}ms`,
        );
      });
      next();
    });
    app.listen(PORT, () => {
      console.log(`Server ${PORT} da yuguryapti...`);
    });
    if (process.env.NODE_ENV === 'development') {
      const pathToSwaggerStaticFolder = resolve(
        process.cwd(),
        'swagger-static',
      );

      // write swagger json file
      const pathToSwaggerJson = resolve(
        pathToSwaggerStaticFolder,
        'swagger.json',
      );
      const swaggerJson = JSON.stringify(document, null, 2);
      writeFileSync(pathToSwaggerJson, swaggerJson);
      console.log(
        `Swagger JSON file written to: '/swagger-static/swagger.json'`,
      );
    }
  } catch (error) {
    console.log(error);
  }
};
start();

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { BadRequestException, ValidationPipe } from '@nestjs/common';

// async function bootstrap() {
//   try {
//     const app = await NestFactory.create(AppModule);
//     const PORT = process.env.API_PORT || 3001;
//     app.enableCors();
//     app.setGlobalPrefix('api');
//     app.useGlobalPipes(new ValidationPipe());

//     const config = new DocumentBuilder()
//       .setTitle('NestJS')
//       .setDescription('REST API')
//       .setVersion('1.0.0')
//       .addTag('NodeJS, NestJS, Postgres, sequalize')
//       .build();
//     const document = SwaggerModule.createDocument(app, config);
//     SwaggerModule.setup('/api/docs', app, document);

//     app.use((req: any, res: any, next: any) => {
//       const startTime = Date.now();
//       res.on('finish', () => {
//         const endTime = Date.now();
//         const responseTime = endTime - startTime;
//         console.log(
//           `${req.method} ${req.originalUrl} ${res.statusCode} ${responseTime}ms`,
//         );
//       });
//       next();
//     });

//     await app.listen(PORT, () => {
//       console.log(`Port: ${PORT}. Server is running...`);
//     });
//   } catch (error) {
//     throw new BadRequestException(error.message);
//   }
// }
// bootstrap();
