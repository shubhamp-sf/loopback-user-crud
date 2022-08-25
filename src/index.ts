import {ApplicationConfig, UserCrudApplication} from './application';
import {initialData} from './initialData';
import {
  CustomerRepository,
  RoleRepository,
  UserRepository,
} from './repositories';

export * from './application';

export async function main(options: ApplicationConfig = {}) {
  const app = new UserCrudApplication(options);
  await app.boot();
  await app.migrateSchema({existingSchema: 'drop'});

  // seed data
  const seeder = [
    {
      repository: RoleRepository,
      rows: initialData.roles,
    },
    {
      repository: UserRepository,
      rows: initialData.users,
    },
    {
      repository: CustomerRepository,
      rows: initialData.customers,
    },
  ];

  for (const data of seeder) {
    const repoInstance = await app.getRepository<
      UserRepository | RoleRepository | CustomerRepository
    >(data.repository);
    await repoInstance.createAll(data.rows);
  }
  // ../seed data
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);

  return app;
}

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      cors: {},
      port: +(process.env.PORT ?? 3000),
      host: process.env.HOST,
      // The `gracePeriodForClose` provides a graceful close for http/https
      // servers with keep-alive clients. The default value is `Infinity`
      // (don't force-close). If you want to immediately destroy all sockets
      // upon stop, set its value to `0`.
      // See https://www.npmjs.com/package/stoppable
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
    },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
