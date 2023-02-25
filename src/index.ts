import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSchema } from 'type-graphql';
import { CategoryResolver } from './resolvers/category.resolver';
import { Container } from 'typedi';
import AppDataSource from './config/data-source';
import { DataSource } from 'typeorm';

async function bootstrap() {
  await AppDataSource.initialize()
    .then(() => {
      Container.set(DataSource, AppDataSource);
    });

  const schema = await buildSchema({
    resolvers: [CategoryResolver],
    emitSchemaFile: './src/graphql/schema.gql',
    container: Container,
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
  console.log(`⚡ Server listening at: ${url}`);
}

bootstrap();