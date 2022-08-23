import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import dotenv from 'dotenv';
import dotEnvExtended from 'dotenv-extended';
import path from 'path';
import {OriginCheckSequence} from './origin-check.sequence';
import {RequestLoggerSequence} from './request-logger.sequence';
import {MySequence} from './sequence';

export {ApplicationConfig};

export class UserCrudApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    dotenv.config();
    dotEnvExtended.load({
      schema: '.env.example',
    });
    console.log(process.env.ALLOWED_ORIGINS);
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);
    this.sequence(RequestLoggerSequence);
    this.sequence(OriginCheckSequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
