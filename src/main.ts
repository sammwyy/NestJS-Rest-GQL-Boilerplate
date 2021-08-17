import { PayloadValidationPipe } from './shared/pipes/PayloadValidation.pipe';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new PayloadValidationPipe());
  await app.listen(process.env.PORT);
}
bootstrap();
