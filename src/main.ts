import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.API_PORT || 3001;
    app.enableCors();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
      .setTitle('NestJS')
      .setDescription('REST API')
      .setVersion('1.0.0')
      .addTag('NodeJS, NestJS, Postgres, sequalize')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    app.use((req: any, res: any, next: any) => {
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

    await app.listen(PORT, () => {
      console.log(`Port: ${PORT}. Server is running...`);
    });
  } catch (error) {
    throw new BadRequestException(error.message);
  }
}
bootstrap();
