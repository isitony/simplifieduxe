import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   // Set up for Swagger documentation
   const config = new DocumentBuilder()
   .setTitle('Questions API')
   .setDescription('This is a take home task from simplifieduxe')
   .setVersion('1.0')
   .build();
 const document = SwaggerModule.createDocument(app, config);
 SwaggerModule.setup('api', app, document);

 app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new AllExceptionsFilter()); //SimpleExceptionsFilter
  await app.listen(3000);
}
bootstrap();
