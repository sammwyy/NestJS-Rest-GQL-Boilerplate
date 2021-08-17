import { AccountModule } from './modules/account/account.module';
import { ProfileModule } from './modules/profile/profile.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    /**
     * Load environment variables from the .env file in the root of the project.
     */
    ConfigModule.forRoot(),

    /**
     * Using the database module it will connect to the
     * mongodb server specified in the environment variable "MONGO_URI"
     */
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),

    /**
     * Using the GraphQL module it will load all the schemas automatically
     * and generate the .gql file
     * Also the playground mode and debug will only be available if the application
     * is running under a development environment.
     */

    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src', 'graphql', 'schema.gql'),
      sortSchema: true,
      debug: process.env.NODE_ENV == 'development',
    }),

    AccountModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
